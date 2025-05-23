<template>
  <div class="relative dark:bg-bgBlack bg-bgWhite min-h-screen overflow-hidden font-exo">
    <!-- Glow Effects -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-darkBgStart to-transparent opacity-20 blur-2xl pointer-events-none z-0">
    </div>
    <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-darkBgEnd to-transparent opacity-20 blur-2xl pointer-events-none z-0">
    </div>

    <!-- Main Layout -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <!-- Header -->
      <header
        class="sticky top-0 z-50 backdrop-blur bg-white/30 dark:bg-black/30 border-b border-gray-200 dark:border-gray-800">
        <UContainer>
          <nav class="flex justify-between items-center py-2">
            <!-- Logo -->
            <NuxtLink to="/" class="text-xl font-bold flex items-center gap-2 text-lightRed">
              <h1 class="md:text-2xl text-xl text-lightRed font-monoton">CertifAI</h1>
            </NuxtLink>
            <UNavigationMenu color="neutral" highlight :items="items" class="w-full justify-center" />
            <div class="hidden md:flex gap-3 items-center">
              <ClientOnly v-if="!colorMode?.forced">
                <UButton class="text-deepBlue dark:text-gold" :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                  color="neutral" variant="ghost" @click="isDark = !isDark" />
              </ClientOnly>
              <UButton
                class="bg-darkRed hover:bg-lightRed hover:shadow-(--goldShadow) hover:scale-110 transition-all duration-300 text-white"
                variant="solid" size="lg" @click="">
                <!-- <div v-if="account.address == null">Connect Wallet</div>
                <div v-else>{{ formattedAddress }} <UBadge class="text-black" icon="i-ri-eth-line" size="md"
                    color="gold" variant="solid">{{ formattedBalance }} ETH</UBadge>
                </div> -->
              </UButton>
            </div>
          </nav>

        </UContainer>

      </header>

      <!-- Main Content -->
      <main class="flex-grow py-4">
        <UContainer>
          <slot />
        </UContainer>
      </main>

      <!-- Footer -->
      <footer class="backdrop-blur bg-white/30 dark:bg-black/30 py-6 border-t border-darkBgEnd/20">
        <UContainer class="text-center text-sm">
          © {{ new Date().getFullYear() }} CertifAI. All rights reserved.
        </UContainer>
      </footer>
    </div>

  </div>
</template>


<script setup lang="ts">

import type { NavigationMenuItem } from '@nuxt/ui'
const route = useRoute()
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})


const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Institute Manager',
    icon: 'i-map-school',
    to: '/dashboard',
    active: route.path === '/dashboard',
    children: [
      {
        label: 'Get Started',
        description: 'Here is a guideline for your smooth interaction with institute management',
        icon: 'i-lucide-book-open',
        to: '/dashboard',
      },
      {
        label: 'Request for Institute',
        description: 'Quickly request for a new institute',
        icon: 'i-charm-git-request',
        to: '/dashboard/req-institute',
      },
      {
        label: 'My Institutes',
        icon: 'i-material-symbols-folder-managed-sharp',
        description: 'Easily and efficiently handle your institutes.',
        to: '/dashboard/my-institutes',
      }
    ]
  },
  {
    label: 'Issuer Panel',
    icon: 'i-mdi-check-outline',
    to: '/dashboard/issuer-panel',
    active: route.path.startsWith('/dashboard/issuer-panel')
  },
  {
    label: 'SuperAdmin Panel',
    icon: 'i-ri-admin-fill',
    to: '/dashboard/super-admin-panel',
    active: route.path.startsWith('/dashboard/super-admin-panel')
  }
])
</script>
