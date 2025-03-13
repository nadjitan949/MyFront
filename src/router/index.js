import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import Boutique from '@/views/boutique.vue';
import About from '@/views/about.vue';
import Contact from '@/views/contact.vue';
import Dashboard from '@/components/admins/dashboard.vue';
import Marques from '@/components/admins/marques.vue';
import Products from '@/components/admins/products.vue';
import Utilisateurs from '@/components/admins/utilisateurs.vue';
import Categories from '@/components/admins/categories.vue';
import Admins from '@/components/admins/admins.vue';
import AdminPannel from '@/components/admins/adminpannel.vue';
import LoginAdmin from '@/views/loginAdmin.vue';
import { authGuard } from '@/helper/authguard';
import Cart from '@/views/cart.vue';
import DetailProduct from '@/views/detailProducts.vue';
import ProdcutsByCat from '@/views/prodcutsByCat.vue';
import ProductByMarques from '@/views/productsByMarque.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/boutique', name: 'Boutique', component: Boutique },
    { path: '/about', name: 'About', component: About },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } },
    { path: '/adlogin', name: 'adminLogin', component: LoginAdmin },
    { path: '/produit/:id', name: 'DetailProduct', component: DetailProduct, props: true },
    { path: '/category/:id', name: 'ProductByCat', component: ProdcutsByCat, props: true },
    { path: '/marque/:id', name: 'ProductByMarques', component: ProductByMarques, props: true },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        { path: 'adpan', name: 'AdminPannel', component: AdminPannel },
        { path: 'categories', name: 'Categories', component: Categories },
        { path: 'marques', name: 'marques', component: Marques },
        { path: 'produits', name: 'produits', component: Products },
        { path: 'users', name: 'Utilisateurs', component: Utilisateurs },
        { path: 'admins', name: 'Admins', component: Admins },
      ],
    },
  ],
});

function isAuthenticated() {
  const token = localStorage.getItem('tokenUser');
  if(!token){
    alert("D'abord vous connecte a votre compte")
  }
  return !!token;
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Home' });
  } else if (to.matched[0].name === 'Dashboard') {
    authGuard();
    next();
  } else {
    next();
  }
});

export default router;