var contentful = require('contentful');
import $ from 'jquery';
import whatInput from 'what-input';
//var config = require('config'); -- this works
//console.log(config.config.example);
var config = require('config');

console.log(config.config.example);

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

//contentful initialisation 
var client = contentful.createClient({
  space: config.config.space,
  accessToken: config.config.accessToken
});

client.getEntries()
.then(function (entries) {
  // log the title for all the entries that have it
  entries.items.forEach(function (entry) {
    if(entry.fields.productName) {
      console.log(entry.fields.productName)
    }
  })
});

console.log('TEST', 2000);