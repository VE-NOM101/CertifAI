<template>
  <div class="relative dark:bg-bgBlack bg-bgWhite min-h-screen overflow-hidden font-montagu">
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

            <!-- Desktop Nav -->
            <div class="hidden md:flex gap-6">
              <LayoutCompNavLink v-for="(item, index) in navlink" :key="index" :name="item.name" :link="item.link" />
            </div>

            <!-- Theme & Wallet (Desktop) -->
            <div class="hidden md:flex gap-3 items-center">
              <ClientOnly v-if="!colorMode?.forced">
                <UButton class="text-deepBlue dark:text-gold" :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                  color="neutral" variant="ghost" @click="isDark = !isDark" />
              </ClientOnly>
              <UButton
                class="bg-darkRed hover:bg-lightRed hover:shadow-(--goldShadow) hover:scale-110 transition-all duration-300 text-white"
                variant="solid" size="lg" @click="connect">
                <div v-if="account.address == null">Connect Wallet</div>
                <div v-else>{{ formattedAddress }} <UBadge class="text-black" icon="i-ri-eth-line" size="md" color="gold"
                    variant="solid">{{formattedBalance}} ETH</UBadge>
                </div>
              </UButton>
            </div>

            <!-- Mobile Menu Button -->
            <button class="md:hidden text-gray-700 dark:text-gray-200" @click="mobileMenuOpen = true">
              <UIcon name="i-lucide-menu" class="size-6" />
            </button>
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

    <!-- Mobile Slide-in Menu -->
    <transition name="slide">
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden backdrop-blur-sm"
        @click.self="mobileMenuOpen = false">
        <div class="bg-white dark:bg-gray-900 w-64 h-full shadow-lg p-6 flex flex-col gap-4">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-primary">Menu</span>
            <button @click="mobileMenuOpen = false">
              <UIcon name="i-lucide-x" class="size-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <LayoutCompNavLink @click="mobileMenuOpen = false" v-for="(item, index) in navlink" :key="index"
            :name="item.name" :link="item.link" />
          <div
            class=" justify-center items-center border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex flex-col gap-2">
            <ClientOnly v-if="!colorMode?.forced">
              <UButton class="text-deepBlue dark:text-gold" :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                color="neutral" variant="ghost" @click="isDark = !isDark" />
            </ClientOnly>
            <UButton class="flex justify-center items-center w-full" color="primary" variant="solid" size="sm"
              @click="connect">
              Connect Wallet
            </UButton>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ethers } from 'ethers'
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})

const account = ref({ address: null, balance: null })

const mobileMenuOpen = ref(false)

const user = useUser()

async function connect() {
  const response = await connectWallet();
  if (response) {
    account.value.address = response.address;
    account.value.balance = response.balance;
    user.setUserAddress(response.address);
  }
}

const formattedBalance = computed(() => {
  if (!account.value.balance) return '0.0000'; // fallback
  return `${ethers.formatEther(account.value.balance).slice(0, 4)}`;
});

const formattedAddress = computed(() => {
  if (!account.value.address) return ''; // fallback
  return `${account.value.address.slice(0, 6)}...${account.value.address.slice(-4)}`;
});


const navlink = ref([{ name: 'About', link: 'about' }, { name: 'Explore', link: 'explore' }, { name: 'Institutes', link: 'institutes' }]);

</script>

<style>
/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
