import './css/styles.css';
import {fetchCountries} from './js/fetchCountries.js';
import debounce from 'lodash.debounce';

const searchBox = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener(
  'input',
  debounce(fetchCountries, [(wait = DEBOUNCE_DELAY)])
);