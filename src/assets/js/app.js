/**
 * Import Classes
 */
import {
  Component,
  View,
  instaFeed,
  featureCarousel,
  mainNav,
  blogFeed,
  blogTiles,
  alertBar,
  searchBar
} from './modules';

document.addEventListener('DOMContentLoaded', function () {

  /**
   * Classes
   */
  // new Browser();
  new Component();
  new View();

  /**
   * Views
   * Run on a particular page.
   */
  

  /**
   * Components
   */
  new instaFeed();
  new featureCarousel();
  new mainNav();
  new blogFeed();
  new blogTiles();
  new alertBar();
  new searchBar();

  /**
   * Init modules
   */
});
