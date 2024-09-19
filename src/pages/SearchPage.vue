<template>
  <div class="container">
    <h1 class="title">Discover Delicious Recipes to Inspire Your Next Meal <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJ0lEQVR4nNWWS0iWQRSGn1JTI7wUkVZ0EWvRhWpZRJlBm1KyXTdq1aJdFhFtoqhN2g8SBEKEhQVdFl3MalEWmBgYGHSTilp0gUi7aKVRFgfeT6Zpvt9LLuqF4Z9/5pvzzpx5zzkD/wEygVKgEjgJ3FKzfgVQom+GDYVALfAZeAecFvk2NeufAdqBLuAEUPA3hBlAFdADnAeWAilJvk8FioALWpMA0gdLmg80Aw+ARUPY9GLgEdAE5A2G9AVwGchi6MgG6mUrbyDubRZp5FYTz8+Ydljf7NG6+Z69FJE39ef2KrnXPelLoBx4COxXs/4+oFXfVANfJcAVns0cud3uPFa9Pd6dmgd6gdlAC7BFrUVC+uQQH9XvB2CSZ3uJbAfVXiv1upgml+YHiAs1lynCaim7VZ7zcVGh9hsy5SYLGRezZHxMgDhXc1MdYsNa4DUw0rO1THFuXuxDqZKD7djFXBlPk0hWA2US3yjNzfGI8zQ+2bOVqiSzyh2sVEbyYaf6AcwIzM3UXK5HPNrZkI+zwEF34JTybQiXdEJzN45xu7M6/XeJ50mQYwO2KhWefbipkAlhInAPeAZMV3sC3HfU6xLvBe7E2CoHGtyBhiTEKPgbgQNqjZ5IImLzyltgfYyd7T5xMldHMLJdwG6VQwLEZvhpQKSxrq5QaUt24m6gWJnpi5TuE19XZovDOV9cJZJ63E4XSMFZUnGvp9qI+IbuOIQ0oANY6SeQLqXBECx+Xzn/32izPrF57lqMjWKg008gKJ1ZEQ9hk4pHBOtvDBCXaVMh1AE1oYkCJXIr4j7WAY+d/21KjRGOAMeAhcC3wPoiacRCMYiESpgVcRfLgY/ACNXYTu9aDinzlWjOL4tt/UVNuop2vfe+ypLBNcAG4L2yV4Stqko7gbvOuNm4CtweyPvLkvxz4Ip38h1S83dgs7dmihTb69x9jkjN1oT+SF3yJrndiniE8cC4mDXZqt/oGtp00gGTRkjXnfeoIBQniXM0Vyz1dutOB/289dV+XHHertKWcB70CWWkDumgxjn5sCBDRdxSnj2TLF9bVbO+jVlG+iM5/HP4BQub0lZGv564AAAAAElFTkSuQmCC"></h1>
    <br>
    <div class="align-items-center mb-3">
    <div>
      <b-form-input v-model="searchTerm" type="search" placeholder="Search terms" style="width: 340px"></b-form-input>
    </div>      
    
    <!-- Display Last Search Term -->
    <!-- <div v-if="lastSearchTerm" class="mb-2"> -->
    <div class="mb-2">
      Last searched term: {{ lastSearchTerm }}
    </div>

    <div class="d-flex align-items-center mb-3">
      <label for="howMany" class="mb-0 mr-2">Number of recipes to show:</label>
      <select id="howMany" class="form-control mr-2" v-model="selectedHowMany">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>

    <Filters @filters-updated="handleFiltersUpdated" />

    <b-button @click="search" variant="outline-dark">Search</b-button>

  </div>
    <!-- Display Search Results -->
    <div v-if="showSearchResults && this.recipes.length > 0" class="mt-4">
        <h3 style="font-weight: bold;">
          Search results:
          <slot></slot>
        </h3>
        <div class="sort-container mb-3">
      <label for="sortBy" class="sort-label mb-0">Sort by:</label>
      <select id="sortBy" v-model="selectedSortBy" class="form-control sort-select">
        <option value="">Select how to sort</option>
        <option value="time">Time (minutes)</option>
        <option value="popularity">Popularity (likes)</option>
      </select>
      <b-button @click="search" variant="outline-dark">Sort</b-button>
    </div>
        <b-row>
          <b-col v-for="r in this.recipes" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
          </b-col>
        </b-row>
    </div>
    <div v-else-if="showSearchResults && this.recipes.length === 0">
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
      selectedSortBy: null,
      // selectedSortDir: null,
      showSearchResults: false, // Initially, don't show search results
      selectedCuisine: null,
      selectedDiet: null,
      selectedIntolerance: null
    };
  },
  created(){
    this.lastSearchTerm = sessionStorage.getItem('searchTerm');
  },
  methods: {
    handleFiltersUpdated(filters) {
      // Update the selected filters based on the event emitted by the Filters component
      this.selectedCuisine = filters.selectedCuisine;
      this.selectedDiet = filters.selectedDiet;
      this.selectedIntolerance = filters.selectedIntolerance;
    },
    async search() {
      // Perform search operation using searchTerm
      // For now, just updating lastSearchTerm and displaying searchResults
      this.lastSearchTerm = this.searchTerm;
      // Simulating search results retrieval
      try {
        // if(this.selectedSortBy === "time"){
        //   this.selectedSortDir = "asc"
        // }
        // else{
        //   this.selectedSortDir = "desc"
        // }
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/search",
          {
          params: {
          recipeName: this.searchTerm,
          cuisine: this.selectedCuisine,
          diet: this.selectedDiet,
          intolerance: this.selectedIntolerance,
          number: this.selectedHowMany,
          sort: this.selectedSortBy,
          // sortDirection: this.selectedSortDir
            }
          }
          )
        // const recipes = response.data;
        this.recipes = response.data;
        console.log("search results:", this.recipes);
        // this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
      // Set showSearchResults to true to display search results
      this.showSearchResults = true;
      sessionStorage.setItem('searchTerm', this.searchTerm);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 100px auto;
  font-family: 'Calibri Light', 'Calibri';
  font-size: large;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centers vertically */
  align-items: center; /* Centers horizontally */
}
div {
    margin-bottom: 10px; /* Adds space between each filter */
}
label {
  display: inline-block;
  width: 230px; /* Adjust width as needed */
}
select {
  width: 100px; /* Adjust width as needed */
}
.sort-container {
  display: flex;
  align-items: center;
}
.sort-label {
  margin-right: 10px;
  width: auto;
}
.sort-select {
  margin-right: 10px;
  width: auto; /* Adjust as needed */
}

</style>