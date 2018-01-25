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

    //check if element exists on the page
    const dataID = 'C11';
    const self = this;
    $("div[data-id]").each(function() {
        // if exists, execute blogFeed
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
        //create the element you will be plugging into the blog feed container
        var html = '';

        //for each item there is, create an A07 blog tile
          //Todo 
           // - limit the numebr of entries per page, implement pagination
           // - limit the number of words that can show up in the blog tile, it should be a preview not the whole post
        response.items.forEach(function (entry) {

            //TODO swap this out with handlebars templating
            var blogTile = '<div data-id="A07" class="A07-blog-feed-tile small-12">'
                              + '<div class="bf-feature-image">'
                                + '<img src="https:' + entry.fields.featuredImage.fields.file.url + '" alt="' + entry.fields.featuredImage.fields.description + '">' 
                              + '</div>'
                              + '<div class="bf-content-overlap">'
                                + '<div class="bf-heading">'
                                  + '<h2>' + entry.fields.title + '</h2>'
                                + '</div>'
                                + '<div class="bf-desc">'
                                  + '<p>' + entry.fields.body + '</p>'
                                + '</div>'
                                + '<div class="bf-button button bold"><a href="' + '#' + '">Read post</a></div>'
                              + '</div>'
                            + '</div>';
            
            //add the entry to the element
            html = html + blogTile;
        });

        // replace html with the created blog tiles to display 
        feedCont.html(html); 
    })
    .catch(console.error);
  }
}

export { blogFeed };
