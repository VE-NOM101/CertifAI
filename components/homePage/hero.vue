<template>
  <section class="relative w-full h-[70vh] overflow-hidden text-white m-0 p-0">
    <!-- Background Video -->
    <!-- Intially off- Please turn on while deploying -->

    <!-- <video
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="../../public/videos/heroVideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> -->

    <!-- Dark overlay for readability -->
    <div class="absolute inset-0 bg-black/60 z-10"></div>

    <!-- Hero content -->
    <div v-motion-pop class="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
      <h1 class="text-4xl sm:text-6xl font-extrabold mb-4 text-gold drop-shadow-md">
        Welcome to <span class="text-lightRed font-monoton">CertifAI</span>
      </h1>
      <p class="text-lg sm:text-xl text-gray-200 mb-6 max-w-2xl">
        Next-Gen Academic Verification on the Blockchain
      </p>
      <UButton loading-icon="i-lucide-loader" to="/dashboard"
        class="bg-lightRed text-white hover:bg-gold hover:translate-y-1.5 transition-all duration-400" size="lg">
        Get Started
        <UIcon name="i-picon-down" />
      </UButton>
    </div>
  </section>
</template>
<script setup>
</script>
