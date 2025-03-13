<template>
  <div class="container mx-auto p-6 h-full">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestion des Produits</h1>
      <button @click="toggleForm" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        {{ formTitle }}
      </button>
    </div>

    <!-- Formulaire d'ajout/édition -->
    <form action="" @submit.prevent="submitForm">
      <div v-if="showForm" ref="productForm" class="bg-white p-6 rounded-lg shadow-md mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Nom -->
          <div>
            <label class="block mb-2">Nom du produit</label>
            <input v-model="formData.name" type="text" class="w-full border p-2 rounded" required>
          </div>

          <!-- Prix -->
          <div>
            <label class="block mb-2">Prix</label>
            <input v-model.number="formData.price" type="number" step="0.01" class="w-full border p-2 rounded" required>
          </div>

          <!-- Catégorie -->
          <div>
            <label class="block mb-2">Catégorie</label>
            <select v-model="formData.categoryId" class="w-full border p-2 rounded" required>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <!-- Marque -->
          <div>
            <label class="block mb-2">Marque</label>
            <select v-model="formData.marqueId" class="w-full border p-2 rounded" required>
              <option v-for="marque in marques" :key="marque.id" :value="marque.id">
                {{ marque.name }}
              </option>
            </select>
          </div>

          <!-- Description -->
          <div class="col-span-full">
            <label class="block mb-2">Description</label>
            <textarea v-model="formData.description" class="w-full border p-2 rounded h-24" required></textarea>
          </div>

          <!-- Image -->
          <div class="col-span-full">
            <label class="block mb-2">Image</label>
            <input @change="handleImageUpload" type="file" accept="image/*" class="mb-4">
            <div v-if="imagePreview" class="flex justify-center">
              <img :src="imagePreview" alt="Aperçu" class="max-w-xs max-h-48 rounded">
            </div>
          </div>

          <!-- Quantité -->
          <div>
            <label class="block mb-2">Quantité</label>
            <input v-model.number="formData.quantity" type="number" class="w-full border p-2 rounded" required>
          </div>
        </div>

        <!-- Boutons de formulaire -->
        <div class="flex justify-end gap-4 mt-6">
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            {{ formButtonText }}
          </button>
          <button @click="cancelForm" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
            Annuler
          </button>
        </div>
      </div>
    </form>

    <!-- Liste des produits -->
    <div v-if="isLoading" class=" w-full h-[500px] flex flex-col items-center justify-center gap-[20px]">
      <div class="w-12 h-12 border-t-4 border-gray-500 border-solid rounded-full animate-spin mx-auto"></div>
      <p>Chargement des produits...</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg p-[20px] shadow-md">
        <div class="relative h-[400px] p-[30px] overflow-hidden">
          <div class="flex w-full h-full items-center justify-center">
            <img :src="'https://vente-gq1m.onrender.com/' + product.image" alt="Produit" class=" object-cover rounded mb-4">
          </div>
          <div class="absolute top-2 right-2 flex gap-2">
            <button @click="editProduct(product)"
              class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button @click="deleteProduct(product.id)"
              class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <h3 class="text-lg font-bold mb-2">{{ product.name }}</h3>
        <p class="text-gray-600 mb-4 h-[100px] overflow-y-scroll">{{ product.description }}</p>
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold text-blue-500">{{ product.price }} €</span>
          <span class="text-gray-500">Stock: {{ product.quantity }}</span>
        </div>
        <div class="flex gap-4">
          <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">
            Catégorie: {{ getCategoryName(product.categoryId) }}
          </span>
          <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">
            Marque: {{ getBrandName(product.marqueId) }}
          </span>
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
      imagePreview: null,
      formData: {
        id: null,
        name: '',
        price: 0,
        description: '',
        image: null,
        quantity: 0,
        categoryId: null,
        marqueId: null
      },
      products: [],
      categories: [],
      marques: [],
      isLoading: false
    }
  },
  async mounted() {
    await this.getCategories()
    await this.getProducts()
    await this.getMarques()
  },
  computed: {
    formTitle() {
      return this.isEditing ? 'Modifier un produit' : 'Ajouter un produit'
    },
    formButtonText() {
      return this.isEditing ? 'Mettre à jour' : 'Ajouter'
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm
      this.resetForm()
    },
    resetForm() {
      this.formData = {
        id: null,
        name: '',
        price: 0,
        description: '',
        image: null,
        quantity: 0,
        categoryId: null,
        marqueId: null
      }
      this.imagePreview = null
      this.isEditing = false
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      this.formData.image = file
      this.imagePreview = URL.createObjectURL(file)
    },
    async submitForm() {
      try {
        // Créez un objet FormData pour envoyer les données du formulaire
        const formDataToSend = new FormData();

        // Ajoutez les champs du formulaire à FormData
        formDataToSend.append('name', this.formData.name);
        formDataToSend.append('price', this.formData.price);
        formDataToSend.append('description', this.formData.description);
        formDataToSend.append('quantity', this.formData.quantity);
        formDataToSend.append('categoryId', this.formData.categoryId);
        formDataToSend.append('marqueId', this.formData.marqueId);

        // Ajoutez l'image si elle existe
        if (this.formData.image) {
          formDataToSend.append('image', this.formData.image);
        }

        // Déterminez l'URL et la méthode en fonction du mode (ajout ou édition)
        let url, method;
        if (this.isEditing) {
          url = `https://vente-gq1m.onrender.com/api/setProduct/${this.formData.id}`;
          method = 'PUT';
        } else {
          url = 'https://vente-gq1m.onrender.com/api/addProduct';
          method = 'POST';
        }

        // Envoyez la requête au backend
        this.isLoading = true
        const response = await fetch(url, {
          method: method,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`, // Envoyez le token dans l'en-tête
          },
          body: formDataToSend, // Utilisez FormData pour l'envoi
        });

        console.log('Statut de la réponse:', response.status);

        if (response.ok) {
          const data = await response.json();
          this.getProducts()
          if (this.isEditing) {
            // Mettre à jour le produit dans la liste
            const index = this.products.findIndex(p => p.id === this.formData.id);
            if (index !== -1) {
              this.products.splice(index, 1, data); // Remplacez le produit existant
            }
          } else {
            // Ajouter le nouveau produit à la liste
            this.products.push(data);
          }

          // Réinitialiser le formulaire et masquer le formulaire
          this.toggleForm();
          this.resetForm();
          this.isLoading = false
        } else {
          // Afficher l'erreur serveur
          const text = await response.text();
          console.error('Réponse du serveur:', text);
          alert('Erreur serveur. Veuillez vérifier la console pour plus de détails.');
        }
      } catch (error) {
        // Gestion des erreurs réseau
        console.error('Erreur réseau:', error);
        alert('Une erreur réseau est survenue. Veuillez vérifier votre connexion.');
      }
    },

    editProduct(product) {
      this.formData = { ...product }
      this.imagePreview = 'https://vente-gq1m.onrender.com/' + product.image
      this.isEditing = true
      this.showForm = true

      this.$nextTick(() => {
        if (this.$refs.productForm) {
          this.$refs.productForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn("Référence du formulaire non trouvée !");
        }
      });
    },
    async deleteProduct(id) {
      if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
        try {
          this.isLoading = true
          const response = await fetch(`https://vente-gq1m.onrender.com/api/delProduct/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`,
            },
          });

          if (response.ok) {
            // Supprimez le produit de la liste côté frontend
            this.products = this.products.filter(product => product.id !== id);
            Swal.fire({
              title: "Suppression !",
              text: `"${produit.nom}" a été supprimé avec succès.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });
            this.isLoading = false
          } else {
            const errorData = await response.json();
            console.error('Erreur serveur:', errorData);
            Swal.fire({
              title: "Erreur !",
              text: `Erreur l'or de la suppression du produit.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });
            this.isLoading = false
          }
        } catch (error) {
          console.error('Erreur réseau:', error);
          Swal.fire({
              title: "Erreur !",
              text: `Erreur reseau`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });
            this.isLoading = false
        }
      }
    },
    cancelForm() {
      this.toggleForm()
      this.resetForm()
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId)
      return category ? category.name : 'Non classé'
    },
    getBrandName(marqueId) {
      const brand = this.marques.find(b => b.id === marqueId)
      return brand ? brand.name : 'Marque inconnue'
    },

    async getCategories() {
      try {
        this.isLoading = true
        const response = await fetch('https://vente-gq1m.onrender.com/api/categories')
        const data = await response.json()

        this.categories = data
        this.isLoading = false

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

<style>
/* Styles supplémentaires si nécessaire */
</style>