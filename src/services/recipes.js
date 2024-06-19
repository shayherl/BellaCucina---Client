// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import family_preview from "../assets/mocks/family_preview.json";

export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  if (amount <= recipe_preview.length){
    for(let i = 0; i < amount; i++){
      recipes.push(recipe_preview[i]);
    }
  }
  else{
    for(let i = 0; i < recipe_preview.length; i++){
      recipes.push(recipe_preview[i]);
    }
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
  const recipe = recipe_full_view.find(recipe => recipe.id === recipeId);
  if (!recipe) {
    return { status: 404, data: null };
  }

  return { status: 200, data: { recipe } };
}

export function mockGetFamilyRecipesPreview(amount = 3) {
  let recipes = [];
  for(let i = 0; i < amount; i++){
    recipes.push(family_preview[i]);
  }

  return { data: { recipes: recipes } };
}
