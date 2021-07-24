<template>
  <v-app>
    <NavigationBar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import NavigationBar from "@/components/NavigationBar.vue";

export default Vue.extend({
  name: "App",
  components: {NavigationBar},
  data: () => ({
    //
  }),
});
</script>
