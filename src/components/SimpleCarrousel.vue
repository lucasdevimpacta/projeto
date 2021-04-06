<template>
  <div class="simple-carrousel-component" @touchstart="setTouchStart" @touchend="triggerTransition" >
    <!-- <div class="foreground-touch" @touchstart="setTouchStart" @touchend="triggerTransition" ></div> -->
    <transition-group class="my-slide-group" @leave="slideTransition" @enter="slidePrevTransition" @after-enter="clearClassTransition">
      <slot ref="slideParent">
      </slot>
    </transition-group>
    <div class="control-slider-component-container">
      <ControlSlider @updateSlideCurrent="updateSlideCurrent" :qtdSlides="count" :slideCurrentIndex="slideCurrentIndex" />
    </div>
  </div>
</template>

<script>
import ControlSliderHome from '../components/ControlSliderHome'

export default {
  name: 'SimpleCarrousel',
  props: {
    count: {
      type: Number
    }
  },
  data() {
    return {
      oldSlideCurrentIndex: -1,
      slideCurrentIndex: 0,
      slideSelectedIndex: 1,
      updateFromControls: false,
      touchStart: 0
    }
  },
  computed:{
  },
  watch: {
    slideCurrentIndex(val) {
      this.setSlideCurrentIndex(val)
    }
  },
  methods: {
    setSlideCurrentIndex(val) {
      this.$emit("setSlideCurrentIndex", val)
    },
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
        const newIndex = result < this.count ? result : this.count - 1
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
    ControlSlider: ControlSliderHome
  }
}
</script>

<style lang="scss">
  @import '../css/my_mixins.scss';
  @keyframes slideIn {
    from{
      transform: translate(100%, -100%);
    }
    to{
      transform: translate(0, -100%);
    }
  }
  @keyframes slideOut {
    from{
      transform: translate(0, 0);
    }
    to{
      transform: translate(-100%, 0);
    }
  }
  @keyframes slideInPrev {
    from{
      transform: translate(-100%, 0);
    }
    to{
      transform: translate(0, 0);
    }
  }
  @keyframes slideOutPrev {
    from{
      transform: translate(0, -100%);
    }
    to{
      transform: translate(100%, -100%);
    }
  }
  .simple-carrousel-component {
    position: relative;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
    width:100%;
    .my-slide-group {
      display: block;
      position: relative;
      overflow: hidden;
      width:100%;
      > * {
        position: relative;
      }
    }
    .foreground-touch {
      position: absolute;
      top: 0;
      bottom: 50px;
      left: 0;
      right: 0;
      background-color: transparent;
      z-index: 200;
    }
    $timeDuration: 0.25s;
    .slideNextOut{
      animation: slideOut $timeDuration;
      & + *{
        position: absolute;
        //animation: name duration timing-function delay iteration-count direction fill-mode;
        animation: slideIn $timeDuration;
      }
    }
    .slidePrevIn{
      animation: slideInPrev $timeDuration;
      & + *{
        position: absolute;
        animation: slideOutPrev $timeDuration;
      }
    }
    .control-slider-home-component {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      &::after {
        display: none;
      }
      @include d(sxs) {
        //transform: scale(0.7);
        button[fragment] {
          display: none!important;
        }
      }
    }
  }
</style>