<template>
    <div>
      <div>
        <label for="cuisines">Cuisine:</label>
        <select id="cuisines" v-model="selectedCuisine">
          <option value="">Select Cuisine</option>
          <option v-for="cuisine in cuisines" :key="cuisine">{{ cuisine }}</option>
        </select>
      </div>
  
      <div>
        <label for="diets">Diet:</label>
        <select id="diets" v-model="selectedDiet">
          <option value="">Select Diet</option>
          <option v-for="diet in diets" :key="diet">{{ diet }}</option>
        </select>
      </div>
  
      <div>
        <label for="intolerances">Intolerance:</label>
        <select id="intolerances" v-model="selectedIntolerance">
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
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom CSS styles here */
  div {
    margin-bottom: 10px; /* Adds space between each filter */
  }
  label {
    display: inline-block;
    width: 100px; /* Adjust width as needed */
  }
  select {
    width: 200px; /* Adjust width as needed */
  }
  </style>
  