import { Component } from '../classes/component';
import { Device } from '../modules';

// const autocomplete = require('autocomplete.js');

/**
 * Cookie Bar Component
 *
 * @class cookierComponent
 * @extends {Component}
 */
class cookieComponent extends Component {

  /**
   * Creates an instance of cookieComponent.
   *
   * @memberof cookieComponent
   */
  constructor() {
    super('c38');

    console.log('this file is running');

    if (super.exists()) {
      const device = new Device();

      this.checkCookie();

      if (device.mobile()) {
        console.log("we're on mobile");
      } else {
        console.log("this ain't a mobile");
      }
    }
  }

  checkCookie() {
    console.log('is there a cookie');
  }
}

export { cookieComponent };
