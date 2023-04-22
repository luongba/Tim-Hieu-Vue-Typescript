<template>
    <div class="container">
        <component :is="$route.meta.layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
</script>

<style>
* {
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.container {
    width: 1000px;
    max-width: 100%;
    margin: 0 auto;
}
</style>
