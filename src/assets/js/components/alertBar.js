import { Component } from '../classes/component';
import $ from 'jquery';
var contentful = require('contentful');
var config = require('config');

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
    super('C01'); //super not working currently

    //check if element exists on the page
    const dataID = 'C01';
    const self = this;
    $("div[data-id]").each(function() {
        // if exists, execute alertBar
        if ($(this).data("id") === dataID) {
            self.alertContent();
            self.alertClose();
        }
    });
  }


  /**
   * alertBar Method
   *
   * @param {string} param sample param
   * @returns {undefined}
   * @memberof alertBar
   */
  alertClose(param) {
    const self = this;
    const alertBar = $('.C01-alert-bar');
    const alertClose = $(alertBar).children('.close');

    $(alertClose).on('click touch keyup', () => {
        $(alertBar).hide();
    });
  }

  alertContent() {
    const self = this;
    const alertCont = $('.alert-cont');

    //contentful initialisation 
    var client = contentful.createClient({
      space: config.config.space,
      accessToken: config.config.accessToken
    });

    // get all blog posts and render to the page
    client.getEntry('1sIbBvEzuYQKeoG2IkQwGG')
    .then((entry) => {
        console.log(entry);
        if (entry.fields.alertActive === true) {
            alertCont.html(entry.fields.alertBarContent);
        } else {
            $('.C01-alert-bar').hide();
        }  
    })
    .catch(console.error);
  }
}

export { alertBar };