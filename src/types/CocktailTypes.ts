export interface DrinkShort {
  id: string;
  name: string;
  thumbnail: string;
}

export interface Drink extends DrinkShort {
  instructions: string;
  category: string;
  tags: string[];
  isAlcoholic: boolean;
  ingredients: Ingredient[];
  image?: string;
  video?: string;
  translatitions: {
    name: Translations;
    instructions: Translations;
  };
  modified?: Date;
}

export interface Ingredient {
  ingredient: string;
  measure?: string;
}

export interface Translations {
  DE?: string;
  ES?: string;
  FR?: string;
  ZH_HANS?: string;
  ZH_HANT?: string;
}

type ALCOHOLIC_TYPE = "Alcoholic" | "Non alcoholic";
export interface CocktailDBResponseDrinkDetails extends CocktailDBResponseDrinkShort {
  strDrinkAlternate: string | null;
  strDrinkES: string | null;
  strDrinkDE: string | null;
  strDrinkFR: string | null;
  "strDrinkZH-HANS": string | null;
  "strDrinkZH-HANT": string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: ALCOHOLIC_TYPE;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  "strInstructionsZH-HANS": string | null;
  "strInstructionsZH-HANT": string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: "Yes" | "No";
  dateModified: string | null;
  // strIngredient1..15 && strMeasure1..15
  [key: string]: string | null;
}

export interface CocktailDBResponseDrinkShort {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CocktailDBResponse<T extends CocktailDBResponseDrinkShort> {
  drinks: null | T[];
}
