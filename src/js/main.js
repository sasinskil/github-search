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


const findRepositories = () => {
  const searchInputValue = searchInput.value;

  fetch(`https://api.github.com/users/${searchInputValue}/repos`)
  .then(resp => resp.json())
  .then(resp => {
    const repos = resp;
  
    if(repos.length > 0){
      mainHeader.classList.add('heading--hide');
      resultsContainer.classList.add('results--visible');
    }
    
    for(let repo of repos) {
      const {name, homepage} = repo;
      
      if(homepage) {
        resultsList.innerHTML += `<li class="item"><strong>Repo name</strong> ${name} <strong>Live</strong> <a class="results__link" href="${homepage}">Click!</a></li>`
    } else {
      resultsList.innerHTML += `<li class="results__item"><strong class="results__item--strong">Repo name</strong> ${name}</li>`
    }
    }
})
  .catch(err => alert(`Nie znaleziono użytkownika ${searchInputValue}, ${err}`));
  searchInput.value="";
}

searchInput.addEventListener('keyup',(e) => {
  if(e.keyCode == '13') {
    findRepositories();
  }
})

searchAgainButton.addEventListener('click', ()=> {
  mainHeader.classList.remove('heading--hide');
  resultsContainer.classList.remove('results--visible');
  resultsList.innerHTML="";
});