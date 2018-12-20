<template>
  <v-app>
    <v-toolbar-search @search="search = $event"></v-toolbar-search>
    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex>
            <v-card>
              <v-layout class="pa-3" wrap>
                <v-flex xs12>
                  <!-- Add new -->
                  <v-dialog-form></v-dialog-form>
                </v-flex>
                <v-flex xs6 align-end class="display--flex">
                  <!-- Data table menu -->
                  <v-data-table-menu></v-data-table-menu>
                </v-flex>
                <v-flex xs6>
                  <!-- Data table filter -->
                  <v-filter @technician="technician = $event" @status="status = $event"></v-filter>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <!-- Table -->
              <v-table
                :search="search"
                :filter-by-technician="technician"
                :filter-by-status="status"
              ></v-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import VDialogForm from "@/components/VDialogForm.vue";
import VToolbarSearch from "@/components/VToolbarSearch.vue";
import VDataTableMenu from "@/components/VDataTableMenu.vue";
import VFilter from "@/components/VFilter.vue";
import VTable from "@/components/VTable.vue";

export default {
  data: () => ({
    search: "",
    technician: null,
    status: null
  }),
  components: {
    VToolbarSearch,
    VDialogForm,
    VDataTableMenu,
    VFilter,
    VTable
  },
  watch: {
    filterBy(val) {
      // console.log(val);
    }
  },
  methods: {
    damn(val) {
      console.log(val);
    }
  }
};
</script>
