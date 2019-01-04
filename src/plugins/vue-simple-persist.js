import {
    ENABLE_DARK
} from '@/store/mutation-types'

export default store => {
    store.commit(`clients/${ENABLE_DARK}`, JSON.parse(localStorage.getItem('dark')))
    store.subscribe(mutation => {
        if (mutation.type === `clients/${ENABLE_DARK}`) {
            localStorage.setItem('dark', mutation.payload)
        }
    })
}