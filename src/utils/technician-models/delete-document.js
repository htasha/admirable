import {
    Technicians
} from '../db'

export default async doc => {
    try {
        let result = await Technicians.put(Object.assign(doc, {
            _deleted: true
        }))
        if (result.ok) return result
        return result
    } catch (error) {
        throw error
    }
}