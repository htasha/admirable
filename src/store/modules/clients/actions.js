import {
    CREATE_NEW_DOC,
    FETCH_ALL_DOCUMENTS,
    UPDATE_DOCUMENT
} from '@/store/action-types';
import {
    ADD_NEW_DATABLE_ITEM,
    UPDATE_DATABLE_ITEM
} from '@/store/mutation-types'
import createNewDoc from '@/utils/client-models/create-new-doc'
import fetchAllDocs from '@/utils/client-models/fetch-all-docs'
import updateDoc from '@/utils/client-models/update-doc'

export default {
    async [UPDATE_DOCUMENT](context, payload) {
        let selectedItems = context.state.dataTable.selectedDatableItem
        let isSelected = selectedItems.length > 0
        let docs = isSelected ? selectedItems.map(element => Object.assign({}, element, payload)) : [payload.update]

        try {
            let response = await updateDoc(docs)
            if (!isSelected) {
                let singleDoc = {
                    oldDoc: payload.oldDoc,
                    update: response[0]
                }
                context.commit(UPDATE_DATABLE_ITEM, singleDoc)
            } else {
                context.commit(UPDATE_DATABLE_ITEM, response)
            }
            return {
                updated: true,
                message: 'Registro(s) actualizado(s) exitosamente'
            }
        } catch (error) {
            console.log(error)
        }
    },
    async [FETCH_ALL_DOCUMENTS]() {
        try {
            let docs = await fetchAllDocs()
            if (docs) return docs
        } catch (error) {
            console.log(error)
        }
    },
    async [CREATE_NEW_DOC](context, doc) {
        try {
            let item = await createNewDoc(doc)
            if (item) {
                context.commit(ADD_NEW_DATABLE_ITEM, item)
                return {
                    created: true,
                    message: 'Registro creado exitosamente'
                }
            }
        } catch (error) {
            throw error
        }
    }
}