<template>

  <Header/>
  <RouterView/>
  <Footer/>


</template>

<script>
import Header from './components/users/header.vue';
import Home from './views/home.vue';
import Footer from './components/users/footer.vue';

export default {
  name: 'App',

  components: {
    Header,
    Home,
    Footer
  }
}

</script>