<template>
    <div class="container">
      <RecipePreviewList title="My Family Recipes" kind="family" class="FamilyRecipes center" />
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  }
};
</script>
  
<style scoped>
    .container {
        margin-top: 100px;
    }
    .FamilyRecipes {
        margin: 100px 0 10px;
    }
</style>