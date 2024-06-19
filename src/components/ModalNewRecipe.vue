<template>
  <div>
    <!-- <button @click="showModal = true">Open Modal</button> -->
    <b-modal v-model="showModal" title="New Recipe Form" class="modal-footer" no-backdrop hide-footer id="newRecipe">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="formData.title" class="form-control" required>
        </div>

        <div class="form-group">
          <label for="image">Photo URL:</label>
          <input type="url" id="image" v-model="formData.image" class="form-control" required>
        </div>

        <div class="form-group">
          <label for="readyInMinutes">Preparation Time (minutes):</label>
          <input type="number" id="readyInMinutes" v-model="formData.readyInMinutes" class="form-control" required>
        </div>

        <div class="form-group">
          <label>Dietary Options:</label>
          <p></p>
          <div class="form-check form-check-inline">
            <input type="checkbox" id="vegetarian" v-model="formData.vegetarian" class="form-check-input">
            <label for="vegetarian" class="form-check-label">Vegetarian</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="checkbox" id="vegan" v-model="formData.vegan" class="form-check-input">
            <label for="vegan" class="form-check-label">Vegan</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="checkbox" id="glutenFree" v-model="formData.glutenFree" class="form-check-input">
            <label for="glutenFree" class="form-check-label">Gluten Free</label>
          </div>
        </div>

        <div class="form-group">
          <label for="summary">Summary:</label>
          <textarea id="summary" v-model="formData.summary" class="form-control" required></textarea>
        </div>

        <div class="form-group">
          <label for="extendedIngredients">Ingredients:</label>
          <div v-for="(ingredient, index) in formData.extendedIngredients" :key="index" class="d-flex mb-2">
            <input type="text" v-model="ingredient.name" class="form-control" placeholder="Name" required>
            <input type="number" v-model="ingredient.amount" class="form-control ml-2" placeholder="Amount" required>
            <input type="text" v-model="ingredient.unit" class="form-control ml-2" placeholder="Unit" required>
            <button type="button" class="btn btn-danger ml-2" @click="removeIngredient(index)">Remove</button>
          </div>
          <button type="button" class="btn btn-secondary" @click="addIngredient">Add Ingredient</button>
        </div>

        <div class="form-group">
          <label for="instructions">Instructions:</label>
          <textarea id="instructions" v-model="formData.instructions" class="form-control" required></textarea>
        </div>

        <div class="form-group">
          <label for="servings">Number of Dishes:</label>
          <input type="number" id="servings" v-model="formData.servings" class="form-control" required>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { BModal } from 'bootstrap-vue';
import { mockAddUserRecipe } from "../services/user.js";

export default {
  name: "ModalNewRecipe",
  components: {
    BModal
  },
  data() {
    return {
      showModal: false,
      formData: {
        id: '',
        title: '',
        image: '',
        readyInMinutes: '',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        summary: '',
        instructions: '',
        extendedIngredients: [
          { name: '', amount: '', unit: '' }
        ],
        servings: ''
      },
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    submitForm() {
      this.showModal = false;
      // Construct extendedIngredients array
      let extendedIngredientsArray = this.formData.extendedIngredients.map(ingredient => ({
        id: Math.floor(1000 + Math.random() * 9000),
        aisle: '',
        image: '',
        consistency: '',
        name: ingredient.name,
        nameClean: ingredient.name,
        original: `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`,
        originalName: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        meta: [],
        measures: {
          us: {
            amount: ingredient.amount,
            unitShort: ingredient.unit,
            unitLong: ingredient.unit
          },
          metric: {
            amount: ingredient.amount,
            unitShort: ingredient.unit,
            unitLong: ingredient.unit
          }
        }
      }));

      // Create newRecipe object
      let newRecipe = {
        id: Math.floor(100000 + Math.random() * 900000),
        image: this.formData.image,
        title: this.formData.title,
        readyInMinutes: this.formData.readyInMinutes,
        aggregateLikes: Math.floor(1 + Math.random() * 999),
        vegetarian: this.formData.vegetarian,
        vegan: this.formData.vegan,
        glutenFree: this.formData.glutenFree,
        summary: this.formData.summary,
        analyzedInstructions: [],
        instructions: this.formData.instructions,
        extendedIngredients: extendedIngredientsArray, // Assign the constructed extendedIngredients array
        servings: this.formData.servings
      };
      mockAddUserRecipe(newRecipe)
      if (mockAddUserRecipe(newRecipe).status === 200){
          this.message = mockAddUserRecipe(newRecipe).response.data.message;
        }
      this.$root.toast("",this.message, "Light ");
      this.resetFormData();
    },
    closeModal() {
      // Method to close the modal without submitting
      this.showModal = false;
      // Optionally, reset form data
      this.resetFormData();
    },
    addIngredient() {
      this.formData.extendedIngredients.push({ name: '', amount: '', unit: '' });
    },
    removeIngredient(index) {
      this.formData.extendedIngredients.splice(index, 1);
    },
    resetFormData() {
      this.formData = {
        title: '',
        image: '',
        readyInMinutes: '',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        summary: '',
        instructions: '',
        extendedIngredients: [
          { name: '', amount: '', unit: '' }
        ],
        servings: ''
      };
    }
  },
};
</script>

<style>
.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
