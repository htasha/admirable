<template>
  <v-menu :close-on-content-click="false" offset-y max-width="250">
    <v-btn class="ma-0" icon slot="activator">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-list two-line v-if="showOptions">
      <v-subheader>Establecer estatus del equipo</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-select v-model="menu.status" :items="status" label="Estatus" hide-details></v-select>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-subheader>Asignar técnico</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-select v-model="menu.technician" :items="technicians" label="Técnico" hide-details></v-select>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list v-else>
      <v-list-tile>
        <v-list-tile-content class="body-1 font-italic">Selecciona registros para ver más opciones</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    menu: {
      technician: null,
      status: null
    },
    technicians: ["Miguel", "Johan", "Marcano"],
    status: [
      "Listo para entregar",
      "Esperando repuesto",
      "En reparación",
      "Retirado",
      "Garantía"
    ]
  }),
  methods: {
    ...mapMutations("clients", ["UPDATE_MULTIPLE_DATABLE_ITEM"])
  },
  computed: {
    showOptions() {
      return this.$store.state.clients.dataTable.selectedDatableItem.length > 0;
    }
  },
  watch: {
    "menu.technician": function(technician) {
      this.UPDATE_MULTIPLE_DATABLE_ITEM({ technician });
    },
    "menu.status": function(status) {
      this.UPDATE_MULTIPLE_DATABLE_ITEM({ status });
    }
  }
};
</script>
