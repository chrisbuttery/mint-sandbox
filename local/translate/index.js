"use strict";

var reactive = require('reactive');
var template = require('./template.html');
var Emitter = require('emitter');
var request = require('superagent');
var domify = require('domify');

/**
 * Make a reactive view
 * On change of language, re-render its contents
 * @param {String} lang
 */
function ArticleView() {
  var self = this;

  if (self.bindings) {
    self.bindings.set({});
  }

  var tmpl = document.querySelector('.translatable');
  if (tmpl){
    var parentNode = tmpl.parentNode;
    parentNode.removeChild(tmpl);
  }

  // make sure template is converted to dom els
  // I think this will be removed
  this.el = tmpl.cloneNode(true);

  // Set the language and pass through callback
  // On response, parse data and create binding and append template
  this.getLanguage(function(data){
    self.data = JSON.parse(data);
    self.bindings = reactive(self.el, self.data);
    parentNode.appendChild(self.bindings.el);
  });
}

/**
 * Load a language json file
 * @param {Function} fn   [callback]
 */

ArticleView.prototype.getLanguage = function(callback){
  var self = this;
  var url = self.buildURL();
  if (url){
    request.get(url, function(res){
      callback(res.text);
    });
  }
};


/**
 * a base URL for accessing the language files (accesses global language selection)
 * @return {String}
 */

ArticleView.prototype.buildURL = function(){
  return "http://local.mint-sandbox.com/langs/" + window.language + ".json";
};

module.exports = ArticleView;