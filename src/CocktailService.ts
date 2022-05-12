import {
  CocktailDBResponse,
  CocktailDBResponseDrinkDetails,
  CocktailDBResponseDrinkShort,
  Drink,
  DrinkShort,
  Ingredient,
  Translations,
} from "./types/CocktailTypes";


export const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

class CocktailService {
  public findByName = async (name: string): Promise<Drink[]> => {
    const drinksResponse: CocktailDBResponse<CocktailDBResponseDrinkDetails> | null = await fetch(
      `${BASE_URL}/search.php?s=${name}`
    ).then(this.toJson);
    if (!drinksResponse || !drinksResponse.drinks) {
      return [];
    }
    return drinksResponse.drinks.map(this.mapDrink);
  };

  public findById = async (id: string): Promise<Drink | null> => {
    const drinksResponse: CocktailDBResponse<CocktailDBResponseDrinkDetails> | null = await fetch(
      `${BASE_URL}/lookup.php?i=${id}`
    ).then(this.toJson);
    if (!drinksResponse || !drinksResponse.drinks || drinksResponse.drinks.length === 0) {
      return null;
    }
    return this.mapDrink(drinksResponse.drinks[0]);
  };

  private toJson = (response?: Response): Promise<CocktailDBResponse<CocktailDBResponseDrinkDetails> | null> => {
    if (!response) {
      return Promise.resolve(null);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.toLowerCase().startsWith("application/json")) {
      return response.json();
    }

    return Promise.resolve(null);
  };

  private mapDrinkShort = (src: CocktailDBResponseDrinkShort): DrinkShort => {
    return {
      id: src.idDrink,
      name: src.strDrink,
      thumbnail: src.strDrinkThumb + "/preview",
    };
  };

  private mapDrink = (src: CocktailDBResponseDrinkDetails): Drink => {
    return {
      ...this.mapDrinkShort(src),
      thumbnail: src.strDrinkThumb,
      instructions: src.strInstructions,
      category: src.strCategory,
      tags: (src.strTags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => !!tag),
      isAlcoholic: src.strAlcoholic === "Alcoholic",
      ingredients: this.extractIngredients(src),
      image: src.strImageSource || undefined,
      video: src.strVideo || undefined,
      translatitions: {
        name: this.getTranslations(
          src.strDrinkDE || undefined,
          src.strDrinkES || undefined,
          src.strDrinkFR || undefined,
          src["strDrinkZH-HANS"] || undefined,
          src["strDrinkZH-HANT"] || undefined
        ),
        instructions: this.getTranslations(
          src.strInstructionsDE || undefined,
          src.strInstructionsES || undefined,
          src.strInstructionsFR || undefined,
          src["strInstructionsZH-HANS"] || undefined,
          src["strInstructionsZH-HANT"] || undefined
        ),
      },
      modified: src.dateModified ? new Date(src.dateModified) : undefined,
    };
  };

  private extractIngredients = (src: CocktailDBResponseDrinkDetails): Ingredient[] => {
    let result: Ingredient[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = src[`strIngredient${i}`];
      const measure = src[`strMeasure${i}`] || undefined;

      if (ingredient) {
        result = [...result, {ingredient, measure}];
      }
    }

    return result;
  };

  private getTranslations = (
    DE?: string,
    ES?: string,
    FR?: string,
    ZH_HANS?: string,
    ZH_HANT?: string
  ): Translations => ({
    DE,
    ES,
    FR,
    ZH_HANS,
    ZH_HANT,
  });
}

export default CocktailService;
