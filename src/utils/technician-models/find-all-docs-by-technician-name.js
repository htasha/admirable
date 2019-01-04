import {
    Clients
} from '../db'

export default async technician => {
    try {
        let ob = {}
        let {
            docs
        } = await Clients.find({
            selector: {
                technician
            }
        })
        if (docs.length > 0) {
            return Object.assign(ob, {
                name: technician,
                count: docs.length,
                found: true
            })
        }
        return Object.assign(ob, {
            count: 0,
            found: false
        })
    } catch (error) {
        throw error
    }
}