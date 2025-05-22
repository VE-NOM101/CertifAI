// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/motion/nuxt", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "CertifAI", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: {
      name: "page",
      mode: "out-in", // default
    },
    layoutTransition: {
      name: "slide",
      mode: "out-in", // default
    },
  },

  ui: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "gold",
        "darkRed",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },
});
