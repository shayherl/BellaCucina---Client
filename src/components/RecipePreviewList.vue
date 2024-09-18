<template>
  <b-container>
    <h3 style="font-weight: bold;">
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" :isFamilyRecipe="FamilyRecipe"  :isMyRecipe="MyRecipe"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";
import { mockGetFamilyRecipesPreview } from "../services/recipes.js";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    kind: {
      type: String,
      required: true
    },
    FamilyRecipe:{
      type: Boolean,
      default: false
    },
    MyRecipe:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {

        // const amountToFetch = 2; // Set this to how many recipes you want to fetch
        let response = {};
        if (this.kind === "random"){
          // response = mockGetRecipesPreview(amountToFetch);
          response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          );
          this.FamilyRecipe = false;
          this.MyRecipe = false;
        }
        else if (this.kind === "family"){
          response = mockGetFamilyRecipesPreview(3);
          this.FamilyRecipe = true;
          this.MyRecipe = false;
        }
        else if (this.kind === "favorite"){
          response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites",
          );
          this.FamilyRecipe = false;
          this.MyRecipe = false;
        }
        else if (this.kind === "my"){
          response = await this.axios.get(
          this.$root.store.server_domain + "/users/AllMyRecipes",
          );
          this.FamilyRecipe = false;
          this.MyRecipe = true;
        }
        let recipe = [];
        if (this.FamilyRecipe){
          recipe = response.data.recipes;
        }
        else{
          recipe = response.data;
        }
        console.log(recipe);
        this.recipes = [];
        this.recipes.push(...recipe);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
  // margin-bottom: 20px; 
  // padding: 10px;
  min-height: 400px;
  font-family: 'Calibri Light', 'Calibri';
}
</style>
