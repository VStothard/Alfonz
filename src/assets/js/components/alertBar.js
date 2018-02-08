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
    super('C01'); //super not working currently

    //check if element exists on the page
    const dataID = 'C01';
    const self = this;
    $("div[data-id]").each(function() {
        // if exists, execute alertBar
        if ($(this).data("id") === dataID) {
            self.alertContent();
            self.alertClose();
            self.checkCookie('BlogCookie', true, 1);

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
        if (entry.fields.alertActive === true) {
            alertCont.html(marked(entry.fields.alertBarContent));
        } else {
            $('.C01-alert-bar').hide();
        }  
    })
    .catch(console.error);
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  checkCookie(cname, cvalue, exdays) {
    const self = this;
    var user = self.getCookie(cname);

    const popup = document.querySelector('.C01-alert-bar');

    if (user != '') {
      //if popup present add 'dismiss' class to popup
      popup.classList.add('dismiss');
    } else {
      self.setCookie(cname, cvalue, exdays);
      popup.classList.add('show');
    }
  }
}

export { alertBar };