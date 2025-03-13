<template>

    <div class="contact-page min-h-screen bg-gray-50">

        <div
            class="bg-gradient-to-r from-[#ff1d8e2f] to-[#1d92ff36] py-12 h-[400px] m-[10px] rounded-[20px] flex items-center justify-center relative overflow-hidden">

            <div class="bull bull1"></div>
            <div class="bull bull2"></div>
            <div class="bull bull3"></div>
            <div class="bull bull4"></div>

            <div class="container mx-auto px-4 text-center absolute z-1">
                <h1 class="text-[50px] font-bold mb-4">Contactez-nous</h1>
                <p class="text-gray-500 max-w-2xl mx-auto">Notre équipe est là pour répondre à toutes vos questions</p>
            </div>
        </div>

        <div class="container mx-auto px-6 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-6">Formulaire de contact</h2>
                    <form @submit.prevent="sendEmail" class="space-y-6">
                        <div>
                            <label class="block text-gray-700 mb-2">Nom</label>
                            <input v-model="form.name" type="text" required
                                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(246,149,255)]">
                        </div>
                        <div>
                            <label class="block text-gray-700 mb-2">Email</label>
                            <input v-model="form.email" type="email" required
                                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(246,149,255)]">
                        </div>
                        <div>
                            <label class="block text-gray-700 mb-2">Sujet</label>
                            <input v-model="form.subject" type="text" required
                                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(246,149,255)]">
                        </div>
                        <div>
                            <label class="block text-gray-700 mb-2">Message</label>
                            <textarea v-model="form.message" rows="5" required
                                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(246,149,255)]"></textarea>
                        </div>
                        <button type="submit"
                            class="px-6 py-3 bg-[rgb(246,149,255)] text-black rounded-lg hover:opacity-80 transition-colors">
                            Envoyer le message
                        </button>
                    </form>
                    <div v-if="showSuccess" class="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                        Votre message a bien été envoyé !
                    </div>
                </div>

                <div class="space-y-8">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Coordonnées</h2>
                        <div class="space-y-4">
                            <div class="flex items-start space-x-4">
                                <svg class="w-6 h-6 text-[rgb(246,149,255)] mt-1" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <div>
                                    <p class="font-semibold">Adresse :</p>
                                    <p class="text-gray-600">123 Rue de la Mode<br>75000 Paris</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-4">
                                <svg class="w-6 h-6 text-[rgb(246,149,255)] mt-1" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <p class="font-semibold">Téléphone :</p>
                                    <a href="tel:+33123456789" class="text-[rgb(246,149,255)] hover:underline">+33 1 23 45 67
                                        89</a>
                                </div>
                            </div>
                            <div class="flex items-start space-x-4">
                                <svg class="w-6 h-6 text-[rgb(246,149,255)] mt-1" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <p class="font-semibold">Email :</p>
                                    <a href="mailto:contact@votreboutique.com"
                                        class="text-[rgb(246,149,255)] hover:underline">contact@votreboutique.com</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Réseaux sociaux</h2>
                        <div class="flex space-x-6">
                            <a href="#" class="text-gray-500 hover:text-[rgb(246,149,255)] transition-colors">
                                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.2 2h-1.8v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                                </svg>
                            </a>
                            <a href="#" class="text-gray-500 hover:text-[rgb(246,149,255)] transition-colors">
                                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.797-1.595 2.454-2.549z" />
                                </svg>
                            </a>
                            <a href="#" class="text-gray-500 hover:text-[rgb(246,149,255)] transition-colors">
                                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 21c-4.963 0-9-4.037-9-9s4.037-9 9-9 9 4.037 9 9-4.037 9-9 9zm-4-7v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3zm9 0h-2v-3h-3v-2h3v-3h2v3h3v2h-3v3z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-gray-100 py-16">
            <div class="container mx-auto px-6">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Notre Localisation</h2>
                <div class="rounded-2xl overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.6538926538925!2d2.2943506150982493!3d48.85809307928749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2s123%20Rue%20de%20la%20Mode%2C%2075000%20Paris!5e0!3m2!1sen!2sfr!4v1622530800000!5m2!1sen!2sfr"
                        width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                        class="w-full h-96"></iframe>
                </div>
            </div>
        </div>

        <div class="bg-gradient-to-l from-[#ff1d8e2f] to-[#1d92ff36] text-white py-12">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-3xl font-bold mb-4 text-black">Besoin d'aide pour choisir ?</h2>
                <p class="mb-6 max-w-2xl mx-auto text-gray-500">
                    Notre équipe de stylistes est disponible pour des conseils personnalisés
                </p>
                <router-link to="/boutique"
                    class="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[#1d92ff36] transition-colors">
                    Prendre rendez-vous
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    data() {
        return {
            form: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
            showSuccess: false
        }
    },
    methods: {
        sendEmail() {
            this.showSuccess = true;
            Object.keys(this.form).forEach(key => {
                this.form[key] = '';
            });

            setTimeout(() => {
                this.showSuccess = false;
            }, 5000);
        }
    }
}
</script>

<style scoped>
.hero-section {
    min-height: 300px;
}

@media (max-width: 768px) {
    .hero-section {
        min-height: 250px;
    }
}
</style>