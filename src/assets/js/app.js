import "babel-polyfill";

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
  categoryFeed,
  blogTiles,
  alertBar,
  searchBar,
  blogPost
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
  new categoryFeed();
  new blogTiles();
  new alertBar();
  new searchBar();
  new blogPost();

  /**
   * Init modules
   */
});
