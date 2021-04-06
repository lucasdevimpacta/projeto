<template>
  <main class="pagina-termos-de-uso">
    <section class="display-banner-component-container">
      <DisplayBanner 
        :urlImage="['../../statics/img/webp/banner_politica_seguranca_privacidade.webp','../../statics/img/webp/banner_politica_seguranca_privacidade.webp','../../statics/img/webp/banner_politica_seguranca_privacidade.webp']"
        :imageHeight="['12%', '27%', '55%']"
      >
        <div class="banner-text-content">
          <h1 class="destaque-500 title">
            Termos de uso
          </h1>
        </div>
      </DisplayBanner>
    </section>
    <section class="content">
      <q-markdown class="container" :no-container="true" :src="termos" />
    </section>
  </main>
</template>

<script>
import termos from '../../statics/data/termos_de_uso.md'
import DisplayBanner from '../../components/DisplayBanner'

export default {
  name: 'TermosUso',
  data(){
    return {
      termos
    }
  },
  components: {
    DisplayBanner
  }
}
</script>

<style lang="scss">
  @import '../../css/my_mixins.scss';

  .pagina-termos-de-uso{
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