import {
    Technicians
} from '../db'

export default async name => {
    try {
        let docs = await Technicians.allDocs({
            include_docs: true
        })
        if (docs) return docs.rows.map(el => el.doc)
    } catch (error) {
        throw error
    }
}