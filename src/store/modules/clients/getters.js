export default {
    getDataTableItems: state => state.dataTable.dataTableItems,
    getDataTableItemToEdit: state => state.dataTable.dataTableItemToEdit,
    getSearch: state => state.dataTable.search,
    getTechnician: state => state.dataTable.filters.technician || '',
    getStatus: state => state.dataTable.filters.status || ''
}