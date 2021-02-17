import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { Navbar, Nav, Button, FormControl, Form } from "react-bootstrap";
import "./App.css";

const App = () => {
  const APP_ID = "57981d2c";
  const APP_KEY = "e5da0598e73f8f476aeafd30b30bce1f";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <Navbar className="container">
        <Navbar.Brand href="#home">RecipeApp</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Form inline onSubmit={getSearch}>
          <FormControl
            type="text"
            className="mr-sm-2"
            value={search}
            onChange={updateSearch}
          />
          <Button variant="outline-dark" type="submit">
            Search
          </Button>
        </Form>
      </Navbar>

      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
