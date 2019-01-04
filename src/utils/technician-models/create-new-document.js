import {
    Technicians
} from '../db'

export default async doc => {
    try {
        let result = await Technicians.put(doc)
        if (result.ok) return result.id
    } catch (error) {
        throw error
    }
}