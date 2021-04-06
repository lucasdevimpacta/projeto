<template>
  <div :class="'main-header-navigation-component ' + classComputed">
    <div
      class="menu-collapsive-btn d-lg-none"
    >
      <i
      data-idelementtocollapse="ul-n1-0"
      class="fas fa-bars"
      @click="toggleVisibilityMenu"
      >
        <div 
        class="menu-click-background-to-close"
        :style="{top: headerHeight}"
        ></div>
      </i>
    </div>
    <ul id="ul-n1-0" class="dropdown-ul n1">
      <li v-for="( e, i) in navigationLinks" :class="'drop-item ' + ( e. content ? 'have-more' : '')"  :key="i">
        <div v-if="e.content">
          <div class="menu-collapsive-btn"  >
            <span
              :data-idelementtocollapse="'ul-n2-'+i" 
              @click="toggleVisibilityMenu"
            >
              {{e.label}}
              <i class="fas fa-chevron-down ml-1"></i>
              <div 
              class="menu-click-background-to-close n2"
              ></div>
            </span>
          </div>
          <ul :id="'ul-n2-'+i" class="dropdown-ul n2">
            <li v-for="(e2, i2) in e.content" :key="i2">
              <router-link :to="e2.path ? e2.path : { name: e2.routName }">
                {{e2.label}}
              </router-link>
            </li>
          </ul>
        </div>        
        <a v-else-if="e.url" target="_blank" v-bind:href="e.url">{{e.label}}</a>
        <router-link v-else :to="e.path ? e.path : { name: e.routName }">
          {{e.label}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MainHeaderNavigation",
  props: {
    classNames: {
      type: String,
      default: ""
    },
    navigationLinks:{
        type: Array,
        required: true
      },
  },
  data(){
    return{
      headerHeight: 'unset'
    }
  },
  computed: {
    classComputed() {
      return `${this.classNames} dropdown-menu-component`;
    }
  },
  methods: {
    toggleVisibilityMenu(e){
      let idElementToCollapse = e.currentTarget.dataset.idelementtocollapse
      let self = e.currentTarget
      let bgToClose = self.getElementsByClassName( 'menu-click-background-to-close')[0]

      if( document.getElementById( idElementToCollapse).classList.toggle('visible')){
        bgToClose.classList.add('visible')
        self.classList.add('open')
      } else {
        bgToClose.classList.remove('visible')
        self.classList.remove('open')
      }
      //e.stopPropagation()
    },
    resetMenu(){
      Object.assign( [], document.getElementsByClassName('main-header-navigation-component'))
        .forEach( e => {
          Object.assign( [], e.querySelectorAll( `.open, .visible`))
            .forEach( e => e.classList.remove('open', 'visible'))
        })
    },
    updateHeaderHeight(){ 
      this.headerHeight = document.getElementsByTagName('header')[0].offsetHeight + 'px'
    },
    log(val){
      console.log( val)
    }
  },
  watch:{
    '$route': function( val){
      this.resetMenu()
    }
  },
  mounted(){
    this.updateHeaderHeight()
  }
};
</script>

<style lang="scss">
  @import '../css/main.scss';

  .main-header-navigation-component{
    .menu-collapsive-btn.d-lg-none{
      line-height: 100%;
    }
  }

  $paddingUl: 12px;
  .dropdown-menu-component{
    .fa-chevron-down{
      font-size: 13px;
    }
    *.dropdown-ul{
      display: none;
    }
    *.dropdown-ul.visible{
      display: flex;
      position: absolute;
      flex-direction: column;
      z-index: 100;
      background: white;
      left: 0;
      padding: 0 $paddingUl;
    }
    *.dropdown-ul.visible{
      @include d(lm){
        -webkit-box-shadow: 0px 7px 22px #00000012;
        -moz-box-shadow: 0px 7px 22px #00000012;
        box-shadow: 0px 7px 22px #00000012;
        border-radius: 6px;

        font-size: 14px;
        line-height: 22px;
        white-space: nowrap;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      &.n2{ 
        @include d( sxs){
          position: static;
        }
      }
    }
    .n1{
      @include d( sxs){
        top: calc( 100% + 2px);
        right: 0;
      }
    }
    @include d( l){
      .dropdown-ul.n1{
        display: block;
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 0 $paddingUl;
        & > li {
          padding: 0 $paddingUl;
          white-space: nowrap;
        }
      }
      .n2 li{
        margin: 4px 0;
      }
    }
    li{
      cursor: pointer;
      @include d( sxs){
        border-bottom: 1px solid #5555553d;
        padding: 10px 0;
        &.have-more{
          padding-bottom: 0;
          padding-top: 0;
          .menu-collapsive-btn{
            padding-bottom: 10px;
            padding-top: 10px;
          }
          li{
            border-bottom: none;
            border-top: 1px solid #5555553d;
          }
        }
      }
    }
    i.fas.open::before{
      content: "\f00d" !important;
    }
    .drop-item{
      position: relative;
    }
  }
</style>
