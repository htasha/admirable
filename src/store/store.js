import Vue from 'vue'
import Vuex from 'vuex'
import {
  UPDATE_SEARCH,
  ADD_NEW_DATABLE_ITEM,
  SAVE_DATABLE_ITEM_TO_EDIT,
  UPDATE_DATABLE_ITEM,
  SET_FILTER,
  UPDATE_MULTIPLE_DATABLE_ITEM,
  SAVE_SELECTED_DATABLE_ITEM
} from './mutation-types'
import {
  clients
} from '@/store/clients/clients'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataTable: {
      search: '',
      dataTableItemToEdit: null,
      dataTableItems: clients,
      filters: {
        technician: '',
        status: ''
      },
      selectedDatableItem: []
    }
  },
  getters: {
    getDataTableItems: state => state.dataTable.dataTableItems,
    getDataTableItemToEdit: state => state.dataTable.dataTableItemToEdit,
    getSearch: state => state.dataTable.search,
    getTechnician: state => state.dataTable.filters.technician || '',
    getStatus: state => state.dataTable.filters.status || ''
  },
  mutations: {
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
    }
  },
  actions: {

  }
})