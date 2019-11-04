import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ViewPropTypes } from 'react-native';
import ContentService from './ContentService';

const VISIBILITY_THRESHOLD = 50;
var instancesCount = 0;

class OutbrainList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canRenderContent: false,
      content: false,
      reportServed: false,
      reportViewed: false,
    };
    this.instanceIdx = 0;
  }

  componentDidMount() {
    this.instanceIdx = instancesCount;
    instancesCount += 1;
    if (this.props.dataSource) {
      this.processResponse(this.props.dataSource);
    } else {
      this.loadContent();
    }
  }

  componentWillUnmount() {
    instancesCount -= 1;
    this.stopWatching()
  }

  loadContent() {
    // load stuff here
    ContentService.setPartnerKey(this.props.partnerKey);
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
    if (this.props.uniqueUserId) {
      ContentService.setUniqueUserId(this.props.uniqueUserId);
    }
    if (this.props.location) {
      ContentService.setLocation(this.props.location);
    }

    ContentService.getContent()
      .then(data => {
        this.processResponse(data);
        if (this.props.onContentLoaded) {
          this.props.onContentLoaded(data);
        }
      })
      .catch(error => {
        this.setState({ canRenderContent: false });
        if (this.props.onContentFailedToLoad) {
          this.props.onContentFailedToLoad(error);
        }
      });
  }

  processResponse(data) {
    let content = data.response.documents.doc;
    if (this.props.maxItems && content.length > this.props.maxItems) {
      content = content.slice(0, this.props.maxItems);
    }
    this.setState({
      canRenderContent: true,
      content: content,
      reportServed: data.response.viewability_actions.reportServed,
      reportViewed: data.response.viewability_actions.reportViewed,
    });
  }

  reportServed() {
    if (this.state.reportServed) {
      ContentService.reportServed(this.state.reportServed)
        .then(ok => {
          this.setState({ reportServed: false });
        })
        .catch(e => {
          // do nothing
        });
    }
  }

  reportViewed() {
    if (this.state.reportViewed) {
      ContentService.reportViewed(this.state.reportViewed)
        .then(ok => {
          this.setState({reportViewed: false});
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
        // deteck how much of the view is on visible screen
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
      return this.props.renderItem({content: data, index: index});
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
};

export default OutbrainList;
