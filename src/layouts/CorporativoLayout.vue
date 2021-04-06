<template>
  <div>
    <MainHeader/>
    <router-view />
    <GeralFooter v-if="! noFooter" />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader'
import GeralFooter from '../components/GeralFooter'

export default {
  name: 'CorporativoLayout',
  props: ['noFooter'],
  created() {
    window.teste = this
  },
  components:{
    MainHeader,
    GeralFooter
  },
  data () {
    return {
      
    }
  },
  methods:{
    
  },
}
</script>
