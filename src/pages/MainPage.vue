<template>
  <div class="container">
    <LoginPage v-if="!$root.store.username"/>
    <RecipePreviewList title="Random Recipes" kind="regular" class="RandomRecipes center" />
    <RecipePreviewList v-if="$root.store.username"
      title="Last Viewed Recipes"
      kind="regular"
      class="RandomRecipes center"
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div> -->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from './LoginPage.vue';
export default {
  components: {
    RecipePreviewList,
    LoginPage
  }
};
</script>

<style lang="scss" scoped>
.container {
  font-family: 'Calibri Light', 'Calibri';
  
  
    }
.RandomRecipes {
  margin: 100px 0 10px;
  
  
}
</style>
