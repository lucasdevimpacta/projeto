<template>
  <fragment>
    <div
      v-lazy:background-image="`${ getValuePerDevice(urlImage)}`"
      v-if="isReady"
      :class="setImagemClass()"
      :style="{
        borderRadius: borderRadius
      }"
    >
      <span :style="{
        paddingTop: `calc( ${getValuePerDevice(imageHeight)} - 1px)`,
        borderRadius: borderRadius
      }"></span>
    </div>
    <!-- <div v-if="isReady && isMobile"
      :class="allClassNames"
      :style="{
        backgroundImage: `url(${urlImage[indexMobile]})`,
        borderRadius: borderRadiusRefined
      }"
    >
      <span :style="{
        paddingTop: `calc( ${imageHeight[indexMobile]} - 1px)`
      }"></span>
    </div> -->
  </fragment>
</template>

<script>
export default {
  name: 'DisplayImage',
  data () {
    return {
      index: 0,
      isReady: false
    }
  },
  props: {
    classNames: {
      default: ''
    },
    urlImage: {
      type: Array,
      required: true
    },
    imageHeight: {
      type: Array,
      required: true
    },
    borderRadius: {
      type: String,
      default: 'unset'
    },
    adjusteThumb: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  methods: {
    onResize () {
      if (window.matchMedia('(min-width: 577px)').matches) {
        this.isMobile = false
      } else {
        this.isMobile = true
      }
      if (window.matchMedia('(min-width: 992px)').matches) {
        this.index = 0
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        this.index = 1
      } else if (window.matchMedia('(min-width: 576px)').matches) {
        this.index = 2
      } else {
        this.index = 3
      }
    },
    getValuePerDevice (prop) {
      return prop[this.index] || prop[prop.length - 1]
    },
    setImagemClass(){
      return "display-image " + this.classNames + " " + (this.adjusteThumb?'courseThumb':"");
    }
  },

  mounted () {
    // Register an event listener when the Vue component is ready
    window.addEventListener('resize', this.onResize)
    this.onResize()
    this.isReady = true
  },

  beforeDestroy () {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss" >
div.display-image {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  &.bg-size-cover{
    background-size: cover;
  }
  span {
    display: block;
  }
  &.courseThumb{
    background-size:cover;
  }
}
</style>