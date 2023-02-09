import { Notify } from 'notiflix/build/notiflix-notify-aio';

const fetchCountries = event => {
  let name = event.target.value.trim();
  console.log(name);
  if (!(name === '')) {
    return fetch(
      `https://restcountries.com/v2/name/${name}?fields=name,capital,population,languages,flags`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        const card = document.querySelector('.country-info');
        const list = document.querySelector('.country-list');
        if (data.length === 1) {
          let countryLanguages = data.flatMap(country => country.languages);
          let cardMarkup = data
            .map(country => {
              let languagesNames = countryLanguages.map(language => language.name).join(', ');
              return `<p class="country-info__name"><img src="${country.flags.svg}" width="60" height="50" alt="Flag"></img>${country.name}</p><ul class="country-info__list"><li class="country-info__item"><span class="title">Capital:</span>${country.capital}</li><li class="country-info__item"><span>Population:</span>${country.population}</li><li class="country-info__item"><span>Languages:</span>${languagesNames}</li></ul>`;
            })
            .join('');
          list.innerHTML = "";
          card.innerHTML = cardMarkup;
        } else if (data.length >= 2 && data.length <= 10) {
          let listMarkup = data
            .map(country => {
              return `<li class="country-list__item"><img src="${country.flags.svg}" width="40" height="30" alt="Flag"></img><span class="country-list__name">${country.name}</span></li>`;
            })
            .join('');
          card.innerHTML = "";
          list.innerHTML = listMarkup;
        } else if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      })
  }
};

export { fetchCountries };

