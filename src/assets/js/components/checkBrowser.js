import { Component } from '../classes/component';
import $ from 'jquery';
var contentful = require('contentful');
var config = require('config');
var marked = require('marked');

/**
 *
 *
 * @class blogFeed
 * @extends {Component}
 */
class alertBar extends Component {

  /**
   * Creates an instance of alertBar.
   *
   * @memberof alertBar
   */
  constructor() {
    super('C00'); //super not working currently

    //check if element exists on the page
    const dataID = 'C00';
    const self = this;
    $("div[data-id]").each(function() {
        // if exists, execute alertBar
        if ($(this).data("id") === dataID) {
            self.checkBrowser();

        }
    });
  }


  checkBrowser() {
    if ((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
      window.location = 'https://www.veritystothard.com/browser-unsupported.html';
    } else {
      console.log('you can go');
    }
  }
}

export { alertBar };

