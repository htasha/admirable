<template>
  <v-menu :close-on-content-click="false" offset-y max-width="250">
    <v-btn class="ma-0" icon slot="activator">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-list>
      <v-subheader>Establecer estatus del equipo</v-subheader>
      <v-list-tile @click>
        <v-list-tile-action>
          <v-checkbox v-model="readyForDeliver"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content @click="readyForDeliver = !readyForDeliver">Listo para entrega</v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click>
        <v-list-tile-action>
          <v-checkbox v-model="waitingForSpare"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content @click>Esperando repuesto</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>

      <v-subheader>Asignar tecnico</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-select :items="technicians" label="Tecnico" hide-details></v-select>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    readyForDeliver: false,
    waitingForSpare: false,
    technicians: ["Miguel", "Johan", "Marcano"]
  })
};
</script>
