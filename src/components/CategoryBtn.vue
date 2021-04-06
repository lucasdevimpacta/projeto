<template>
  <router-link 
    v-if="pathToDestine"
    :to="{path: pathToDestine}"
    :class="classComputed"
    :style="{
      borderRadius,
      flexDirection: direction
    }"
  >
    <div class="text-content"
      :style="{
            fontSize: iconSize.fontSize,
          }"
    >
      <div class="icon-container">
        <i 
          v-if="icon.class" 
          :class="icon.class"
        ></i>
        <i 
          v-else-if="icon.character" 
          class="fas" 
          :id="'icon__' + code" 
          v-html="makeTagStyle()"
        ></i>
        <div
          v-else-if="icon.path"
          class="display-image-component-container"
          :style="{
            width: `calc( ${iconSize.fontSize} )`,
          }"
        >
          <DisplayImage :urlImage="[icon.path]" :imageHeight="['100%']" />
        </div>
      </div>
      {{text}}
      <slot></slot>
    </div>
  </router-link>
  <div v-else :class="classComputed">
    <div class="text-content"
      :style="{
            fontSize: iconSize.fontSize,
          }"
    >
      <div class="icon-container">
        <i 
          v-if="icon.class" 
          :class="icon.class"
        ></i>
        <i 
          v-else-if="icon.character" 
          class="fas" 
          :id="'icon__' + code" 
          v-html="makeTagStyle()"
        ></i>
        <div
          v-else-if="icon.path"
          class="display-image-component-container"
          :style="{
            width: `calc( ${iconSize.fontSize} )`,
          }"
        >
          <DisplayImage :urlImage="[icon.path]" :imageHeight="['100%']" />
        </div>
      </div>
      {{text}}
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  name: 'CategoryBtn',
  data(){
    return {
      code: (Math.random() * 100).toFixed(0)
    }
  },
  props:{
    text: {
      type: String,
    },
    pathToDestine: {
      type: String
    },
    icon: {
      type: Object,
      required: true
    },
    iconSize: {
      type: Object,
      default: () => {
        return {fontSize: '1em'}
      }
    },
    borderShadow:{
      type: Boolean
    },
    borderRadius:{
      type: String,
      default: 'unset'
    },
    direction:{
      type: String,
      default: 'unset'
    },
    classNames:{
      type: String,
      default: ''
    }
  },
  computed:{
    classComputed(){
      let classes = 'category-btn-component '
      classes += this.borderShadow ? 'soft-shadow ' : '' 
      return `${classes} ${this.classNames}`
    }
  },
  methods:{
    makeTagStyle(){
      return (`<style>
            #icon__${this.code}::after{
              content: "\\${this.icon.character}"
            }
        </style>`)
    }
  }
}
</script>

<style lang="scss">
  .category-btn-component{
    background: white;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 1.3em;
    .text-content{
      display: flex;
      align-items: center;
    }
    .icon-container{
      font-size: 1.4em;
      margin-right: 14px;
    }
    &.style-default{
      .icon-container{
        width: 2.1em;
        min-width: 2.1em;
        height: 2.1em;
        border-radius: 1.05em;
        //background: $primary
      }
      i{
        //color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%
      }
    }
    &.solid{
      .icon-container{
        background: $primary
      }
       i{
        color: white;
      }
    }
  }
  .category-btn-component.column-direction{
    flex-direction: column
  }
  
</style>