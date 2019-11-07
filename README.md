# react-native-outbrain

## Getting started

`$ npm install react-native-outbrain --save`

## Usage
```js
import { OutbrainList, OutbrainHeader } from 'react-native-outbrain';
```

### Outbrain recommendations

This library allows you to create custom layouts that match your app. Before proceeding, please review [Outbrain Developer Center](http://developer.outbrain.com/) to get a better understanding of the requirements.

<img width="300" src="https://github.com/NZME/react-native-outbrain/raw/master/Outbrain-example.png" />

#### 1. Create your component

Your component will have access to the following properties, under the `content` props:

```json
{
  "on-viewed": [
    "https://log.outbrainimg.com/loggerServices/log-viewability?requestId=a6f82799affc6e8b2907023821678286&position=0"
  ],
  "source_name": "CNN",
  "same_source": "false",
  "source_display_name": "CNN",
  "pc_id": 136178592,
  "adv_name": "Selfserve_meden",
  "publish_date": "2019-09-08 00:00",
  "orig_url": "https://edition.cnn.com/2019/09/08/tennis/bianca-andreescu-us-open-serena-williams-tennis-spt-intl/index.html",
  "rec-cats": [
    1913
  ],
  "ads_type": 1,
  "rec_en_did": "bjVQMWy1_aVKJgzIIM8ftQ",
  "url": "https://paid.outbrain.com/network/redir?p=DIbkcScn1O1Wt6ogzQMhyihdL7g-DYWZ3oynJ_2J3u-05wOW9jT_PIQ31Sxmtrm32wErwBqJBTTQoe66eIp6RoAyvofDbz29te1xnFuYbB93Gb8BvpS04Rt4n_x4eaSA3ze6oV_Il1YwJ4AQ_nl-wUi2wbuKfeFRWSvLBao_0op2fwxUIdHGpF7UAC_bKcVxkhMejRODEmaLXF4bi9c2sVkOW9pPElz94HUo6pRexQdaa-fTz6DQEspLnjd5cbzBp6bKLDUC8gmt_P9v04VCvApW9CF1gDFAZYO8KR0-ianewYxMFR24Dal6jFEmwsTiDBMPLi29FFuhuuRHv3oZchR6CqxHoTMZJT8kgAfY4Fmz19jO7wt8ol3-Biwyb6fR14lBnbvUqXjNFr5g9cGdIvmGp3gztstZJb45PEIbuY1oX-6FuzZCHZhnQxef9aCOqs4kSv-3OdrJbwg9nDU1FwEKHzt3w7KsbsPyxDfXavLwwp1FzPtaDbb_VKHFnexR4Y0bnoKEYI-fAyuX0TMa3cFljYsaQQu3fW4pweO4BrHrZ7g17Td9JEsD2W3Vg7H3ZkZXKWOsjFsv5OLbUZrOOl4zk4y0iLkYAewRKaJOCUhnjmqLNLcWRHdrNjHe64H3zeWy7RsKQgRKA_oOHb6ah7wjeU7tH0mB9zykMWifXIz6SFK6Q3iGO0LZ4XXEUg6nNFKz5EWiM4ud_cn8kEvQkbOgl46nWoq-pPriiWw5JgPB4tZclvq3-p694xd8c0XqLTfd3TGccl7Gn-6YSmVchTLnnbNCw-uJ526Jb-DbTuMh_tp4WfeH3xyvAtbjze4EjiKc8CjcJGH3EpTRDLl3byfd13Ra1VrS0EwgcsMUpDEWfQri4lcIOsT8Fu3BpJRFaWlMe8AZ2dUVTR3IqVQ8pthm7shE6j2u_4NzkNRX5Oq8ztyv8rA5yQB7tfo5cZobAXQoGGwzLw23KoEykVx2dalyXYhqccYGLQVpcrpHQ_-MklDnSyuwFn4gbv0BXjHW7Dj9YQUcysJuf5v5lrfgNmctJCZwQLt6CDjQLM3ZOeHv0X_VGdgS6cHAOmelt3-oNm-BNRM2zjy1dW_YIiR2KH1yq3nkk8IEvwBC2DH_esh-XomHwMqRC7Y1uc9DamWUCCcWt0uGk2XhO9DkZl0DpRL5-HfYIvFtT2pTTAgDtyxoB9m7H-yfbdszOwsMZEBcwZ3ey2ivohdimhwJcZGM5ETnVn5Gf2XBgkauRpHiZ87gJlQYNizTjK3XDsS5rRUT&c=80f07eef&v=3",
  "author": "",
  "content": "Bianca Andreescu: How a fake check inspired the US Open champion",
  "pc_cmp_id": 1002332188,
  "pixels": [
    "https://www.pixel1.com?obRequestId=HBanhEIY3a_2mWt3Ysg7Ke34n8k2QVwD-3FLVEeG0gNoP1boaU8-J45L_2pX3KQp&obTimestamp=1568105594278"
  ],
  "pos": "0",
  "ttid": 3,
  "jsTrackers": [
    "https://cdn.doubleverify.com/dvtp_src.js?obRequestId=HBanhEIY3a_2mWt3Ysg7Ke34n8k2QVwD-3FLVEeG0gNoP1boaU8-J45L_2pX3KQp&obTimestamp=1568105594278"
  ],
  "advId": "13604",
  "thumbnail": {
    "url": "https://images.outbrainimg.com/transform/v3/eyJpdSI6IjZjM2JlNmVjZDY5Nzc5Yjk1NzNkMTVhNGE2NWQ1Yzk1ODAzODdlNjk0OWI3MGYzNDVkZWRhYTY0YTA1M2QxOWIiLCJ3IjoxNTAsImgiOjE1MCwiZCI6MS41LCJjcyI6MCwiZiI6MH0.jpg",
    "width": 150,
    "height": 150,
    "imageImpressionType": "DOCUMENT_IMAGE"
  }
}
```

In addition, you'll have access to the following component:

- `OutbrainHeader` for displaying Outbrain-supported Opt-Out.

Please ensure you've reviewed Outbrain's [instructions](http://developer.outbrain.com/) to get a better understanding of each of these components and how you should use them.

##### Example component
```js
export class OutbrainView extends Component {
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
      <View>
        <TouchableOpacity onPress={this._onPressButton}>
          <View>
            <View>
              <Image
                source={{ uri: this.props.content.thumbnail.url }}
              />
            </View>
            <View>
              <Text>{this.props.content.content}</Text>
            </View>
            <View>
              <Text>
                {this.props.content.source_name}
              </Text>
              <Text>
                {this.props.content.publish_date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
```

#### 2. Inject your component into OutbrainList as a renderItem function

`OutbrainList` has the following props:

- `renderItem` - The item to render for each recommendation. This is your component built in step 1.
- `partnerKey` - Unique partner key, provided by Outbrain.
- `permalinkURL` - The permalink for the currently displayed content, no need to URL encode, the library does that for you.
- `enableTestMode` - While you’re developing, we recommend that you use test mode. This will prevent any clicks and impressions from impacting the Outbrain system while testing and developing. Please remember to remove this parameter before releasing to production.
- `setSecured` - For HTTPS support.
- `widgetId` - The ID of the widget, used for reporting on activity. Your Outbrain Account Manager will provide you with the value for this parameter. Widget_IDs have a specific number of recommendations and image size associated with them.
- `widgetIndex` - You can skip this as the library will auto index the widgets. Otherwise overwrite it with the value that represents the current position of the widget relative to other widgets on the page: The first unit on page will have idx=0 while the second unit will have idx=1 and so on. For pages/views with only one widget installed, use idx=0 for each request.
- `uniqueUserId` - A unique user ID that identifies the user during the application session. This must be provided by the hosting application, and can take any type of value or format. This functions similarly to user identifying cookies on the web. See User [Opt-Out](http://developer.outbrain.com/apis/outbrain-endpoint-api-guide-server-server/#optout) instructions.
- `location` - The 2 letter country code of the user’s location (ex. “us”).
- `dataSource` - You can fetch the content separately and pass it in to the list yourself. This will ignore your user key and will not fetch the content from the API. 
- `maxItems` - Use this to concatenate the amount of items you want to display, by default Outbrain displays all items returned from the API.
- `onContentLoaded` - You can add an event listener for when the content is loaded.
- `onContentFailedToLoad` - You can add an event listener for when the content failed to load.

```js
import { OutbrainList } from 'react-native-outbrain';

class myItemView extends React.Component {
 ...
}

class App extends React.Component {
  render() {
    return (
      <ScrollView>
          <OutbrainList
            style={styles.listStyle}
            enableTestMode={true}
            setSecured={true}
            partnerKey="<partner key>"
            permalinkURL="<url representation of the page serving the recommendation>"
            widgetId="<widget id>"
            maxItems={4}
            renderItem={({ content, index }) => (
              <myItemView key={index} content={content} />
            )}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

```

#### 3. Displaying Outbrain-supported Opt-Out

Outbrain serves personalized recommendations to users based on their history. Users must have the ability to opt out of Outbrain’s user tracking. More information can be found [here][1]. 
You can use the included `OutbrainHeader` component and style it to your liking.

[1]: http://developer.outbrain.com/apis/outbrain-endpoint-api-guide-server-server/#optout

Your component will have access to the following properties:

- `customStyles` - Styles object that overwrites the styles of the header element

#### Example OutbrainHeader usage

```js
import { OutbrainHeader } from 'react-native-outbrain';

const styles = StyleSheet.create({
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

 <OutbrainHeader customStyles={styles} />
```
