import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import RecipeCard from "./components/recipeCard/RecipeCard";
import CreateArea from "./components/recipeForm/CreateArea";

function App() {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    console.log("RENDERING DATA", userRecipes);
  }, [userRecipes]);

  const filterDataHandler = useCallback((filteredData) => {
    setUserRecipes(filteredData);
  }, []);

  //Adding new Recipe data on server...
  function addChangeHandler(ingredints) {
    fetch(process.env.FIREBASE_DB, {
      method: "POST",
      body: JSON.stringify(ingredints),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserRecipes((prevRecipe) => [
          ...prevRecipe,
          { id: responseData.name, ...ingredints },
        ]);
      });

    console.log(ingredints);
  }

  function removeRecipe(id) {
    fetch(process.env.FIREBASE_DB_REMOVE, {
      method: "DELETE",
    }).then((response) => {
      setUserRecipes((prevRecipe) => {
        return prevRecipe.filter((recipeItem, index) => {
          return recipeItem.id !== id;
        }); //filter
      }); //setstate
    }); //response

    console.log("removeRecipe triggered");
  }

  return (
    <>
      <Header onLoadedData={filterDataHandler} />
      <CreateArea onAdd={addChangeHandler} />
      {userRecipes.map((recipeItem, index) => (
        <RecipeCard
          key={index}
          id={recipeItem.id}
          title={recipeItem.title}
          ingredints={recipeItem.ingredints}
          process={recipeItem.process}
          onRemove={removeRecipe}
        />
      ))}
    </>
  );
}

export default App;
