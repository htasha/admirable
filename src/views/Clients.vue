<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-layout class="pa-3">
            <v-flex xs6 align-self-center>
              <v-data-table-menu/>
              <v-btn icon :disabled="!selected.length > 0" @click="deleteItem">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-dialog-form ref="dialogForm"/>
            </v-flex>
            <v-flex xs6>
              <v-filter/>
            </v-flex>
          </v-layout>
          <v-divider/>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="dataTableItems"
            :custom-filter="customFilter"
            :search="filters"
            item-key="_id"
            :loading="loading"
            rows-per-page-text="Filas por página"
            :rows-per-page-items="rowsPerPageItems"
            select-all
          >
            <template slot="items" slot-scope="props">
              <tr
                :class="{'blue lighten-5': props.selected && !$vuetify.dark, 'theme--dark': $vuetify.dark}"
                style="cursor: pointer"
                :active="props.selected"
              >
                <td style="position: relative">
                  <div class="table__td_border-l--solid" v-item-status="props.item.status"></div>
                  <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                </td>
                <td @click="edit(props.item)">{{props.item.date | formatDate}}</td>
                <td @click="edit(props.item)">{{props.item.fullName}}</td>
                <td @click="edit(props.item)">{{props.item.idDoc}}</td>
                <td @click="edit(props.item)">{{props.item.contactPhone}}</td>
                <td @click="edit(props.item)">{{props.item.phone}}</td>
                <td @click="edit(props.item)">{{props.item.imei}}</td>
                <td class="table__td" @click="edit(props.item)">{{props.item.description}}</td>
                <td @click="edit(props.item)">{{props.item.technician}}</td>
                <td @click="edit(props.item)">{{props.item.status}}</td>
              </tr>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="error"
              icon="mdi-alert"
            >Tu busqueda para "{{ search || filters.technician || filters.status }}" no fue encontrada.</v-alert>
            <div slot="no-data" class="text-xs-center">Aun no tienes ningun registro agregado!</div>
            <template
              slot="pageText"
              slot-scope="props"
            >{{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}</template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VDialogForm from "@/components/VDialogForm.vue";
import VDataTableMenu from "@/components/VDataTableMenu.vue";
import VFilter from "@/components/VFilter.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import dayjs from "dayjs";

export default {
  components: {
    VDialogForm,
    VDataTableMenu,
    VFilter
  },
  data: () => ({
    selected: [],
    headers: [
      { text: "Fecha", value: "date", sortable: false },
      { text: "Nombre completo", value: "fullName", sortable: false },
      { text: "Doc. Identidad", value: "idDoc", sortable: false },
      { text: "Telefono", value: "contactPhone", sortable: false },
      { text: "Equipo", value: "phone", sortable: false },
      { text: "IMEI", value: "imei", sortable: false },
      { text: "Descripción", value: "description", sortable: false },
      { text: "Técnico", value: "technician", sortable: false },
      { text: "Estatus", value: "status", sortable: false }
    ],
    filters: {
      search: "",
      technician: "",
      status: ""
    },
    loading: true,
    rowsPerPageItems: [10, 15, { text: "Todas", value: -1 }]
  }),
  directives: {
    "item-status": function(el, { value }) {
      switch (value) {
        case "Listo para entregar":
          el.style.borderLeftColor = "#2196F3";
          break;
        case "Esperando repuesto":
          el.style.borderLeftColor = "#424242";
          break;
        case "En reparación":
          el.style.borderLeftColor = "#FFC107";
          break;
        case "Retirado":
          el.style.borderLeftColor = "#4CAF50";
          break;
        case "Garantía":
          el.style.borderLeftColor = "#FF5252";
          break;
      }
    }
  },
  computed: {
    ...mapGetters("clients", {
      dataTableItems: "getDataTableItems",
      search: "getSearch",
      technician: "getTechnician",
      status: "getStatus"
    })
  },
  methods: {
    ...mapMutations("clients", [
      "SAVE_DATABLE_ITEM_TO_EDIT",
      "SAVE_SELECTED_DATABLE_ITEM",
      "SET_STATE",
      "ENABLE_SNACKBAR"
    ]),
    ...mapActions("clients", ["FETCH_ALL_DOCUMENTS", "DELETE_DOC"]),
    edit(item) {
      this.SAVE_DATABLE_ITEM_TO_EDIT(item);
      this.$refs.dialogForm.edit();
    },
    async deleteItem() {
      try {
        await this.DELETE_DOC(this.selected);
        this.ENABLE_SNACKBAR(
          `${this.selected.length} registro(s) eliminado(s) exitosamente`
        );
        this.selected = [];
      } catch (error) {
        console.log(error);
      }
    },
    customFilter(items, search, filter, headers) {
      const cf = new this.$MultiFilters(items, search, filter, headers);

      cf.registerFilter("search", function(word, items) {
        if (word.trim() === "") return items;

        return items.filter(item => {
          return (
            item.fullName.toLowerCase().includes(word.toLowerCase()) ||
            item.idDoc.toString().includes(word) ||
            item.contactPhone.toLowerCase().includes(word.toLowerCase()) ||
            item.imei.toLowerCase().includes(word.toLowerCase()) ||
            item.phone.toLowerCase().includes(word.toLowerCase()) ||
            item.description.toLowerCase().includes(word.toLowerCase()) ||
            item.status.toLowerCase().includes(word.toLowerCase())
          );
        }, word);
      });

      cf.registerFilter("technician", function(word, items) {
        if (word.trim() === "") return items;

        return items.filter(item => {
          return item.technician.toLowerCase().includes(word.toLowerCase());
        }, word);
      });

      cf.registerFilter("status", function(word, items) {
        if (word.trim() === "") return items;

        return items.filter(item => {
          return item.status.toLowerCase().includes(word.toLowerCase());
        }, word);
      });

      return cf.runFilters();
    }
  },
  filters: {
    formatDate: date => dayjs(date).format("DD/MM/YYYY")
  },
  watch: {
    selected(items) {
      this.SAVE_SELECTED_DATABLE_ITEM(items);
    },
    search(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        search: val
      });
    },
    technician(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        technician: val
      });
    },
    status(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        status: val
      });
    }
  },
  async created() {
    try {
      let docs = await this.FETCH_ALL_DOCUMENTS();
      this.SET_STATE(docs);
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style>
.table__td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 300px;
}
.table__actions {
  width: 36px;
}
.table__td_border-l--solid {
  position: absolute;
  border-left: 4px solid;
  width: 4px;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
