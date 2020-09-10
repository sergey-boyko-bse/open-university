import React from 'react'
import CountryDetails from './CountryDetails'

const CountryList = ({countries, handleShowDetailsClick}) => {    
    return (
        <div>
            {countries.map(country => 
                <div key={country.name}>
                    {country.showDetails 
                        ? <CountryDetails country={country} /> 
                        : <div><span>{country.name}</span><button onClick={() => handleShowDetailsClick(country.name)}>'Show'</button></div>
                    }
                </div>
            )}
        </div>
    )
}

export default CountryList