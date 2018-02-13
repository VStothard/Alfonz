import { Component } from '../classes/component';
import forEach from 'lodash/forEach';

const contentful = require('contentful')
var config = require('config');

/**
 *
 *
 * @class mainNav
 * @extends {Component}
 */
class mainNav extends Component {

  /**
   * Creates an instance of Component.
   *
   * @memberof mainNav
   */
  constructor() {
    super('C03'); //super not working currently
    console.log('C03 running');
    this.categoryLinks();
    this.mainNavControls();
  }

  mainNavControls(param) {
    console.log('main nav controls');
    const open = $('#open-main-nav');
    const mainNav = $('.nav-cont');
    const modalOverlay = $('#modal-overlay');
    const close = $('#close-main-nav');
    const body = $('body');
    const search = $('#main-nav-search');
    const mobSearch = $('#mob-search');

    open.on('click touch', () => {
        console.log('open');
        mainNav.addClass('nav-active');
        modalOverlay.addClass('modal-active');
        body.addClass('no-scroll');
    });

    search.on('click touch', () => {
        console.log('open');
        mainNav.addClass('nav-active');
        modalOverlay.addClass('modal-active');
        body.addClass('no-scroll');
        mobSearch.focus();
    });

    modalOverlay.on('click touch', () => {
        mainNav.removeClass('nav-active');
        modalOverlay.removeClass('modal-active');
        body.removeClass('no-scroll');
    });

    close.on('click touch', () => {
        mainNav.removeClass('nav-active');
        modalOverlay.removeClass('modal-active');
        body.removeClass('no-scroll');
    });

    body.on('click', (e) => {

      if (e.target == $('#main-nav-search').children()) {
        console.log('search');
      }
    })
  }

  categoryLinks() {
    // contentful.js v4.x.x

    const client = contentful.createClient({
      space: config.config.space,
      accessToken: config.config.accessToken
    })

    client.getEntries()
    .then((response) => {
      // console.log(response.items, 1000);
      var links = $('#cat-links');
      var html = '';

      forEach(response.items, (entry) => {
        var title = entry.fields.title;
        var id = entry.sys.id;

        //32D9DUawik08UGcmk6eSyo - lifestyle
        //HwJDGDyVwWKOu04Ga4uQq - food
        //ugqB5nhECyk8iM2ye28gW - technology
        //3h0RSqywQ0i8ymKYGaYGoo - money

        if(id == '3h0RSqywQ0i8ymKYGaYGoo') {
          var catURL = window.location.origin + '/category.html?tag=' + title;
          var catLink = '<li class="menu-item"><a href="' + catURL + '">// ' + title + '</a></li>';

          html = html + catLink;

        // } else if (id == '1ZpPZ6GHUwoEYSkQGkOk2e') {
        //   // console.log('business');

        //   var catURL = window.location.origin + '/category.html?tag=' + title;
        //   var catLink = '<li class="menu-item"><a href="' + catURL + '">// ' + title + '</a></li>';

        //   html = html + catLink;

        } else if (id == 'ugqB5nhECyk8iM2ye28gW') {

          var catURL = window.location.origin + '/category.html?tag=' + title;
          var catLink = '<li class="menu-item"><a href="' + catURL + '">// ' + title + '</a></li>';

          html = html + catLink;

        } else if (id == 'HwJDGDyVwWKOu04Ga4uQq') {

          var catURL = window.location.origin + '/category.html?tag=' + title;
          var catLink = '<li class="menu-item"><a href="' + catURL + '">// ' + title + '</a></li>';

          html = html + catLink;

        } else if (id == '32D9DUawik08UGcmk6eSyo') {

          var catURL = window.location.origin + '/category.html?tag=' + title;
          var catLink = '<li class="menu-item"><a href="' + catURL + '">// ' + title + '</a></li>';

          html = html + catLink;

        } else {
          return
        }
      });
      links.html(html);
      // console.log(html);
    })
    .catch(console.error)
  }
}

export { mainNav };
