<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        <UModal v-for="(institute, index) in data" :key="index" title="Details" description="" :close="{
            color: 'error',
            variant: 'outline',
        }">
            <UserDashboardInstituteCard class="cursor-pointer" :institute="institute" />

            <template #body>
                <div class="space-y-5 px-4 py-2">
                    <!-- Logo -->
                    <div class="flex justify-center">
                        <img :src="institute.logo" alt="Logo"
                            class="w-28 h-28 object-contain rounded-lg border border-gray-300 bg-gray-100" />
                    </div>

                    <!-- Name and Acronym -->
                    <div class="text-center">
                        <h2 class="text-2xl font-bold font-underdog">{{ institute.name }}</h2>
                        <p class="text-sm text-gray-500 italic">({{ institute.acronym }})</p>
                    </div>

                    <!-- Location, Type, Code -->
                    <div class="flex flex-wrap justify-center gap-3 mt-2 text-sm">
                        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex justify-center items-center">
                            <UIcon name="i-mdi-location" class="size-5" /> {{ institute.location
                            }}
                        </span>
                        <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full">TYPE: {{
                            institute.type.toUpperCase()
                        }}</span>
                        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">CODE: {{ institute.code ||
                            'N/A' }}</span>
                    </div>

                    <!-- Description -->
                    <div v-if="institute.description" class="text-sm text-gray-700 mt-2">
                        <p class="font-medium">About:</p>
                        <p class="text-gray-500">{{ institute.description }}</p>
                    </div>

                    <!-- Links -->
                    <div class="flex justify-center gap-6 mt-4">

                        <ULink :to="institute.website" target="_blank">
                            <UButton color="success">Website</UButton>
                        </ULink>
                        <ULink v-if="institute.wikipedia" :to="institute.wikipedia" target="_blank">
                            <UButton color="info">Wikipedia</UButton>
                        </ULink>

                    </div>
                </div>
            </template>

            <template #footer>
                <div class="w-full flex item-s-center justify-center">
                    <UButton icon="i-clarity-cancel-line" label="Cancel Request" color="error" />
                </div>
            </template>

        </UModal>

    </div>
</template>

<script setup>

const user = useUser();
const data = ref(null);
const toast = useToast();
const fetchData = async () => {
    const response = await $fetch('/api/request-institute/' + '?owner=' + user.userAddress, { method: 'GET' });

    if (response.success) {
        data.value = response.data;
    } else {
        toast.add({
            'title': 'Error',
            'description': response.message,
            'color': 'error',
            'icon': 'i-material-symbols-error'
        })
    }
}

onMounted(async () => {
    fetchData();
})
</script>