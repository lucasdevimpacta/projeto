<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  meta: {
    // sets document title
    title: 'Cursos e soluções para sua carreira',
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: title => `${title} - Impacta Tecnologia`,
    // meta tags
    meta: {
      charset: { 'charset': 'UTF-8' },
      robots: { name: 'robots', content: 'index, nofollow' },
      title: {
        name: 'title',
        template (title) {
          return `${title} - Impacta Tecnologia`
        }
      },
      description: { name: 'description', content: 'Os melhores cursos de TI, gestão, design, marketing e desenvolvimento estão aqui na Impacta. Acesse e veja como se preparar para o mercado!' },
      keywords: { name: 'keywords', content: 'TI, gestão, marketing, design' },
      author: { name: 'author', content: 'Luiz Magno, Renan Yasuo, Thais dos Anjos, Kelvin' },
      creator: { name: 'creator', content: 'Impacta tecnologia' },
      themeColor: { name: 'theme-color', content: '#223474' },

      //http-equiv
      contentType: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
      contentLanguage: { 'http-equiv': 'content-language', content: 'pt-br' },

      //apple meta
      appleTouchFullscreen: { name: 'apple-touch-fullscreen', content: 'yes' },
      appleMobileWebAppCapable: { name: 'apple-mobile-web-app-capable', content: 'yes' },
      mobileWebAppCapable: { name: 'mobile-web-app-capable', content: 'yes' },
      appleMobileWebAppStatusBarStyle: { name:'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },

      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle: {
        name: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template (ogTitle) {
          return `${ogTitle} - Impacta Tecnologia`
        }
      },
      ogLocale: { name: 'og:locale', content: 'pt_BR' },
      ogType: { name: 'og:type', content: 'website' },
      ogDescription: { name: 'og:description', content: 'Os melhores cursos de TI, gestão, design, marketing e desenvolvimento estão aqui na Impacta. Acesse e veja como se preparar para o mercado!' },
      ogUrl: { name: 'og:url', content: 'https://impacta.com.br' },
      ogSiteName: { name: 'og:site_name', content: 'Impacta Tecnologia' },

      //twitter metadata
      twTitle: {
        name: 'twitter:title',
        template (twTitle) {
          return `${twTitle} - Impacta Tecnologia`
        }
      },
      twDescription: { name: 'twitter:description', content: 'Os melhores cursos de TI, gestão, design, marketing e desenvolvimento estão aqui na Impacta. Acesse e veja como se preparar para o mercado!' },
      twUrl: { name: 'twitter:url', content: 'https://impacta.com.br' },
    },

    // CSS tags
    link: {
      //ico
      icon: { rel: 'icon', href: '/statics/img/icon/favicon.ico' },
      shortcutIcon: { rel: 'shortcut icon', href: '/statics/img/icon/favicon.ico' },
      appleTouchIcon: { rel: 'apple-touch-icon', href: '/statics/img/icon/favicon.ico' },
      appleTouchStartupImage: { rel: 'apple-touch-startup-image', href: '/statics/img/icon/impacta-logo-320x460.png' },
      //canonical
      canonical: { rel: 'canonical', href: 'https://impacta.com.br' },
      //preoload js

      //preoload css
      preloadfontawesome: { rel: 'preload', href: 'https://ka-f.fontawesome.com/releases/v5.15.1/css/free.min.css', as: 'style' },
      preloadmain: { rel: 'preload', href: 'statics/css/main.css', as: 'style' },

      //css
      fontawesome: { rel: 'stylesheet', href: 'https://ka-f.fontawesome.com/releases/v5.15.1/css/free.min.css' },
      main: { rel: 'stylesheet', href: 'statics/css/main.css' },
    },

    // JS tags
    script: {
      ldJson: {
        type: 'application/ld+json',
        innerHTML: `{ "@context": "http://schema.org" }`
      }
    },

    // <html> attributes
    htmlAttr: {
      'lang': 'pt-BR',
      //'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
      empty: undefined // generates <html empty>
    },

    // <body> attributes
    bodyAttr: {
      'action-scope': 'q-app', // generates <body action-scope="xyz">
      empty: undefined // generates <body empty>
    },

    // <noscript> tags
    noscript: {
      default: 'This is content for browsers with no JS (or disabled JS)'
    }
  },
  created () {
    this.$store.dispatch('app/loginSession')
  }
}
</script>
