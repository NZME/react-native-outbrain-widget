/**
 * Sample React Native App
 *
 * adapted from App.js generated by the following command:
 *
 * react-native init example
 *
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { OutbrainList, OutbrainHeader } from 'react-native-outbrain-widget';
import { OutbrainView } from './OutbrainView';
import DUMMY_RESPONSE from './dummy-response.json';

export default class App extends Component {
  getPartnerKey = () => {
    if (Platform.OS === 'ios') {
      return 'NZHER16EM844QP3E8Q564CPQ7';
    }
    return 'NZHER16I44OO1J04F8KLJC05J';
  };

  getPermalinkURL = () => {
    return 'https://nzherald.co.nz/nz/news/article.cfm?c_id=1&objectid=12281997';
  };

  getWidgetId = () => {
    if (Platform.OS === 'ios') {
      return 'APP_2';
    }
    return 'APP_1';
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcome}>Outbrain example</Text>
          <View style={{ width: '100%' }}>
            <OutbrainHeader />
            <OutbrainList
              style={styles.listStyle}
              enableTestMode={true}
              setSecured={true}
              partnerKey={this.getPartnerKey()}
              permalinkURL={this.getPermalinkURL()}
              widgetId={this.getWidgetId()}
              maxItems={4}
              // dataSource={DUMMY_RESPONSE}
              renderItem={({ content, index }) => (
                <OutbrainView key={index} content={content} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
