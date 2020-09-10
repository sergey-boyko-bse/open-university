import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ keyword, setKeyword ] = useState('')

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value.toLowerCase())
    const copy = [...countries]
    copy.forEach(country => country.showDetails = false)
    setCountries(copy)
  }
  
  const results = keyword ? countries.filter(country => country.name.toLowerCase().indexOf(keyword) > -1) : countries

  const handleShowDetailsClick = (name) => {
    const copy = [...countries]
    const selectedCountry = copy.find(country => country.name === name)
    selectedCountry.showDetails = !selectedCountry.showDetails
    setCountries(copy)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data.map(country => {return {...country, showDetails: false }}))
      })
  }, [])

  return (
    <div>
      <Search handleKeywordChange={handleKeywordChange} />
      <Results results={results} handleShowDetailsClick={handleShowDetailsClick} />
    </div>
  );
}

export default App;
