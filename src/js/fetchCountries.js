import { Notify } from 'notiflix/build/notiflix-notify-aio';

const fetchCountries = (event) => {
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
        console.log(data);
        if (data.length > 10) {
          Notify.info("Too many matches found. Please enter a more specific name.");
        }
        if (data.length >= 2 && data.length <= 10) {
        }
        if (data.length === 1) {

        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
};

export {fetchCountries}