<template>
 <v-app style="margin-top: 0px">


<!--<app-left-menu></app-left-menu>-->
  <header-menu></header-menu>
<v-content>
 <v-container>
  <router-view/>
 </v-container>
 <FlashMessage></FlashMessage>
</v-content>
 </v-app>
</template>

<script>
// import AppLeftMenu from "./components/AppLeftMenu.vue";
import HeaderMenu from "./components/HeaderMenu.vue";


export default {
  name: 'App',
  components: {
   HeaderMenu
   // AppLeftMenu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
