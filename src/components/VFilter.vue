<template>
  <v-layout justify-end>
    <v-flex xs6 sm6 md6 lg4 align-self-center class="mr-3">
      <!-- Add [Esc] event to cancel search -->
      <v-autocomplete
        :items="technicians"
        :search-input.sync="filters.technician"
        item-text="name"
        label="Técnico"
        cache-items
        clearable
        hide-details
      ></v-autocomplete>
    </v-flex>
    <v-flex xs6 sm6 md6 lg4 align-self-center>
      <!-- Add [Esc] event to cancel search -->
      <v-autocomplete
        :items="statusItems"
        :search-input.sync="filters.status"
        label="Estatus"
        cache-items
        clearable
        hide-details
      ></v-autocomplete>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    statusItems: [
      "Listo para entregar",
      "Esperando repuesto",
      "En reparación",
      "Retirado",
      "Garantía"
    ],
    technicians: [{ name: "Miguel" }, { name: "Johan" }, { name: "Marcano" }],
    filters: {
      technician: "",
      status: ""
    }
  }),
  methods: {
    ...mapMutations("clients", ["SET_FILTER", "CLEAR_FILTER"])
  },
  watch: {
    "filters.technician": function(technician) {
      this.SET_FILTER({ technician });
    },
    "filters.status": function(status) {
      this.SET_FILTER({ status });
    }
  }
};
</script>

