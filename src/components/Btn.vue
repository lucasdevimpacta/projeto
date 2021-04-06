<template>
  <component :is="tag" :type="typeComputed" :class="'btn-component ' + classNames" @click="(e) => !loading && handleClick(e)" :style="objStyle" >
    <div v-if="loading" class="my-loader loader-icon">
      <i class="fas fa-circle-notch fa-spin"></i>
    </div>
    <slot v-else>
    </slot>
  </component>
</template>

<script>
  export default {
    name: 'Btn',
    props: {
      tag: {
        type: String,
        default: 'a'
      },
      classNames: {
        type: String,
        default: ''  
      },
      heightBtn: {
        type: String,
        default: '100%'
      },
      maxHeightBtn: {
        type: String,
        default: 'unset'
      },
      borderRadius:{
        type: String,
      },
      type:{
        type: String,
        default: 'button'
      },
      loading:{
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClick(e){
        this.$emit("click",e)
      }
    },
    computed:{
      objStyle(){
        let newObj = {
          height: this.heightBtn,
          maxHeight: this.maxHeightBtn,
        }

        if( this.borderRadius) newObj['borderRadius'] = this.borderRadius

        return newObj
      },
      typeComputed(){
        if(this.tag === 'button'){
          return this.type
        }
        return false
      }
    }
  }
</script>

<style lang="scss">
  *.btn-component{
    border: none;
    background: $primary;
    font-size: 17px;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    display: inline-block;
    text-align: center;
    font-weight: 500;
    & *{
      color: #fff;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      text-decoration: none;
      filter: opacity(0.9);
      -webkit-filter: opacity(0.9);
      cursor: pointer;
    }
    .my-loader{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8em;
    }
  }
</style>