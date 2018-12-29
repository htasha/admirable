import {
    Clients
} from '../db'

export default async docID => {

    try {
        let doc = await Clients.get(docID)
        if (doc) return doc
    } catch (error) {
        throw error
    }
}