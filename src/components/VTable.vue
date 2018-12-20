<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    select-all
    :search="filters"
    item-key="idDoc"
    v-model="selected"
    :custom-filter="customFilter"
  >
    <template slot="items" slot-scope="props">
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
    </template>
    <v-alert
      slot="no-results"
      :value="true"
      color="error"
      icon="mdi-alert"
    >Tu busqueda para "{{ search }}" no fue encontrada.</v-alert>
  </v-data-table>
</template>

<script>
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
      { text: "Estatus", value: "status", sortable: false }
    ],
    clients: [
      {
        date: "15/12/2018",
        fullName: "Marcano Ahsath",
        idDoc: 24897942,
        contactPhone: "04241773316",
        phone: "HUAWEI Mate 9 Lite",
        imei: "008468123189132484",
        description: "Cambio puerto carga",
        technician: "Miguel",
        status: "Garantía"
      },
      {
        date: "24/12/2018",
        fullName: "Fernando jaramillo",
        idDoc: 59798855,
        contactPhone: "04241998855",
        phone: "Samsung s3 mini",
        imei: "054567868654854",
        description: "Pantalla completa",
        technician: "Marcano",
        status: "En reparación"
      },
      {
        date: "24/12/2018",
        fullName: "Fernando Correia",
        idDoc: 59798138,
        contactPhone: "04241998855",
        phone: "Samsung s3 mini",
        imei: "054567868654854",
        description: "Pantalla completa",
        technician: "Marcano",
        status: "Esperando repuesto"
      }
    ],
    filters: {
      search: "",
      technician: "",
      status: ""
    }
  }),
  props: {
    search: String,
    filterByTechnician: String,
    filterByStatus: String
  },
  methods: {
    customFilter(items, search, filter, headers) {
      const cf = new this.$MultiFilters(items, search, filter, headers);

      cf.registerFilter("search", function(word, items) {
        if (word.trim() === "") return items;

        return items.filter(item => {
          return (
            item.fullName.toLowerCase().includes(word.toLowerCase()) ||
            item.phone.toLowerCase().includes(word.toLowerCase())
          );
        }, word);
      });

      cf.registerFilter("technician", function(technician, items) {
        if (technician.trim() === "") return items;

        return items.filter(item => {
          return item.technician.toLowerCase() === technician.toLowerCase();
        }, technician);
      });

      cf.registerFilter("status", function(status, items) {
        if (status.trim() === "") return items;

        return items.filter(item => {
          return item.status.toLowerCase() === status.toLowerCase();
        }, status);
      });

      return cf.runFilters();
    }
  },
  watch: {
    search(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        search: val
      });
    },
    filterByTechnician(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        technician: val
      });
    },
    filterByStatus(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        status: val
      });
    }
  }
};
</script>
