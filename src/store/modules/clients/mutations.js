import {
    UPDATE_SEARCH,
    ADD_NEW_DATABLE_ITEM,
    SAVE_DATABLE_ITEM_TO_EDIT,
    UPDATE_DATABLE_ITEM,
    SET_FILTER,
    SAVE_SELECTED_DATABLE_ITEM,
    SET_STATE,
    IS_MINI,
    ENABLE_DARK
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
    [SET_FILTER](state, filter) {
        Object.assign(state.dataTable.filters, filter)
    },
    [SAVE_SELECTED_DATABLE_ITEM](state, item) {
        state.dataTable.selectedDatableItem = item
    },
    [UPDATE_DATABLE_ITEM](state, payload) {
        let clients = state.dataTable.dataTableItems
        let selectedItem = state.dataTable.selectedDatableItem
        if (payload.oldDoc) {
            Object.assign(clients[clients.indexOf(payload.oldDoc)], payload.update)
        } else {
            selectedItem.forEach((selectedEl, i) => {
                Object.assign(clients[clients.indexOf(selectedEl)], payload[i])
            });
        }
    },
    [SET_STATE](state, data) {
        state.dataTable.dataTableItems = data
    },
    [IS_MINI](state) {
        state.mini = !state.mini
    },
    [ENABLE_DARK](state, val) {
        state.dark = val
    }
}