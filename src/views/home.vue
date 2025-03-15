<template>

  <section class="w-full lg:h-[88vh] p-[10px] flex flex-col items-center justify-center gap-[10px]">


    <div
      class="w-full h-full rounded-[20px] bg-gradient-to-r from-[#ff1d8e2f] to-[#1d92ff36] relative overflow-hidden flex flex-col-reverse lg:flex-row items-center justify-between">

      <div class="bull bull1"></div>
      <div class="bull bull2"></div>
      <div class="bull bull3"></div>
      <div class="bull bull4"></div>

      <div class=" lg:w-[48%] h-full p-[50px] lg:p-[30px]">
        <div class="w-full py-[50px] lg:py-[100px]">
          <span class=" font-bold text-[30px] md:text-[45px] xl:text-[55px]">Soyez tendance, soyez vous même, à prix irrésistibles !</span>
        </div>
        <div class="xl:pr-[100px] text-gray-500">
          <p>Explorez notre nouvelle collection de vêtements, conçue pour allier confort, qualité et style. Que vous
            soyez à la recherche d'une tenue décontractée ou d'un look plus sophistiqué, nous avons ce qu'il vous faut.
            Avec des prix abordables et des designs modernes, vous pouvez désormais être tendance sans compromis.
            Redonnez vie à votre garde-robe et exprimez votre style unique avec nos pièces incontournables !</p>
        </div>
        <div class="mt-[50px] w-[200px]">
          <router-link to="/boutique"
            class="px-[40px] py-[5px] bg-white rounded-[30px] flex items-center justify-center gap-[20px] ombre"><span
              class="text-[#ff1d8ece] font-medium text-[17px]">Commencer</span> <span class="text-[30px]"><i
                class="fa-solid fa-chevron-right"></i></span></router-link>
        </div>
      </div>
      <div class="lg:w-[48%] h-auto p-[50px]">
        <div class="w-full h-full flex items-center justify-center">
          <img src="/src/assets/images/pngwing.com-_7_.webp" alt="" class=" w-full h-full object-cover">
        </div>
      </div>

    </div>

  </section>

  <section class="w-full h-auto p-[10px]">
    <div class="lg:w-full lg:h-[900px] rounded-[20px] flex flex-col-reverse lg:flex-row items-center justify-between">

      <div class="w-full lg:w-[49.5%] lg:h-full mt-[20px] lg:mt-0">
        <div class=" w-full h-[12%] flex items-center pl-[10px]">
          <span class=" text-[30px] xl:text-[40px] 2xl:text-[50px]">NOS CATEGORIES PRODUITS</span>
        </div>
        <div class="w-full lg:h-[88%]">

          <div class="lg:w-full h-[450px] lg:h-[500px] flex gap-[20px] overflow-x-scroll defile">

            <div class=" w-[250px] lg:w-[350px] h-full rounded-[20px] overflow-hidden shrink-0" v-for="categorie in categories" :key="categorie.id">

              <div class="w-full h-[75%] bg-[#1d92ff36] flex items-center justify-center p-[50px] overflow-hidden">
                <img :src="'https://vente-gq1m.onrender.com/' + categorie.image" alt="" class=" object-cover">
              </div>

              <div class="w-full h-[20%] p-[10px] flex flex-col">
                <span class="text-[30px]">{{ categorie.name }}</span>
                <div
                  class="border p-[10px] w-[130px] flex items-center justify-center rounded-[30px] hover:bg-black hover:text-white">
                  <router-link :to="`/category/${categorie.id}`">Produits</router-link>
                </div>
              </div>
            </div>

          </div>

          <div class=" w-full lg:h-[200px] p-[20px]">
            <p>Nous proposons une large gamme de produits répartis en plusieurs catégories pour répondre à tous vos
              besoins. Découvrez nos vêtements tendance, accessoires de mode, articles de maison et décoration, produits
              high-tech, cosmétiques et bien-être, ainsi que de nombreuses idées cadeaux. Chaque catégorie a été
              soigneusement sélectionnée pour vous offrir qualité et diversité.</p><br>

            <!-- <p>Nous mettons à votre disposition une sélection variée de produits répartis en plusieurs catégories pour
              répondre à tous vos besoins. Découvrez notre gamme de vêtements et d'accessoires pour un style unique, nos
              articles high-tech et gadgets innovants, ainsi que nos produits de beauté et de bien-être pour prendre
              soin de vous au quotidien. Pour votre intérieur, explorez notre collection maison et décoration, où chaque
              article est choisi pour allier esthétique et fonctionnalité. Enfin, retrouvez une multitude d’idées
              cadeaux pour faire plaisir à vos proches en toute occasion.
            </p> -->
          </div>
        </div>
      </div>

      <div class=" w-[99%] lg:w-[49.5%] h-full bg-[#ff1d8e2f] p-[20px] lg:p-0 rounded-[20px]" v-for="(categorie, index) in categories.slice(-1)"
        :key="index">

        <div class=" w-full h-[12%] flex items-center justify-between p-[20px]">
          <div class="flex items-center justify-center gap-[10px] "><span>Populaires</span><span><i
                class="fa-solid fa-arrow-trend-up"></i></span></div>
          <div class="flex items-center justify-center gap-[10px] "><span>Produits</span><span><i
                class="fa-brands fa-shopify"></i></span></div>
          <div class="flex items-center justify-center gap-[10px] "><router-link :to="`/category/${categorie.id}`">Visiter</router-link><span><i
                class="fa-solid fa-arrow-right"></i></span></div>
        </div>

        <div class="lg:h-[88%]">
          <div class="w-full lg:h-[85%] flex items-center justify-center p-[50px] 2xl:p-[200px]">
            <img :src="'https://vente-gq1m.onrender.com/' + categorie.image" alt="" class=" object-cover">
          </div>
          <div class="w-full h-[15%] flex items-center justify-center xl:justify-baseline lg:p-[56px]">
            <span class="text-[50px] lg:text-[90px] font-bold">{{ categorie.name }}</span>
          </div>
        </div>

      </div>

    </div>
  </section><br>

  <section class="w-full h-auto p-[10px]">
    <div class="lg:w-full lg:h-[900px] rounded-[20px] flex flex-col-reverse lg:flex-row items-center justify-between">

      <div class="w-full lg:w-[49.5%] lg:h-full mt-[20px] lg:mt-0">
        <div class=" w-full h-[12%] flex items-center pl-[10px]">
          <span class=" text-[30px] xl:text-[40px] 2xl:text-[50px]">NOS MARQUES</span>
        </div>
        <div class="w-full lg:h-[88%]">

          <div class="lg:w-full h-[450px] lg:h-[500px] flex gap-[20px] overflow-x-scroll defile">

            <div class=" w-[250px] lg:w-[350px] h-full rounded-[20px] overflow-hidden shrink-0" v-for="marque in marques">

              <div class="w-full h-[75%] bg-[#1d92ff36] flex items-center justify-center p-[50px] overflow-hidden">
                <img :src="'https://vente-gq1m.onrender.com/' + marque.image" alt="" class=" object-cover">
              </div>

              <div class="w-full h-[20%] p-[10px] flex flex-col">
                <span class="text-[30px]">{{ marque.name }}</span>
                <div
                  class="border p-[10px] w-[130px] flex items-center justify-center rounded-[30px] hover:bg-black hover:text-white">
                  <router-link :to="`/marque/${marque.id}`">Produits</router-link>
                </div>
              </div>
            </div>

          </div>

          <div class=" w-full lg:h-[200px] p-[20px]">
            <!-- <p>Nous proposons une large gamme de produits répartis en plusieurs catégories pour répondre à tous vos
              besoins. Découvrez nos vêtements tendance, accessoires de mode, articles de maison et décoration, produits
              high-tech, cosmétiques et bien-être, ainsi que de nombreuses idées cadeaux. Chaque catégorie a été
              soigneusement sélectionnée pour vous offrir qualité et diversité.</p><br> -->

            <p>Nous mettons à votre disposition une sélection variée de produits répartis en plusieurs catégories pour
              répondre à tous vos besoins. Découvrez notre gamme de vêtements et d'accessoires pour un style unique, nos
              articles high-tech et gadgets innovants, ainsi que nos produits de beauté et de bien-être pour prendre
              soin de vous au quotidien. Pour votre intérieur, explorez notre collection maison et décoration, où chaque
              article est choisi pour allier esthétique et fonctionnalité. Enfin, retrouvez une multitude d’idées
              cadeaux pour faire plaisir à vos proches en toute occasion.
            </p>
          </div>
        </div>
      </div>

      <div class=" w-[99%] lg:w-[49.5%] h-full bg-[#ff1d8e2f] p-[20px] lg:p-0 rounded-[20px]" v-for="marque in marques.slice(-1)">

        <div class=" w-full h-[12%] flex items-center justify-between p-[20px]">
          <div class="flex items-center justify-center gap-[10px] "><span>Populaires</span><span><i
                class="fa-solid fa-arrow-trend-up"></i></span></div>
          <div class="flex items-center justify-center gap-[10px] "><span>Produits</span><span><i
                class="fa-brands fa-shopify"></i></span></div>
          <div class="flex items-center justify-center gap-[10px] "><router-link :to="`/marque/${marque.id}`">Visiter</router-link><span><i
                class="fa-solid fa-arrow-right"></i></span></div>
        </div>

        <div class="lg:h-[88%]">
          <div class="w-full lg:h-[85%] flex items-center justify-center p-[50px] 2xl:p-[200px]">
            <img :src="'https://vente-gq1m.onrender.com/' + marque.image" alt="" class=" object-cover">
          </div>
          <div class="w-full h-[15%] flex items-center justify-center xl:justify-baseline lg:p-[56px]">
            <span class="text-[50px] lg:text-[90px] font-bold">{{ marque.name }}</span>
          </div>
        </div>

      </div>

    </div>
  </section><br>

  <section class="w-full h-auto p-[10px]">
    <div class="lg:w-full lg:h-[900px] rounded-[20px] flex flex-col-reverse lg:flex-row items-center justify-between">

      <div class="w-full lg:w-[49.5%] lg:h-full mt-[20px] lg:mt-0">
        <div class=" w-full h-[12%] flex items-center pl-[10px]">
          <span class=" text-[30px] xl:text-[40px] 2xl:text-[50px]">CATALOGUES PRODUITS</span>
        </div>
        <div class="w-full lg:h-[88%]">

          <div class="lg:w-full h-[450px] lg:h-[500px] flex gap-[20px] overflow-x-scroll defile">

            <div class=" w-[250px] lg:w-[350px] h-full rounded-[20px] overflow-hidden shrink-0" v-for="produit in products" :key="produit.id">

              <div class="w-full h-[75%] bg-[#1d92ff36] flex items-center justify-center p-[50px] overflow-hidden">
                <img :src="'https://vente-gq1m.onrender.com/' + produit.image" alt="" class=" object-cover">
              </div>

              <div class="w-full h-[20%] p-[10px] flex flex-col">
                <span class="text-[30px]">{{ produit.name }}</span>
                <div class="flex gap-[10px]">
                  <div
                  class="border p-[10px] w-[130px] flex items-center justify-center rounded-[30px] hover:bg-black hover:text-white">
                  <router-link :to="`/produit/${produit.id}`">Details</router-link>
                  
                </div>
                <button @click="addToCart(produit)" class="border w-[50px] h-[50px] rounded-full hover:bg-black hover:text-white"><i class="fa-solid fa-cart-shopping"></i></button>
                </div>
                
              </div>
            </div>

          </div>

          <div class=" w-full lg:h-[200px] p-[20px]">
            <p>Nous proposons une large gamme de produits répartis en plusieurs catégories pour répondre à tous vos
              besoins. Découvrez nos vêtements tendance, accessoires de mode, articles de maison et décoration, produits
              high-tech, cosmétiques et bien-être, ainsi que de nombreuses idées cadeaux. Chaque catégorie a été
              soigneusement sélectionnée pour vous offrir qualité et diversité.</p><br>

            <!-- <p>Nous mettons à votre disposition une sélection variée de produits répartis en plusieurs catégories pour
              répondre à tous vos besoins. Découvrez notre gamme de vêtements et d'accessoires pour un style unique, nos
              articles high-tech et gadgets innovants, ainsi que nos produits de beauté et de bien-être pour prendre
              soin de vous au quotidien. Pour votre intérieur, explorez notre collection maison et décoration, où chaque
              article est choisi pour allier esthétique et fonctionnalité. Enfin, retrouvez une multitude d’idées
              cadeaux pour faire plaisir à vos proches en toute occasion.
            </p> -->
          </div>
        </div>
      </div>

      <div class=" w-[99%] lg:w-[49.5%] h-full bg-[#ff1d8e2f] p-[20px] lg:p-0 rounded-[20px]" v-for="(produit, index) in products.slice(-1)"
        :key="index">

        <div class=" w-full h-[12%] flex items-center justify-between p-[20px]">
          <div class="flex items-center justify-center gap-[10px] "><span>Populaires</span><span><i
                class="fa-solid fa-arrow-trend-up"></i></span></div>
          <div class="flex items-center justify-center gap-[10px] "><span>Produits</span><span><i
                class="fa-brands fa-shopify"></i></span></div>
          <div class="flex items-center justify-center gap-[10px] "><router-link :to="`/produit/${produit.id}`">Visiter</router-link><span><i
                class="fa-solid fa-arrow-right"></i></span></div>
        </div>

        <div class="lg:h-[88%]">
          <div class="w-full lg:h-[85%] flex items-center justify-center p-[50px] 2xl:p-[200px]">
            <img :src="'https://vente-gq1m.onrender.com/' + produit.image" alt="" class=" object-cover">
          </div>
          <div class="w-full h-[15%] flex items-center justify-center xl:justify-baseline lg:p-[56px]">
            <span class="text-[50px] lg:text-[90px] font-bold">{{ produit.name }}</span>
          </div>
        </div>

      </div>

    </div>
  </section><br>

</template>

<script>
import { useCart } from "../composable/userCart"


export default {
  name: 'Home',

  props: ["produit"],

  setup() {
    const { addToCart } = useCart()
    return { addToCart }
  },

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
    await this.getProducts()
  },

  computed: {
    totalProd() {
      return this.products.length
    },
  },

  methods: {
    getProductCountInCategory(categoryId) {
      const category = this.categories.find(categorie => categorie.id === categoryId);
      return category ? category.products.length : 0;
    },
    // Méthode pour obtenir le nombre de produits dans une marque
    getProductCountInBrand(brandId) {
      const brand = this.marques.find(marque => marque.id === brandId);
      return brand ? brand.products.length : 0;
    },

    async getCategories() {
      try {
        console.log('Lancement de la requete...')
        const response = await fetch('https://vente-gq1m.onrender.com/api/categories')
        const data = await response.json()

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }

        this.categories = data


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

        this.totalProd = this.products.length()

        console.log('Infos', data)

      } catch (error) {
        console.log("Une erreur s'est produits", error)
      }
    },

  },

}



</script>

<style scoped>
.bull {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle at 80% 70%, #ff1d8e3a, #ffffff);
  z-index: -1;
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
  bottom: 150px;
}

.bull4 {
  width: 300px;
  height: 300px;
  left: -40px;
  top: -40px;
}

.ombre {
  box-shadow: 10px 10px 20px -10px black,
    -10px -10px 10px -5px rgba(255, 255, 255, 0.726);
}

.defile::-webkit-scrollbar {
  display: none;
}

@keyframes moveBall {
  0% {
    transform: translateY(0);
    /* Position de départ */
  }

  50% {
    transform: translateY(100px);
    /* Déplace l'élément de 10px vers le bas */
  }

  100% {
    transform: translateY(0);
    /* Retour à la position d'origine */
  }
}
</style>