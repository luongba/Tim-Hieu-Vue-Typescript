<template>
    <div class="card">
        <div class="card-image">
            <img
                :src="quiz.img"
                alt=""
            />
        </div>
        <div class="card-name">
            <h3>{{quiz.name}}</h3>
        </div>
        <div class="card-info">
            {{ quiz.questions.length }} questions
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, defineProps, reactive, ref } from "vue";
import Quiz from "@/types/Quiz";
const props = defineProps<{
    quiz: {
        type: Quiz,
        required: true
    }
}>();

const quiz = ref<Quiz>(props.quiz);
</script>

<style scoped>
.card {
    padding: 10px;
    display: block;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-bottom: 20px;
    cursor: pointer;
}

.card:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.card-image {
    width: 100%;
}

.card-image img {
    width: 100%;
    object-fit: contain;
}

.card-name {
    text-align: start;
    font-size: 18px;
    font-weight: 500;
    margin-top: 8px;
    margin-bottom: 8px;

}
.card-info {
    font-size: 14px;

}
</style>
