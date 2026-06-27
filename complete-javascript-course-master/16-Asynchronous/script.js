'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1_000_000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getJSONResponse = function (url, errorMessage = 'Something went wrong.') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMessage} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryAndNeighbourDataWithXMLHttp = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://countries.dev/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    renderCountry(data);

    const [neighbour] = data.borders;

    if (!neighbour) return;

    const neighbourRequest = new XMLHttpRequest();
    neighbourRequest.open(
      'GET',
      `https://restcountries.com/v2/alpha/${neighbour}`,
    );
    neighbourRequest.send();

    neighbourRequest.addEventListener('load', function () {
      const neighbourData = JSON.parse(this.responseText);
      renderCountry(neighbourData, 'neighbour');
    });
  });
};

const getCountryAndNeighbourDataWithFetch = function (country) {
  fetch(`https://countries.dev/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found. (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;

      return fetch(`https://countries.dev/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found. (${response.status})`);
      }
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong 💥: ${err.message}. Try again.`);
      console.error(`${err} 💥`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const getCountryAndNeighbourDataWithErrorHandling = function (country) {
  getJSONResponse(`https://countries.dev/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found.');

      return getJSONResponse(
        `https://countries.dev/alpha/${neighbour}`,
        'Country not found',
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong 💥: ${err.message} Try again.`);
      console.error(`${err} 💥`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
//getCountryAndNeighbourDataWithXMLHttp('bulgaria');

// btn.addEventListener('click', function () {
//   // getCountryAndNeighbourDataWithFetch('bulgaria');
//   //getCountryAndNeighbourDataWithFetch('hdhdhd');  Test error
//   countriesContainer.innerHTML = '';
//   getCountryAndNeighbourDataWithErrorHandling('australia');
// });

/*
console.log('Test start')
setTimeout(() => console.log("0 seconds timer"), 0)
// Immediately resolved promise
Promise.resolve('Resolved promise 1').then((res) => console.log(res))
console.log('Test end')

// Order of execution will be:
// 1. Test start
// 2. Test end
// 3. Resolved promise 1 (micro-tasks queue has priority over callback queue)
// 4. 0 seconds timer


Promise.resolve('Resolve promise 2').then((res) => {
  // Simulate that the callback function takes a long time
  // so the micro-task takes a longer time and will delay the 0-seconds timer
  for(let i = 0; i<100000000000;i++){}
  console.log(res)})

  */

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening!');
  setTimeout(function () {
    const random = Math.random();
    // Winning the lottery means the promise resolves successfully
    if (random >= 0.5) {
      resolve('You win!');
    } else {
      reject(new Error('You lose :(.'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// ==== Promisifying setTimeout

/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds.');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second.'));

wait(1)
  .then(() => {
    console.log('1 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(err => console.error(err));


*/
// === PROMISIFYING THE GEOLOCATION API

console.log('Getting position.');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    //  navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err));

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(res => console.log(res));

const handleResponse = (url, errorMessage = '') => {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Something went wrong. ${errorMessage}.`);
    }
    return response.json();
  });
};

const reverseGeocodeLocation = (lat, lng) => {
  return handleResponse(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
    'Something went wrong during geocoding.',
  )
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return data;
    })
    .catch(err => {
      console.error(err);
    });
};

const whereAmI = () => {
  countriesContainer.innerHTML = '';
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return reverseGeocodeLocation(lat, lng);
    })
    .then(data => {
      getCountryAndNeighbourDataWithErrorHandling(
        data.countryName.toLowerCase(),
      );
    })
    .catch(err => console.error(err));

  // reverseGeocodeLocation(lat, lng)
  //   .then(data => {
  //     getCountryAndNeighbourDataWithErrorHandling(
  //       data.countryName.toLowerCase(),
  //     );
  //   })
  //   .catch(err => console.error(err));
};

// btn.addEventListener('click', whereAmI);

const whereAmIAsync = async function (country) {
  try {
    countriesContainer.innerHTML = '';

    const countryResult = await fetch(`https://countries.dev/name/${country}`);

    if (!countryResult.ok) {
      throw new Error('Problem getting country data');
    }

    const data = await countryResult.json();

    renderCountry(data[0]);

    return `Country data derived: ${JSON.stringify(data[0])}`;
  } catch (error) {
    console.error(`Ran into an error: ${error}`);

    // Reject promise returned from async function
    throw error;
  }
};

whereAmIAsync('bulgaria')
  .then(data => console.log({ data }))
  .catch(err => console.error(`Error encountered in whereAmIAsync: ${error}`));

(async function () {
  try {
    const data = await whereAmIAsync('bulgaria');
    console.log({ data });
  } catch (error) {
    console.error(`Error encountered: ${error}`);
  }
})();

// Parallel promises
const get3Countries = async function (c1, c2, c3) {
  try {
    // Individual promises
    // const [data1] = await getJSONResponse(
    //   `https://www.apicountries.com/name/${c1}`,
    // );
    // const [data2] = await getJSONResponse(
    //   `https://www.apicountries.com/name/${c2}`,
    // );
    // const [data3] = await getJSONResponse(
    //   `https://www.apicountries.com/name/${c3}`,
    // );

    // If one promise rejects, Promise.all rejects
    const data = await Promise.all([
      getJSONResponse(`https://countries.dev/name/${c1}`),
      getJSONResponse(`https://countries.dev/name/${c2}`),
      getJSONResponse(`https://countries.dev/name/${c3}`),
    ]);

    console.log(
      `Countries data: ${JSON.stringify(
        data.map(c => {
          return { name: c[0].name, capital: c[0].capital };
        }),
      )}`,
    );
    // console.log(`${data1.capital},${data2.capital}, ${data3.capital} `);
  } catch (error) {
    console.error(error);
  }
};

get3Countries('bulgaria', 'portugal', 'canada');

// Promise.race - settles as soon as one of the promises is settled (no matter if fulfilled or rejected)

(async function () {
  const res = await Promise.race([
    getJSONResponse(`https://countries.dev/name/italy`),
    getJSONResponse(`https://countries.dev/name/egypt`),
    getJSONResponse(`https://countries.dev/name/portugal`),
  ]);

  console.log(res[0]);
});

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

Promise.race([getJSONResponse(`https://countries.dev/name/italy`), timeout()])
  .then(res => console.log({ res }))
  .catch(err => console.error(err));

// Never short-circuits, returns all results of all promises
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
])
  // result included the rejected promise
  .then(res => console.log(`Promise.allSettled result: ${JSON.stringify(res)}`))
  .catch(err => console.error(err));

// Will short-circuit if there is a rejected promise
Promise.all([
  Promise.resolve('Success'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
])
  .then(res => console.log(`Promise all result: ${JSON.stringify(res)}`))
  .catch(err => console.error(`Promise all error: ${err}`));

// Returns the first fulfilled promise, ignores rejected promises unless all the promises reject
Promise.any([
  Promise.resolve('Success'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
])
  .then(res => console.log(`Promise any result: ${JSON.stringify(res)}`))
  .catch(err => console.error(`Promise any error: ${err}`));
