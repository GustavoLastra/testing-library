import React from "react";
import {CocktailCard} from "./CocktailCard";
import {Drink} from "./types/CocktailTypes";

interface CocktailListProps {
  drinks: Drink[]
}

export const CocktailList = ({drinks}: CocktailListProps) => {

  return (
    <>
          {drinks.map((drink) => (
              <CocktailCard key={drink.id} drink={drink}/>
          ))}
    </>
  );
};
