import {
    Clients
} from '../db'

export default async () => {
    try {
        let docs = await Clients.find({
            selector: {
                technician: {
                    $gte: null
                }
            }
        })
        if (docs) return docs.docs
    } catch (error) {
        throw error
    }
}