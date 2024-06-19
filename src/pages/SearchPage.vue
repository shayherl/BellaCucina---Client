<template>
  <div class="container">
    <div>
      <b-form-input v-model="searchTerm" type="search" placeholder="Search terms"></b-form-input>
    </div>      
    
    <!-- Display Last Search Term -->
    <div v-if="lastSearchTerm" class="mb-2">
      Last searched term: {{ lastSearchTerm }}
    </div>

    <div>
      <label for="howMany">Number of recipes to show:</label>
      <select id="howMany" v-model="selectedHowMany">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>

    <Filters />
    <b-button @click="search" variant="outline-dark">Search</b-button>

    <!-- Display Search Results -->
    <div v-if="showSearchResults && recipes.length > 0" class="mt-4">
      <b-container>
        <h3>
          Search results:
          <slot></slot>
        </h3>
            <!-- Add sorting option -->
        <div>
          <label for="sortBy">Sort by:</label>
          <select id="sortBy" v-model="selectedSortBy">
            <option value="">Select how to sort</option>
            <option value="readyInMinutes">Time (minutes)</option>
            <option value="aggregateLikes">Popularity (likes)</option>
          </select>
          <b-button @click="search" variant="outline-dark">Sort</b-button>
        </div>
        <b-row>
          <b-col v-for="r in recipes" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div v-else-if="showSearchResults && recipes.length === 0">
      No results found.
    </div>
  </div>
</template>

<script>
import Filters from '../components/Filters';
import { mockGetRecipesPreview } from "../services/recipes.js";
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "SearchPage",
  components: {
    Filters,
    RecipePreview
  },
  data() {
    return {
      searchTerm: "",
      lastSearchTerm: "",
      selectedHowMany: '5',
      recipes: [],
      selectedSortBy: '',
      showSearchResults: false // Initially, don't show search results
    };
  },
  methods: {
    async search() {
      // Perform search operation using searchTerm
      // For now, just updating lastSearchTerm and displaying searchResults
      this.lastSearchTerm = this.searchTerm;
      // Simulating search results retrieval
      try {
        const response = await mockGetRecipesPreview(parseInt(this.selectedHowMany));
        const recipes = response.data.recipes;
        if (this.selectedSortBy != ""){
          recipes = this.sortRecipes(recipes, this.selectedSortBy);
        }
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
      // Set showSearchResults to true to display search results
      this.showSearchResults = true;
    },
    sortRecipes(recipes, sortBy) {
      if (sortBy == "readyInMinutes"){
        return recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      }
      return recipes.sort((a, b) => a.aggregateLikes - b.aggregateLikes);
    }
    
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 100px auto;
}
div {
    margin-bottom: 10px; /* Adds space between each filter */
}
label {
  display: inline-block;
  width: 200px; /* Adjust width as needed */
}
select {
  width: 200px; /* Adjust width as needed */
}
</style>
