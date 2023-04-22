<template>
    <div>
        <input
            type="text"
            placeholder="Input"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <input
            type="text"
            placeholder="Input"
            :value="lastName"
            @input="$emit('update:lastName', $event.target.value)"
        />
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});
</script>
