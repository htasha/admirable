<template>
  <v-layout justify-end>
    <v-flex xs6 sm6 md6 lg4 align-self-center class="mr-3">
      <v-autocomplete
        :items="technicians"
        :search-input.sync="filters.technician"
        item-text="name"
        label="Técnico"
        cache-items
        clearable
        hide-details
      >
        <v-list slot="no-data">
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>mdi-alert-outline</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Sin técnicos para filtrar</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-autocomplete>
    </v-flex>
    <v-flex xs6 sm6 md6 lg4 align-self-center>
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
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      statusItems: [],
      technicians: [],
      filters: {
        technician: "",
        status: ""
      }
    };
  },
  computed: {
    ...mapGetters("technicians", ["getTechnicians", "getStatusItems"])
  },
  methods: {
    ...mapMutations("clients", ["SET_FILTER", "CLEAR_FILTER"]),
    ...mapMutations("technicians", ["LOAD_TECHNICIANS_STATE"]),
    ...mapActions("technicians", ["GET_ALL_TECHNICIANS"])
  },
  watch: {
    "filters.technician": function(technician) {
      this.SET_FILTER({ technician });
    },
    "filters.status": function(status) {
      this.SET_FILTER({ status });
    }
  },
  async created() {
    this.statusItems = this.getStatusItems;
    try {
      this.technicians = await this.GET_ALL_TECHNICIANS();
      this.LOAD_TECHNICIANS_STATE(this.technicians);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

