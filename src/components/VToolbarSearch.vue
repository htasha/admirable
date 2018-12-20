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
      v-model="search"
      @input="$emit('search', search)"
    ></v-text-field>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    search: ""
  })
};
</script>

