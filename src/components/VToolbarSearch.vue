<template>
  <v-toolbar dark color="blue" app>
    <v-toolbar-title>Equipos</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      flat
      solo-inverted
      hide-details
      append-icon="mdi-magnify"
      placeholder="Busqueda"
      color="blue"
      @input="UPDATE_SEARCH($event)"
    ></v-text-field>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["UPDATE_SEARCH"])
  }
};
</script>

