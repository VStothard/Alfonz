import { Component } from '../classes/component';
import $ from 'jquery';
import forEach from 'lodash/forEach';

var contentful = require('contentful');
var config = require('config');

/**
 *
 *
 * @class categoryFeed
 * @extends {Component}
 */
class categoryFeed extends Component {

    /**
     * Creates an instance of categoryFeed.
     *
     * @memberof categoryFeed
     */
    constructor() {
    super('C18'); //super not working currently

    //check if element exists on the page
    const dataID = 'C18';
    const self = this;
    $("div[data-id]").each(function() {
            // if exists, execute categoryFeed
            if ($(this).data("id") === dataID) {
                console.log('running search for category posts');
                self.checkURL();
            }
        });
    }

    checkURL() {
        var query = window.location.search.substring(1);
        var page = '';
        var tag = '';
        var vars = query.split("&");

        forEach(vars, function (el) {
            var pair = el.split("=");

            if(pair[0] == 'page'){
                page = Number(pair[1]); //convert result to a number
            }

            if(pair[0] == 'tag'){
                tag = pair[1].toLowerCase(); //convert result to a number
            }
        });

        categoryFeed.getPosts(tag, page);
    }

    static getPosts(tag, page) {
        console.log('getPosts running');
        var totalPosts;
        var numPages; // create var for the total number of pages
        const perPage = 1; //limit number of posts per page
        var toSkip = page * perPage; //calculate what post to load from

        const client = contentful.createClient({
            space: config.config.space,
            accessToken: config.config.accessToken
        });

        client.getEntries({
            'content_type' : '2wKn6yEnZewu2SCCkus4as',
            'fields.tags': tag
        })
        .then((response) => {
            var Response = response.items;

            const feedCont = $('#category-feed-cont');

            //create the element you will be plugging into the category feed container
            var html = '';

            Response.forEach(function (entry) {
                var postURL = window.location.origin + '/blog-post.html?id=' + entry.sys.id;

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
                                    + '<p>' + entry.fields.postPreview + '</p>'
                                    + '</div>'
                                    + '<div class="bf-button button bold"><a href="' + postURL + '">Read post</a></div>'
                                + '</div>'
                                + '</div>';
                
                //add the entry to the element
                html = html + blogTile;
            });

            // replace html with the created blog tiles to display 
            feedCont.html(html); 
            

        })
        .catch(console.error)
    }
}


export { categoryFeed };