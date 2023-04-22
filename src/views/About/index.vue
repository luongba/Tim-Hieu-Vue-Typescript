<template>
    <div class="container-lg">
        <div class="card" v-for="(photo, index) in dataCus" :key="index">
            <div class="card-title">{{ photo.title }}</div>
            <div class="card-image">
                <img :lazy-src="photo.url" alt="" src="@/assets/1x1.png" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref } from "vue";
const color = ref<string>("green");
import axios from "axios";
import Photo from "@/types/Photo";
const photos = ref<Photo[]>([]);
const getImage = async () => {
    let rs = await axios.get<Photo[]>("https://jsonplaceholder.typicode.com/photos");
    if (rs.status === 200) {
        photos.value = rs.data;
    }
};
getImage();
let dataCus = computed(() => photos.value);
const loadImages = (entry: any): void => {
    const url = entry.getAttribute("lazy-src");

    entry.setAttribute("src", url);
};
onUpdated(() => {
    if ("IntersectionObserver" in window) {
        let lazyImgs = document.querySelectorAll("[lazy-src]");
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImages(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        lazyImgs.forEach((img) => {
            observer.observe(img);
        });
    } else {
        console.log("heheh");
    }
});
</script>

<style scoped>
* {
    box-sizing: content-box;
}
.container-lg {
    max-width: 1290px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
}

.card {
    width: 200px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    box-shadow: 0 2px 9px #dadec0;
    padding: 10px;
}
.card-img {
    margin-top: auto;
}
.card img {
    width: 100%;
}
</style>
