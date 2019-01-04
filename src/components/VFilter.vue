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
import { mapMutations, mapGetters } from "vuex";

export default {
  data: () => ({
    statusItems: [],
    technicians: [],
    filters: {
      technician: "",
      status: ""
    }
  }),
  computed: {
    ...mapGetters("technicians", ["getTechnicians", "getStatusItems"])
  },
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
  },
  mounted() {
    this.technicians = this.getTechnicians;
    this.statusItems = this.getStatusItems;
  }
};
</script>

