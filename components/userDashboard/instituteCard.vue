<template>

    <UCard
        class="dark:drop-shadow-(--lightShadow) drop-shadow-(--darkShadow) hover:scale-110 transition-all duration-200">
        <template #header>
            <div class="h-[60px]">
                <h2 class="text-md md:text-lg font-underdog text-center">{{
                    props.institute.name }}</h2>
            </div>
        </template>


        <div class="flex w-full gap-1 justify-center items-center">
            <img :src="props.institute.logo" alt="Institute Logo"
                class="w-24 h-24 object-contain rounded-lg border border-gray-300 bg-gray-50" />
            <p class="text-sm">Location: {{ props.institute.location }}</p>
        </div>
        <template #footer>
            <div class="flex flex-wrap mt-2 gap-3 text-sm h-[20px] justify-around items-center">
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">TYPE: {{
                    props.institute.type.toUpperCase() }}</span>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full">CODE: {{ props.institute.code || 'N/A'
                }}</span>
            </div>
        </template>
    </UCard>
</template>

<script setup>
const props = defineProps(['institute']);
</script>
