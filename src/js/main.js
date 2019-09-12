"use strict";

const mainHeader = document.querySelector('.heading--js');
const searchInput = document.querySelector('.search__input--js');
const resultsContainer = document.querySelector('.results--js');
const resultsList = document.querySelector('.results__list--js');
const searchAgainButton = document.querySelector('.results__button--js');
const loadingSpinner = document.querySelector('.lds-dual-ring--js');


const findRepositories = () => {

  mainHeader.classList.add('heading--hide');
  loadingSpinner.classList.add('lds-dual-ring--visible');

  const searchInputValue = searchInput.value;

  fetch(`https://api.github.com/users/${searchInputValue}/repos?sort=created&direction=desc`)
    .then(resp => resp.json())
    .then(resp => {
      loadingSpinner.classList.remove('lds-dual-ring--visible');
      const repos = resp;

      if (repos.length > 0) {
        resultsContainer.classList.add('results--visible');
      } else {
        loadingSpinner.classList.remove('lds-dual-ring--visible');
        mainHeader.classList.remove('heading--hide');
      }

      for (let repo of repos) {
        const { name, homepage } = repo;

        if (homepage) {
          resultsList.innerHTML += `<li class="results__item"><strong class="results__item--strong">Repo name</strong> ${name} <strong>Live</strong> <a class="results__link" href="${homepage}">Click!</a></li>`
        } else {
          resultsList.innerHTML += `<li class="results__item"><strong class="results__item--strong">Repo name</strong> ${name}</li>`
        }
      }
    })
    .catch(err => alert(`User not found ${searchInputValue}, ${err}`));
  searchInput.value = "";
}

searchInput.addEventListener('keyup', (e) => {
  if (e.keyCode == '13') {
    findRepositories();
  }
})

searchAgainButton.addEventListener('click', () => {
  mainHeader.classList.remove('heading--hide');
  resultsContainer.classList.remove('results--visible');
  resultsList.innerHTML = "";
});