<template>
  <div class="container mx-auto lg:p-6 h-screen">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestion des Catégories</h1>
      <button @click="toggleForm" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        {{ formTitle }}
      </button>
    </div>

    <!-- Formulaire d'ajout/édition -->
    <div v-if="showForm" ref="categoryForm" class="bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block mb-2">Nom de la catégorie</label>
          <input v-model="formData.name" type="text" class="w-full border p-2 rounded" required>
        </div>
        <div>
          <label class="block mb-2">Image de la catégorie</label>
          <input @change="handleImageUpload" type="file" accept="image/*" class="mb-4">
          <div v-if="imagePreview" class="flex justify-center">
            <img :src="imagePreview" alt="Aperçu" class="max-w-xs max-h-48 rounded">
          </div>
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

    <!-- Liste des catégories -->
    <div v-if="isLoading" class=" w-full h-[500px] flex flex-col items-center justify-center gap-[20px]">
      <div class="w-12 h-12 border-t-4 border-gray-500 border-solid rounded-full animate-spin mx-auto"></div>
      <p>Chargement des categories...</p>
    </div>

    <div v-else class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 overflow-y-auto p-[10px]">
      <div v-for="category in categories" :key="category.id" class="bg-white p-4 rounded-lg shadow-md">
        <div class="relative">
          <div class=" w-full h-[350px] p-[40px] md:p-[30px] lg:p-[10px] overflow-hidden flex items-center justify-between">
            <img :src="'https://vente-gq1m.onrender.com/' + category.image" alt="Catégorie" class=" object-cover rounded mb-4">
          </div>
          <div class="absolute top-2 right-2 flex gap-2">
            <button @click="editCategory(category)"
              class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button @click="deleteCategory(category.id)"
              class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <h3 class="text-lg font-bold text-center">{{ category.name }}</h3>
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
      isLoading: false,
      formData: {
        id: null,
        name: '',
        image: null
      },
      categories: []
    }
  },
  computed: {
    formTitle() {
      return this.isEditing ? 'Modifier une catégorie' : 'Ajouter une catégorie'
    },
    formButtonText() {
      return this.isEditing ? 'Mettre à jour' : 'Ajouter'
    }
  },
  async mounted() {

    await this.getCategories()

  },
  methods: {
    async getCategories() {

      try {
        this.isLoading = true
        const response = await fetch('https://vente-gq1m.onrender.com/api/categories')
        if (!response.ok) {
          console.log("Une erreur s'est produite")
        }

        const data = await response.json()
        this.categories = data
        this.isLoading = false

      } catch (error) {
        console.log('Erreur serveur', error)
      }

    },
    toggleForm() {
      this.showForm = !this.showForm
      this.resetForm()
    },
    resetForm() {
      this.formData = {
        id: null,
        name: '',
        image: null
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
        let url, method;
        const formData = new FormData();
        formData.append('name', this.formData.name);

        if (this.formData.image instanceof File) {
          formData.append('image', this.formData.image);
        }

        if (this.isEditing) {
          url = `https://vente-gq1m.onrender.com/api/setCategory/${this.formData.id}`;
          method = 'PUT';
        } else {
          url = 'https://vente-gq1m.onrender.com/api/addCategory';
          method = "POST";
        }

        this.isLoading = true
        const response = await fetch(url, {
          method: method,
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`, // Envoyez le token dans l'en-tête
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi des données");
        }

        await this.getCategories(); // Rafraîchir la liste des catégories
        this.isLoading = false
        this.toggleForm(); // Fermer le formulaire
      } catch (error) {
        console.error('Erreur :', error);
      }
    },
    editCategory(category) {
      this.formData = { ...category }
      this.imagePreview = 'https://vente-gq1m.onrender.com/' + category.image
      this.isEditing = true
      this.showForm = true
      this.$nextTick(() => {
        if (this.$refs.categoryForm) {
          this.$refs.categoryForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    },
    async deleteCategory(id) {
      try {
        if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
          this.isLoading = true
          const response = await fetch(`https://vente-gq1m.onrender.com/api/delCategory/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('tokenAdmin')}`,
            },
          });

          if (response.ok) {
            this.categories = this.categories.filter(category => category.id !== id);
            this.isLoading = false
            alert('Catégorie supprimée avec succès.');
          } else {
            const errorData = await response.json();
            console.error('Erreur serveur:', errorData);
            alert(errorData.message || 'Erreur lors de la suppression de la catégorie.');
          }
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
        alert('Une erreur réseau est survenue. Veuillez vérifier votre connexion.');
      }
    },

    cancelForm() {
      this.toggleForm()
      this.resetForm()
    }
  }
}
</script>

<style>
/* Styles supplémentaires si nécessaire */
</style>