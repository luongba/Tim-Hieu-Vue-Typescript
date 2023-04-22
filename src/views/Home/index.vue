<template>
    <div class="card-list">
        <CardQuiz v-for="q in quizes" :key="q.id" :quiz="q" />
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Quiz from "@/types/Quiz";
import CardQuiz from "@/views/Home/components/CardQuiz.vue";

const store = useStore();
const search = computed((): string => store.state.QuanLyCauDo.search);
const quizesState = computed((): Quiz[] => store.state.QuanLyCauDo.quizes);
const quizes = quizesState;
</script>

<style>
.card-list {
    margin-top: 24px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
}
</style>
