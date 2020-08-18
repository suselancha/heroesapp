import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    //Forma comun
    //const heroes = getHeroesByPublisher( publisher );

    //Forma optimizada, mientras no haya cambio no se ejecuta
    const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ]);
    

    return (
        <div className="card-columns">
            {
                heroes.map( hero => (
                    <HeroCard
                        key={ hero.id}
                        { ...hero } //Extrae cada una de las propiedades
                    />
                ))

            }

        </div>
    )
}
