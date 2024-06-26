const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')

let allCountriesData

fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
    
  })

filterByRegion.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {
   countriesContainer.innerHTML = ''
  // data.forEach((country) => {
  //   const sortedCountries = data.sort((a, b) =>
  //   a.name.common.localeCompare(b.name.common)
  // );
  // sortedCountries.forEach((country) => {
    
    const sortedCountries = data.slice().sort((a, b) => a.name.common.localeCompare(b.name.common));

sortedCountries.forEach((country) => {
  // Render country cards here
//Here we sort over countries 
//
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                'en-IN'
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
       countriesContainer.append(countryCard)
   
    
      });
    }



searchInput.addEventListener('input',  (e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)
})

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})


// const cardImg = document.createElement('img')
// // cardImg.src ="https://flagcdn.com/er.svg"
// // countryCard.append(cardImg)
// // console.dir(countryCard)
// // console.log(cardImg)


// console.log(countryCard)