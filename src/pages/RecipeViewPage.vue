<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mb-2 mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>Servings: {{ recipe.servings }}</div>
            </div>
            <div style="display: flex;">
              <p v-if="recipe.vegetarian" style="margin-right: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABS0lEQVR4nKXUwUtUURTH8c97OAiBi8BACIoRSfBRYvYfuBRdBIW1ayH5D2gLGwJx4aIQXLhz4UZFkKRGQvwDEkXQcGjZvxIXrvAY3rwZ5/3gwD2He78czj3n0LsG8RLT0SaRqqDfOMzZEfarAP/GLAfwEI9wUwW4iW3M4wyneFMF+BWvc37IcqwK8A+Gcv4LfO8XNoFmQfwWD/oBruBjQXwLs71CnuTOxxgvuPMOn3uBpbVarYWR6H/o0MSvsFsGeoxlrNXr9b00TRtYRSPWsV1ZbPJCPY8/uRjaI0mSyzRN/+F9tAvM3QfYxFTOT+JU3KloMrIyYKhZN5239WJWBrzqoadabZ+TlQG/YaEEFtbVr7ZYVgZ8iusOWYZ6nmDmPkBYig+fxcn4gtGYWXgYFkLewp2whUr1Fj+wgU/4iXUcxLWVtx0MdwNW0n+gzThZNpGWMAAAAABJRU5ErkJggg=="></p>
              <p v-if="recipe.vegan" style="margin-right: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcElEQVR4nM3Uz0sWURTG8Y+BoKZBaD+2EUHRIkPEdoaEEBQIrQpq00pJQtwUgrSpTca78S8wCHElubVVJP5o0aoWgSEIrSIJMogsuXCCYbzvO1EgPTCLeZ5zvnfuzLnDf6DjuIaWf4WM4hV+4hem/wZ0BjP4HpAtzGItwFf/FNSGWgG0WNrmSXzFBpqrYCfwJkAr6KtT9yBqbjaCHcU6djCJAxW137DUCLgYq97OZOfwBKcL3jx+4HAO1hOwp3UWm4r8QsG7E96VXMNwhIOZrBUf8aH0GgaiZyQHvB/h+Uw2Gtl4ye8OfyIHvBXhjcxQf8ImDpay/uhJC+5RF7bxHh3hpe09j6brmZ67kV1SR/ei4CVO4XHcP8vUNmEVX9BeD5iKHsUc7gRsObPVpLHIayqU3tnrAqwTF/EQvTEFM3GW3+JQI1j6Wp8L85jOdNKL8IrXAo5VPd0c3mGo5KcfwOUYmzSvZ6tAv3Wk4vzuv3YBEzFX6hUgPb8AAAAASUVORK5CYII="></p>
              <p v-if="recipe.glutenFree" style="margin-right: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB+klEQVR4nN2XO0hcURCGPyVRJE1IoqBgZyI2JqlsRFEkChbiE1QwQYjiihZCAgpJJwpRS0EEwUdvlSJFOhFFsFBRCAGRkJDCBV/b+Fo5OgvD4e56H7tb+MNw7945Zz7mzpxz7sKd+oA80qwQEAW20w3PBbYEvgfkpxOeJxknO/N3wJwk9D9V8LfAFPBIfo9KrJj9SjTZL/wLcCnzXgBvgCsLvHBfEK/wDguQDXyynkWBKjcZeIGvq+D7annGnl0D39xA3cArJbjRkYKYRjLKATqBXqDECzQR3DRRBDgRwKr4r6S2Wsb/DMhKBnxFZWiWSxtwAfTL+FLJ/ECNm/QDtuHaesT/VK4DDt186fAmAsOHlP+5WlLaRvwCy4DGOPB6a2yr1PyvlKTFL/QJ8Ac4B5od4OZaK/XtAiqAxyRB71V2/1zU3Ngh8CEoeMxqkkwX8Ihk7lmvga9yP6wCOp0uNnzNbwcXAGFZEoVAnQo6bdXeCb7j90hdUqCP8mrnge9AEbAInIr/WHVtYHhYgc15qvXToZ6m25uSAT9TQScs34wD+Lf0BEHhuypou4O/HBiU5muOs/n7gn+WCRsStAEYFzObxCuXCXj+kskAauQo+xFng5hNFdyoOA7UbA7VuJcveDewKcvG2DLw0gM0EPzB/WkIpRMcg99+JN4Azynk15vo4hwAAAAASUVORK5CYII="></p>
              <p v-if="!recipe.glutenFree"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMUlEQVR4nN3UvSuGURjH8Q/KgkiUxcsgZTAoRcpLSR5l8lpkU3aTwWKzGf0DJv4A+QeUlM1CSUmhDFJSXjt1PXVPPPdj4lenzrnu+/yu73Wd+9z8R1WgOuYrOMZtuWYDuMASFvEZ46Qcszo8hMEcdjOGq3mMqjCO0YxBOyawg5m8ZNt4QS/esRfx9iBdzvS0JLqnoBpCAc3Yz9Cex0F9q/TCCGoyG9M6aTJIU+we/aWQbeA1aE6Doj4oB9GDYdSWWupdEKQSG9GNywztcxj+WGYh+vYWG6fiWQvOIpZ6uoXK7+1Yxwc6cISbmC9gGm3xLaaEJekqCGbRhL5oerHMlGxMDj3FxvlYN+Aw+pWSrcmpg7jkrUGZSu3yC9WhM1N6caQfQdmqjlvwiGts5jmEv6Ev9uZK7sFiR7IAAAAASUVORK5CYII="></p>
              <b-button variant="link" class="text-decoration-none mb-2" @click="toggleFav">
                <img v-if="!isFav" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADTElEQVR4nO2ZS2xNURSGv2olaCkDIU0x8ChC0DLwSIzExCNCg4kYCErFSBkQBEmnpJ5BVJuYeM2olmEjRBAJYuCtiXhTVaKtrOQ/yU573J57e3q7m9wvOcm9Z+299lpnr73P2utAhgwZMmTwnCJgJ9AAPAGagVagCagHdgOTk9A3Bdijvk3S1Szddq8CmBSnA7OBm0BHhKsduA7MTKBvltq0R9TZAJT0xIGBQJUz4CfgNLBMs5MLDALGAEuB48Bntf0L7AeyHX32+6Bkgb5jwBLpMF250r0cOKM2wQM6AuQk68QI4JaU/AQOAMMi9BsK7FOYWN/zcsCuWt0z2V617Y5hcr7FmZ3hycxE4MRrhUKyWGi9ko5ax4mXwIwU9JUAbxxnIs1MleNEAakzTjqCWDfHxvZAX4HjzOEoC7td4ZTKTIQ9yVZdxTHoK1aYtXWnL9idbE3ERYWuuDgkG22LDqXI2U2iLOyoBIs9LvKd3XFiWINdEtoW6ztnZeuOMGG9hLaH+84K2XojTPhMwgn4T5FsfRom/CFhHv6TJ1vN5i4Eb09LFXxniJN1dOGdhD15CaaLQtlqL8guPJSwR5lmmpgjWx+ECWsk3Iz/bJWt58KE5RJW4z81snXL/05sJvzi+YIfDHyTrbYNh3JPDUrxlzWy8U6iRtvUyBzKwj+ygPuysay7aWtSw5X4xyrZ9jZK+Jc7e7Rlmr6QLwf+u8g7Y8fIu+pgWaYvVMum28kcC6Y7BYRN9D1lsuUXMDXZzhvU+TewiL5jsWwwW9anqiQoRFgFcB7pZ4ESw0gFh0RYLF5wnEnnzCwEvmvsi3Ecl63OddWJ0bX0Pms1lo15STbEQrZKmEGN6mQq5cuI41Q6Zdqa3hgnS+XQNg1yTaXVuDBdddLdprJqr2YXVrD+qgGfA3Nj0DkfeOEkrVbYTgtWoHjkVN4rU4zjHH1z+SNdT5SFp70AcMpZN43A+CQfRqPz2eCEPiv06QsrOO+36AkPSNDe4n6jU7V5r28uXjASuOzMTp0KBJ0pVFGtw9lara93lAIfZKRtCKsdmVUwPzoL2mbFa0YDV5ynbmnOUee/zdwo+hHrlNYEDtibejv9lGnAY132u1+T79lJMwPp4B+umggDgRN8wAAAAABJRU5ErkJggg==" alt="Image 1">
                <img v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHElEQVR4nO2YTUtUYRiGr9QElSKF/kF+IEZBgqvEXZugcNHSZSujRPrYFkFtiwEFaeMHBP2DZmyjRQpBhFK0aTmVEESzyIp54oVXkHqdOc+cc+Y8g+eCG4ZhznPuizPn64WcnJycHOMMAreBEvAeqAC7QBl4AdwFzijmnQXu+W3LflbFzy4Ct4CBJAVGgVVAImYNGK8xbwJYV8wrAefiCBwFCkBVsdO9uG3mga5989znhQZmiZ/3GOjQSvT6Qy4x88rP6gNeJzCvBJzQHIkkJPby0gslNa8U9cgUEtxpWnkU5cRu5Jxodqr1LgCaq1PWKR4kMWSgnCgTvM/cMVBMlLkZEikaKCbKPA+JfDRQTJT5EBL5YaCYKOM6/8eugWKizM+QyI6BYqLMl5DIOwPFRJm3IZGnBoqJMishkVkDxUSZGyGREQPFRBn3NBJky0A5iRh3Th/IdQMFJWKu1RLp8Zc0MZ6vwDHqMGOgqNTJNBFwr5FvDJSVGveOyIsQp/0akxh8thpByaSx194qcIUGeWBAQHzuE4N2YNmAxCLQRkzcgCcZSiwkIbFfZi4DiQJwhBS4CvxugsAfv/KfKheAbylKfAcu0iT6gc0UJDaAUzSZDn/4fyUg4P6uD4FOMmQs5lLSJ+A8Ruj2K+SN3B/qPsVmwWXgcwQB95tLGKcXWKoh8Qw4SQsx9c8TdMV/15IMA9s+7nNLc9wn51DxF5poKQVKh3DVAAAAAElFTkSuQmCC" alt="Image 2">
              </b-button>
            </div> 
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>
<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
import { mockAddFavorite } from "../services/user.js";
export default {
  name: "RecipeViewPage",
  data() {
    return {
      recipe: null,
      isFav: localStorage.getItem(`favorite_${this.recipe.id}`) === 'true',
      message: ""
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        // response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
        //   {
        //     withCredentials: true
        //   }
        // );

        response = mockGetRecipeFullDetails(this.$route.params.recipeId);

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        vegetarian,
        vegan,
        glutenFree
      } = response.data.recipe;

           // Concatenate name with each step in analyzedInstructions
           let _instructions = analyzedInstructions.flatMap(instruction => {
        let sectionName = instruction.name ? `${instruction.name}` : '';
        return instruction.steps.map(step => ({
          ...step,
          step: `${sectionName}${step.step}`
        }));
      });

      let _recipe = {
        instructions: analyzedInstructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        vegetarian,
        vegan,
        glutenFree
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
  toggleFav(event) {
      event.stopPropagation();
      this.isFav = !this.isFav;
      localStorage.setItem(`favorite_${this.recipe.id}`, this.isFav.toString());
      if (this.isFav){
        if (mockAddFavorite(this.recipe.id).status === 200){
          this.message = mockAddFavorite(this.recipe.id).response.data.message;
        }
      }
      else{
        this.message = "The Recipe successfully removed from favorites"
      }
      this.$root.toast("",this.message, "Light ");
    },
  }
};
</script>
<style scoped>

.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.recipe-header {
  text-align: center; /* Ensures the header text is centered */
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
