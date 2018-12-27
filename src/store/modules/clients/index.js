import mutations from './mutations'
import getters from './getters'

export default {
    namespaced: true,
    state: {
        dataTable: {
            search: '',
            dataTableItemToEdit: null,
            dataTableItems: [],
            filters: {
                technician: '',
                status: ''
            },
            selectedDatableItem: []
        }
    },
    mutations,
    getters
}