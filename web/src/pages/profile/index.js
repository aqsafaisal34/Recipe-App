import { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "../../components/recipe";
import '../../components/style.css'



function Profile() {
  const App_ID = "459f13aa";
  const APP_KEY = "fb8068e6893875303b111972a17e356e";
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipies();
  }, [query]);

  const getRecipies = async () => {

    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app =http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_0123456789abcdef0123456789abcdef&app_id=${App_ID}&app_key=${APP_KEY}`
    );

    console.log(response.data.hits);
    setData(response.data.hits);


  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      
    
      <div className="recipe">
        {data.map((eachRecipe, index) => (
          <Recipe
            key={index}
            title={eachRecipe.recipe.label}
            calories={eachRecipe.recipe.calories}
            image={eachRecipe.recipe.image}
            ingredients={eachRecipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;