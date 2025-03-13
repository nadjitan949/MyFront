<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- En-tête -->
    <div class="max-w-4xl mx-auto mb-8 text-center">
      <h2 class="text-4xl font-bold text-indigo-600 mb-4">Votre Panier</h2>
      <p class="text-gray-600">Finalisez vos achats avec notre système de paiement sécurisé</p>
    </div>

    <!-- Conteneur principal -->
    <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      <!-- Liste des produits -->
      <div v-if="cart.length" class="divide-y divide-gray-100">
        <div v-for="item in cart" :key="item.id" class="flex p-6">
          <!-- Image -->
          <div class="flex-shrink-0 mr-6">
            <img :src="'https://vente-gq1m.onrender.com/' + item.image" :alt="item.name"
              class="w-24 h-24 object-cover rounded-2xl shadow-lg">
          </div>

          <!-- Détails -->
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-800">{{ item.name }}</h3>
            <p class="text-gray-500 mb-4">{{ item.price }} €</p>

            <!-- Quantité -->
            <div class="flex items-center space-x-4">
              <input type="number" v-model.number="item.quantity" @change="updateQuantity(item.id, item.quantity)"
                class="w-16 px-3 py-2 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-200"
                min="1" />
              <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-700 transition duration-200">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section vide -->
      <div v-else class="text-center py-12">
        <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
        <p class="text-gray-500 text-lg">Votre panier est vide</p>
      </div>

      <!-- Section total et paiement -->
      <div v-if="cart.length" class="p-6 bg-gray-50 border-t">
        <div class="flex justify-between items-center mb-6">
          <p class="text-gray-600">Total ({{ cart.length }} articles)</p>
          <p class="text-2xl font-bold text-indigo-600">{{ cartTotal }} €</p>
        </div>

        <!-- Bouton paiement -->
        <button @click="showInvoice = true"
          class="w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-medium hover:bg-indigo-700 transition duration-200">
          Procéder au paiement
        </button>
      </div>
    </div>

    <!-- Modale de facturation -->
    <div v-if="showInvoice" class="fixed inset-0 backdrop-blur-lg flex items-center justify-center">
      <div class="bg-white rounded-3xl w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-8">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-indigo-600">Facturation</h3>
          <button @click="showInvoice = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Détails de la facture -->
        <div class="space-y-4 mb-6">
          <div v-for="item in cart" :key="item.id" class="flex justify-between">
            <p>{{ item.name }} x{{ item.quantity }}</p>
            <p>{{ (item.price * item.quantity).toFixed(2) }} €</p>
          </div>
          <div class="border-t pt-4">
            <div class="flex justify-between font-bold">
              <p>Total</p>
              <p>{{ cartTotal }} €</p>
            </div>
          </div>
        </div>

        <!-- Méthodes de paiement -->
        <div class="space-y-4 mb-6">
          <div class="bg-white rounded-lg p-4 border">
            <div class="flex items-center space-x-4">
              <input type="radio" name="payment" id="card" value="card" v-model="paymentMethod" class="hidden">
              <label for="card" class="flex-1 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200" @click="handleChecked">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <i class="fab fa-cc-visa text-3xl text-blue-600"></i>
                    <span>Carte de crédit</span>
                  </div>
                  <div class="text-blue-600" v-if="ishCkecked"><i class="fa-solid fa-circle-check"></i></div>
                </div>
              </label>
            </div>
          </div>

          <div class="bg-white rounded-lg p-4 border">
            <div class="flex items-center space-x-4">
              <input type="radio" name="payment" id="paypal" value="paypal" v-model="paymentMethod" class="hidden">
              <label for="paypal" class="flex-1 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200" @click="handleCheckedCard">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <i class="fab fa-paypal text-3xl text-blue-600"></i>
                    <span>PayPal</span>
                  </div>

                  <div class="text-blue-600" v-if="ishCkeckedPay"><i class="fa-solid fa-circle-check"></i></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Bouton final -->
        <button @click="handlePayment"
          class="w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-medium hover:bg-indigo-700 transition duration-200">
          Confirmer le paiement
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from "../composable/userCart";

export default {
  name: "Cart",
  setup() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    return { cart, removeFromCart, updateQuantity, clearCart, cartTotal };
  },
  data() {
    return {
      showInvoice: false,
      paymentMethod: null,
      ishCkecked: false,
      ishCkeckedPay: false
    };
  },
  methods: {
    handlePayment() {
      if (this.paymentMethod) {
        alert('Paiement effectué avec succès !');
        this.showInvoice = false;
        this.clearCart();
      } else {
        alert('Veuillez sélectionner un moyen de paiement');
      }
    },

    handleChecked(){
      this.ishCkecked = !this.ishCkecked
      this.ishCkeckedPay = false
    },

    handleCheckedCard(){
      this.ishCkeckedPay = !this.ishCkeckedPay
      this.ishCkecked = false
    }

  }
};
</script>

<style scoped>
/* Ajoutez Font Awesome pour les icônes */
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
</style>