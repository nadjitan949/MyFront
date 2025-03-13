<template>
  <div class="container mx-auto p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">Tableau de bord Admin</h1>
      <p class="text-gray-600">Bienvenue, {{ adminName }}</p>
    </div>

    <!-- Statistiques principales -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Produits -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div class="bg-blue-100 p-4 rounded-full">
          <svg class="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18s-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <p class="text-2xl font-bold">{{ productCount }}</p>
          <p class="text-gray-500">Produits</p>
        </div>
      </div>

      <!-- Catégories -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div class="bg-green-100 p-4 rounded-full">
          <svg class="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12.714 19.714 21" />
          </svg>
        </div>
        <div>
          <p class="text-2xl font-bold">{{ categoryCount }}</p>
          <p class="text-gray-500">Catégories</p>
        </div>
      </div>

      <!-- Marques -->
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div class="bg-purple-100 p-4 rounded-full">
          <svg class="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p class="text-2xl font-bold">{{ brandCount }}</p>
          <p class="text-gray-500">Marques</p>
        </div>
      </div>
    </div>

    <!-- Activité récente -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-bold mb-4">Activité récente</h2>
      <div class="space-y-4">
        <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="activityColor(activity.type)">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path v-if="activity.type === 'product'"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13" />
              <path v-if="activity.type === 'category'"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12.714 19.714 21" />
              <path v-if="activity.type === 'brand'"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p class="text-gray-800">{{ activity.message }}</p>
            <small class="text-gray-500">{{ formatDate(activity.date) }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistiques avancées -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Graphique de ventes -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Statistiques de vente</h2>
        <div class="h-48">
          <!-- Ici vous pouvez intégrer une librairie de graphique comme Chart.js -->
          <p class="text-center text-gray-500 mt-10">Graphique à venir</p>
        </div>
      </div>

      <!-- Derniers produits ajoutés -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Derniers produits</h2>
        <div v-for="product in latestProducts" :key="product.id" class="flex justify-between items-center mb-2">
          <div>
            <p class="font-semibold">{{ product.name }}</p>
            <small class="text-gray-500">{{ product.category }}</small>
          </div>
          <span class="text-blue-500">{{ product.price }} €</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminName: 'Administrateur',
      products: [],
      categories: [],
      marques: [],
      recentActivities: [
        { id: 1, type: 'product', message: 'Nouveau produit ajouté', date: new Date() },
        { id: 2, type: 'category', message: 'Catégorie mise à jour', date: new Date() },
        { id: 3, type: 'brand', message: 'Nouvelle marque créée', date: new Date() }
      ]
    }
  },

  async mounted() {
    await this.getCategories()
    await this.getMarques()
    await this.getProducts()
  },
  computed: {
    productCount() {
      return this.products.length
    },
    categoryCount() {
      return this.categories.length
    },
    brandCount() {
      return this.marques.length
    },
    latestProducts() {
      return this.products.slice().reverse().slice(0, 3)
    }
  },
  methods: {
    activityColor(type) {
      const colors = {
        product: 'bg-blue-500',
        category: 'bg-green-500',
        brand: 'bg-purple-500'
      }
      return colors[type] || 'bg-gray-500'
    },
    formatDate(date) {
      const options = { hour: 'numeric', minute: 'numeric', hour12: false }
      return new Intl.DateTimeFormat('fr-FR', options).format(date)
    },

    async getCategories() {
      try {
        const response = await fetch('https://vente-gq1m.onrender.com/api/categories')
        const data = await response.json()

        this.categories = data

      } catch (error) {
        console.log('Erreur serveur', error)
      }
    },

    async getMarques() {
      try {
        const response = await fetch('https://vente-gq1m.onrender.com/api/marques')
        const data = await response.json()

        this.marques = data

      } catch (error) {
        console.log('Erreur serveur', error)
      }
    },

    async getProducts() {
      try {
        const response = await fetch('https://vente-gq1m.onrender.com/api/products')
        const data = await response.json()

        this.products = data

      } catch (error) {
        console.log('Erreur serveur', error)
      }
    }
  }
}
</script>

<style scoped>

</style>