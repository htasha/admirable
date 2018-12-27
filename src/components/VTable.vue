<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="dataTableItems"
    :custom-filter="customFilter"
    :search="filters"
    select-all
    item-key="idDoc"
  >
    <template slot="items" slot-scope="props">
      <v-hover>
        <tr slot-scope="{ hover }">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{props.item.date}}</td>
          <td>{{props.item.fullName}}</td>
          <td>{{props.item.idDoc}}</td>
          <td>{{props.item.contactPhone}}</td>
          <td>{{props.item.phone}}</td>
          <td>{{props.item.imei}}</td>
          <td>{{props.item.description}}</td>
          <td>{{props.item.technician}}</td>
          <td>{{props.item.status}}</td>
          <td class="pa-0">
            <div class="table__actions">
              <v-btn icon v-show="hover" @click="edit(props.item)" class="ma-0">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </v-hover>
    </template>
    <v-alert
      slot="no-results"
      :value="true"
      color="error"
      icon="mdi-alert"
    >Tu busqueda para "{{ search || filters.technician || filters.status }}" no fue encontrada.</v-alert>
  </v-data-table>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    selected: [],
    headers: [
      { text: "Fecha", value: "date", sortable: false },
      { text: "Nombre completo", value: "fullName", sortable: false },
      { text: "Documento de identidad", value: "idDoc", sortable: false },
      { text: "Telefono", value: "contactPhone", sortable: false },
      { text: "Equipo", value: "phone", sortable: false },
      { text: "IMEI", value: "imei", sortable: false },
      { text: "Descripción", value: "description", sortable: false },
      { text: "Técnico", value: "technician", sortable: false },
      { text: "Estatus", value: "status", sortable: false },
      { text: "", value: "actions", sortable: false }
    ],
    filters: {
      search: "",
      technician: "",
      status: ""
    }
  }),
  props: {
    registerRef: Object
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
      "SAVE_SELECTED_DATABLE_ITEM"
    ]),
    edit(item) {
      this.SAVE_DATABLE_ITEM_TO_EDIT(item);
      this.registerRef.edit();
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
  }
};
</script>

<style>
.table__data {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 300px;
}
.table__actions {
  width: 36px;
}
</style>
