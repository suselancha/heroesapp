import React, { useMemo } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';


export const HeroScreen = ({ history }) => {

    //Uso de hooks de router para obtener parametros por Url
    //const params = useParams();
    //console.log(params);

    const { heroeId } = useParams();
    console.log(heroeId);

    //Forma comun
    //const hero = getHeroById( heroeId );
    //console.log(hero);

    //Forma optimizada, mientras no haya cambio no se ejecuta
    const hero = useMemo(() => getHeroById( heroeId ), [ heroeId ]);


    //Valido que el id exista y me traiga info
    if (!hero) {
        return <Redirect to="/" />
    }

    //Valido que si habro el navegador con el parametro y vuelvo atras, visualice algo
    const handleReturn = () => {
        if ( history.length <= 2 ) {
            history.push('/');
        } else {
            history.goBack();
        }
        
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={ `../assets/heroes/${ heroeId }.jpg` }
                    alt= { superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego: </b>{ alter_ego }</li>
                    <li className="list-group-item"> <b> Publisher: </b>{ publisher }</li>
                    <li className="list-group-item"> <b> First appearence: </b>{ first_appearance }</li>
                </ul>

                <h5> Characters </h5>
                <p>{ characters }</p>

                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn }    
                >
                    Return
                </button>
            </div>
        </div>
    )
}
