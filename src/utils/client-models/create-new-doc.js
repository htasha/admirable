import {
    Clients
} from '../db'
import fetchDoc from './fetch-doc'

export default async doc => {
    try {
        let response, item
        response = await Clients.put(doc)
        if (response.ok) return item = await fetchDoc(response.id)
    } catch (error) {
        console.log(error)
        if (error.status === 412) throw {
            error: true,
            message: '_id es requerido'
        }
    }
}