<template>
  <div v-if="isLoading"
    class="text-center fixed w-full h-full backdrop-blur-3xl z-4 flex flex-col items-center justify-center">
    <!-- Spinner de chargement -->
    <div class="w-12 h-12 border-t-4 border-pink-500 border-solid rounded-full animate-spin mx-auto"></div>
    <p class="mt-4 text-lg text-gray-500">Veuillez patienter...</p>
  </div>

  <section>
    <!-- Header avec transition de max-height -->
    <header :class="['p-[10px] transition-all duration-300 ease-in-out overflow-hidden', { 'max-h-[100px]': !isMobileMenuOpen, 'max-h-[350px]': isMobileMenuOpen }]" v-if="!isAdminPage">
      <nav class="w-full h-auto flex items-center justify-between">
        <!-- Logo -->
        <div class="w-[80px] h-auto">
          <img src="/src/assets/images/pngwing.com (5).png" alt="" class="w-full h-full object-cover">
        </div>

        <!-- Menu pour les écrans larges (lg et plus) -->
        <div class="hidden md:flex h-auto md:gap-0 lg:gap-[100px]">
          <ul class="flex gap-[30px] text-gray-400 items-center md:text-[13px] lg:text-[15px]">
            <li><router-link to="/" class="hover:text-[#ff1d8ece] after">ACCEUIL</router-link></li>
            <li><router-link to="/about" class="hover:text-[#ff1d8ece] after">A PROPOS</router-link></li>
            <li><router-link to="/boutique" class="hover:text-[#ff1d8ece] after">PRODUITS</router-link></li>
            <li><router-link to="/contact" class="hover:text-[#ff1d8ece] after">CONTACT</router-link></li>
            <li><router-link to="/dashboard/adpan" class="hover:text-[#ff1d8ece] after">ADMIN</router-link></li>
            <li><span class="text-gray-600">{{ userName }}</span></li>
          </ul>
          <div class="flex items-center justify-center gap-[20px]">
            <router-link to="/cart" class="text-[30px] text-gray-600 hover:text-[#ff1d8ece]">
              <i class="fa-solid fa-cart-shopping"></i>
            </router-link>
            <div v-if="isLoggedIn">
              <button @click="logout"
                class="h-[50px] w-[150px] md:hidden lg:flex items-center justify-center rounded-[20px] bg-[#ff1d8ece] hover:opacity-80 text-white font-bold">
                Se déconnecter
              </button>
            </div>
            <div v-else>
              <button @click="openModal('login')"
                class="h-[50px] w-[150px] md:hidden lg:flex items-center justify-center rounded-[20px] bg-[#ff1d8ece] hover:opacity-80 text-white font-bold">
                Se connecter
              </button>
            </div>
          </div>
        </div>

        <!-- Menu pour les écrans mobiles (sm et moins) -->
        <div class="lg:hidden flex items-center gap-4">
          <!-- Bouton du panier -->
          <router-link to="/cart" class="text-[30px] text-gray-600 hover:text-[#ff1d8ece]">
            <i class="fa-solid fa-cart-shopping"></i>
          </router-link>

          <!-- Bouton de connexion/déconnexion -->
          <div v-if="isLoggedIn">
            <button @click="logout"
              class="h-[50px] w-[50px] flex items-center justify-center rounded-[20px] bg-[#ff1d8ece] hover:opacity-80 text-white font-bold">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
          <div v-else>
            <button @click="openModal('login')"
              class="h-[50px] w-[50px] flex items-center justify-center rounded-[20px] bg-[#ff1d8ece] hover:opacity-80 text-white font-bold">
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          </div>

          <!-- Bouton du menu hamburger -->
          <button @click="toggleMobileMenu" class="text-gray-600 hover:text-gray-900 focus:outline-none">
            <i class="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>

      <!-- Menu mobile avec transition -->
      <transition name="slide">
        <div v-if="isMobileMenuOpen" class="lg:hidden mt-4">
          <ul class="flex flex-col gap-4 text-gray-400" @click="toggleMobileMenu">
            <li><router-link to="/" class="hover:text-[#ff1d8ece] after">ACCEUIL</router-link></li>
            <li><router-link to="/about" class="hover:text-[#ff1d8ece] after">A PROPOS</router-link></li>
            <li><router-link to="/boutique" class="hover:text-[#ff1d8ece] after">PRODUITS</router-link></li>
            <li><router-link to="/contact" class="hover:text-[#ff1d8ece] after">CONTACT</router-link></li>
            <li><router-link to="/dashboard/adpan" class="hover:text-[#ff1d8ece] after">ADMIN</router-link></li>
            <li><span class="text-gray-600 after">{{ userName }}</span></li>
          </ul>
        </div>
      </transition>
    </header>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-2">
      <div class="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[400px] relative">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900">&times;</button>
        <h2 class="text-xl font-bold mb-4 text-center">{{ modalType === 'login' ? 'Connexion' : 'Inscription' }}</h2>
        <form @submit.prevent="submitForm">
          <input type="email" placeholder="Email" class="w-full p-2 border rounded mb-3" v-model="users.email" required>
          <input type="password" placeholder="Mot de passe" class="w-full p-2 border rounded mb-3"
            v-model="users.password" required>
          <p class="text-red-500 text-[13px]">{{ message }}</p><br>
          <button type="submit" class="w-full bg-[#ff1d8ece] text-white p-2 rounded hover:opacity-80">
            {{ modalType === 'login' ? 'Se connecter' : "S'inscrire" }}
          </button>
        </form>
        <p class="text-center text-sm mt-4">
          {{ modalType === 'login' ? "Pas encore de compte ?" : "Déjà un compte ?" }}
          <span @click="toggleModal" class="text-[#ff1d8ece] cursor-pointer hover:underline">
            {{ modalType === 'login' ? "S'inscrire" : "Se connecter" }}
          </span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { useCart } from "../../composable/userCart"

export default {
  name: 'Header',
  setup() {
    const { cartCount } = useCart()
    return { cartCount }
  },

  data() {
    return {
      users: {
        email: '',
        password: ''
      },
      showModal: false,
      modalType: 'login',
      message: '',
      isLoggedIn: false,
      isLoading: false,
      isMobileMenuOpen: false, // État du menu mobile
    };
  },

  methods: {
    openModal(type) {
      this.modalType = type;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    toggleModal() {
      this.modalType = this.modalType === 'login' ? 'register' : 'login';
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen; // Basculer l'état du menu mobile
    },
    async submitForm() {
      this.isLoading = true;
      try {
        const url = this.modalType === 'login' ? 'https://vente-gq1m.onrender.com/api/UserLogin' : 'https://vente-gq1m.onrender.com/api/UserSignup'
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.users.email,
            password: this.users.password
          })
        })

        const data = await response.json()

        if (response.ok) {
          this.closeModal();
          if (this.modalType === 'login') {
            localStorage.setItem('tokenUser', data.token);
            localStorage.setItem('userName', data.email);
            this.checkUserStatus();
          }
        } else {
          this.message = data.message;
        }
      } catch (error) {
        console.log("Une erreur s'est produite");
      } finally {
        this.isLoading = false;
      }
    },
    checkUserStatus() {
      const token = localStorage.getItem('tokenUser');
      if (token) {
        this.isLoggedIn = true;
        this.userName = localStorage.getItem('userName');
      } else {
        this.isLoggedIn = false;
        this.userName = '';
      }
    },
    logout() {
      localStorage.removeItem('tokenUser');
      localStorage.removeItem('userName');
      this.checkUserStatus();
    }
  },
  computed: {
    isAdminPage() {
      return this.$route.path.includes('/dashboard');
    }
  }
};
</script>

<style scoped>
.after {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.after:hover::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: #FF1D8D;
  bottom: -5px;
  left: 0;
  border-radius: 2px;
}

/* Transition pour le menu mobile */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Transition pour le header */
header {
  overflow: hidden; /* Empêche le débordement pendant la transition */
}
</style>