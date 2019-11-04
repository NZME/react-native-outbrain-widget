import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

export class OutbrainView extends Component {
  constructor(props) {
    super(props);
  }

  _onPressButton = () => {
    if (!this.props.content.url) {
      return null;
    }
    Linking.openURL(this.props.content.url);
  };

  render() {
    if (!this.props.content) {
      return null;
    }

    return (
      <View style={styles.holder}>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.contentHolder}>
            <View>
              <Image
                style={styles.image}
                source={{ uri: this.props.content.thumbnail.url }}
              />
            </View>
            <View>
              <Text style={styles.content}>{this.props.content.content}</Text>
            </View>
            <View style={styles.smallPrint}>
              <Text style={styles.source_name}>
                {this.props.content.source_name}
              </Text>
              <Text style={styles.publish_date}>
                {this.props.content.publish_date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    borderWidth: 1,
    borderColor: '#CBCBCB',
    width: '50%',
    padding: 5,
  },
  contentHolder: {
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 100,
  },
  content: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  smallPrint: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingTop: 10,
  },
  source_name: {
    fontSize: 10,
    borderColor: '#CBCBCB',
  },
  publish_date: {
    fontSize: 10,
    borderColor: '#CBCBCB',
  },
});

export default OutbrainView;
