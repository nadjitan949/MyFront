import { ref, computed, watch } from "vue";

export function useCart() {
  // Récupérer l'email de l'utilisateur actuel depuis le localStorage
  const userEmail = localStorage.getItem("userName"); // Assurez-vous que l'email est stocké lors de la connexion
  const cartKey = `cart_${userEmail}`; // Clé unique pour le panier de l'utilisateur

  // Récupérer le panier de l'utilisateur actuel ou initialiser un panier vide
  const cart = ref(JSON.parse(localStorage.getItem(cartKey)) || []);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    const item = cart.value.find((p) => p.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    alert("Produit ajouté au panier");
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
  };

  // Modifier la quantité d'un produit
  const updateQuantity = (productId, quantity) => {
    const item = cart.value.find((p) => p.id === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
  };

  // Vider le panier
  const clearCart = () => {
    cart.value = [];
  };

  // Sauvegarde automatique dans localStorage
  watch(
    cart,
    (newCart) => {
      localStorage.setItem(cartKey, JSON.stringify(newCart));
    },
    { deep: true }
  );

  // Calcul du total
  const cartTotal = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const cartCount = computed(() =>
    cart.value.reduce((count, item) => count + item.quantity, 0)
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };
}