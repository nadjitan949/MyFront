<template>
    <section class=" w-full h-[100vh] flex flex-col lg:flex-row">
        <Sidebar />
        <div class=" w-full p-[20px] lg:overflow-y-scroll h-full">
            <RouterView />
        </div>
    </section>
</template>

<script>
import Sidebar from './sidebar.vue';
// import Products from './products.vue';
// import Marques from './marques.vue';

export default {
    name: 'Dashboard',
    components: {
        Sidebar
    }
}

</script>
