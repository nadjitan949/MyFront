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
                    class=" w-[350px] lg:w-[600px] h-[50px] bg-white flex items-center justify-center rounded-[20px] overflow-hidden">
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
                                    class="w-[30px] h-[30px] flex items-center justify-center p-[30px] text-pink-500 hover:bg-pink-500 hover:text-white"><i
                                        class="fa-solid fa-cart-shopping"></i></button>
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


export default {
    name: 'ProductByCat',
    data() {
        return {
            products: [],
            isLoading: false,
            query: ''
        }
    },
    props: {
        id: {
            type: String,
            required: true
        },
    },

    async mounted() {
        await this.productCat(this.id)
    },
    watch: {
        // Surveiller les changements de l'ID
        id: {
            immediate: true, // Déclencher immédiatement au montage
            handler(newId) {
                this.productCat(newId); // Recharger les produits lorsque l'ID change
            },
        },
    },
    methods: {
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
        async productCat(id) {
            try {
                this.products = [];
                this.isLoading = true
                const response = await fetch(`https://vente-gq1m.onrender.com/api/category/${id}`, {
                    method: 'POST',
                    headers: {
                        'Cache-Control': 'no-cache', // Désactiver le cache
                    },
                })

                if (!response.ok) return console.log("Une erreur s'est produite")
                const data = await response.json()

                this.products = data
                this.isLoading = false

            } catch (error) {
                console.log('Erreur serveur', error)
            }
        },

    }
}

</script>