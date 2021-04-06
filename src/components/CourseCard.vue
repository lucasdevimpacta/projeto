<template>
  <div 
    :class="'course-card-component ' + classNames"
    :style="{
      borderRadius: borderRadiusComputed[0]
    }"
  >
    <div 
      class="container-image"
    >
      <DisplayVideo v-if="displayVideo" :playVideo="playVideo" classNames="my-position-absolute bg-title-dark" :title="title ? title.text : ''" :url="displayVideo.url" :borderRadius="borderRadiusComputed[1]" />
      <div class="container-mobile">
        <DisplayImage :urlImage="urlImage" :imageHeight="imageHeight" :borderRadius="borderRadiusComputed[1]" classNames="bg-size-cover" :adjusteThumb="adjusteThumb" />
      </div>
      <slot name="contentOnImage"></slot>
      <div v-if="! displayVideo" class="all-title">
        <div v-if="title" class="title-over-tag" v-html="textTitleRefined"></div>
        <div v-if="titleTag" class="title-tag" v-html="textTitleTagRefined"></div>
        <div v-if="showModulo" class="title-tag-modulo" v-html="titleModuloRefined">Modulo </div>
      </div>
    </div>
    <slot name="contentDownImage"></slot>
  </div>
</template>

<script>
  import DisplayImage from './DisplayImage'
  import DisplayVideo from './DisplayVideo'

  export default {
    name: 'CourseCard',
    props:{
      urlImage: {
      type: Array,
      required: true
      },
      imageHeight:{
        type: Array,
        required: true
      },
      titleModulo: {
        type:Object
      },
      titleTag:{
        type: Object
      },
      title:{
        type: Object
      },
      borderShadow:{
        type: Boolean
      },
      borderRadius:{},
      classNames:{
        type: String,
        default: ''
      },
      displayVideo:{
        type: Object
      },
      playVideo: {
        type: Boolean,
        default: false
      },
      adjusteThumb: {
        type: Boolean,
        default: false
      }
    },
    computed:{
      textTitleTagRefined(){
        return this.titleTag.text.length > 18 ? this.titleTag.text.match(/.{0,18}/)[0] + '...' : this.titleTag.text
      },
      textTitleRefined(){
        return this.title.text.length > 50 ? this.title.text.match(/.{0,50}/)[0] + '...' : this.title.text
      },
      titleModuloRefined(){

        return (this.titleModulo) ? this.titleModulo.text : '';
      },
      showModulo(){
         return (this.titleModulo) ? this.titleModulo.text.indexOf("único") == -1 : false;
      },
      borderRadiusComputed(){
        const bR = this.borderRadius

        if( typeof( bR) === 'object'){
          const val1 = bR.container || 'unset'
          const val2 = bR.containerImage || 'unset'
          return [ val1, val2]
        }
        return ['unset','unset']
      }
    },
    components: {
      DisplayImage,
      DisplayVideo
    }
  }
</script>

<style lang="scss">
  @import '../css/main.scss';

  .course-card-component{
    overflow: hidden;
    .container-image{
      position: relative;
    }
    $marginTitles: 7px;
    .all-title{
      position: absolute;
      bottom: -8px;
    }
    .title-tag{
      font-size: 14px;
      font-weight: 500;
      color: white;
      background: $primary;
      padding: 0px 5px;
      border-radius: 6px;
      margin-left: $marginTitles;
      display: inline-block;
    }
    .title-tag-modulo{
      font-size: 14px;
      font-weight: 500;
      color: white;
      background: $orangered;
      padding: 0px 5px;
      border-radius: 6px;
      margin-left: 5px;
      display: inline-block;
    }
    .title-over-tag{
      margin-left: $marginTitles;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 5px;
    }
    &.default-filter{
      .display-image{
        span{
          //position: absolute;
          //content: '';
          //top: 0;
          //width: 100%;
          //height: 100%;
          // background: -moz-linear-gradient(180deg,#00000021 0%,#0000004c 0.01%, #222222d9 54.69%);
          // background: -webkit-linear-gradient(180deg,#00000021 0%,#0000004c 0.01%, #222222d9 54.69%);
          // background: linear-gradient(180deg,#00000021 0%,#0000004c 0.01%, #222222d9 54.69%);
          // filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000021",endColorstr="#222222d9",GradientType=1);

          background: rgba(36, 36, 40, 0.58);
          background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.52) 50%, rgba(255,255,255,0.1026785714285714) 100%);
          background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.52) 50%, rgba(255,255,255,0.1026785714285714) 100%);
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.52) 50%, rgba(255,255,255,0.1026785714285714) 100%);
        }
      }
    }

    &.blue-gradient-filter{
      .display-image{
        span{
          //position: absolute;
          //content: '';
          //top: 0;
          //width: 100%;
          //height: 100%;
          background: rgb(10,136,244);
          background: -moz-linear-gradient(180deg, rgba(10,136,244,0.65) 0%, rgba(255,255,255,0) 80%);
          background: -webkit-linear-gradient(180deg, rgba(10,136,244,0.65) 0%, rgba(255,255,255,0) 80%);
          background: linear-gradient(180deg, rgba(10,136,244,0.65) 0%, rgba(255,255,255,0) 80%);
          filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0a88f4",endColorstr="#ffffff",GradientType=1);
        }
      }
    }

    &.default-style{
      .title-over-tag{ 
        color: white;
      }
      @include d( msxs){
        padding: 10px;
        $widthImagem: 50px;
        .container-image{
          width: 100%;
          height: 75px;
          span{
            background: none;
          }
        }
        .container-mobile{
          width: $widthImagem;
          height: 42px;
          border-radius: 6px !important;
          overflow: hidden;
          .display-image{
            background-size: cover;
          }
        }
        .all-title{
          position: absolute;
          bottom: -4px;
        }
        .title-tag{
          font-weight: bold;
          font-size: 10px;
          line-height: 13px;
          top: 0;
          bottom: unset;
          right: unset;
          left: 0;
          border-radius: 3px;
          margin-left: calc( #{$widthImagem} + 20px);
        }
        .title-tag-modulo{
          font-weight: bold;
          font-size: 10px;
          line-height:13px;
          top: 0;
          bottom: unset;
          right: unset;
          left:0;
          border-radius: 3px;
          margin-left: 12px;
        }
        .title-over-tag{
          margin-left: calc( #{$widthImagem} + 20px);
          color: #272727;
          height: 100%;
          top: 0;
          align-self: center;
          display: flex;
          align-items: flex-end;
          margin-bottom:0px;
        }
      }
    }
    .parcelamento, .preco, .valor-a-vista{
      margin-bottom: 7px;
    }
    .info-treinamento{
      @include d( l){
        padding: 17px;
        p.preco{
          font-size: 32px;
          font-weight: 500;
        }
      }
      @include d( msxs){
        p.preco,p.valor-a-vista{
          display: inline;
          &::after{
            content: ' ';
          }
        }
      }
      p{
        font-weight: 300;
      }
      p.preco{
        font-weight: 700;
      }
      .carga-horaria{
        span{
          font-size:14px;
          font-weight:600 !important;
        }
      }
    }
  }
</style>