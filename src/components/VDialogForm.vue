<template>
  <v-dialog max-width="500" v-model="dialog" @keydown.enter="add">
    <v-btn class="ma-0" color="primary" slot="activator">
      <v-icon left>mdi-plus</v-icon>añadir nuevo
    </v-btn>
    <v-card>
      <v-card-title>
        <h5 class="headline">{{indexOfItem !== -1 ? "Editar" : "Nuevo ingreso"}}</h5>
        <v-icon class="ml-2">mdi-{{indexOfItem !== -1 ? 'pencil' : 'plus'}}</v-icon>
        <v-spacer></v-spacer>
        <v-alert
          color="warning"
          :value="true"
          class="text-uppercase body-2 px-3 py-2"
          style="border-radius: 2px;"
        >en reparacion</v-alert>
      </v-card-title>
      <v-card-text v-if="warranty">
        <p class="caption mb-0">Garantía expiró el 12/12/2018</p>
      </v-card-text>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container grid-list-md fluid class="pa-0">
            <v-layout wrap>
              <v-flex xs12>
                <v-subheader class="pa-0 subheader_height--auto">Datos del cliente</v-subheader>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.fullName" :rules="rules" label="Nombre completo"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="editedItem.idDoc"
                  :rules="rules"
                  label="Documento de identidad"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="editedItem.contactPhone" :rules="rules" label="Telefono"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-subheader class="pa-0 subheader_height--auto">Datos del equipo</v-subheader>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="editedItem.phone" :rules="rules" label="Equipo"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="editedItem.imei" :rules="rules" label="IMEI"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="editedItem.description" :rules="rules" rows="1">
                  <div slot="label">
                    Reparación
                    <small>(descripción)</small>
                  </div>
                </v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-subheader class="pa-0 subheader_height--auto">
                  {{indexOfItem !== -1
                  ? "Estatus y garantía del equipo"
                  : "Estatus del equipo"}}
                </v-subheader>
              </v-flex>
              <v-flex xs6>
                <v-select v-model="editedItem.status" :items="statusItems" label="Estatus"></v-select>
              </v-flex>
              <v-flex xs6 v-if="editt">
                <v-text-field label="Tiempo de garantía" suffix="Días"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="blue">descartar</v-btn>
        <v-btn flat color="blue" @click="add">{{indexOfItem !== -1 ? 'actualizar' : 'añadir'}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data: () => ({
    editedItem: {
      date: "some date",
      fullName: null,
      idDoc: null,
      contactPhone: null,
      phone: null,
      imei: null,
      description: null,
      technician: "-",
      status: "En reparación"
    },
    defaultItem: {
      date: "some date",
      fullName: null,
      idDoc: null,
      contactPhone: null,
      phone: null,
      imei: null,
      description: null,
      technician: "-",
      status: "En reparación"
    },
    valid: false,
    dialog: false,
    warranty: false,
    editt: false,
    statusItems: [
      "Listo para entregar",
      "Esperando repuesto",
      "En reparación",
      "Retirado",
      "Garantía"
    ],
    rules: [v => !!v || "Campo requerido"],
    indexOfItem: -1,
    clients: null
  }),
  computed: {
    ...mapGetters(["getDataTableItems", "getDataTableItemToEdit"])
  },
  methods: {
    ...mapMutations(["ADD_NEW_DATABLE_ITEM", "UPDATE_DATABLE_ITEM"]),
    edit() {
      let itemToEdit = this.getDataTableItemToEdit;
      this.indexOfItem = this.clients.indexOf(itemToEdit);
      this.editedItem = Object.assign({}, itemToEdit);
      this.dialog = true;
    },
    add() {
      if (this.$refs.form.validate()) {
        if (this.indexOfItem > -1) {
          this.UPDATE_DATABLE_ITEM({
            item: this.editedItem,
            pos: this.indexOfItem
          });
          this.close();
        } else {
          this.ADD_NEW_DATABLE_ITEM(this.editedItem);
          this.close();
        }
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.indexOfItem = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.$refs.form.reset();
      });
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.clients = this.getDataTableItems;
  }
};
</script>

