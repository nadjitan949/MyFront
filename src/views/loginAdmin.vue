<template>
    <div v-if="isLoading"
        class="text-center fixed w-full h-full backdrop-blur-3xl top-0 z-2 flex flex-col items-center justify-center">
        <!-- Spinner de chargement -->
        <div class="w-12 h-12 border-t-4 border-pink-500 rounded-full animate-spin border-solid mx-auto">
        </div>
        <p class="mt-4 text-lg text-gray-500 animate-pulse">Veuillez patienter...</p>
    </div>

    <div class="flex items-center h-[500px] justify-center ">
        <div class="w-[95%] max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Connexion Admin</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label class="block text-gray-700">Email</label>
                    <input v-model="admin.email" type="email"
                        class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Entrez votre email">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Mot de passe</label>
                    <input v-model="admin.password" type="password"
                        class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="********">
                </div>
                <p class="text-red-500 text-sm mb-4">{{ message }}</p>
                <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">Se
                    connecter</button>
            </form>
        </div>
    </div>
</template>

<script>
import router from '@/router';

export default {
    name: 'LoginAdmin',
    data() {
        return {
            admin: {
                email: '',
                password: ''
            },
            error: '',
            message: '',
            isLoading: false
        };
    },
    methods: {
        async login() {
            this.isLoading = true
            try {
                const response = await fetch('https://vente-gq1m.onrender.com/api/AdminLogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.admin.email,
                        password: this.admin.password
                    })
                })
                const data = await response.json()
                if (response.ok) {
                    localStorage.setItem('tokenAdmin', data.token)
                    localStorage.setItem('emailAdmin', data.email)
                    if (this.$route.path !== '/dashboard/adpan') {
                        router.push('/dashboard/adpan');
                    }

                } else {
                    this.message = data.message
                }


            } catch (error) {
                console.log("Une erreur s'est produits", error)
            }
            finally {
                this.isLoading = false; // Arrête le chargement quel que soit l'issue.
            }
        }
    }
};
</script>

<style scoped>
.shadow-lg {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
