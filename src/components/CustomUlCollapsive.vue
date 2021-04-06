<template>
  <ul :class="'custom-ul-collapsive-component ' + classNames">
    <LiCollapsive v-for="( e, i) in content" :content="e" :key="i+code" :showIcon="showIcon" :classNames="classNames == 'initial-ul' ? 'initial-ul' : ''" />
  </ul>
</template>

<script>
  export default {
    name: "CustomUlCollapsive",
    props: {
      classNames: {
        type: String,
        default: ''
      },
      content: {
        type: Array,
        default: ''
      },
      showIcon: {
        type: Boolean,
        default: false
      },
      expandAll:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        code: (Math.random() * 100).toFixed(0)
      }
    },
    watch:{
      expandAll: function( val){
        if( val){
          Object.assign( [], this.$el.offsetParent.querySelectorAll('.initial-hided'))
            .forEach( e => e.classList.add('show'))
        } else{
          Object.assign( [], this.$el.offsetParent.querySelectorAll('.initial-hided'))
            .forEach( e => e.classList.remove('show'))
        }
      }
    },
    components:{
      LiCollapsive: () => import('./LiCollapsive')
    }
  }
</script>

<style lang="scss">
  .custom-ul-collapsive-component{
    &.initial-ul{
      > li{
        border-radius: 8px;
        border: 1px solid #E3E9ED;
        padding: 8px;
        background: white;
        margin-bottom: 10px;
      }
    }
    p{
      font-weight: 300;
      font-size: 14px;
      line-height: 155%;
      color: #364E5E;
    }
  }
</style>