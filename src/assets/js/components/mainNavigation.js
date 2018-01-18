import { Component } from '../classes/component';

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

    this.mainNavControls();
  }

  mainNavControls(param) {
    console.log('main nav controls');
    const open = $('#open-main-nav');
    const mainNav = $('.nav-cont');
    const modalOverlay = $('#modal-overlay');
    const close = $('#close-main-nav');
    const body = $('body');

    open.on('click touch', () => {
        console.log('open');
        mainNav.addClass('nav-active');
        modalOverlay.addClass('modal-active');
        body.addClass('no-scroll');
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
  }
}

export { mainNav };