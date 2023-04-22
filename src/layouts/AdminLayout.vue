<template>
    <h2 class="admin-header">
        <Header />
    </h2>
    <div>
        <slot />
    </div>
</template>
<script lang="ts" setup>
import Header from "@/components/Header.vue";
</script>
