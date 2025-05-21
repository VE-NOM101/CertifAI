<template>
    <div class="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-10">
      <!-- Left: Text Content -->
      <div class="w-full lg:w-2/3 text-center lg:text-left">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About <span class="text-lightRed font-monoton">CertifAI</span>
        </h2>
        <p class="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
          CertifAI is a decentralized credential verification platform that ensures tamper-proof academic certificates using blockchain and NFTs. Our goal is to build trust and transparency across institutions and employers.
        </p>
        <UButton color="warning" size="lg">Features</UButton>
        <div class="flex flex-col">
           <h1>1</h1>
           <h1>1</h1>
           <h1>1</h1>
        </div>
      </div>

      <!-- Right: Image -->
      <div class="w-full lg:w-1/3 flex justify-center">
        <img 
          src="/images/about.png"
          alt="About CertifAI"
          class="max-w-full h-auto rounded-xl shadow-xl dark:shadow-yellow-200/10 animate-none md:motion-safe:animate-wiggle"
        />
      </div>
    </div>
</template>
