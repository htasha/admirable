<template>
  <v-dialog max-width="500" v-model="dialog">
    <v-btn class="ma-0" color="primary" slot="activator">
      <v-icon left>mdi-plus</v-icon>añadir nuevo
    </v-btn>
    <v-card>
      <v-card-title>
        <h5 class="headline">Nuevo ingreso</h5>
        <v-icon class="ml-2">mdi-plus</v-icon>
        <v-spacer></v-spacer>
        <v-alert
          color="warning"
          :value="true"
          class="text-uppercase body-2 px-3 py-2"
          style="border-radius: 2px;"
        >en reparacion</v-alert>
      </v-card-title>
      <v-card-text>
        <p class="caption mb-0">Garantía expiró el 12/12/2018</p>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-container grid-list-md fluid class="pa-0">
            <v-layout wrap>
              <v-flex xs12>
                <v-subheader class="pa-0 subheader_height--auto">Datos del cliente</v-subheader>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Nombre completo"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="Documento de identidad"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="Telefono"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-subheader class="pa-0 subheader_height--auto">Datos del equipo</v-subheader>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="Equipo"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="IMEI"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea rows="1">
                  <div slot="label">
                    Reparación
                    <small>(descripción)</small>
                  </div>
                </v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-subheader class="pa-0 subheader_height--auto">Estatus y garantía del equipo</v-subheader>
              </v-flex>
              <v-flex xs6>
                <v-select v-model="status" :items="statusItems" label="Estatus"></v-select>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="Tiempo de garantía" suffix="Días"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="blue">descartar</v-btn>
        <v-btn flat color="blue">guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    statusItems: [
      "Listo para entregar",
      "Esperando repuesto",
      "En reparación",
      "Retirado",
      "Garantía"
    ],
    status: "En reparación"
  })
};
</script>

