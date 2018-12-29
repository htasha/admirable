import {
    CREATE_NEW_DOC,
    FETCH_ALL_DOCUMENTS
} from '@/store/action-types';
import {
    ADD_NEW_DATABLE_ITEM
} from '@/store/mutation-types'
import createNewDoc from '@/utils/models/create-new-doc'
import fetchAllDocs from '@/utils/models/fetch-all-docs'

export default {
    async [FETCH_ALL_DOCUMENTS](context) {
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
                    message: 'Item created successfully'
                }
            }
        } catch (error) {
            throw error
        }
    }
}