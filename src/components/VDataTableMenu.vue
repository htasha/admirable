<template>
  <v-menu :close-on-content-click="false" offset-y max-width="250">
    <v-btn class="ma-0" icon slot="activator">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-list two-line v-if="selectedItems > 0">
      <v-subheader>Establecer estatus del equipo</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-select v-model="menu.status" :items="getStatusItems" label="Estatus" hide-details></v-select>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
      <v-subheader>Asignar técnico</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-select
            v-model="menu.technician"
            :items="getTechnicians"
            item-text="name"
            label="Técnico"
            hide-details
          >
            <v-list slot="no-data">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-icon>mdi-alert-outline</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Sin técnicos para asignar</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-select>
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
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    menu: {
      technician: null,
      status: null
    },
    technicians: [],
    statusItems: []
  }),
  methods: {
    ...mapActions("clients", ["UPDATE_DOCUMENT"]),
    ...mapMutations("clients", ["ENABLE_SNACKBAR"])
  },
  computed: {
    ...mapGetters("clients", {
      selectedItems: "getSelectedDatableItemLength"
    }),
    ...mapGetters("technicians", ["getTechnicians", "getStatusItems"])
  },
  watch: {
    "menu.technician": async function(technician) {
      try {
        let response = await this.UPDATE_DOCUMENT({ technician });
        if (response.updated)
          this.ENABLE_SNACKBAR(
            `${this.selectedItems} registro(s) actualizado(s) exitosamente`
          );
      } catch (error) {
        console.log(error);
      }
    },
    "menu.status": async function(status) {
      try {
        let response = await this.UPDATE_DOCUMENT({ status });
        if (response.updated)
          this.ENABLE_SNACKBAR(
            `${this.selectedItems} registro(s) actualizado(s) exitosamente`
          );
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
