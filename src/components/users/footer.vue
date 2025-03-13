<template>
  <footer class="bg-gray-800 text-white py-10" v-if="!isAdminPage">
    <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Logo -->
      <div class="border bg-white p-[20px] flex flex-col items-center justify-center rounded-[10px]">
        <img src="/src/assets/images/pngwing.com (5).png" alt="Logo du site" class="w-32 mb-4">
        <p class="text-gray-400">Style, qualité, élégance – trouvez votre look ici !</p>
      </div>

      <!-- Liens du Header -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Navigation</h3>
        <ul class="space-y-2">
          <li><router-link to="/" href="#" class="text-gray-400 hover:text-white">Accueil</router-link></li>
          <li><router-link to="/boutique" href="#" class="text-gray-400 hover:text-white">Boutique</router-link></li>
          <li><router-link to="/about" href="#" class="text-gray-400 hover:text-white">À propos</router-link></li>
          <li><router-link to="/contact" href="#" class="text-gray-400 hover:text-white">Contact</router-link></li>
        </ul>
      </div>

      <!-- Liste des Catégories -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Catégories</h3>
        <ul class="space-y-2">
          <li v-for="categorie in categories" :key="categorie.id"><router-link :to="`/category/${categorie.id}`"
              class="text-gray-400 hover:text-white">{{ categorie.name }}</router-link></li>
        </ul>
      </div>

      <!-- Liste des Marques & Connexion -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Marques</h3>
        <ul class="space-y-2">
          <li v-for="marque in marques"><router-link :to="`/marque/${marque.id}`"
              class="text-gray-400 hover:text-white">{{ marque.name }}</router-link></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      categories: [],
      marques: [],
      products: []
    }
  },

  async mounted() {
    await this.getCategories()
    await this.getMarques()
    await this.getProducts()
  },
  computed: {
    // Vérifier si l'URL correspond à une page d'admin
    isAdminPage() {
      return this.$route.path.includes('/dashboard');
    }
  },

  methods: {
    async getCategories() {
      try {
        console.log('Lancement de la requete...')
        const response = await fetch('https://vente-gq1m.onrender.com/api/categories')
        const data = await response.json()

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }

        this.categories = data

        console.log('Infos', data)

      } catch (error) {
        console.log("Une erreur s'est produits", error)
      }
    },
    async getMarques() {
      try {
        console.log('Lancement de la requete...')
        const response = await fetch('https://vente-gq1m.onrender.com/api/marques')
        const data = await response.json()

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des marques');
        }

        this.marques = data

        console.log('Infos', data)

      } catch (error) {
        console.log("Une erreur s'est produits", error)
      }
    },

    async getProducts() {
      try {
        console.log('Lancement de la requete...')
        const response = await fetch('https://vente-gq1m.onrender.com/api/products')
        const data = await response.json()

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }

        this.products = data

        console.log('Infos', data)

      } catch (error) {
        console.log("Une erreur s'est produits", error)
      }
    }

  },
}
</script>