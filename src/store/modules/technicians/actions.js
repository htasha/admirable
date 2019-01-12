import {
    TECHNICIAN_EXIST,
    ADD_NEW_TECHNICIAN,
    GET_ALL_TECHNICIANS,
    DELETE_TECHNICIAN
} from '@/store/action-types';

import createNewDocument from '@/utils/technician-models/create-new-document'
import findAllDocsByTechnicianName from '@/utils/technician-models/find-all-docs-by-technician-name'
import fetchAllDocuments from '@/utils/technician-models/fetch-all-documents'
import deleteDocument from '@/utils/technician-models/delete-document'

export default {
    async [TECHNICIAN_EXIST](context, name) {
        try {
            let result = await findAllDocsByTechnicianName(name)
            return result
        } catch (error) {
            throw error
        }
    },
    async [ADD_NEW_TECHNICIAN](context, technician) {
        try {
            let doc = await createNewDocument(technician)
            return {
                doc,
                created: true
            }
        } catch (error) {
            throw error
        }
    },
    async [GET_ALL_TECHNICIANS](context) {
        try {
            return await fetchAllDocuments()
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