import {
    FETCH_ALL_DOCUMENTS
} from '@/store/action-types';

export default async store => {
    try {
        let items = await store.dispatch('clients/' + FETCH_ALL_DOCUMENTS)
        let mappedItems = items.rows.map(el => el.doc)
        store.commit('clients/SET_STATE', mappedItems)
    } catch (error) {
        console.log(error)
    }
}