import {
    Clients
} from '../db'

export default async (docs) => {
    try {
        let response = await Clients.bulkDocs(docs)
        let doc_ids = response.map(el => el.id)
        let result = await Clients.changes({
            include_docs: true,
            doc_ids
        })
        return result.results.map(el => el.doc)
    } catch (error) {
        throw error
    }
}