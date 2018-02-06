import { Component } from '../classes/component';
import $ from 'jquery';
import forEach from 'lodash/forEach';
import times from 'lodash/times';

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

        //contentful initialisation 
        var client = contentful.createClient({
            space: config.config.space,
            accessToken: config.config.accessToken
        });

        //check if element exists on the page
        const dataID = 'C18';
        const self = this;
        $("div[data-id]").each(function() {
            // if exists, execute categoryFeed
            if ($(this).data("id") === dataID) {
                self.urlData(client);
            }


        });

    }

    urlData(client) {
        // on page load check URL for page=X and tag=X
        var query = window.location.search.substring(1);
        var page;
        var tag;
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

        if (page == undefined) {
            page = 0;
        }

        categoryFeed.postData(client, page, tag);

    }

    static postData(client, page, tag) {
        var currentPage = page;
        var totalPosts;
        var perPage = 10;
        var numPages;
        
        client.getEntries({
            'content_type' : '2wKn6yEnZewu2SCCkus4as',
            'fields.tags': tag
        }).then((response) => {
            totalPosts = response.items.length;
            numPages = Math.round(totalPosts/perPage);

            categoryFeed.pagination(currentPage, numPages, tag);
            categoryFeed.createPosts(client, tag, perPage, currentPage);
        })
        .catch(console.error);
    }

    static pagination(currentPage, numPages, tag) {
        var html = '';
        var pagination = $('.pagination');

        times(numPages, (page) => {
            if (page == currentPage) {
               var createItem = '<li><a class="active" href="' + window.location.origin + '/category.html?tag=' + tag + '&page=' + (page) + '">' + (page + 1) + '</a></li>';
            } else {
               var createItem = '<li><a href="' + window.location.origin + '/category.html?tag=' + tag + '&page=' + (page) + '">' + (page + 1) + '</a></li>';
            }
            
            html = html + createItem;
        });

        pagination.html(html);
    }

    static createPosts(client, tag, perPage, currentPage) {
        client.getEntries({
            limit : perPage,
            skip : perPage * currentPage,
            'content_type' : '2wKn6yEnZewu2SCCkus4as',
            'fields.tags': tag
        }).then((response) => {
            const feedCont = $('#category-feed-cont');
            const headingCont = $('#category-heading-cont');

            //create the element you will be plugging into the blog feed container
            var html = '';
            var heading = '<h2>"'+ tag.toUpperCase() +'"</h2>'

            response.items.forEach(function (entry) {
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
            headingCont.html(heading);
        })
        .catch(console.error);
    }


}


export { categoryFeed };