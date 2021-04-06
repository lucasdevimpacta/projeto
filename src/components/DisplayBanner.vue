<template>
  <div :class="'display-banner-component ' + classNames">
    <div class="display-banner-text-content container">
      <slot></slot>
    </div>
    <DisplayImage :urlImage="urlImage" :imageHeight="imageHeight" />
  </div>
</template>

<script>
import DisplayImage from './DisplayImage'

export default {
  name: 'DisplayBanner',
  components:{
    DisplayImage
  },
  props:{
    urlImage: {
      type: Array,
      required: true
    },
    imageHeight:{
      type: Array,
      required: true
    },
    classNames:{
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  @import '../css/main.scss';

  .display-banner-component{
    position: relative;
    .display-image{
      background-size: cover !important;
    }
    &.blue-filter::after{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #0a88f4eb;
    }
  
    div.display-banner-text-content{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      z-index: 100;

      @include d( l){
        align-items: unset;
        text-align: unset;
      }
    }
  }
</style>