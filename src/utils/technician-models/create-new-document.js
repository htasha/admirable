import {
    Technicians
} from '../db'
import findTechnicianById from '@/utils/technician-models/find-technician-by-id'

export default async doc => {
    try {
        let result = await Technicians.put(doc)
        if (result.ok) {
            let doc = await findTechnicianById(result.id)
            return doc
        }
    } catch (error) {
        throw error
    }
}