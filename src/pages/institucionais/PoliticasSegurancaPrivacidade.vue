<template>
  <main class="pagina-politica-seguranca-privacidade">
    <section class="display-banner-component-container">
      <DisplayBanner 
        :urlImage="['../../statics/img/webp/banner_politica_seguranca_privacidade.webp','../../statics/img/webp/banner_politica_seguranca_privacidade.webp','../../statics/img/webp/banner_politica_seguranca_privacidade.webp']"
        :imageHeight="['12%', '27%', '55%']"
      >
        <div class="banner-text-content">
          <h1 class="destaque-500 title">
            Política de segurança e Privacidade
          </h1>
        </div>
      </DisplayBanner>
    </section>
    <section class="content">
      <q-markdown class="container" :no-container="true" :src="politicas" />
    </section>
  </main>
</template>

<script>
import politicas from '../../statics/data/politicas_seguranca_privacidade.md'
import DisplayBanner from '../../components/DisplayBanner'

export default {
  name: 'PoliticasSegurancaPrivacidade',
  data(){
    return {
      politicas
    }
  },
  components: {
    DisplayBanner
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Política de segurança e Privacidade',
      meta: {
        title: { name: 'title', content: 'Política de segurança e Privacidade' },
        //description: { name: 'description', content: 'Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!' },
        //keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: 'Política de segurança e Privacidade' },
        //ogDescription: { name: 'og:description', content: 'Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Política de segurança e Privacidade' },
        //twDescription: { name: 'twitter:description', content: 'Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!' },
        twUrl: { name: 'twitter:url', content: this.$route.fullPath },
      },
      link: {
        canonical: { rel: 'canonical', href: this.$route.fullPath },
      },
      script: {
        ldJson: {
          type: 'application/ld+json',
          innerHTML: `{
              "@context":"https://schema.org",
              "@type": "WebPage",
              "name": "Política de segurança e Privacidade"
            }`
        }
      }
    }
  },
}
</script>

<style lang="scss">
  @import '../../css/my_mixins.scss';

  .pagina-politica-seguranca-privacidade{
    $widthCustomContainer: 840px;
    .display-banner-component-container{
      position: relative;
      color: white;
      margin-bottom: 32px;
      &::after{
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        background: rgba(10, 136, 244, 0.8);
      }
      .display-banner-text-content.container{
        @include d(l){
          max-width: $widthCustomContainer;
        }
      }
      .banner-text-content{
        padding-top: 20px;
      }
      .title{
        font-weight: 500;
        font-size: 40px;
        line-height: 46px;
        margin-bottom: 22px;
      }
      .adorno-retangular:before{
        background: white;
      }
      p{
        font-style: italic;
        font-weight: 300;
        font-size: 22px;
        line-height: 34px;
        text-align: center;
        max-width: 670px;
        margin: 0 auto 10px;
        &.author{
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
        }
      }
      @include d(sxs){
        margin-bottom: 30px;
      }
    }
    section.content{
      padding-bottom: 32px;
      > .container{
        @include d(l){
          max-width: $widthCustomContainer;
        }
        > * {
          padding: 0;
          margin: 0 0 10px;
        }
      }
      h2, .title{
        margin-top: 25px !important;
        font-weight: 500;
        font-size: 22px;
        line-height: 25px;
        color: #272727;
      }
      h3, .subtitle{
        font-weight: 500;
        font-size: 16px;
        line-height: 23px;
        color: #383838;
      }
      p, .text-body, ul{
        font-weight: 300;
        font-size: 16px;
        line-height: 24px;
        color: #364E5E;
      }
      li{
        padding-left: 16px;
        position: relative;
        display: flex;
        align-items: center;
        &::before{
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $primary;
          position: absolute;
          left: 0;
        }
      }
    }
    & + .geral-footer-component{
      .main-footer{
        border-top: 1px solid #E3E9ED;
      }
    }
  }

</style>