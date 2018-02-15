import $ from 'jquery';
import isString from 'lodash/isString';
import isElement from 'lodash/isElement';

/**
 * Component Super Class
 * @class Component
 */
class Component {

  /**
   * Creates an instance of Component.
   * @param {string} id The ID of the component.
   *
   * @memberof Component
   */

  constructor(id) {
    this.componentId = isString(id) ? id : '';
    this.elements;
    // this.exists();
    // this.browserCheck();
  }

  /**
   * Tests for the existance of a component/s.
   *
   * @returns {boolean} If the element exists.
   * @memberof Component
   */
  exists() {
    console.log('hellooo');
    this.elements = document.querySelectorAll(`[data-id='${this.componentId.toLowerCase()}']`);
    console.log(this.elements, 1000);


    if (!isElement(this.elements[0])) {
      console.info(`Component ${this.componentId.toUpperCase()} Node ✖ is not present, aborting.`);
    } else {
      console.info(`Component ${this.componentId.toUpperCase()} Node ✔ is present, running class.`);
    }

    return isElement(this.elements[0]);
  }

  // browserCheck() {
  //    if ((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
  //       window.location = 'https://www.veritystothard.com/browser-unsupported.html';
  //    }
  // }
}

export { Component };
