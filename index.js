"use strict";

var router = require('router')();
var Translation = require('translate');
var body = document.body;

window.language = "ch";

body.addEventListener('click', function(e){
  var target = e.target;
  if (target.classList.contains('js-getLanguage')){
    var lang = window.language = target.getAttribute('lang');
    new Translation(lang);
  }
});

new Translation();