<template>
    <div>
        <nav class="w-full flex justify-center items-center text-sm">
            <div
                class="flex justify-around items-center min-w-[300px] p-1 bg-bgWhite/30 dark:bg-bgBlack/30 backdrop-blur-xl rounded-xl border-b-2 dark:border-gold border-darkRed">
                <NuxtLink to="/dashboard/super-admin-panel/" class=" flex justify-center items-center py-2 px-4 rounded-xl transition-colors"
                    exact-active-class="bg-darkRed text-darkText dark:bg-gold dark:text-lightText">
                    Contract<UIcon name="material-symbols-light:contract-outline"/> 
                </NuxtLink>
                <NuxtLink to="/dashboard/super-admin-panel/manage-issuer" class=" flex justify-center items-center py-2 px-4 rounded-xl transition-colors"
                    active-class="bg-darkRed text-darkText dark:bg-gold dark:text-lightText">
                    Issuer<UIcon name="pajamas:issue-type-objective"/> 
                </NuxtLink>

            </div>
        </nav>
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['super'],
});
</script>
