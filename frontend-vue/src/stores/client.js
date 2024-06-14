import { clients } from '@/seeds/clients.js'
import { defineStore } from 'pinia'
export const useClientStore = defineStore('client', {
    state: () => ({
        clients,
        client: null
    }),
    getters: {},
    actions: {
        async getAllClients() {
            const response = await this.$http.get('/clients')
            this.clients = response.data
        },

        async setClient(id) {
            if (id == '-1') {
                this.client = {
                    idclient: -1,
                    firstName: "",
                    lastName: "",
                    companyName: "",
                    addDate: "",
                    fonction: "",
                    phone: "",
                    mail: "",
                    entreprise: "",
                    firstAddress: "",
                    secondAddress: "",
                    postalCode: "",
                    city: "",
                    country: ""
                };
            } else {
                const response = await this.$http.get('/clients/' + id)
                this.client = response.data
            }
        },
        async onUpdateClient(client) {
            const response = await this.$http.patch('/clients/' + client.idclient, client)
            console.log(response.data)
            this.client = null
            await this.getAllClients()
        },

        async onCreateClient(client) {
            const response = await this.$http.post('/clients', client)
            console.log(response.data)
            this.client = null
            await this.getAllClients()
        },

        async onDeleteClient(client) {
            await this.$http.delete('/clients/' + client.idclient)
            await this.getAllClients()
        }
    }
})
