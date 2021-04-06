<template>
  <div 
    :class="'display-video-component-container ' + classNames"
    :style="{
      borderRadius
    }"  
  >
    <div class="call-to-action" @click="toggleVisibility">
      <i class="fas fa-play"></i>
    </div>
    <div v-if="title" class="title" @click="toggleVisibility" >
      {{title}}
    </div>
    <!-- <div class="video-content position-static">
      {{playVideo}}
    </div> -->
    <div v-if="renderIframeVideo" class="video-content" @click="toggleVisibility" >
      <div class="player-container">
        <span class="close-icon" :data-idtarget="'video_target_' + code" @click="toggleVisibility"><i class="fas fa-times"></i></span>
        <div class="fa-3x loader-icon">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
        <iframe width="560" height="315" :src="url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayVideo",
  data(){
      return{
        code: (Math.random() * 1000).toFixed(0),
        renderIframeVideo: false,
        history: []
      }
  },
  props: {
    classNames: {
      type: String,
      default: ''
    },
    title: {
      type: String
    },
    url: {
      type: String,
      required: true
    },
    borderRadius: {
      type: String,
      default: 'unset'
    },
    playVideo: {
      type: Boolean,
      default: false
    }
  },
  watch:{
    playVideo(value){
      this.renderIframeVideo = ! this.renderIframeVideo
    }
  },
  methods:{
    toggleVisibility( e){
      this.renderIframeVideo = ! this.renderIframeVideo
      e.stopPropagation()
    }
  }
}
</script>

<style lang="scss">

  .display-video-component-container{
    display: flex;
    overflow: hidden;
    &.my-position-absolute{
      position: absolute;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
      .call-to-action{
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    } 
    &.bg-title-dark{
      .title{
        color: white !important;
        background: #00000099;
        padding: 12px;
      }
    }
    .title{
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      align-self: flex-end;
      width: 100%;
    }
    .call-to-action i{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      background: #00000099;
      color: white;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .video-content{
      position: fixed;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      background: #00000099;
    }
    .player-container{
      position: relative;
      max-height: 100vmin;
      max-width: 100vmin;
      > span {
        position: absolute;
        top: -25px;
        right: -25px;
        color: white;
        cursor: pointer;
        font-size: 20px;
      }
      .loader-icon{
        position: absolute;
        top: 50%;
        right: 50%;
        z-index: -1;
        color: white;
      }
    }
  }
</style>
