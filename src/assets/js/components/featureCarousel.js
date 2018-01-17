import { Component } from '../classes/component';
import { Device } from '../modules';

// const autocomplete = require('autocomplete.js');

/**
 * featureCarousel Carousel Component
 *
 * @class featureCarousel
 * @extends {Component}
 */
class featureCarousel extends Component {

  /**
   * Creates an instance of featureCarousel.
   *
   * @memberof featureCarousel
   */
  constructor() {
    super('C04');

    console.log('this file is running');

    this.initSlick();

    // if (super.exists()) {
    //   const device = new Device();

    //   this.checkCookie();

    //   if (device.mobile()) {
    //     console.log("we're on mobile");
    //   } else {
    //     console.log("this ain't a mobile");
    //   }
    // }
  }

  initSlick() {
    $(".feature-carousel").slick({
      autoplay: true,
      dots: true,
      infinite: true,
      vertical: true,
      verticalSwiping: true
    });
  }
}

export { featureCarousel };
