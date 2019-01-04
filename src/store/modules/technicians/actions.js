import {
    TECHNICIAN_EXIST,
    ADD_NEW_TECHNICIAN,
    GET_ALL_TECHNICIANS,
    DELETE_TECHNICIAN
} from '@/store/action-types';
import {
    LOAD_TECHNICIANS_STATE
} from '@/store/mutation-types';
import {

} from '@/store/mutation-types';
import createNewDocument from '@/utils/technician-models/create-new-document'
import findAllDocsByTechnicianName from '@/utils/technician-models/find-all-docs-by-technician-name'
import fetchAllDocuments from '@/utils/technician-models/fetch-all-documents'
import findTechnicianById from '@/utils/technician-models/find-technician-by-id'
import deleteDocument from '@/utils/technician-models/delete-document'

export default {
    async [TECHNICIAN_EXIST](context, name) {
        try {
            let result = await findAllDocsByTechnicianName(name)
            if (result.found) Object.assign(result, {
                message: 'Este nombre ya se encuentra registrado'
            })
            return result
        } catch (error) {
            throw error
        }
    },
    async [ADD_NEW_TECHNICIAN](context, technician) {
        try {
            let docID = await createNewDocument(technician)
            let doc = await findTechnicianById(docID)
            return doc
        } catch (error) {
            throw error
        }
    },
    async [GET_ALL_TECHNICIANS](context) {
        try {
            let docs = await fetchAllDocuments()
            if (docs.length > 0) return docs
        } catch (error) {
            throw error
        }
    },
    async [DELETE_TECHNICIAN](context, technician) {
        try {
            let result = deleteDocument(technician)
            return result
        } catch (error) {
            throw error
        }
    }
}