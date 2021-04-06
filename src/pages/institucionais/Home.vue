<template>
  <main class="pagina-home-geral is-home">
    <transition-group @leave="slideTransition" @enter="slidePrevTransition" @after-enter="clearClassTransition">
      <section :data-index="i" @touchstart="setTouchStart" @touchend="triggerTransition" v-for="({ images, bannerTextContent, routName }, i) in siteSections" v-show="i === slideCurrentIndex" :key="routName" class="display-banner-component-container">
        <DisplayBanner 
          :urlImage="images.url"
          :imageHeight="images.ratio"
        >
          <div class="banner-text-content">
            <h1 class="destaque-500 title text-uppercase adorno-container">
              <i class="adorno-retangular"></i>{{bannerTextContent.title}}
            </h1>
            <p v-for="(element, i) in bannerTextContent.text" :key="i" :class="element.className">
              {{element.content}}
            </p>
            <div class="btn-component-container">
              <router-link :to="{name: routName}" class="link-reset">
                <Btn tag="button" heightBtn="48px" classNames="destaque-500 text-uppercase text-white">Saiba mais</Btn>
              </router-link>
            </div>
          </div>
        </DisplayBanner>
      </section>
    </transition-group>
    <section class="control-slider-home-component-container">
      <div class="container">
        <ControlSliderHome @updateSlideCurrent="updateSlideCurrent" :qtdSlides="siteSections.length" :slideCurrentIndex="slideCurrentIndex" />
      </div>
    </section>
  </main>
</template>

<script>
import DisplayBanner from '../../components/DisplayBanner'
import Btn from '../../components/Btn'
import ControlSliderHome from '../../components/ControlSliderHome'
import { bannerTextContent } from '../../utils/bannerHomeHelper'

export default {
  name: 'Home',
  data() {
    return {
      oldSlideCurrentIndex: -1,
      slideCurrentIndex: 0,
      slideSelectedIndex: 1,
      updateFromControls: false,
      siteSections: [
        {
          label: "Treinamento e Certificação",
          routName: "cursos-home",
          bannerTextContent: bannerTextContent["treinamentos-certificacao-home"],
          images: {
            url:['../../statics/img/webp/banner-home-treinamentos.webp', '../../statics/img/webp/banner-home-treinamentos.webp'],
            ratio:['53.33%', '100vh + 1px']
          }
        },
        {
          label: "Graduação",
          routName: "graduacao-home",
          bannerTextContent: bannerTextContent["graduacao-home"],
          images: {
            url:['../../statics/img/webp/banner-home-graduacao.webp', '../../statics/img/webp/banner-home-graduacao-mobile.webp'],
            ratio:['53.33%', '100vh + 1px']
          }
        },
        {
          label: "Pós e MBA",
          routName: "pos-mba-home",
          bannerTextContent: bannerTextContent["pos-mba-home"],
          images: {
            url:['../../statics/img/webp/banner-home-treinamentos.webp', '../../statics/img/webp/banner-home-treinamentos.webp'],
            ratio:['53.33%', '100vh + 1px']
          }
        },
        {
          label: "Escola Técnica",
          routName: "escola-tecnica-home",
          bannerTextContent: bannerTextContent["escola-tecnica-home"],
          images: {
            url:['../../statics/img/webp/banner-home-treinamentos.webp', '../../statics/img/webp/banner-home-treinamentos.webp'],
            ratio:['53.33%', '100vh + 1px']
          }
        },
        {
          label: "Para Empresas",
          routName: "corporativo-home",
          bannerTextContent: bannerTextContent["corporativo-home"],
          images: {
            url:['../../statics/img/webp/banner-home-treinamentos.webp', '../../statics/img/webp/banner-home-treinamentos.webp'],
            ratio:['53.33%', '100vh + 1px']
          }
        }
      ],
      touchStart: 0
    }
  },
  methods: {
    updateSlideCurrent(e){
      const value  = +e.currentTarget.value
      if(this.slideCurrentIndex !== value){
        this.updateFromControls = true
        this.oldSlideCurrentIndex = this.slideCurrentIndex
        this.slideSelectedIndex = value
        const diference = this.slideSelectedIndex - this.oldSlideCurrentIndex
        if(Math.abs(diference) === 1){
         this.slideCurrentIndex = this.slideSelectedIndex
        } else if(diference > 0) {
          this.slideCurrentIndex ++
          setTimeout(() => this.updateSlideCurrent({ currentTarget: { value: this.slideSelectedIndex } }), 350)
        } else {
          this.slideCurrentIndex --
          setTimeout(() => this.updateSlideCurrent({ currentTarget: { value: this.slideSelectedIndex } }), 350)
        }
      }
    },
    clearClassTransition(e){
      Object.assign([], document.querySelectorAll(`.slideNextOut, .slidePrevIn`))
        .forEach(e => e.classList.remove('slideNextOut', 'slidePrevIn'))
    },
    slideTransition(e){
      if((this.oldSlideCurrentIndex < this.slideCurrentIndex) && this.updateFromControls){
        e.classList.add('slideNextOut')
      } 
      this.updateFromControls = false
    },
    slidePrevTransition(e){
      if((this.oldSlideCurrentIndex > this.slideCurrentIndex) && this.updateFromControls){
        e.classList.add('slidePrevIn')
      }
      this.updateFromControls = false
    },
    setTouchStart(e){
      this.touchStart = e.targetTouches[0].clientX
    },
    triggerTransition(e){
      const cordX = e.changedTouches[0].clientX
      const distance = cordX - this.touchStart
      const screenWidth = window.screen.width
      const percentMove = distance / screenWidth
      if((distance < 0) && percentMove < -0.3){
        const result = this.slideCurrentIndex + 1
        const newIndex = result < this.siteSections.length ? result : this.siteSections.length - 1
        this.updateSlideCurrent({ currentTarget: { value: newIndex } })
      }
      if((distance > 0) && percentMove > 0.3){
        const result = this.slideCurrentIndex - 1
        const newIndex = result >= 0 ? result : this.slideCurrentIndex
        this.updateSlideCurrent({ currentTarget: { value: newIndex } })
      }
    }
  },
  components: {
    DisplayBanner,
    Btn,
    ControlSliderHome
  }
}
</script>

<style lang="scss">
  @import '../../css/my_mixins.scss';
  @keyframes slideIn {
    from{
      left: 100%;
    }
    to{
      left: 0;
      display: block;
    }
  }
  @keyframes slideOut {
    from{
      right: 0;
    }
    to{
      right: 100%;
      display: none;
    }
  }
  @keyframes slideInPrev {
    from{
      right: 100%;
    }
    to{
      right: 0;
      display: block;
    }
  }
  @keyframes slideOutPrev {
    from{
      left: 0;
    }
    to{
      left: 100%;
      display: none;
    }
  }

  .pagina-home-geral{
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    $distanceBottomOfControl: 10vh;
    .display-banner-component-container{
      position: absolute;
      top: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      color: white;
      margin-bottom: 32px;
      &::after{
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        background: #ffffff9d;
        background: -moz-linear-gradient(116deg, #ffffffb3 70%, #ffffff8f 96%);
        background: -webkit-linear-gradient(116deg, #ffffffb3 70%, #ffffff8f 96%);
        background: linear-gradient(116deg, #ffffffb3 70%, #ffffff8f 96%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ffffff",GradientType=1);
      }
      .adorno-container{
        @include d( m){
          position: relative;
          .adorno-retangular{
            position: static;
            &:before{
              left: 0;
              right: 0;
              margin: 0 auto;
            }
          }
        }
      }
      .title{
        font-weight: 500;
        font-size: 46px;
        line-height: 53px;
        color: #272727;
      }
      .adorno-retangular:before{
        height: 4px;
      }
      p{
        font-weight: 300;
        font-size: 25px;
        line-height: 34px;
        color: #364E5E;
        margin-bottom: 5px;
      }
      @include d(sxs){
        margin-bottom: 30px;
        .banner-text-content{
          padding-bottom: 30px;
        }
        .title{
          font-size: 28px;
          line-height: 32px;
        }
        p{
          font-size: 16px;
          line-height: 25px;
          max-width: 90%;
          margin-left: auto;
          margin-right: auto;
        }
      }
      .btn-component-container{
        width: 343px;
        max-width: 100%;
        margin: 0 auto;
        button{
          margin-top: 40px
        }
        @include d(l){
          margin: 0;
        }
        @include d(sxs){
          width: 100%;
          left: 0;
          padding-right: 15px;
          padding-left: 15px;
          position: absolute;
          bottom: calc( #{$distanceBottomOfControl} + 30px);
        }
      }
    }
    .control-slider-home-component-container{
      position: absolute;
      bottom: $distanceBottomOfControl;
      left: 0;
      width: 100%;
      z-index: 100;
      @include d(sxs){
        bottom: calc(#{$distanceBottomOfControl} - 15px);
        .control-slider-home-component::after{
          top: calc( -100% - 100px);
        }
      }
    }
    $timeDuration: 0.35s;
    .slideNextOut{
      animation: slideOut $timeDuration;
      & + *{
        //animation: name duration timing-function delay iteration-count direction fill-mode;
        animation: slideIn $timeDuration;
      }
    }
    .slidePrevIn{
      animation: slideInPrev $timeDuration;
      & + *{
        animation: slideOutPrev $timeDuration;
      }
    }
  }

</style>