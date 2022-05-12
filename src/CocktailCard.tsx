import React from "react";
import {Drink} from "./types/CocktailTypes";

export interface CocktailDetailsProps {
  drink: Drink;
}

export const CocktailCard = ({drink}: CocktailDetailsProps) => {
  return (
    <>
        <article className="cocktail-card">
          <img className="cocktail-image" src={drink.thumbnail} alt={drink.name} />
          <div className="cocktail-details">
            <div className="cocktail-title">
              <h2>{drink.name}</h2>
              <div>{"(" + drink.category + ")"}</div>
            </div>
            <h3>Zutaten</h3>
            <ul>
              {drink.ingredients.map((ingredient, idx) => (
                <li key={idx}>{`${ingredient.measure} - ${ingredient.ingredient}`}</li>
              ))}
            </ul>
            <h3>Zubereitung</h3>
            <p>{drink.instructions}</p>
          </div>
        </article>
    </>
  );
};
