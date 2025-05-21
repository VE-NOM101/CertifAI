<template>
    <NuxtLink :to="'/' + link"
        class="text-gray-600 dark:text-gray-300 hover:text-primary"> {{ name }}</NuxtLink>
</template>
<script setup>
defineProps(['name','link'])
</script>