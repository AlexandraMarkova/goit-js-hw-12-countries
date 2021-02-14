import articlesTpl from '../templates/country.hbs';
import article from '../templates/the-country.hbs';
const debounce = require('lodash.debounce');

import {error} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';


const refs = {
  inputRef: document.getElementById('name-input'),
  captionRef: document.querySelector('.js-data'),
};


refs.inputRef.addEventListener('input', debounce(event => {
    const nameCountry = event.target.value;
      
    fetchCountries(nameCountry);
}, 500));


function fetchCountries(searchQuery) {

refs.captionRef.innerHTML = '';
fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
  .then(response => response.json())
  .then(res => updateData(res))
};

function updateData(data) {
if (data.length >= 10) {
  const myError = error({
    text: 'Too many matches found.Please enter a more specific query!',
  });
} else if (data.length >= 2 && data.length <= 10) {
  const markup = articlesTpl(data);
  refs.captionRef.insertAdjacentHTML('beforeend', markup);
} else if ((data.length = 1)) {
  const markup = article(data);
  refs.captionRef.insertAdjacentHTML('beforeend', markup);
}
 }
    
export default fetchCountries;