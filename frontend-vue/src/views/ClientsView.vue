<template>
    <div>
        <!-- titre et bouton ajouter -->
        <div class="row border-bottom pb-3 mb-3">
            <div class="col">
                <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des clients</h1>
            </div>
            <div class="col text-end">
                <router-link to="/edit-client/-1" class="btn btn-outline-primary">
                    <i class="fa-solid fa-plus-circle me-2" />
                    Ajouter une client
                </router-link>
            </div>
        </div>

        <TableList>
            <ClientTableRow
                v-for="client in clients"
                :key="client.id"
                :client="client"
                @edit="onEditClient($event)"
                @delete="onDeleteClient($event)"
            ></ClientTableRow>
          </TableList>
        <pre>
        {{ clients }}
      </pre>
    </div>
</template>

<script>
import TableList from '@/components/Clients/TableList/TableList.vue'
import { useClientStore } from '@/stores/client.js'
import { mapActions, mapState } from 'pinia'
import ClientTableRow from "@/components/Clients/TableList/ClientTableRow.vue";

export default {
    components: {
        TableList,
        ClientTableRow
    },
    computed: {
        ...mapState(useClientStore, ['clients'])
    },

    // attention c'est une fonction asynchrone !!!!!
    async mounted() {
        // récupère les données de l'API
        await this.getAllClients()
    },

    methods: {
        ...mapActions(useClientStore, ['onDeleteClient', 'getAllClients']),
        onEditClient(client) {
            console.log('edit client with id: ', client.id)
            // je change de page programmatiquement avec le $router
            this.$router.push({
                name: 'edit-client',
                params: {
                    id: client.idclient
                }
            })
            // autre syntaxe en utilisant le path (dynamique)
            // this.$router.push({ path: `/edit-bill/${bill.id}`  })
        }
    }
}
</script>

<style scoped></style>