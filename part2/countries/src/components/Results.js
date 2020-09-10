import React from 'react'
import TooManyMatches from './TooManyMatches'
import CountryDetails from './CountryDetails'
import CountryList from './CountryList'
import Weather from './Weather'

const Results = ({results, handleShowDetailsClick}) => {
    if(results.length > 10) {
        return <TooManyMatches />
    }

    if(results.length === 1) {
        const country = results[0]
        return (
            <div>
                <CountryDetails country={country} />
                <Weather country={country} />
            </div>
        )
    }

    return (
        <CountryList countries={results} handleShowDetailsClick={handleShowDetailsClick} />
    )
}

export default Results