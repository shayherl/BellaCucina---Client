<template>
  <b-container>
    <h3 style="font-weight: bold;">
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" :isFamilyRecipe="FamilyRecipe"/>
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
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

        const amountToFetch = 2; // Set this to how many recipes you want to fetch
        let response = {};
        if (this.kind === "regular"){
          response = mockGetRecipesPreview(amountToFetch);
          this.FamilyRecipe = false;
        }
        else if (this.kind === "family"){
          response = mockGetFamilyRecipesPreview(3);
          this.FamilyRecipe = true;
        }

        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  // margin-top: 20px;
  // margin-bottom: 20px;
  min-height: 400px;
  font-family: 'Calibri Light', 'Calibri';
}
</style>
