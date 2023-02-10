import { Notify } from 'notiflix/build/notiflix-notify-aio';

const fetchCountries = event => {
  let name = event.target.value.trim();
  const card = document.querySelector('.country-info');
  const list = document.querySelector('.country-list');
  if (name !== '') {
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
        if (data.length === 1) {
          let countryLanguages = data.flatMap(country => country.languages);
          let cardMarkup = data
            .map(country => {
              let languagesNames = countryLanguages
                .map(language => language.name)
                .join(', ');
              return `<div class="country-info__box"><img src="${country.flags.svg}" width="60" height="40" alt="Flag"></img><p>${country.name}</p></div><ul class="country-info__list"><li><b>Capital:</b> ${country.capital}</li><li><b>Population:</b> ${country.population}</li><li><b>Languages:</b> ${languagesNames}</li></ul>`;
            })
            .join('');
          list.innerHTML = '';
          card.innerHTML = cardMarkup;
        } else if (data.length >= 2 && data.length <= 10) {
          let listMarkup = data
            .map(country => {
              return `<li><img src="${country.flags.svg}" width="40" height="30" alt="Flag"></img><span>${country.name}</span></li>`;
            })
            .join('');
          card.innerHTML = '';
          list.innerHTML = listMarkup;
        } else if (data.length > 10) {
          list.innerHTML = '';
          card.innerHTML = '';
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
  if (name === '') {
    list.innerHTML = '';
    card.innerHTML = '';
  }
};

export { fetchCountries };
