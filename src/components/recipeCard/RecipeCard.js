import React from 'react';
import './recipeCard.css';

function RecipeCard(props) {


    function handleClick() {
        props.onRemove(props.id)
    }

    return (
        <div className='card-container'>
            <div className='card'>
                <div className='card-items'>
                     <h1 className='text-header'>{props.title}</h1>
                     <label className='text-input'>Ingredints:<p>{props.ingredints}</p></label>
                     
                     <label className='text-input'>Process:<p className='text'>{props.process}</p></label>
                    
                     <button className='btn-delete' onClick={handleClick} >Delete</button>     
                </div>
            </div>
        </div>
    )
}

export default RecipeCard
