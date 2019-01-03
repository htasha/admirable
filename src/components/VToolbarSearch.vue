<template>
  <v-toolbar app clipped-left>
    <v-toolbar-side-icon @click="IS_MINI"></v-toolbar-side-icon>
    <v-toolbar-title>Admirable</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      flat
      solo
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
    ...mapMutations("clients", ["UPDATE_SEARCH", "IS_MINI"])
  }
};
</script>

