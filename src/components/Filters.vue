<template>
  <div>
    <div class="d-flex align-items-center mb-3">
      <label for="cuisines" class="mb-0 mr-2">Cuisine:</label>
      <select id="cuisines" class="form-control mr-2" v-model="selectedCuisine" @change="updateFilters">
        <option value="">Select Cuisine</option>
        <option v-for="cuisine in cuisines" :key="cuisine">{{ cuisine }}</option>
      </select>
    </div>

    <div class="d-flex align-items-center mb-3">
      <label for="diets" class="mb-0 mr-2">Diet:</label>
      <select id="diets" class="form-control mr-2" v-model="selectedDiet" @change="updateFilters">
        <option value="">Select Diet</option>
        <option v-for="diet in diets" :key="diet">{{ diet }}</option>
      </select>
    </div>

    <div class="d-flex align-items-center mb-3">
      <label for="intolerances" class="mb-0 mr-2">Intolerance:</label>
      <select id="intolerances" class="form-control mr-2" v-model="selectedIntolerance" @change="updateFilters">
        <option value="">Select Intolerance</option>
        <option v-for="intolerance in intolerances" :key="intolerance">{{ intolerance }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import cuisines from '../assets/cuisines.js';
import diets from '../assets/diets.js';
import intolerances from '../assets/intolerances.js';

export default {
  data() {
    return {
      cuisines: cuisines,
      diets: diets,
      intolerances: intolerances,
      selectedCuisine: '',
      selectedDiet: '',
      selectedIntolerance: ''
    };
  },
  methods: {
    updateFilters() {
      // Emit an event with the selected filter values
      this.$emit('filters-updated', {
        selectedCuisine: this.selectedCuisine,
        selectedDiet: this.selectedDiet,
        selectedIntolerance: this.selectedIntolerance
      });
    }
  }
};
</script>

<style scoped>
.container {
  font-family: 'Calibri Light', 'Calibri';
}
div {
  margin-bottom: 10px; /* Adds space between each filter */
}
label {
  display: inline-block;
  width: 130px; /* Adjust width as needed */
}
select {
  width: 200px; /* Adjust width as needed */
}
</style>