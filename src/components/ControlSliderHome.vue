<template>
  <div class="control-slider-home-component">
    <div class="main-area">
      <div class="action-area">
        <button :value="previewSlide" @click="updateSlideCurrent" type="button" class="text-uppercase pagination-literal-btn prev-btn">Anterior</button>
          <fragment>
            <button :value="i" @click="updateSlideCurrent" v-for="i in qtdSlidesComputed" :key="i" type="button" :class="btnClass">
              <transition >
                <i v-show="i === slideCurrentIndex" class="is-active"></i>
              </transition>
            </button>
          </fragment>
        <button :value="nextSlide" @click="updateSlideCurrent" type="button" class="text-uppercase pagination-literal-btn prox-btn">Próximo</button>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  name: "ControlSliderHome",
  props: {
    qtdSlides:{
      type: Number,
      required: true
    },
    slideCurrentIndex:{
      type: Number,
      required: true
    },
    btnClass:{
      type: String,
      default: 'default-icon'
    }
  },
  computed: {
    qtdSlidesComputed() {
      let pagination = []
      for(let i = 0; i < this.qtdSlides; i++){
        pagination.push(i)
      }

      return pagination
    },
    previewSlide() {
      const result = this.slideCurrentIndex - 1
      return result >= 0 ? result : this.slideCurrentIndex
    },
    nextSlide() {
      const result = this.slideCurrentIndex + 1
      return result < this.qtdSlides ? result : this.qtdSlides - 1
    }
  },
  methods: {
    updateSlideCurrent(e) {
      this.$emit("updateSlideCurrent", e)
    }
  }
}
</script>

<style lang="scss">
  @import '../css/my_mixins.scss';

  .control-slider-home-component{
    position: relative;
    .v-enter-active, .v-leave-active{
      transition: opacity 0.3s;
    }
    .v-enter, .v-leave-to{
      opacity: 0;
    }
    &::after{
      content: '';
      position: absolute;
      background-image: url('../statics/img/odorno_slider_home.svg');
      background-size: cover;
      width: 43px;
      height: 43px;
      top: calc( -100% - 30px);
      right: 0;
    }
    .main-area{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      @include d(sxs){
        &::before{
          content: '';
          width: 100%;
          height: 1px;
          background: #364e5e36;
        }
        &::after{
          content: '';
          width: 100%;
          height: 1px;
          background: #364e5e36;
        }
      }
    }
    .action-area{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 22px;
      > button{
        margin: 0 22px;
        outline: none;
      }
      @include d(sxs){
        padding: 0;
        > button{
          margin: 0 9px;
        }
      }
    }
    .pagination-literal-btn{
      background: transparent;
      border: none;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #364E5E;
    }
    $dimensionIcon: 14px;
    .default-icon{
      width: $dimensionIcon;
      height: $dimensionIcon;
      background: #A5B0C3;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
      .is-active{
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: $dimensionIcon;
        height: $dimensionIcon;
        border: none;
        border-radius: 50%;
        background: $primary;
        z-index: 110;
        &::before{
          content: '';
          min-width: 50px;
          height: 50px;
          background: none;
          border-top: 1px solid #A5B0C3;
          border-left: 1px solid #A5B0C3;
          border-bottom: 2px solid $primary;
          border-right: 2px solid $primary;
          transform: rotate(-135deg);
          border-radius: 50%;
        }
      
      }
    }
    @include d(sxs){
      $dimensionIcon: 8px;
      .default-icon{
        padding: 0;
        width: $dimensionIcon;
        height: $dimensionIcon;
        .is-active{
          min-width: $dimensionIcon;
          height: $dimensionIcon;
          &::before{
            content: '';
            min-width: 26px;
            height: 26px;
          }
        }
      }
    }
  }
</style>