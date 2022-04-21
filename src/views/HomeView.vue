<template>
  <div class="home"> 
    <div class="container mx-auto">
      <carousel />
      <products />
      <button @click="changeColor()" class="mb-14 p-1 rounded-md bg-gray-600 text-white font-semibold">color</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import products from "../components/ProductsComp.vue";
import carousel from "../components/CarouselComp.vue";
export default {
  name: "HomeView",
  components: {
    products, carousel
  },
  methods: {
    ...mapActions(["changeBgColor"]),
    changeColor() {
      this.changeBgColor()
    }
  }
  
};
</script>
