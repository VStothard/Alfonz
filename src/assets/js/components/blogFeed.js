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
class blogFeed extends Component {

  /**
   * Creates an instance of blogFeed.
   *
   * @memberof blogFeed
   */
  constructor() {
    super('C11'); //super not working currently
    const dataID = 'C11';
    const self = this;
    $("div[data-id]").each(function() {
        if ($(this).data("id") === dataID) {
          self.blogFeed();
        }
    });
  }


  /**
   * blogFeed Method
   *
   * @param {string} param sample param
   * @returns {undefined}
   * @memberof blogFeed
   */
  blogFeed(param) {
    const self = this;
    const feedCont = $('#blog-feed-cont');
    console.log('wheres the blog');

    //contentful initialisation 
    var client = contentful.createClient({
      space: config.config.space,
      accessToken: config.config.accessToken
    });

    // get all blog posts and render to the page
    client.getEntries({
      content_type: '2wKn6yEnZewu2SCCkus4as'
    })
    .then((response) => {
        // var response = response.items;

        var html = [];

        response.items.forEach(function (entry) {
            console.log(entry.fields);
            var blogTile = '<div data-id="A07" class="A07-blog-feed-tile small-12">'
                              + '<div class="bf-feature-image">'
                                + '<img src="https:' + entry.fields.featuredImage.fields.file.url + '" alt="' + entry.fields.featuredImage.fields.description + '">' 
                              + '</div>'
                            + '</div>';
        });

        // feedCont.html(() => {
        //   response.items.forEach(function (entry) {
        //     console.log(entry.fields);
        //     return '<div data-id="A07" class="A07-blog-feed-tile small-12">'
        //               + '<div class="bf-feature-image">'
        //                 + '<img src="https:' + entry.fields.featuredImage.fields.file.url + '" alt="' + entry.fields.featuredImage.fields.description + '">' 
        //               + '</div>'
        //             + '</div>'
        //   });
        // });
        // response.items.forEach(function (entry) {
        //   console.log(entry.fields);
        // });
      // feedCont.html(function(response) {
      
      //   return '<div data-id="A07" class="A07-blog-feed-tile small-12">'
      //             + '<div class="bf-feature-image">'
      //               + '<img src="https:' + entry.fields.featuredImage.fields.file.url + '" alt="' + entry.fields.featuredImage.fields.description + '">' 
      //             + '</div>'
      //           + '</div>'
      // });
        


        // <div data-id="A07" class="A07-blog-feed-tile small-12">
        //   <div class="bf-feature-image">
        //       <!--image set as background-->
        //       <img src="https://source.unsplash.com/random/750x450" alt="feature image">
        //   </div>
        //   <div class="bf-content-overlap">
        //       <div class="bf-heading">
        //           <h2>Dream house in brighton</h2>
        //       </div>
        //       <div class="bf-desc">
        //           <p> ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit felis, venenatis sed consectetur non, euismod ac leo. Donec sed massa ac felis cursus faucibus. Phasellus pellentesque odio quis lectus elementum tincidunt. Pellentesque vestibulum massa mauris, nec consectetur risus bibendum feugiat. Suspendisse porta condimentum sodales. Nam ut ligula bibendum, pretium odio eu, fermentum eros.</p>
        //       </div>
        //       <div class="bf-button button bold">Read post</div>
        //   </div>
        // </div>
        // if(entry.fields.title) {
        //   console.log(entry.fields.title)
        // }
    })
    .catch(console.error);
  }
}

export { blogFeed };
