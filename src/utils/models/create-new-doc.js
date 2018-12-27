import {
    Clients
} from '../db'
import fetchDoc from './fetch-doc'

export default async (doc) => {
    try {
        let response = await Clients.put(doc)
        if (response.ok) {
            try {
                let item = await fetchDoc(response.id)
                return item
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}