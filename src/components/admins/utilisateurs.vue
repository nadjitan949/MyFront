<template>
  <div class="container mx-auto p-6">
    <!-- Header -->
    <h1 class="text-2xl font-bold mb-6">Gestion des Utilisateurs</h1>

    <!-- Liste des utilisateurs -->
     <div v-if="isLoading" class=" w-full h-[500px] flex flex-col items-center justify-center gap-[20px]">
      <div class="w-12 h-12 border-t-4 border-gray-500 border-solid rounded-full animate-spin mx-auto"></div>
      <p>Chargement des utilisateurs...</p>
     </div>


    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
      <div v-for="user in users" :key="user.id"
        class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <p class="text-gray-800 font-semibold">{{ user.email }}</p>

        </div>
        <button @click="toggleBan(user.id)"
          class=" text-white bg-red-500 cursor-pointer hover:opacity-60 px-4 py-2 rounded transition">
          Bannir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      isLoading: false
    }
  },
  async mounted() {
    await this.getUsers()
  },
  methods: {
    async getUsers() {

      try {
        this.isLoading = true
        const response = await fetch('https://vente-gq1m.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`
          }
        })
        if (!response.ok) {
          console.log('Erreur de chargement')
        }

        const data = await response.json()
        this.users = data
        this.isLoading = false
      } catch (error) {
        console.log('Erreur serveur !', error)
      }

    },
    async toggleBan(id) {
      if (confirm(`Voulez-vous vraiment bannir cet utilisateur ?`)) {
        this.isLoading = true
        const response = await fetch(`https://vente-gq1m.onrender.com/api/delUser/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`
          }

        })

        if (response.ok) {
          alert('Catégorie supprimée avec succès.');
          this.getUsers()
          this.isLoading = false
        } else {
          const data = await response.json();
          console.error('Erreur serveur:', data);
          alert(data.message || 'Erreur lors de la suppression de la catégorie.');
        }
      }
    }

  }
}
</script>

<style>
/* Styles supplémentaires si nécessaire */
</style>