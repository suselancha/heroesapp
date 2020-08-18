import React, { useMemo } from 'react';

import queryString from  'query-string';

import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    //console.log(location.search);
    //console.log( queryString.parse( location.search ));
    const { q='' } = queryString.parse( location.search );// = '' para que no de undefined cuando search no tenga valo
    //console.log(q);

    const [ formValues, handleInputChange ] = useForm({
        searchText: q
    });

    const { searchText } = formValues;

    const heroesFilted = useMemo(() => getHeroesByName( q ), [q])
    //const heroesFilted =  getHeroesByName( searchText );

    const handleSearch = (e) => {
        e.preventDefault();
        //console.log( searchText );
        history.push(`?q=${ searchText }`);//Uso de query string
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr />
                    <form onSubmit={ handleSearch }>  
                        <input
                            type="text"
                            placeholder="Fin your hero"
                            className="for-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />  

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search
                        </button>  
                    </form>  
                </div>

                <div className="col-7">
                    <h4> Results </h4>
                    <hr />

                    {
                        (q ==='') && 
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    {
                        (q !=='' && heroesFilted.length === 0) && 
                            <div className="alert alert-danger">
                                There is no a hero with { q }
                            </div>
                    }

                    {
                        heroesFilted.map( hero => (
                            <HeroCard
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
