import Vue from 'vue'
import Vuex from 'vuex'
import {
  UPDATE_SEARCH,
  ADD_NEW_DATABLE_ITEM,
  SAVE_DATABLE_ITEM_TO_EDIT
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
      dataTableItems: clients
    }
  },
  getters: {
    getDataTableItems: state => state.dataTable.dataTableItems,
    getDataTableItemToEdit: state => state.dataTable.dataTableItemToEdit,
    getSearch: state => state.dataTable.search
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
    }
  },
  actions: {

  }
})