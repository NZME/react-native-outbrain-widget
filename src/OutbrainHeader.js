import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewPropTypes,
  Linking,
  StyleSheet
} from 'react-native';

class OutbrainHeader extends Component {
  _onPressButton = () => {
    const doo = !this.props.uniqueUserId ? 'false' : 'true';
    let url = 'https://www.outbrain.com/what-is/default/en-mobile?uid=' + (this.props.uniqueUserId ? this.props.uniqueUserId : 'null') + '&doo=' + doo;
    Linking.openURL(url);
  };

  render() {
    const styles = {
      ...defaultStyles,
      ...this.props.customStyles
    };
    return (
      <View {...this.props}>
        <View style={styles.headerHolder}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>Sponsored stories</Text>
          </View>
          <View style={styles.headerLogosHolder}>
            <TouchableOpacity onPress={this._onPressButton}>
              <View style={styles.headerLogos}>
                <Image
                  style={styles.headerLogosOutbrain}
                  source={require('../assets/ob_logo_67x12.png')}
                />
                <Image
                  style={styles.headerLogosAdChoices}
                  source={require('../assets/achoice.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

OutbrainHeader.propTypes = {
  ...ViewPropTypes,

  customStyles: PropTypes.object
};

const defaultStyles = StyleSheet.create({
  headerHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    alignSelf: 'flex-start',
  },
  headerTitleText: {
    padding: 5,
    fontSize: 16,
  },
  headerLogosHolder: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerLogos: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogosOutbrain: {
    width: 67,
    height: 12,
  },
  headerLogosAdChoices: {
    width: 10,
    height: 10,
    paddingLeft: 5,
  },
});

OutbrainHeader.propTypes = {
  ...ViewPropTypes,

  uniqueUserId: PropTypes.string,
};

export default OutbrainHeader;
