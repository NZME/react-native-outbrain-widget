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

Your component will have access to the following properties, under the `OutbrainList` prop:

- `renderItem` - The item to render for each recommendation.
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

In addition, you'll have access to the following component:

- `OutbrainHeader` for displaying Outbrain-supported Opt-Out.

Please ensure you've reviewed Outbrain's [instructions](http://developer.outbrain.com/) to get a better understanding of each of these components and how you should use them.

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

#### 2. Displaying Outbrain-supported Opt-Out

Outbrain serves personalized recommendations to users based on their history. Users must have the ability to opt out of Outbrain’s user tracking. More information can be found [here][1]. 
You can use the included `OutbrainHeader` component and style it to your liking.

[1]: http://developer.outbrain.com/apis/outbrain-endpoint-api-guide-server-server/#optout

Your component will have access to the following properties:

- `customStyles` - Styles object that overwrites the styles of the header element

#### Example usage

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
