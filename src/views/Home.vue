<template>
  <v-app>
    <v-toolbar-search></v-toolbar-search>
    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex>
            <v-card>
              <v-layout class="pa-3" wrap>
                <v-flex xs12>
                  <!-- Add new  -->
                  <v-dialog-form ref="dialogForm" @item-updated="updatedItem = $event"></v-dialog-form>
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
                :filter-by-technician="technician"
                :filter-by-status="status"
                :updated-item="updatedItem"
                :register-ref="dialogForm"
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
    technician: null,
    status: null,
    itemAdded: null,
    itemToEdit: null,
    updatedItem: null,
    clients: null,
    dialogForm: null
  }),
  components: {
    VToolbarSearch,
    VDialogForm,
    VDataTableMenu,
    VFilter,
    VTable
  },
  mounted() {
    this.dialogForm = this.$refs.dialogForm;
  }
};
</script>
