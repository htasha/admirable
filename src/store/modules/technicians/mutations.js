import {
    LOAD_TECHNICIANS_STATE,
    REMOVE_TECHNICIAN
} from '@/store/mutation-types'

export default {
    [LOAD_TECHNICIANS_STATE](state, payload) {
        state.technicians = payload
    },
    [REMOVE_TECHNICIAN](state, technician) {
        let techniciansArray = state.technicians
        let atIndex = techniciansArray.indexOf(technician)
        techniciansArray.splice(atIndex, 1)
    }
}