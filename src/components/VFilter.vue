<template>
  <v-layout wrap>
    <v-flex xs12 offset-xs5>
      <v-subheader class="px-0">Filtrar por:</v-subheader>
    </v-flex>
    <v-flex xs3 offset-xs5>
      <v-select
        v-model="technician"
        :items="technicians"
        @change="$emit('technician', technician)"
        label="Técnico"
        hide-details
      ></v-select>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs3>
      <v-select
        v-model="status"
        :items="phoneStatus"
        @change="$emit('status', status)"
        label="Estatus"
        hide-details
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    phoneStatus: [
      "Listo para entregar",
      "Esperando repuesto",
      "En reparación",
      "Retirado",
      "Garantía"
    ],
    technicians: ["Miguel", "Johan", "Marcano"],
    technician: null,
    status: null
  }),
  methods: {
    change(val) {
      // this.$emit("filter", val);
    },
    clear(type) {
      console.log(type);
      type === "technician" ? (this.technician = null) : (this.status = null);
    }
  },
  watch: {
    technician(val) {
      // console.log(val);
    }
  }
};
</script>

