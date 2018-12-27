import {
    UPDATE_SEARCH,
    ADD_NEW_DATABLE_ITEM,
    SAVE_DATABLE_ITEM_TO_EDIT,
    UPDATE_DATABLE_ITEM,
    SET_FILTER,
    UPDATE_MULTIPLE_DATABLE_ITEM,
    SAVE_SELECTED_DATABLE_ITEM,
    SET_STATE
} from '@/store/mutation-types'

export default {
    [UPDATE_SEARCH](state, search) {
        state.dataTable.search = search
    },
    [ADD_NEW_DATABLE_ITEM](state, item) {
        state.dataTable.dataTableItems.unshift(item)
    },
    [SAVE_DATABLE_ITEM_TO_EDIT](state, item) {
        state.dataTable.dataTableItemToEdit = item
    },
    [UPDATE_DATABLE_ITEM](state, payload) {
        Object.assign(state.dataTable.dataTableItems[payload.pos], payload.item)
    },
    [SET_FILTER](state, filter) {
        Object.assign(state.dataTable.filters, filter)
    },
    [SAVE_SELECTED_DATABLE_ITEM](state, item) {
        state.dataTable.selectedDatableItem = item
    },
    [UPDATE_MULTIPLE_DATABLE_ITEM](state, update) {
        let clients = state.dataTable.dataTableItems
        let selectedItem = state.dataTable.selectedDatableItem
        selectedItem.forEach(element => {
            Object.assign(clients[clients.indexOf(element)], update)
        });
    },
    [SET_STATE](state, data) {
        state.dataTable.dataTableItems = data
    }
}