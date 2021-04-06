<template>
  <div class="breadcrumb container">
    <ul :class="'text-uppercase '+className">
      <li
        v-for="(bread, i) in breadcrumb"
        :key="i"
        @click="routeTo(bread, i)"
        :class="{'linked': !bread.link}">

        <span v-if="!bread.last ">
          <span v-if="bread.dynamic == undefined || bread.dynamic == false">{{ bread.name }}</span>
          <span v-else> {{ bread.name.replace(/{categoria}/,dynamicrumbs[bread.key].name) }} </span>
        </span>
        <span v-else>
          <span v-if="lastcrumb != ''">{{lastcrumb.replace(/-/g,' ')}}</span>
          <span v-else>{{bread.name}}</span>
        </span>

      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Btn',
    props: {
      className:{
        type:String,
        default: ''
      },
      breadcrumb:{
        type: Array
      },
      dynamicrumbs:{
        type: Object,
      },
      lastcrumb:{
        Type: String,
        default: ''
      }
    },
    methods: {
      handleClick(e){
        this.$emit("click",e)
      },
      routeTo (bread, pRouteTo) {
        if ( bread.dynamic == undefined || bread.dynamic == false ) {
          if (this.breadcrumb[pRouteTo].link) this.$router.push(this.breadcrumb[pRouteTo].link)
        } else {
          if (this.breadcrumb[pRouteTo].link) this.$router.push(this.breadcrumb[pRouteTo].link.replace(/{link}/,this.dynamicrumbs[bread.key].link))
        }
      },
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
  
  @import '../css/main.scss';

  .breadcrumb {
    background:transparent;
    font-size:18px;
    letter-spacing:1px;
    ul {
      display: flex;
      justify-content: center;
      list-style-type: none;
      margin: 0;
      padding: 0;
      > li {
        display: flex;
        float: left;
        height: 20px;
        width: auto;
        color: $primary;
        font-weight: bold;
        font-size: .9em;
        cursor: pointer;
        align-items: center;
          text-transform: capitalize;
        &.linked {
          cursor: default;
          color: $primary;
          //text-shadow: -1px -1px 1px rgba(0, 0, 255, .1), 1px 1px 1px rgba(200,200,255,.7);
          text-decoration: underline;
        }
      }
      > li:not(:last-child)::after {
        content: ' | ';
        float: right;
        font-size: .8em;
        margin: 0 .5em;
        color: $primary;
        cursor: default;
      }
    }
    ul.alter {
      display: flex;
      justify-content: center;
      list-style-type: none;
      margin: 0;
      padding: 0;
      > li {
        display: flex;
        float: left;
        height: 20px;
        width: auto;
        color: white;
        font-weight: bold;
        font-size: .9em;
        cursor: pointer;
        text-transform: capitalize;
        align-items: center;
        &.linked {
          cursor: default;
          font-weight: bold;
          color: #fff ;
          text-decoration: underline;
        }
      }
      > li:not(:last-child)::after {
        content: ' | ';
        float: right;
        font-size: .8em;
        margin: 0 .5em;
        color: white;
        cursor: default;
      }
    }
    @include d(sxs) {
      margin-bottom:15px;
      ul {
        display:block;
        li{
          display:block;
        }
      }
    }
  }
</style>