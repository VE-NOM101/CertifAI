<template>
  <div class="relative dark:bg-bgBlack bg-bgWhite min-h-screen overflow-hidden font-exo">
    <!-- Glow Effects -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-darkBgStart to-transparent opacity-20 blur-2xl pointer-events-none z-0" />
    <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-darkBgEnd to-transparent opacity-20 blur-2xl pointer-events-none z-0" />

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

            <!-- Navigation - Desktop -->
            <UNavigationMenu color="neutral" highlight :items="items" class="hidden md:flex w-full justify-center" />
            <!-- Theme Toggle + Wallet - Desktop Only -->
            <div class="hidden md:flex gap-3 items-center">
              <ClientOnly v-if="!colorMode?.forced">
                <UButton class="text-deepBlue dark:text-gold" :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                  color="neutral" variant="ghost" @click="isDark = !isDark" />
              </ClientOnly>
              <UButton
                class="bg-darkRed hover:bg-lightRed hover:shadow-(--goldShadow) hover:scale-110 transition-all duration-300 text-white"
                variant="solid" size="lg">
                {{ formatAddress(user.userAddress) }}
                <UBadge class="text-black" icon="i-ri-eth-line" size="md" color="gold" variant="solid">
                  {{ user.userBalance }} ETH
                </UBadge>
              </UButton>
            </div>

            <USlideover title="Navigation" description="Feel free to navigate" class="md:hidden">
              <UButton color="neutral" variant="subtle" icon="duo-icons:menu" />

              <template #body>
                <div class="flex flex-col gap-3 px-4 py-6">
                  <UNavigationMenu color="neutral" :items="items" orientation="vertical" />

                  <div class="flex flex-col gap-3 mt-6">
                    <ClientOnly v-if="!colorMode?.forced">
                      <UButton class="text-deepBlue dark:text-gold" :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                        color="neutral" variant="ghost" @click="isDark = !isDark">
                        Toggle Theme
                      </UButton>
                    </ClientOnly>
                    <UButton class="bg-darkRed text-white hover:bg-lightRed" variant="solid">
                      {{ formatAddress(user.userAddress) }}
                      <UBadge class="text-black" icon="i-ri-eth-line" size="md" color="gold" variant="solid">
                        {{ user.userBalance }} ETH
                      </UBadge>
                    </UButton>
                  </div>
                </div>
              </template>
            </USlideover>
          </nav>
        </UContainer>
      </header>

      <!-- Main Content -->
      <main class="flex-grow py-1">
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

const { ethereum } = window as any;
const route = useRoute();
const colorMode = useColorMode();
const user = useUser();

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light'
  }
});

const formatAddress = (address: string | null) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Institute Manager',
    icon: 'i-map-school',
    to: '/dashboard',
    active: route.path === '/dashboard',
    children: [
      {
        label: 'Get Started',
        description: 'Guideline for managing institutes',
        icon: 'i-lucide-book-open',
        to: '/dashboard',
      },
      {
        label: 'Request for Institute',
        description: 'Submit a request',
        icon: 'i-charm-git-request',
        to: '/dashboard/req-institute',
      },
      {
        label: 'Request Inbox',
        icon: 'i-clarity-inbox-line',
        description: 'See all the requested institute information',
        to: '/dashboard/request-inbox',
      },
      {
        label: 'My Institutes',
        icon: 'i-material-symbols-folder-managed-sharp',
        description: 'Manage your institutes',
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
]);

// Reload on MetaMask account change
onMounted(() => {
  if (typeof ethereum !== 'undefined') {
    const handleAccountsChanged = () => {
      window.location.href = '/';
    };

    ethereum.on('accountsChanged', handleAccountsChanged);

    onUnmounted(() => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
    });
  }
});
</script>
