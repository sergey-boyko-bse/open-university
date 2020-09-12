import React from 'react'

const Persons = ({persons, deletePerson}) => {
    return (
        <div>
            {persons.map(person => 
                <div key={person.name}>
                    {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons