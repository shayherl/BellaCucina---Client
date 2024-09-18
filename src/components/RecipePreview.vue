<template>
  <b-card
    tag="article"
     style="width: 30rem; height: 35rem;"
    class="mb-2"
  >
    <img v-if="!isFamilyRecipe" 
         :src="recipe.imageURL"
         class="card-img-top recipe-preview"
         @click="goToRecipe(recipe.id, recipe.title)">
    <img v-else 
         :src="require(`@/assets/${recipe.imageName}`)" 
         class="card-img-top recipe-preview"
         @click="goToRecipe(recipe.id, recipe.title)">
    <b-card-body>
      <b-card-title style="font-weight: bold;"> {{ recipe.title }} </b-card-title>
      <b-card-text>
        <div>
          <p v-if="recipe.owner !== ''"> {{ recipe.owner }}</p>
          <p v-if="recipe.whenUsuallyMade !== ''"> {{ recipe.whenUsuallyMade }}</p>
        </div>
        <div>
        <div style="display: flex;  margin-right: 8px; margin-bottom: 10px; align-items: center;">
          <p><img style="width:20px; height:20px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVR4nI3SO05DMRCF4S8Sgo6HILAAQGyBlAg6XgUFJdkIC0hYAZCsgJr1gQ7yja6ML+Fv7Bl7ZuwzQ5sxbjAta+y1nGGJGW5xjjvMscDpUOAVXrHT8z339rt4w2WrYgJHlT++PiO846TvXFYVh4K7FyTBD4flj/4ZHF5woKgZcWq28InNxtk9rrN5wqRx4RFfRe2aSYlrVj7CBx7WVR6XPnZsl8Ak8Mef9ztjUVQMGyXBEHul3ysyOXHUfa7p+nxcH2RykqB7QatiAi+GMmdyciF/iihRNWvsJP5VsUUGIGqmHVlX4vT5BgO0HzAkH86YAAAAAElFTkSuQmCC"> {{ recipe.readyInMinutes }} minutes </p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <p><img style="width:20px; height:20px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7UlEQVR4nN3TMSvFURjH8Y+LBSmDyVVIZCIy6Cp3NHkJXoDBZpHXYCajgVhYyW64KUlKpIjVW9A/zzXo/u8f/zP51a+e8/Sc7zmn8zz8B1XRlwK0hns8YaIs7BrD2MR6GVA/HiPewUoZ2Cp2I77B4F9BvbjDZPgWYxhF129A3TjGVqxrOA9f4AHzeZvHMYcZVHCC7YhbaQmHebBs4xFeMY2RgpvXsV/0vFPMFhX5bJGNVLA9LKeCXWIoBayC5x8c+AXLmrMjp2YRZ+0g2Tc38I4pHOAt5jLLN32FFyy0g/VgIGaxqc7IfXde76XTB2/rJ7Fn2hiwAAAAAElFTkSuQmCC">{{ recipe.aggregateLikes }} likes</p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <b-button variant="link" class="text-decoration-none mb-2" @click="toggleFav">
            <img v-if="!isFav" style="width:20px; height:20px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADTElEQVR4nO2ZS2xNURSGv2olaCkDIU0x8ChC0DLwSIzExCNCg4kYCErFSBkQBEmnpJ5BVJuYeM2olmEjRBAJYuCtiXhTVaKtrOQ/yU573J57e3q7m9wvOcm9Z+299lpnr73P2utAhgwZMmTwnCJgJ9AAPAGagVagCagHdgOTk9A3Bdijvk3S1Szddq8CmBSnA7OBm0BHhKsduA7MTKBvltq0R9TZAJT0xIGBQJUz4CfgNLBMs5MLDALGAEuB48Bntf0L7AeyHX32+6Bkgb5jwBLpMF250r0cOKM2wQM6AuQk68QI4JaU/AQOAMMi9BsK7FOYWN/zcsCuWt0z2V617Y5hcr7FmZ3hycxE4MRrhUKyWGi9ko5ax4mXwIwU9JUAbxxnIs1MleNEAakzTjqCWDfHxvZAX4HjzOEoC7td4ZTKTIQ9yVZdxTHoK1aYtXWnL9idbE3ERYWuuDgkG22LDqXI2U2iLOyoBIs9LvKd3XFiWINdEtoW6ztnZeuOMGG9hLaH+84K2XojTPhMwgn4T5FsfRom/CFhHv6TJ1vN5i4Eb09LFXxniJN1dOGdhD15CaaLQtlqL8guPJSwR5lmmpgjWx+ECWsk3Iz/bJWt58KE5RJW4z81snXL/05sJvzi+YIfDHyTrbYNh3JPDUrxlzWy8U6iRtvUyBzKwj+ygPuysay7aWtSw5X4xyrZ9jZK+Jc7e7Rlmr6QLwf+u8g7Y8fIu+pgWaYvVMum28kcC6Y7BYRN9D1lsuUXMDXZzhvU+TewiL5jsWwwW9anqiQoRFgFcB7pZ4ESw0gFh0RYLF5wnEnnzCwEvmvsi3Ecl63OddWJ0bX0Pms1lo15STbEQrZKmEGN6mQq5cuI41Q6Zdqa3hgnS+XQNg1yTaXVuDBdddLdprJqr2YXVrD+qgGfA3Nj0DkfeOEkrVbYTgtWoHjkVN4rU4zjHH1z+SNdT5SFp70AcMpZN43A+CQfRqPz2eCEPiv06QsrOO+36AkPSNDe4n6jU7V5r28uXjASuOzMTp0KBJ0pVFGtw9lara93lAIfZKRtCKsdmVUwPzoL2mbFa0YDV5ynbmnOUee/zdwo+hHrlNYEDtibejv9lGnAY132u1+T79lJMwPp4B+umggDgRN8wAAAAABJRU5ErkJggg==" alt="Image 1" >
            <img v-else style="width:20px; height:20px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHElEQVR4nO2YTUtUYRiGr9QElSKF/kF+IEZBgqvEXZugcNHSZSujRPrYFkFtiwEFaeMHBP2DZmyjRQpBhFK0aTmVEESzyIp54oVXkHqdOc+cc+Y8g+eCG4ZhznPuizPn64WcnJycHOMMAreBEvAeqAC7QBl4AdwFzijmnQXu+W3LflbFzy4Ct4CBJAVGgVVAImYNGK8xbwJYV8wrAefiCBwFCkBVsdO9uG3mga5989znhQZmiZ/3GOjQSvT6Qy4x88rP6gNeJzCvBJzQHIkkJPby0gslNa8U9cgUEtxpWnkU5cRu5Jxodqr1LgCaq1PWKR4kMWSgnCgTvM/cMVBMlLkZEikaKCbKPA+JfDRQTJT5EBL5YaCYKOM6/8eugWKizM+QyI6BYqLMl5DIOwPFRJm3IZGnBoqJMishkVkDxUSZGyGREQPFRBn3NBJky0A5iRh3Th/IdQMFJWKu1RLp8Zc0MZ6vwDHqMGOgqNTJNBFwr5FvDJSVGveOyIsQp/0akxh8thpByaSx194qcIUGeWBAQHzuE4N2YNmAxCLQRkzcgCcZSiwkIbFfZi4DiQJwhBS4CvxugsAfv/KfKheAbylKfAcu0iT6gc0UJDaAUzSZDn/4fyUg4P6uD4FOMmQs5lLSJ+A8Ruj2K+SN3B/qPsVmwWXgcwQB95tLGKcXWKoh8Qw4SQsx9c8TdMV/15IMA9s+7nNLc9wn51DxF5poKQVKh3DVAAAAAElFTkSuQmCC" alt="Image 2">
          </b-button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img v-if="recipe.viewed"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA3ElEQVR4nM3SS0pDQRCF4S+QmY+JolmDmgVohBAH6iJEEWdKnGoeYHQrOgpEoyuUlmps9F4CCuIPDVV9+nTXrVv8R1oYY4ZprFnsbS4yn+MZuxXaHl5wVmd+wA0aka/iGEcRC22AyVfzBW6L/ABv6MdKca/QB1HtB208Fi8vh6Hpk2bsLUWezj5hWwhrxeEuLn3nKrRM8rz+5oL1fMFOlPOTT9gqm5gak+kVTbyuaOKwbGLmPoRcyUr8wsOIhZYG6k4NpzEsnQptH3Oc1JkzaVxHFaOcqttYZP573gHu1iby3kYbUQAAAABJRU5ErkJggg==">
        </div>
        <div style="display: flex; margin-bottom: 7px;">
          <p v-if="recipe.vegetarian" style="margin-right: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABS0lEQVR4nKXUwUtUURTH8c97OAiBi8BACIoRSfBRYvYfuBRdBIW1ayH5D2gLGwJx4aIQXLhz4UZFkKRGQvwDEkXQcGjZvxIXrvAY3rwZ5/3gwD2He78czj3n0LsG8RLT0SaRqqDfOMzZEfarAP/GLAfwEI9wUwW4iW3M4wyneFMF+BWvc37IcqwK8A+Gcv4LfO8XNoFmQfwWD/oBruBjQXwLs71CnuTOxxgvuPMOn3uBpbVarYWR6H/o0MSvsFsGeoxlrNXr9b00TRtYRSPWsV1ZbPJCPY8/uRjaI0mSyzRN/+F9tAvM3QfYxFTOT+JU3KloMrIyYKhZN5239WJWBrzqoadabZ+TlQG/YaEEFtbVr7ZYVgZ8iusOWYZ6nmDmPkBYig+fxcn4gtGYWXgYFkLewp2whUr1Fj+wgU/4iXUcxLWVtx0MdwNW0n+gzThZNpGWMAAAAABJRU5ErkJggg=="></p>
          <p v-if="recipe.vegan" style="margin-right: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcElEQVR4nM3Uz0sWURTG8Y+BoKZBaD+2EUHRIkPEdoaEEBQIrQpq00pJQtwUgrSpTca78S8wCHElubVVJP5o0aoWgSEIrSIJMogsuXCCYbzvO1EgPTCLeZ5zvnfuzLnDf6DjuIaWf4WM4hV+4hem/wZ0BjP4HpAtzGItwFf/FNSGWgG0WNrmSXzFBpqrYCfwJkAr6KtT9yBqbjaCHcU6djCJAxW137DUCLgYq97OZOfwBKcL3jx+4HAO1hOwp3UWm4r8QsG7E96VXMNwhIOZrBUf8aH0GgaiZyQHvB/h+Uw2Gtl4ye8OfyIHvBXhjcxQf8ImDpay/uhJC+5RF7bxHh3hpe09j6brmZ67kV1SR/ei4CVO4XHcP8vUNmEVX9BeD5iKHsUc7gRsObPVpLHIayqU3tnrAqwTF/EQvTEFM3GW3+JQI1j6Wp8L85jOdNKL8IrXAo5VPd0c3mGo5KcfwOUYmzSvZ6tAv3Wk4vzuv3YBEzFX6hUgPb8AAAAASUVORK5CYII="></p>
          <p v-if="recipe.glutenFree" style="margin-right: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB+klEQVR4nN2XO0hcURCGPyVRJE1IoqBgZyI2JqlsRFEkChbiE1QwQYjiihZCAgpJJwpRS0EEwUdvlSJFOhFFsFBRCAGRkJDCBV/b+Fo5OgvD4e56H7tb+MNw7945Zz7mzpxz7sKd+oA80qwQEAW20w3PBbYEvgfkpxOeJxknO/N3wJwk9D9V8LfAFPBIfo9KrJj9SjTZL/wLcCnzXgBvgCsLvHBfEK/wDguQDXyynkWBKjcZeIGvq+D7annGnl0D39xA3cArJbjRkYKYRjLKATqBXqDECzQR3DRRBDgRwKr4r6S2Wsb/DMhKBnxFZWiWSxtwAfTL+FLJ/ECNm/QDtuHaesT/VK4DDt186fAmAsOHlP+5WlLaRvwCy4DGOPB6a2yr1PyvlKTFL/QJ8Ac4B5od4OZaK/XtAiqAxyRB71V2/1zU3Ngh8CEoeMxqkkwX8Ihk7lmvga9yP6wCOp0uNnzNbwcXAGFZEoVAnQo6bdXeCb7j90hdUqCP8mrnge9AEbAInIr/WHVtYHhYgc15qvXToZ6m25uSAT9TQScs34wD+Lf0BEHhuypou4O/HBiU5muOs/n7gn+WCRsStAEYFzObxCuXCXj+kskAauQo+xFng5hNFdyoOA7UbA7VuJcveDewKcvG2DLw0gM0EPzB/WkIpRMcg99+JN4Azynk15vo4hwAAAAASUVORK5CYII=" style="width:20px; height:20px"></p>
          <p v-if="!recipe.glutenFree"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMUlEQVR4nN3UvSuGURjH8Q/KgkiUxcsgZTAoRcpLSR5l8lpkU3aTwWKzGf0DJv4A+QeUlM1CSUmhDFJSXjt1PXVPPPdj4lenzrnu+/yu73Wd+9z8R1WgOuYrOMZtuWYDuMASFvEZ46Qcszo8hMEcdjOGq3mMqjCO0YxBOyawg5m8ZNt4QS/esRfx9iBdzvS0JLqnoBpCAc3Yz9Cex0F9q/TCCGoyG9M6aTJIU+we/aWQbeA1aE6Doj4oB9GDYdSWWupdEKQSG9GNywztcxj+WGYh+vYWG6fiWQvOIpZ6uoXK7+1Yxwc6cISbmC9gGm3xLaaEJekqCGbRhL5oerHMlGxMDj3FxvlYN+Aw+pWSrcmpg7jkrUGZSu3yC9WhM1N6caQfQdmqjlvwiGts5jmEv6Ev9uZK7sFiR7IAAAAASUVORK5CYII="></p>
        </div>  
      </div>
      </b-card-text>
        </b-card-body>
  <b-alert>
    <p>{{ message }}</p>
  </b-alert>
  </b-card>
</template>

<script>
import { mockAddFavorite } from "../services/user.js";
export default {
  name: 'RecipePriview',
  data() {
    return {
      image_load: false,
      isFav: localStorage.getItem(`favorite_${this.recipe.id}`) === 'true',
      message: ""
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    isFamilyRecipe:{
      type: Boolean,
      default: false
    },
    isMyRecipe:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    goToRecipe(recipeId, title) {
      if (this.isFamilyRecipe){
        this.$router.push({name: 'recipe', params: { recipeId: recipeId, category: "family"}});
      }
      else if (this.isMyRecipe){
        this.$router.push({name: 'recipe', params: { recipeId: title, category: "my"}});
      }
      else{
        this.$router.push({name: 'recipe', params: { recipeId: recipeId, category: "regular"}});
      }
      
      this.recipe.viewed = true
  },
  async toggleFav(event) {
      event.stopPropagation();
      this.isFav = !this.isFav;
      // localStorage.setItem(`favorite_${this.recipe.id}`, this.isFav.toString());
      if (this.isFav){
        response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites",
          {
            recipeId: this.recipe.id,
          }
          
          );
        if (response.status === 200){
          this.message = "The Recipe successfully saved as favorite";
        }
      }
      // else{
      //   this.message = "The Recipe successfully removed from favorites"
      // }
      this.$root.toast("",this.message, "Light ");
    },
  }
};
</script>

<style scoped>
.container {
  font-family: 'Calibri Light', 'Calibri';
  
}
.recipe-preview {
  display: inline-block;
  width: 100%;
  height: 275px;
  cursor: pointer;
}
.recipe-preview:hover {
  filter: blur(2px);
}


</style>
