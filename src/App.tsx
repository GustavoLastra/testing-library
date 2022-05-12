import React, { useState} from 'react';
import './App.css';
import CocktailService from "./CocktailService";
import {Drink} from "./types/CocktailTypes";
import {CocktailList} from "./CocktailList";

function App() {
  const [areTequilasFetched, setAreTequilasFetched] = useState(false)
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const cocktailService = new CocktailService();
    const buttonText = areTequilasFetched ? 'Loaded' : 'Load Tequila Cocktails'

    const fetchTequilaCocktails= () => {
        cocktailService.findByName('Tequila').then((drinks) => {
            setDrinks(drinks)
            setAreTequilasFetched(true)
        });
    }

  return (
    <div className="App">
        <button onClick={() => fetchTequilaCocktails()} disabled={areTequilasFetched}>
          {buttonText}
        </button>
        {drinks && <CocktailList drinks={drinks}/>}
    </div>
  );
}

export default App;
