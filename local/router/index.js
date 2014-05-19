"use strict";

// _ , $ and Backbone
// core dependencies for the Backbone.Router,
// apart from that, we're just using plain ol JavaScript
var _ = require('underscore');
var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');

var request = require('superagent');
var Translation = require('translate');

module.exports = function(){

  /**
   * Delegate click events
   * Get the href attribute of a targer and pass to navigate()
   */
  document.body.addEventListener('click', function(e){
    var target = e.target;
    e.preventDefault();
    if (target.nodeName === "A" && target.classList.contains('js-nav-item')) {
      var path = target.getAttribute('href');
      Backbone.history.navigate(path, {trigger: true});
    }
  });

  /**
   * Backbone router
   * Based on a splat, load a page and jam it into
   */
  var Router = Backbone.Router.extend ({

    routes: {
      '*splat': 'loadPage',
    },

    // XHR request to local template
    loadPage: function(path){
      var self = this;
      var url = 'http://local.mint-sandbox.com/' + path;
      request.get(url, function(res){
        self.onLoadPageSuccess(res.text);
      });
    },

    // empty page element and repopulate
    // seems a little expensive to cache this each time
    // but ensures it's in scope
    onLoadPageSuccess: function(data){
      var page = document.querySelector('.page');
      if(page){
        page.innerHTML = data;
        new Translation();
      }
    }
  });

  var appRouted = new Router();

  // Start backbone.js
  if (!Backbone.History.started) {
    Backbone.history.start({
      silent: true
    });
  }
};