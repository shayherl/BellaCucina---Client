<template>
  <div id="app">
    <b-navbar toggleable="lg" class="custom-navbar">
    <b-navbar-brand :to="{ name: 'main' }"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAACXBIWXMAAAsTAAALEwEAmpwYAAABbklEQVR4nO3UvUtcURAF8J8aFKzsjBrS2MdGrBK0tZYU2mQhoCFVIIWEmDoErKOoTUhjEe1tNOgf4AduZzoFKxNQC0lww4VZWDY+3V2fadwDw+O+OefMvHeZoYkmeIgJvIlnOt8ZurCEPyhVxG8sRv5W6EQBc1jAS+xFkX28j/wMivF+N3ipgc94ET414RmOqr6mHB/RVsVP508Z/EM8vangAM5xGR2PYhBvMXuDdjZ4g6FbCp8zPLlO+D06fCUfvA6/9SzCo+hsGy05FW3BTvj2XkUYia7m5Yv58B2+KjkUyW85F10J33TX/6ADv3CS48D34Gf4tmeRPkRXm+irw3wM76rGqQ9b4ZfmOhMPsBrEU6zhKw7Qn6FJm+g4ND/wJXSnFdeVfK9FK6YqNk25gbRtsvAYy7io0BQx2cgklOe2u447LIWuYWyESa3LvCv4SdcwmkX/y+8t4HkNUcizaKnOuFXRcUw3EEnXxD3CX3X+hOTjVmQ8AAAAAElFTkSuQmCC">&nbsp;&nbsp;Bella Cucina</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'about' }">About Us</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" :to="{ name: 'search' }">Search</b-button>
        </b-nav-form>
        <b-nav-item-dropdown right v-if="!$root.store.username">
          <template #button-content>
            <em>Hello Guest</em>
          </template>
          <b-dropdown-item :to="{ name: 'register' }">Register</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'login' }">Login</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right v-if="$root.store.username">
          <template #button-content>
            <em> {{ $root.store.username }} </em>
          </template>
          <b-dropdown-item @click="openModal" >Add New Recipe</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'favorites' }">My Favorites</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'myRecipes' }">My Recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'familyRecipes' }">My Family Recipes</b-dropdown-item>
          <b-dropdown-item @click="Logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>
    <router-view />
    <ModalNewRecipe ref="ModalNewRecipe"></ModalNewRecipe>
  </div>
</template>

<script>
import ModalNewRecipe from './components/ModalNewRecipe.vue';

export default {
  name: "App",
  components: {
    ModalNewRecipe
  },
  methods: {
    async Logout() {
      let response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          this.$root.store.server_domain + "/auth/Logout"
        );
      console.log(response);
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    openModal() {
      this.$refs.ModalNewRecipe.openModal()
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: 'Calibri Light', 'Calibri';
  font-size: larger;
  color: #000000;
  min-height: 100vh;
  width: 100%; /* Make the width full screen */
  margin: 0; /* Remove any margins */
  padding: 0 20px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #000000;
}

.custom-navbar {
  background-color: #c6bc97; /* Custom background color */
  color: #000000; /* Custom text color */
}
.custom-navbar .navbar-brand {
  color: #000000; /* Custom brand color */
  
}
.custom-navbar .nav-link {
  color: #000000; /* Custom link color */
}

#nav a.router-link-exact-active {
  color: #000000;
}
</style>
