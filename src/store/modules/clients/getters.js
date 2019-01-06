export default {
    getDataTableItems: state => state.dataTable.dataTableItems,
    getDataTableItemToEdit: state => state.dataTable.dataTableItemToEdit,
    getSelectedDatableItemLength: state => state.dataTable.selectedDatableItem.length,
    getSearch: state => state.dataTable.search,
    getTechnician: state => state.dataTable.filters.technician || '',
    getStatus: state => state.dataTable.filters.status || '',
    dark: state => state.dark,
    snackbar: state => state.snackbar,
    snackbarMessage: state => state.snackbarMessage
}