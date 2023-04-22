<template>
    <div class="header">
        <div class="header-left">
            <router-link :to="{ name: 'home' }" class="header-title">Quiz</router-link>
            <div class="header-form">
                <input type="text" placeholder="Search..." v-model="search" />
            </div>
        </div>
        <div class="header-right">
            <router-link class="router" style="margin-right: 5px" :to="{ name: 'grape' }">Grape</router-link>
            
            <router-link class="router" :to="{ name: 'about' }">About</router-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const search = computed({
    get: (): void => store.state.QuanLyCauDo.search,
    set: (val): void => {
        store.commit("QuanLyCauDo/Set", {
            key: "search",
            data: val,
        });
    },
});
watch(search, (): void => {
    store.dispatch("QuanLyCauDo/searchAction");
});
</script>
<style>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 0;
}

.header-left {
    display: flex;
    align-items: center;
}

a {
    font-size: 22px;
    text-decoration: none;
    color: #34a0e7;
}

.header-right {
    display: flex;
    align-items: center;
}

.header-title {
    margin-right: 24px;
    font-size: 32px;
    font-weight: bold;
}

.header-form input {
    padding: 8px 12px;
    outline: none;
    border: 2px solid #ccc;
    border-radius: 4px;
}
</style>
