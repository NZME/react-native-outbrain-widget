import { Platform } from 'react-native';

const BASE_URL = 'https://odb.outbrain.com';

/**
 * ContentService.js client
 */
export class ContentService {
  /**
   * https://odb.outbrain.com/utils/get?
   * url=[PERMALINK_URL]
   * &widgetJSId=[WIDGET_ID]
   * &key=[PARTNER_KEY]
   * &idx=[WIDGET_INDEX]
   * &api_user_id=[UNIQUE_USER_ID]
   * &format=vjnc
   * &va=true
   */
  urlParts = {};

  /**
   * Enables or disables test mode
   *
   * @param isTest
   * @returns {ContentService}
   */
  setTestMode(isTest) {
    this.urlParts.testMode = isTest !== false;
    return this;
  }

  /**
   * Set the permalink url
   *
   * @param url
   * @returns {ContentService}
   */
  setPermalinkUrl(url) {
    this.urlParts.url = encodeURIComponent(url);
    return this;
  }

  /**
   * Set the Widget ID
   *
   * @param widgetId
   * @returns {ContentService}
   */
  setWidgetId(widgetId) {
    this.urlParts.widgetJSId = encodeURI(widgetId);
    return this;
  }

  /**
   * Set the partner key
   *
   * @param partnerKey
   * @returns {ContentService}
   */
  setPartnerKey(partnerKey) {
    this.urlParts.key = partnerKey;
    return this;
  }

  /**
   * Set the widget index
   *
   * @param widgetIndex
   * @returns {ContentService}
   */
  setWidgetIndex(widgetIndex) {
    this.urlParts.idx = widgetIndex;
    return this;
  }

  /**
   *  Set the unique user ID
   *
   * @param uniqueUserId
   * @returns {ContentService}
   */
  setUniqueUserId(uniqueUserId) {
    this.urlParts.api_user_id = uniqueUserId;
    return this;
  }

  /**
   * Set the 2 letter country code of the user’s location
   * @param location
   * @returns {ContentService}
   */
  setLocation(location) {
    this.urlParts.location = location;
    return this;
  }

  /**
   * For HTTPS support
   *
   * @param secured
   * @returns {ContentService}
   */
  setSecured(secured) {
    this.urlParts.secured = !!secured;
    return this;
  }

  /**
   * ### getContent
   *
   * @returns {Promise<T>}
   *
   * if good, a json object containing content to display
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getContent() {
    let url = BASE_URL + '/utils/get';

    let urlElms = {
      ...this.urlParts,
      format: 'vjnc',
      va: true,
    };

    url +=
      '?' +
      Object.keys(urlElms)
        .map((key, index) => `${key}=${urlElms[key]}`)
        .join('&');

    return await this._fetch({
      method: 'GET',
      url: url,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          return res.json;
        } else {
          throw res.json;
        }
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Report that content has been server
   * @param url
   * @returns {Promise<T>}
   */
  async reportServed(url) {
    return await this._fetch({
      method: 'GET',
      url: url,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          return res.json;
        } else {
          throw res.json;
        }
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Report that content has been viewed
   * @param url
   * @returns {Promise<T>}
   */
  async reportViewed(url) {
    return await this._fetch({
      method: 'GET',
      url: url,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          return res.json;
        } else {
          throw res.json;
        }
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Report that content has been clicked
   * @param url
   * @returns {Promise<T>}
   */
  async reportClicked(url) {
    return await this._fetch({
      method: 'GET',
      url: url,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          return true;
        } else {
          throw new Error('Click not tracked.');
        }
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * A generic function that prepares the request
   * @param opts
   * @returns {Promise<any>}
   * @private
   */
  async _fetch(opts) {
    opts = {
      method: 'GET',
      url: null,
      body: null,
      callback: null,
      ...opts,
    };

    let reqOpts = {
      method: opts.method,
      headers: {},
    };

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers.Accept = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (Platform.OS === 'ios') {
      reqOpts.headers["User-Agent"] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1';
    } else {
      reqOpts.headers["User-Agent"] = 'Mozilla/5.0 (Linux; Android 9; SM-G960F Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36';
    }
    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }

    let res = {};
    let response = await fetch(opts.url, reqOpts);

    res.status = response.status;
    res.code = response.code;

    return response.json().then(json => {
      res.json = json;
      return res;
    });
  }
}

const contentService = new ContentService();
export default contentService;
