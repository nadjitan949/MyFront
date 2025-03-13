<template>
  <aside
    :class="['bg-gray-800 text-white m-[10px] rounded-[30px] lg:rounded-[0] lg:m-0 p-6', { 'lg:w-[95px]': isLarge, 'lg:w-[400px]': !isLarge }, { 'h-full lg:h-full': isOpen, 'h-[200px] lg:h-full': !isOpen }]">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <transition name="fade">
        <div v-if="!isLarge" class="flex items-center w-[230px] gap-4">
          <div
            class="border w-[50px] h-[50px] text-3xl text-gray-800 bg-white rounded-full flex items-center justify-center">
            <i class="fa-solid fa-gauge-high"></i>
          </div>
          <h2 class="text-xl font-bold">Admin pannel</h2>
        </div>
      </transition>

      <button class=" w-[40px] h-[40px] hidden text-[25px] lg:flex lg:items-center lg:justify-center"
        @click="toggleLarg"><i
          :class="[{ 'fa-solid fa-expand': isLarge, 'fa-solid fa-compress': !isLarge }]"></i></button>

      <button @click="openNav" class="w-[40px] h-[40px] flex text-[25px] lg:hidden"><i
          :class="[{ 'fa-solid fa-angle-down': !isOpen, 'fa-solid fa-chevron-up': isOpen }]"></i></button>
    </div>

    <!-- Navigation -->
    <transition name="fade">
      <nav :class="['flex flex-col gap-2 mb-6 mt-6', { 'flex': isOpen, 'hidden lg:flex' : !isOpen }]" @click="openNav">
        <router-link v-for="item in menuItems" :key="item.path" :to="item.path" exact-active-class="bg-gray-700"
          class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors">
          <span class="material-icons">{{ item.icon }}</span>
          <span v-if="!isLarge">{{ item.label }}</span>
        </router-link>
      </nav>
    </transition>

    <!-- Bouton de déconnexion -->
    <transition name="fade">
      <button @click="logout"
        :class="['flex items-center gap-4 p-3 rounded-lg bg-red-500 hover:bg-red-600 transition-colors', { 'flex': isOpen, 'hidden lg:flex': !isOpen }]">
        <span class="material-icons"><i class="fa-solid fa-power-off"></i></span>
        <span v-if="!isLarge">Déconnexion</span>
      </button>
    </transition>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { label: 'Tableau de bord', path: '/dashboard/adpan', icon: 'dashboard' },
        { label: 'Produits', path: '/dashboard/produits', icon: 'inventory' },
        { label: 'Catégories', path: '/dashboard/categories', icon: 'category' },
        { label: 'Marques', path: '/dashboard/marques', icon: 'sell' },
        { label: 'Utilisateurs', path: '/dashboard/users', icon: 'group' },
        { label: 'Admins', path: '/dashboard/admins', icon: 'admin_panel_settings' }
      ],
      email: '',
      adminStatus: false,
      isLarge: false,
      isOpen: false
    }
  },
  methods: {
    logout() {
      // Suppression des données d'authentification
      localStorage.removeItem('tokenAdmin');
      localStorage.removeItem('emailAdmin')
      // Redirection vers la page de login
      this.$router.push('/adlogin');
    },

    toggleLarg() {
      this.isLarge = !this.isLarge
    },

    openNav() {
      this.isOpen = !this.isOpen
    }

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}

.fade-enter,
.fade-leave-to {
  transition: opacity 1s ease-in-out;
}
</style>