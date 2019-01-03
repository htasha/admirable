<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-layout class="pa-3">
            <v-flex xs6 align-self-center>
              <v-data-table-menu class="mr-2"/>
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
            select-all
            item-key="_id"
          >
            <template slot="items" slot-scope="props">
              <v-hover>
                <tr slot-scope="{ hover }" :class="{bg: props.selected}">
                  <td>
                    <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                  </td>
                  <td>{{props.item.date | formatDate}}</td>
                  <td>{{props.item.fullName}}</td>
                  <td>{{props.item.idDoc}}</td>
                  <td>{{props.item.contactPhone}}</td>
                  <td>{{props.item.phone}}</td>
                  <td>{{props.item.imei}}</td>
                  <td class="table__data">{{props.item.description}}</td>
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
            <div slot="no-data" class="text-xs-center">Aun no has guardado ningun dato!</div>
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
import { mapGetters, mapMutations } from "vuex";
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
      { text: "Estatus", value: "status", sortable: false },
      { text: "", value: "actions", sortable: false }
    ],
    filters: {
      search: "",
      technician: "",
      status: ""
    }
  }),
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
      this.$refs.dialogForm.edit();
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
.bg {
  background-color: lightcyan !important;
}
</style>
