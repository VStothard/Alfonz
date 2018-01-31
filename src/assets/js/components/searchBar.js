import { Component } from '../classes/component';
import $ from 'jquery';
import forEach from 'lodash/forEach';

var contentful = require('contentful');
var config = require('config');

/**
 *
 *
 * @class searchBar
 * @extends {Component}
 */
class searchBar extends Component {

  /**
   * Creates an instance of searchBar.
   *
   * @memberof searchBar
   */
  constructor() {
    super('C03a'); //super not working currently

    //check if element exists on the page
    const dataID = 'C03a';
    const self = this;
    $("div[data-id]").each(function() {
        // if exists, execute searchBar
        if ($(this).data("id") === dataID) {
            self.searchSubmit();
            self.fetchResults();
        }
    });
  }


  /**
   * searchBar Method
   *
   * @param {string} param sample param
   * @returns {undefined}
   * @memberof searchBar
   */

  searchSubmit() {
    const self = this;
    const searchForm = $('#search-form');
    const searchBtn = $('.mob-search-submit');
    var url = '';
    console.log(url);

    //on click search, get value
    $(searchForm).on('submit', (e) => {
        e.preventDefault();
        var searchVal = $('#mob-search').val();

        //change window location to www/search value

        url = 'http://localhost:8000/search.html?term=' + searchVal;
        window.location = url;
    });
  }

  fetchResults() {
    const contentful = require('contentful')
    var query = window.location.search.substring(1);
    var term = '';
    var vars = query.split("&");
    const searchCont = $('#search-cont');

    const client = contentful.createClient({
        space: config.config.space,
        accessToken: config.config.accessToken
    });

    forEach(vars, function (el) {
        var pair = el.split("=");
        if(pair[0] == 'term'){
            term = pair[1]; 
        }
    });

    client.getEntries({
        'query': term
    })
    .then((response) => {
        console.log(response.items);
        var html = '';

        response.items.forEach(function (entry) {             
            var searchResult = '<div data-id="A07" class="A07-blog-feed-tile small-12">'
                              + '<div class="bf-feature-image">'
                                + '<img src="https:' + entry.fields.featuredImage.fields.file.url + '" alt="' + entry.fields.featuredImage.fields.description + '">' 
                              + '</div>'
                              + '<div class="bf-content-overlap">'
                                + '<div class="bf-heading">'
                                  + '<h2>' + entry.fields.title + '</h2>'
                                + '</div>'
                                + '<div class="bf-desc">'
                                  + '<p>' + entry.fields.postPreview + '</p>'
                                + '</div>'
                                + '<div class="bf-button button bold"><a href="' + window.location.origin + '/blog-post.html?id=' + entry.sys.id + '">Read post</a></div>'
                              + '</div>'
                            + '</div>';

            //add the entry to the element
            html = html + searchResult;
        });

        var resultsHeading = '<h2><span class="results-num">' + response.items.length + '</span> results for "<span class="results-term">' + term + '</span>"</h2>';

        // append html snippets to search results page
        searchCont.html(html);
        $('.C14-search-results-heading').html(resultsHeading);
    })
    .catch(console.error)
  }


}

export { searchBar };