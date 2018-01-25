import { Component } from '../classes/component';
require('instafetch.js');

/**
 *
 *
 * @class instaFeed
 * @extends {Component}
 */
class instaFeed extends Component {

  /**
   * Creates an instance of instaFeed.
   *
   * @memberof instaFeed
   */
  constructor() {
    super('C07'); //super not working currently
    const dataID = 'C07';
    const self = this;
    $("div[data-id]").each(function() {
        if ($(this).data("id") === dataID) {
          self.initFeed();
        }
    });
  }

  /**
   * Sample static method
   *
   * @static
   * @returns {undefined}
   * @param {obj} obj sample obj
   * @param {string} obj.name Sample Name
   * @param {number} obj.type Sample Type
   *
   * @memberof instaFeed
   */
  static sampleStaticMethod(obj) {
    console.log(obj.name, obj.type);
  }

  /**
   * Sample Method
   *
   * @param {string} param sample param
   * @returns {undefined}
   * @memberof sampleComponent
   */
  initFeed(param) {
    const self = this;

    instafetch.init({
        accessToken: '769159276.1677ed0.67d2617666634feb9e5d1102636c8bef',
        target: 'instafetch',
        numOfPics: 4,
        caption: true
    });
  }
}

export { instaFeed };
