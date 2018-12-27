import {
    CREATE_NEW_DOC
} from '@/store/action-types';
import * as types from '@/store/mutation-types'
import createNewDoc from '@/utils/models/create-new-doc'

export default {
    async [CREATE_NEW_DOC](context, doc) {
        try {
            context.commit(types.ADD_NEW_DATABLE_ITEM, await createNewDoc(doc))
        } catch (error) {
            console.log(error)
        }
    }
}