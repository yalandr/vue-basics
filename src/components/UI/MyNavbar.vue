<template>
    <nav class="navigation container flex just-center center">
        <router-link to="/">Main</router-link>
        <router-link to="/posts">Posts</router-link>
        <MyButton @click="$router.push('/about')">About</MyButton>
    </nav>
</template>

<script>
import MyButton from './MyButton.vue'
export default {
    components: { MyButton },
    name: 'MyNavbar',
}
</script>

<style>
.navigation {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #555
}
.navigation a {
    color: #ccc;
    margin: 0 1rem;
}
</style>