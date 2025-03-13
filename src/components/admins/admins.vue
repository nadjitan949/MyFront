<template>
  <div class="container mx-auto p-6 h-full">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestion des Admins</h1>
      <button @click="toggleForm" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        {{ formTitle }}
      </button>
    </div>

    <!-- Formulaire d'ajout/édition -->
    <div v-if="showForm" class="bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2">Email</label>
          <input v-model="formData.email" type="email" class="w-full border p-2 rounded" required>
        </div>
        <div>
          <label class="block mb-2">Mot de passe</label>
          <input v-model="formData.password" type="password" class="w-full border p-2 rounded" :required="!isEditing">
          <small v-if="isEditing" class="text-gray-500">Laissez vide pour garder le mot de passe actuel</small>
        </div>
      </div>
      <div class="flex justify-end gap-4 mt-6">
        <button @click="submitForm" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          {{ formButtonText }}
        </button>
        <button @click="cancelForm" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
          Annuler
        </button>
      </div>
    </div>

    <!-- Liste des admins -->
    <div v-if="isLoading" class=" w-full h-[500px] flex flex-col items-center justify-center gap-[20px]">
      <div class="w-12 h-12 border-t-4 border-gray-500 border-solid rounded-full animate-spin mx-auto"></div>
      <p>Chargement des admins...</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
      <div v-for="admin in admins" :key="admin.id"
        class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <p class="text-lg font-bold">{{ admin.email }}</p>
          <span v-if="admin.banned" class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm mt-2 inline-block">
            Banni
          </span>
        </div>
        <div class="flex gap-2">
          <button @click="editAdmin(admin)"
            class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button @click="deleteAdmin(admin.id)"
            class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      isEditing: false,
      formData: {
        id: null,
        email: '',
        password: '',
      },
      admins: [],
      isLoading: false
    }
  },
  computed: {
    formTitle() {
      return this.isEditing ? 'Modifier un admin' : 'Ajouter un admin'
    },
    formButtonText() {
      return this.isEditing ? 'Mettre à jour' : 'Ajouter'
    }
  },
  methods: {
    async fetchAdmins() {
      this.isLoading = true
      const response = await fetch('https://vente-gq1m.onrender.com/api/admins', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`
        }
      })
      const data = await response.json()
      this.admins = data
      this.isLoading = false
    },
    toggleForm() {
      this.showForm = !this.showForm
      this.resetForm()
    },
    resetForm() {
      this.formData = {
        id: null,
        email: '',
        password: '',
        banned: false
      }
      this.isEditing = false
    },
    async submitForm() {
      if (this.isEditing) {
        await this.updateAdmin()
      } else {
        await this.addAdmin()
      }
      this.toggleForm()
    },
    async addAdmin() {
      this.isLoading = true
      const response = await fetch('https://vente-gq1m.onrender.com/api/AdminSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`
        },
        body: JSON.stringify(this.formData)
      })
      const newAdmin = await response.json()
      this.isLoading = false
      alert('Nouveau admin ajouté !')
      this.admins.push(newAdmin)
      this.fetchAdmins()
    },
    async updateAdmin() {
      this.isLoading = true
      const response = await fetch(`https://vente-gq1m.onrender.com/api/setAdmin/${this.formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`
        },
        body: JSON.stringify(this.formData)
      })
      const updatedAdmin = await response.json()
      this.isLoading = false
      alert('Admin mis à jour !')
      const index = this.admins.findIndex(a => a.id === updatedAdmin.id)
      this.admins.splice(index, 1, updatedAdmin)
    },
    async deleteAdmin(id) {
      this.isLoading = true
      if (confirm(`Voulez-vous vraiment supprimer cet admin ?`)) {
        const response = await fetch(`https://vente-gq1m.onrender.com/api/delAdmin/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`
          }
        })

        const data = await response.json()
        this.isLoading = false
        alert(`Admin supprimé !`)
        this.fetchAdmins()
      }
    },
    editAdmin(admin) {
      this.formData = { ...admin }
      this.isEditing = true
      this.showForm = true
    },
    cancelForm() {
      this.toggleForm()
      this.resetForm()
    }
  },
  mounted() {
    this.fetchAdmins()
  }
}
</script>

<style scoped>
/* Styles ici */
</style>
