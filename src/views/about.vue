<template>
  <div class="about-page min-h-screen bg-gray-50">
    <!-- Section Héro -->

    <div
      class="bg-gradient-to-r from-[#ff1d8e2f] to-[#1d92ff36] py-12 h-[400px] m-[10px] rounded-[20px] flex items-center justify-center relative overflow-hidden">

      <div class="bull bull1"></div>
      <div class="bull bull2"></div>
      <div class="bull bull3"></div>
      <div class="bull bull4"></div>

      <div class="container mx-auto px-4 text-center absolute z-1">
        <h1 class="text-[50px] font-bold mb-4">Notre Histoire, Votre Style</h1>
        <p class="text-gray-500 max-w-2xl mx-auto">Depuis 2015, nous créons des vêtements qui inspirent</p>
      </div>
    </div>

    <!-- Notre Histoire -->
    <div class="container mx-auto px-6 py-16 ">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
        <div class=" w-[80%] md:w-[450px] h-auto md:h-[650px] m-auto">

          <div class=" w-full h-full bg-[#1d92ff36] rounded-[20px] transf1 ">

            <div class=" w-full h-full bg-[#ff1d8e2f] rounded-[20px] transf2">
              <img src="/src/assets/images/authentic-small-youthful-marketing-agency.jpg" alt="Atelier de confection"
                class="rounded-2xl shadow-lg hover:scale-105 transition-transform transf3">
            </div>

          </div>

        </div>
        <div>
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Notre Philosophie</h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            Fondée en 2015, [Nom de votre boutique] est née d'une passion pour la mode éthique et durable.
            Notre mission est de redéfinir l'industrie textile en alliant style moderne et responsabilité
            environnementale.
          </p>
          <ul class="grid grid-cols-2 gap-4">
            <li class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-[#ff1d8ece]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Matériaux durables</span>
            </li>
            <li class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-[#1d77ffce]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Fabrication éthique</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Notre Équipe -->
    <div class="bg-gray-50 py-16 ">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Notre Équipe Créative</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="member in team" :key="member.name"
            class="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow">
            <img :src="member.image" :alt="member.name" class="w-48 h-48 rounded-full mx-auto mb-4 object-cover">
            <h3 class="text-xl font-bold text-center">{{ member.name }}</h3>
            <p class="text-center text-gray-600">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Engagement Qualité -->
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="value in coreValues" :key="value.title"
          class="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
          <div class="w-16 h-16 mx-auto mb-4 text-pink-500">
            <i :class="value.icon" class="w-full h-full text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">{{ value.title }}</h3>
          <p class="text-gray-600">{{ value.description }}</p>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class=" bg-gradient-to-l from-[#ff1d8ece] to-[#1d7fffce] text-white py-12">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4">Prêt à Redéfinir Votre Style ?</h2>
        <p class="mb-6 max-w-2xl mx-auto">
          Découvrez notre dernière collection et trouvez les pièces qui expriment votre personnalité
        </p>
        <router-link to="/boutique"
          class="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-teal-100 transition-colors">
          Explorer la Collection
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      team: [
        { name: 'Lucas Dubois', role: 'Fondatrice & Directrice Créative', image: '/src/assets/images/handsome-adult-male-posing.jpg' },
        { name: 'Sophie Martin', role: 'Chef de Produit', image: '/src/assets/images/happy-friendly-legal-expert-posing-outside.jpg' },
        { name: 'Pierre Henry', role: 'Responsable Approvisionnement', image: '/src/assets/images/friendly-ceo-desk.jpg' }
      ],
      coreValues: [
        {
          title: 'Durabilité',
          icon: 'fas fa-leaf',
          description: '98% de nos matériaux sont certifiés écologiques'
        },
        {
          title: 'Qualité',
          icon: 'fas fa-check-circle',
          description: 'Contrôle qualité rigoureux à chaque étape'
        },
        {
          title: 'Innovation',
          icon: 'fas fa-lightbulb',
          description: 'Nouvelles collections chaque saison'
        }
      ]
    }
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 400px;
  border: solid;
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 300px;
  }
}

.transf1 {
  transform: rotate(3deg);
}

.transf2 {
  transform: rotate(-6deg);
}
.transf3 {
  transform: rotate(3deg);
}
</style>