<template>
  <v-layout wrap>
    <v-flex xs12 offset-xs5>
      <v-subheader class="px-0">Filtrar por:</v-subheader>
    </v-flex>
    <v-flex xs3 offset-xs5>
      <!-- Add [Esc] event to cancel search -->
      <v-autocomplete
        :items="technicians"
        :search-input.sync="filters.technician"
        item-text="name"
        label="Técnico"
        cache-items
        clearable
        hide-details
        box
      ></v-autocomplete>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs3>
      <!-- Add [Esc] event to cancel search -->
      <v-autocomplete
        :items="statusItems"
        :search-input.sync="filters.status"
        label="Estatus"
        cache-items
        clearable
        hide-details
        box
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

