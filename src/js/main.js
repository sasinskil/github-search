"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// place your code below

const mainHeader = document.querySelector('.heading--js');
const searchInput = document.querySelector('.search__input--js');
const resultsContainer = document.querySelector('.results--js');
const resultsList = document.querySelector('.results__list--js');
const searchAgainButton = document.querySelector('.results__button--js');

