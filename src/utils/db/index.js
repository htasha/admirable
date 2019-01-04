import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'
PouchDB.plugin(PouchdbFind)

// Create clients database
export const Clients = new PouchDB('clients')

// Create technicians database
export const Technicians = new PouchDB('technicians')

// Create index for look up technician field in Clients
Clients.createIndex({
    index: {
        fields: ['technician']
    }
})