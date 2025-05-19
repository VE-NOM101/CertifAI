<template>
    <div class="min-h-screen flex flex-col">
        <!-- Header / Navbar -->
        <header
            class="sticky top-0 z-50 backdrop-blur bg-white/30 dark:bg-black/30 border-b border-gray-200 dark:border-gray-800">
            <UContainer>
                <nav class="flex justify-between items-center py-4">
                    <!-- Left side: Logo or Title -->
                    <NuxtLink to="/" class="text-xl font-bold text-primary flex justify-center items-center">
                        <UIcon name="i-fluent-emoji-graduation-cap" class="size-10"/> CertifAI
                    </NuxtLink>

                    <!-- Center nav links -->
                    <div class="hidden md:flex gap-6">
                        <NuxtLink to="/about" class="text-gray-600 dark:text-gray-300 hover:text-primary">About
                        </NuxtLink>
                        <NuxtLink to="/search" class="text-gray-600 dark:text-gray-300 hover:text-primary">Search
                        </NuxtLink>
                    </div>

                    <!-- Right side: Dark mode toggle + wallet -->
                    <div class="flex gap-3 items-center">
                        <ClientOnly v-if="!colorMode?.forced">
                            <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" color="neutral" variant="ghost"
                                @click="isDark = !isDark" />

                            <template #fallback>
                                <div class="size-8" />
                            </template>
                        </ClientOnly>
                        <UButton color="primary" variant="solid" size="sm" @click="connectWallet">
                            Connect Wallet
                        </UButton>
                    </div>
                </nav>
            </UContainer>
        </header>

        <!-- Page Content -->
        <main class="flex-grow py-6">
            <UContainer>
                <slot />
            </UContainer>
        </main>

        <!-- Footer -->
        <footer
            class="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-6 border-t border-gray-200 dark:border-gray-700">
            <UContainer class="text-center text-sm">
                © {{ new Date().getFullYear() }} CredVerify. All rights reserved.
            </UContainer>
        </footer>
    </div>
</template>

<script setup>
const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set(_isDark) {
        colorMode.preference = _isDark ? 'dark' : 'light'
    }
})
function connectWallet() {
    // Replace this with real wallet connect logic (e.g., MetaMask)
    alert('Connect Wallet clicked!')
}
</script>
