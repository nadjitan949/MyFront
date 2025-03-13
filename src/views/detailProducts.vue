<template>
    <section class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- En-tête avec le nom du produit -->
            <div class="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
                <h1 class="text-3xl font-bold text-white">{{ product.name }}</h1>
            </div>

            <!-- Contenu principal -->
            <div class="p-6">
                <!-- Image du produit -->
                <div class="w-full mb-6 overflow-hidden rounded-lg">
                    <img :src="'https://vente-gq1m.onrender.com/' + product.image" :alt="product.name"
                        class="w-full h-full object-cover" />
                </div>

                <!-- Prix et description -->
                <div class="space-y-4">
                    <p class="text-2xl font-bold text-gray-900">
                        {{ product.price }} $
                    </p>
                    <p class="text-gray-700">
                        {{ product.description }}
                    </p>
                </div>

                <!-- Boutons d'action -->
                <div class="mt-6 flex space-x-4">
                    <button
                        class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200" @click="addToCart(product)">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useCart } from "../composable/userCart"

export default {
    name: 'DetailProduct',
    setup() {
        const { addToCart } = useCart()
        return { addToCart }
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            product: {
                name: '',
                price: 0,
                description: '',
                image: "", // Image par défaut
            },
        };
    },
    async mounted() {
        await this.getDetails(this.id);
    },
    methods: {
        async getDetails(id) {
            try {
                const response = await fetch(`https://vente-gq1m.onrender.com/api/product/${id}`, {
                    method: 'POST',
                });

                if (!response.ok) {
                    console.log("Erreur lors de la récupération d'un produit");
                    return;
                }

                const data = await response.json();
                this.product = data;
            } catch (error) {
                console.log('Erreur serveur !', error);
            }
        },
    },
};
</script>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>