import { Component } from '../classes/component';
import isNull from 'lodash/isNull';

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

    if (super.exists()) {
      const device = new Device();

      this.checkCookie('AdvisianCookie', true, 1);

      if (device.mobile()) {
        this.cookiePopupMobile();
      } else {
        this.cookiePopup();
      }
    }
  }

  //set Cookie

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

    const popup = document.querySelector('.cookie-acceptance-popup');

    if (user != '') {
      //if popup present add 'dismiss' class to popup
      popup.classList.add('dismiss');
    } else {
      self.setCookie(cname, cvalue, exdays);
      popup.classList.add('show-cookie');

      //push down nav and search

    }
  }

  cookiePopupMobile() {
    //behaviour on mobile
    console.log('mobile');

    const popup = document.querySelector('.cookie-acceptance-popup');
    const close = popup.querySelector('.close');
    const pointer = popup.querySelector('.icon-point');

    close.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    pointer.addEventListener('click', () => {
      popup.dataset.active = true;
    });
  }

  cookiePopup() {
    //behaviour on tablet and up
    console.log('desk');

    const popup = document.querySelector('.cookie-acceptance-popup');
    const close = popup.querySelector('.close');

    close.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }
}

export { cookieComponent };
