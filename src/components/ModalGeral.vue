<template>
  <transition name="modal-geral">
    <div v-if="show" @click="handleClose" :class="'modal-geral-component ' + classNames">
      <div class="modal-card">
        <span class="btn-close initial-hided" @click="handleClose">x</span>
        <slot name="header"></slot>
        <slot name="main"></slot>
        <slot name="callToAction"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalGeral',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    classNames:{
      type: String,
      default: ''
    }
  },
  methods: {
    handleClose(e) {
      if(e.target === e.currentTarget){
        this.$emit("handleClose",e)
      }
    }
  }
}
</script>

<style lang="scss">
  .modal-geral-component{
    position: fixed;
    z-index: 500;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    &.over-layer{
      background: #1b1b1b34;
    }
    .modal-card{
      width: 90vw;
      max-width: 500px;
      min-height: 300px;
      max-height: 90vh;
      overflow-y: auto;
      /* width */
      &::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: transparent; 
      }
      
      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #888; 
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #555; 
      }
    }
    .btn-close{
      position: absolute;
      top: 0;
      right: 0;
      font-size: 18px;
      z-index: 10;
      cursor: pointer;
    }
    &.default{
      .modal-card{
        background: white;
        border-radius: 8px;
        -webkit-box-shadow: 7px 7px 41px 0px rgba(0,0,0,0.07);
        -moz-box-shadow: 7px 7px 41px 0px rgba(0,0,0,0.07);
        box-shadow: 7px 7px 41px 0px rgba(0,0,0,0.07);
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .btn-close{
        display: initial;
        margin: 20px;
      }
    }
  }
</style>