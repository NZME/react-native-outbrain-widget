import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ViewPropTypes } from 'react-native';
import ContentService from './ContentService';

const VISIBILITY_THRESHOLD = 50;
var instancesCount = 0;

class OutbrainList extends Component {
  _isMounted = false;
  _reportServed = false;
  _reportViewed = false;

  constructor(props) {
    super(props);
    this.state = {
      canRenderContent: false,
      content: false,
      reportServedUrl: false,
      reportViewedUrl: false,
    };
    this.instanceIdx = 0;
  }

  componentDidMount() {
    this._isMounted = true;
    this.instanceIdx = instancesCount;
    instancesCount += 1;
    if (this.props.dataSource) {
      this.processResponse(this.props.dataSource);
    } else {
      this.loadContent();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    instancesCount -= 1;
    this.stopWatching()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this?.state?.canRenderContent === nextState?.canRenderContent) {
      return false;
    }
    return true;
  }

  loadContent() {
    // load stuff here
    ContentService.setPartnerKey(this.props.partnerKey);
    const uniqueUserId = this.props.uniqueUserId ? this.props.uniqueUserId : 'null';
    ContentService.setUniqueUserId(uniqueUserId);
    if (this.props.enableTestMode) {
      ContentService.setTestMode(true);
    }
    if (this.props.setSecured) {
      ContentService.setSecured(true);
    }
    if (this.props.permalinkURL) {
      ContentService.setPermalinkUrl(this.props.permalinkURL);
    }
    if (this.props.widgetId) {
      ContentService.setWidgetId(this.props.widgetId);
    }
    if (this.props.widgetIndex) {
      ContentService.setWidgetIndex(this.props.widgetIndex);
    } else {
      ContentService.setWidgetIndex(this.instanceIdx);
    }
    if (this.props.location) {
      ContentService.setLocation(this.props.location);
    }

    ContentService.getContent()
      .then(data => {
        if (this._isMounted) {
          this.processResponse(data);
          if (this.props.onContentLoaded) {
            this.props.onContentLoaded(data);
          }
        }
      })
      .catch(error => {
        if (this._isMounted) {
          this.setState({canRenderContent: false});
          if (this.props.onContentFailedToLoad) {
            this.props.onContentFailedToLoad(error);
          }
        }
      });
  }

  processResponse(data) {
    let content = data.response.documents.doc;
    if (this.props.maxItems && content.length > this.props.maxItems) {
      content = content.slice(0, this.props.maxItems);
    }
    if (this.props.renderHeader && this.props.renderHeaderIndex) {
      content.splice(this.props.renderHeaderIndex, 0, "header")
    }

    this.setState({
      canRenderContent: true,
      content: content,
      reportServedUrl: data.response.viewability_actions.reportServed,
      reportViewedUrl: data.response.viewability_actions.reportViewed,
    });
  }

  reportServed() {
    if (this.state.reportServedUrl && !this._reportServed) {
      this._reportServed = true;
      ContentService.reportServed(this.state.reportServedUrl)
        .then(ok => {
          if (this._isMounted) {
            this.setState({reportServedUrl: false});
          }
        })
        .catch(e => {
          // do nothing
        });
    }
  }

  reportViewed() {
    if (this.state.reportViewedUrl && !this._reportViewed) {
      this._reportViewed = true;
      ContentService.reportViewed(this.state.reportViewedUrl)
        .then(ok => {
          if (this._isMounted) {
            this.setState({reportViewedUrl: false});
          }
        })
        .catch(e => {
          // do nothing
        });
    }
  }

  stopWatching() {
    if (this.interval) {
      this.interval = clearInterval(this.interval)
    }
  }

  startWatching() {
    if (this.interval) {
      return
    }
    this.interval = setInterval(() => {
      if (!this._holderView) {
        return
      }
      this._holderView.measure((x, y, width, height, pageX, pageY) => {
        // detect how much of the view is on visible screen
        if (height && pageY) {
          // height (element height) - pageY (vertical position on page) / height (element height) * 100
          let visiblePercentage = ((height - pageY) / height * 100);
          if (visiblePercentage >= VISIBILITY_THRESHOLD) {
            this.stopWatching();
            this.reportViewed();
          }
        }
      });
    }, this.props.delay || 1000)
  }

  renderContent = () => {
    if (!this.state.content) {
      return null;
    }
    this.startWatching();
    this.reportServed();

    return this.state.content.map((data, index) => {
      if (data === "header") {
        if (this.props.renderHeader) {
          return this.props.renderHeader({content: data, index: index});
        } else {
          return null;
        }
      } else {
        return this.props.renderItem({content: data, index: index});
      }
    });
  };

  render() {
    if (!this.state.canRenderContent) {
      return null;
    }
    return (
      <View {...this.props} collapsable={false} ref={el => (this._holderView = el)}>
        {this.renderContent()}
      </View>
    );
  }
}

OutbrainList.propTypes = {
  ...ViewPropTypes,

  renderItem: PropTypes.func.isRequired,

  partnerKey: PropTypes.string.isRequired,
  permalinkURL: PropTypes.string.isRequired,

  enableTestMode: PropTypes.bool,
  setSecured: PropTypes.bool,
  widgetId: PropTypes.string,
  widgetIndex: PropTypes.string,
  uniqueUserId: PropTypes.string,
  location: PropTypes.string,

  dataSource: PropTypes.object,
  maxItems: PropTypes.number,

  /**
   * Content events
   */
  onContentLoaded: PropTypes.func,
  onContentFailedToLoad: PropTypes.func,

  renderHeader: PropTypes.func,
  renderHeaderIndex: PropTypes.number,
};

export default OutbrainList;
