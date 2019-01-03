import {
    Clients
} from '../db'

export default async () => {
    try {
        let docs = await Clients.allDocs({
            include_docs: true
        })
        if (docs) return docs
    } catch (error) {
        throw error
    }
}