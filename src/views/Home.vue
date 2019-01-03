<template>
  <v-app>
    <v-nav-drawer/>
    <v-toolbar-search/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import VToolbarSearch from "@/components/VToolbarSearch.vue";
import VNavDrawer from "@/components/VNavDrawer.vue";

export default {
  components: {
    VToolbarSearch,
    VNavDrawer
  }
};
</script>
