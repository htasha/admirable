<template>
  <v-dialog max-width="500" v-model="dialog" persistent @keydown.esc="close">
    <v-btn class="ma-0" slot="activator" flat>añadir nuevo
      <v-icon right>mdi-plus</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h5 class="headline">{{ indexOfItem !== -1 ? "Editar" : "Nuevo ingreso" }}</h5>
        <v-icon class="ml-2">mdi-{{ indexOfItem !== -1 ? 'pencil' : 'plus' }}</v-icon>
        <v-spacer></v-spacer>
        <v-alert
          color="warning"
          :value="true"
          class="text-uppercase body-2 px-3 py-2"
          style="border-radius: 2px;"
        >{{editedItemStatus}}</v-alert>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
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
                <v-subheader class="pa-0 subheader_height--auto">Estatus del equipo</v-subheader>
              </v-flex>
              <v-flex xs6>
                <v-select v-model="editedItem.status" :items="statusItems" label="Estatus"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="blue" @click="close">descartar</v-btn>
        <v-btn flat color="blue" @click="add">{{ indexOfItem !== -1 ? 'actualizar' : 'añadir' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    valid: true,
    editedItem: {
      _id: null,
      date: null,
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
      _id: null,
      date: null,
      fullName: null,
      idDoc: null,
      contactPhone: null,
      phone: null,
      imei: null,
      description: null,
      technician: "-",
      status: "En reparación"
    },
    dialog: false,
    statusItems: [
      "Listo para entregar",
      "Esperando repuesto",
      "En reparación",
      "Retirado",
      "Garantía"
    ],
    rules: [v => !!v || "Campo requerido"],
    indexOfItem: -1,
    clients: null,
    doc: null,
    itemToEdit: null
  }),
  computed: {
    ...mapGetters("clients", ["getDataTableItems", "getDataTableItemToEdit"]),
    editedItemStatus() {
      return this.editedItem.status;
    }
  },
  methods: {
    ...mapActions("clients", ["CREATE_NEW_DOC", "UPDATE_DOCUMENT"]),
    ...mapMutations("clients", ["ENABLE_SNACKBAR"]),
    edit() {
      this.clients = this.getDataTableItems;
      this.itemToEdit = this.getDataTableItemToEdit;
      this.indexOfItem = this.clients.indexOf(this.itemToEdit);
      this.editedItem = Object.assign({}, this.itemToEdit);
      this.dialog = true;
    },
    add() {
      this.validateForm()
        ? this.indexOfItem > -1
          ? this.updateDatableItem()
          : this.createNewDatableItem()
        : false;
    },
    validateForm() {
      return this.$refs.form.validate();
    },
    async updateDatableItem() {
      try {
        let doc = { update: this.editedItem, oldDoc: this.itemToEdit };
        let response = await this.UPDATE_DOCUMENT(doc);
        if (response.updated) {
          this.close();
          this.ENABLE_SNACKBAR(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createNewDatableItem() {
      let date = this.$dayjs().format();
      this.doc = Object.assign(this.editedItem, {
        _id: date,
        date
      });
      try {
        const response = await this.CREATE_NEW_DOC(this.doc);
        if (response.created) {
          this.close();
          this.ENABLE_SNACKBAR(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.indexOfItem = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
        this.$refs.form.resetValidation();
      }, 300);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>