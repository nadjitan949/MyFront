<template>

    <div class="min-h-screen relative">
        <div
            class="bg-gradient-to-r from-[#ff1d8e2f] to-[#1d92ff36] py-12 h-[400px] m-[10px] rounded-[20px] flex items-center justify-center relative overflow-hidden">

            <div class="bull bull1"></div>
            <div class="bull bull2"></div>
            <div class="bull bull3"></div>
            <div class="bull bull4"></div>

            <div
                class="container mx-auto px-4 text-center absolute z-1 flex flex-col items-center justify-center gap-[20px]">
                <h1 class="text-[50px] font-bold mb-4">Notre Collection</h1>
                <p class="text-gray-500 max-w-2xl mx-auto">Découvrez nos produits soigneusement sélectionnés</p>
                <div
                    class=" w-[95%] md:w-[350px] lg:w-[600px] h-[50px] bg-white flex items-center justify-center rounded-[20px] overflow-hidden">
                    <form action="" class=" w-full h-full flex" @submit.prevent="search">
                        <input type="text" placeholder="Rechercher un produit..."
                            class=" w-[80%] h-full pl-[10px] focus:outline-0" v-model="query">
                        <button type="submit"
                            class="border-[2px] border-white bg-pink-500 hover:opacity-60 cursor-pointer w-[20%] h-full rounded-[20px] text-white text-[15px]"><span><i
                                    class="fa-solid fa-magnifying-glass"></i></span></button>
                    </form>
                </div>
            </div>
        </div>

        <div class=" w-[96%] h-auto pb-[30px] flex flex-col gap-[20px] items-center m-auto relative">
            <div class=" w-full h-[50px] flex items-center justify-center">
                <div class=" w-full lg:w-[800px] flex items-center justify-center">
                    <form action="" class=" flex gap-[20px] text-[12px] lg:text-[15px]">

                        <span>Filtrer par: </span>

                        <select name="" id="" @change="prodByCat($event.target.value)"
                            class="border lg:p-[10px] rounded-[10px]">
                            <option value="" selected disabled>Par categorie</option>
                            <option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">{{
                                categorie.name }}</option>
                        </select>

                        <select name="" id="" @change="prodByMarq($event.target.value)"
                            class="border p-[10px] rounded-[10px]">
                            <option value="" selected disabled>Par marques</option>
                            <option v-for="marque in marques" :key="marque.id" :value="marque.id">{{ marque.name }}
                            </option>
                        </select>

                    </form>
                </div>
            </div>

            <div class=" w-[96%] md:w-[90%] lg:w-[95%] xl:w-[75%] 2xl:w-[70%] h-auto flex flex-col items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3  gap-[20px]"
                v-if="products.length > 0">

                <div class=" w-[90%] h-[500px] rounded-[20px] p-[30px] lg:p-[10px] flex flex-col gap-[10px] shadow-lg group"
                    v-for="product in products">
                    <div class="w-full h-[330px] p-[30px] group-hover:p-[10px] overflow-hidden">
                        <img :src="'https://vente-gq1m.onrender.com/' + product.image" alt="" class=" object-cover">

                    </div>
                    <div class="w-full flex flex-col gap-[15px]">
                        <div class=" w-full flex flex-col">
                            <span class="text-xl font-bold">{{ product.name }}</span>
                            <span class="text-2xl text-pink-500">{{ product.price }} $</span>
                        </div>
                        <div class=" w-full flex gap-[20px]">
                            <router-link :to="`/produit/${product.id}`"
                                class="p-[12px] px-[30px] border rounded-[20px] text-pink-500 hover:bg-pink-500 hover:text-white">Descriptions</router-link>
                            <div
                                class="w-[50px] h-[50px] border flex items-center justify-center rounded-full border-pink-500 overflow-hidden">
                                <button @click="addToCart(product)"
                                    class="w-[30px] h-[30px] flex items-center justify-center p-[30px] text-pink-500 hover:bg-pink-500 hover:text-white"><i class="fa-solid fa-cart-shopping"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div v-else class="text-center text-xl text-gray-500">
                <div class="w-[700px] h-[500px] overflow-hidden flex flex-col items-center justify-center">
                    <img src="/src/assets/images/3582365.jpg" alt="" class="w-[400px] h-[400px] object-cover">
                    <p class="text-blue-500">Aucun produit trouvés !</p>
                </div>
            </div>

            <div v-if="isLoading"
                class="text-center w-full h-full bg-[#ffffffb6] backdrop-blur-3xl z-2 flex flex-col items-center justify-center absolute">
                <!-- Spinner de chargement -->
                <div class="w-12 h-12 border-t-4 border-pink-500 border-solid rounded-full animate-spin mx-auto"></div>
                <p class="mt-4 text-lg text-gray-500">Chargement des produits...</p>
            </div>


        </div>

    </div>
</template>


<script>
import { useCart } from "../composable/userCart"

export default {
    name: "Boutique",

    setup() {
        const { addToCart } = useCart()
        return { addToCart }
    },

    data() {
        return {
            categories: [],
            marques: [],
            products: [],
            query: '',
            message: '',
            isLoading: false
        }
    },

    async mounted() {
        await this.getCategories()
        await this.getMarques()
        await this.getProducts()
    },
    methods: {

        async getCategories() {
            try {
                this.isLoading = true

                const response = await fetch('https://vente-gq1m.onrender.com/api/categories')
                const data = await response.json()

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des catégories');
                }

                this.categories = data
                this.isLoading = false

            } catch (error) {
                console.log('Erreur serveur', error)
            }
        },

        async getMarques() {
            try {

                this.isLoading = true

                const response = await fetch('https://vente-gq1m.onrender.com/api/marques')
                const data = await response.json()

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des marques');
                }

                this.marques = data
                this.isLoading = false

            } catch (error) {
                console.log('Erreur serveur', error)
            }
        },

        async getProducts() {
            try {

                this.isLoading = true

                const response = await fetch('https://vente-gq1m.onrender.com/api/products')
                const data = await response.json()

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits');
                }

                this.products = data
                console.log(data)
                this.isLoading = false;

            } catch (error) {
                console.log('Erreur serveur', error)
            }
        },

        async search() {
            try {

                this.isLoading = true
                const response = await fetch('https://vente-gq1m.onrender.com/api/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: this.query
                    })
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits');
                }

                this.products = data
                this.isLoading = false

            } catch (error) {
                console.log('Erreur serveur', error)
            }
        },

        async prodByCat(categoryId) {
            try {
                this.isLoading = true
                const response = await fetch(`https://vente-gq1m.onrender.com/api/category/${categoryId}`, {
                    method: 'POST'
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits par catégorie');
                }

                this.products = data; // Met à jour la liste des produits affichés
                this.isLoading = false
            } catch (error) {
                console.log('Erreur serveur', error);
            }
        },

        async prodByMarq(categoryId) {
            try {
                this.isLoading = true
                const response = await fetch(`https://vente-gq1m.onrender.com/api/marque/${categoryId}`, {
                    method: 'POST'
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits par catégorie');
                }

                this.products = data; // Met à jour la liste des produits affichés
                this.isLoading = false
            } catch (error) {
                console.log('Erreur serveur', error);
            }
        }

    }


};
</script>

<style>
.product-card-enter-active,
.product-card-leave-active {
    transition: all 0.3s ease;
}

.product-card-enter-from,
.product-card-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.product-image {
    transition: transform 0.3s ease;
}

.product-card:hover .product-image {
    transform: scale(1.05);
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.bull {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle at 80% 70%, #ff1d8e3a, #ffffff);
    animation: moveBall 2s ease-in-out infinite;
}


.bull1 {
    width: 250px;
    height: 250px;
    top: 50px;
    right: 650px;
}

.bull2 {
    width: 150px;
    height: 150px;
    right: 1050px;
    top: 150px;
}

.bull3 {
    width: 100px;
    height: 100px;
    left: 200px;
    bottom: 80px;
}

.bull4 {
    width: 300px;
    height: 300px;
    left: -40px;
    top: -40px;
}
</style>