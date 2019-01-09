import {
    Clients
} from '../db'

export default async doc => {
    try {
        doc.forEach(el => {
            el._deleted = true
        });
        await Clients.bulkDocs(doc)
    } catch (error) {
        console.log(error)
    }
}