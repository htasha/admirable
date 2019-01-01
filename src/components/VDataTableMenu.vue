<template>
  <v-menu :close-on-content-click="false" offset-y max-width="250">
    <v-btn class="ma-0" icon slot="activator">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-list two-line v-if="showOptions">
      <v-subheader>Establecer estatus del equipo</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-select v-model="menu.status" :items="statusItems" label="Estatus" hide-details box></v-select>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-subheader>Asignar técnico</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-select v-model="menu.technician" :items="technicians" label="Técnico" hide-details box></v-select>
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
import { mapActions } from "vuex";

export default {
  data: () => ({
    menu: {
      technician: null,
      status: null
    },
    technicians: ["Miguel", "Johan", "Marcano"],
    statusItems: [
      "Listo para entregar",
      "Esperando repuesto",
      "En reparación",
      "Retirado",
      "Garantía"
    ]
  }),
  methods: {
    ...mapActions("clients", ["UPDATE_DOCUMENT"])
  },
  computed: {
    showOptions() {
      return this.$store.state.clients.dataTable.selectedDatableItem.length > 0;
    }
  },
  watch: {
    "menu.technician": async function(technician) {
      try {
        let response = await this.UPDATE_DOCUMENT({ technician });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    "menu.status": async function(status) {
      try {
        let response = await this.UPDATE_DOCUMENT({ status });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
