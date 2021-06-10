// import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

const App = () => {
    /**
     * React Hook:
     * query -> piece of data that will be updated
     * setQuery -> action to update the query
     * default value -> empty string
     */

    // 1
    const [query, setQuery] = useState("");
    // 2
    const [recipes, setRecipes] = useState([]);
    // 3
    const [alert, setAlert] = useState("");

    const APP_ID = "a06ea549";
    const APP_KEY = "cdafdd679bd4cdee3dcbc05b96cf3725";
    // if change q=pizza -> search default value of pizza
    // is now default with chicken
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

    const getData = async () => {
        if (query !== "") {
            const result = await axios.get(url);
            // more is the data property
            if (!result.data.more) {
                return setAlert("No food with such name");
            }
            console.log(result); // entire Object
            // get access to the hits array that contains the recipe (array of nested objects)
            setRecipes(result.data.hits);
            // empty search bar after searching
            setQuery("");
            // if search an existing name, alert will be gone!
            setAlert("");
        } else {
            setAlert("Please fill the form");
        }
    };

    // action with the input value
    const onChange = (e) => {
        setQuery(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getData();
    };

    return (
        <div className="App">
            <h1>Food Searching App</h1>
            <form className="search-form" onSubmit={onSubmit}>
                {alert !== "" && <Alert alert={alert} />}
                <input
                    type="text"
                    name="query"
                    onChange={onChange}
                    value={query}
                    autoComplete="off"
                    placeholder="Search Food"
                />
                <input type="submit" value="Search" />
            </form>
            <div className="recipes">
                {/* {recipe.recipe.label} */}
                {recipes !== [] &&
                    recipes.map((recipe) => (
                        <Recipe recipe={recipe} key={uuidv4()} />
                    ))}
            </div>
        </div>
    );
};

export default App;























// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
