import {
    Technicians
} from '../db'

export default async name => {
    try {
        let docs = await Technicians.allDocs({
            include_docs: true
        })
        if (docs.rows.length > 0) return docs.rows.map(el => el.doc)
        return []
    } catch (error) {
        throw error
    }
}