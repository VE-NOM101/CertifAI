<template>
    <NuxtLink :to="'/' + link"
        class="font-silkScreen group flex flex-col justify-center items-center mx-2 text-md text-deepBlue dark:text-gold hover:text-darkRed dark:hover:text-gold hover:drop-shadow-[0_0_6px_#8B0000] dark:hover:drop-shadow-[0_0_6px_#FFD700] hover:-translate-y-1.5 transition-all duration-300">
        {{ name }}

        <UIcon v-if="route.path == '/' + link" name="i-mingcute-up-line" class="size-6" />
        <UIcon v-else name="i-mingcute-up-line"
            class="size-6 invisible group-hover:visible opacity-0 group-hover:opacity-100" />
    </NuxtLink>
</template>
<script setup>

defineProps(['name', 'link']);
const route = ref(useRoute());
</script>