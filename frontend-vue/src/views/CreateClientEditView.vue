<template>
    <div v-if="client">

        <!-- titre et bouton ajouter -->
        <div class="row border-bottom pb-3 mb-3">
          <div class="col">
            <h1 v-if="isNewClient" class="h3">
              <i class="fa-solid fa-angle-down me-2" />Créer un client
            </h1>
            <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Editer un client</h1>
          </div>
          <div v-if="!isNewClient" class="col text-end">
            <button @click="deleteClient(client)" class="btn btn-outline-danger">
              <i class="fa-solid fa-trash me-2" />
              Supprimer le client
            </button>
          </div>
        </div>

        <div class="container mt-5">
            <h3>Éditer un client</h3>
            <form>
                <fieldset class="border p-3 mb-4">
                    <legend class="w-auto px-2">Contact:</legend>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="firstName" class="form-label">Prénom</label>
                            <input type="text" class="form-control" id="firstName" v-model="client.firstName">
                        </div>
                        <div class="col-md-6">
                            <label for="lastName" class="form-label">Nom</label>
                            <input type="text" class="form-control" id="lastName" v-model="client.lastName">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="fonction" class="form-label">Fonction</label>
                            <input type="text" class="form-control" id="fonction" v-model="client.fonction">
                        </div>
                        <div class="col-md-6">
                            <label for="phone" class="form-label">Téléphone</label>
                            <input type="tel" class="form-control" id="phone" v-model="client.phone">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="mail" class="form-label">Email</label>
                        <input type="email" class="form-control" id="mail" v-model="client.mail">
                    </div>
                    <div class="mb-3">
                        <label for="entreprise" class="form-label">Entreprise</label>
                        <input type="text" class="form-control" id="entreprise" v-model="client.entreprise">
                    </div>
                </fieldset>
                <fieldset class="border p-3 mb-4">
                    <legend class="w-auto px-2">Coordonnées:</legend>
                    <div class="mb-3">
                        <label for="firstAddress" class="form-label">Adresse 1</label>
                        <input type="text" class="form-control" id="firstAddress" v-model="client.firstAddress">
                    </div>
                    <div class="mb-3">
                        <label for="secondAddress" class="form-label">Adresse 2</label>
                        <input type="text" class="form-control" id="secondAddress" v-model="client.secondAddress">
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label for="postalCode" class="form-label">Code Postal</label>
                            <input type="text" class="form-control" id="postalCode" v-model="client.postalCode">
                        </div>
                        <div class="col-md-4">
                            <label for="city" class="form-label">Ville</label>
                            <input type="text" class="form-control" id="city" v-model="client.city">
                        </div>
                        <div class="col-md-4">
                            <label for="country" class="form-label">Pays</label>
                            <select class="form-select" id="country" v-model="client.country">
                                <option selected value="client.country">Choose...</option>
                                <option selected value="client.country">France</option>
                                <option selected value="client.country">Split</option>
                                <option selected value="client.country">Italie</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" @click="submitForm()" class="btn btn-primary">Enregistrer</button>
            </form>
        </div>

    </div>
</template>

<script>
import { clients } from '@/seeds/clients.js'
import { useClientStore } from '@/stores/client.js'
import { mapActions, mapWritableState } from 'pinia'

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      clients
    }
  },
  computed: {
    ...mapWritableState(useClientStore, ['client']),

    // test si c'est une nouvelle facture ou si on édite une facture existante
    isNewClient() {
      return this.id == '-1'
    },

    formInvalid() {
      return (
        !this.client.idclient ||
        !this.client.firstName ||
        !this.client.lastName ||
        !this.client.companyName
      )
    }
  },
  mounted() {
    this.setClient(this.id)
  },
  methods: {
    ...mapActions(useClientStore, ['onDeleteClient', 'onUpdateClient', 'onCreateClient', 'setClient']),
    submitForm() {
      if (this.isNewClient) {
        this.client.idclient = this.clients + 1
        this.onCreateClient(this.client)
      } else {
        this.onUpdateClient(this.client)
      }

      this.$router.push({ path: '/clients' })
    },

    deleteClient(client) {
      this.onDeleteClient(client)
      this.$router.push({ path: '/clients' })
    }
  }
}
</script>

<style scoped>
.table .th-actions {
  width: 10%;
}
.table .th-prestation {
  width: 44%;
}
.table .th-quantite {
  width: 10%;
}
.table .th-montant-ht,
.table .th-montant-total {
  width: 18%;
}
</style>
