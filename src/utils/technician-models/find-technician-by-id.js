import {
    Technicians
} from '../db'

export default async docID => {
    try {
        let doc = await Technicians.get(docID)
        return doc
    } catch (error) {
        throw error
    }
}