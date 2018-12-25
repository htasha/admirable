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
      ></v-autocomplete>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs3>
      <!-- Add [Esc] event to cancel search -->
      <v-autocomplete
        :items="status"
        :search-input.sync="filters.status"
        item-text="status"
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
    status: [
      { status: "Listo para entregar", filterType: "status" },
      { status: "Esperando repuesto", filterType: "status" },
      { status: "En reparación", filterType: "status" },
      { status: "Retirado", filterType: "status" },
      { status: "Garantía", filterType: "status" }
    ],
    technicians: [
      { name: "Miguel", filterType: "technician" },
      { name: "Johan", filterType: "technician" },
      { name: "Marcano", filterType: "technician" }
    ],
    filters: {
      technician: "",
      status: ""
    }
  }),
  methods: {
    ...mapMutations(["SET_FILTER", "CLEAR_FILTER"])
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

