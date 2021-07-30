import React, {useState} from 'react';
import './CreateArea.css';


function CreateArea(props) {

    const [Expanded, setExpanded] = useState(false);

    const [recipe, setRecipe] = useState({
        title: '',
        ingredints: '',
        process: ''
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setRecipe(prevRecipe => {
            return{
            ...prevRecipe,
            [name]: value
        }
        });
    }

    function Submit(event) {
        props.onAdd(recipe);
        event.preventDefault();
        console.log(recipe);
        
        setRecipe({
            title: '',
            ingredints: '',
            process: ''
        });
    }

    function expand() {
        setExpanded(true);
    }

    return (
        <div className='container'>
            <from className='create-form'>
                <input 
                    type='text'
                    onClick={expand} 
                    onChange={handleChange} 
                    name='title' id='title' 
                    value={recipe.title} 
                    placeholder='Title...'
                    rows={Expanded ? 3:1} /> 
                
             {  Expanded ? <input 
                    type='text' 
                    onChange={handleChange} 
                    name='ingredints' 
                    id='ingredints' 
                    value={recipe.ingredints} 
                    placeholder='Add Ingredints...'
                /> : null
             }
                { Expanded ?<textarea 
                    type='text' 
                    onChange={handleChange} 
                    name='process' id='process' 
                    value={recipe.process} 
                    placeholder='Add Process...'
                /> : null
                }

                {Expanded ? <button 
                     className='btn-add' 
                     onClick={Submit}>ADD</button>
                 : null
                 }
               

                
            </from>

        </div>
        
    );
}

export default CreateArea
