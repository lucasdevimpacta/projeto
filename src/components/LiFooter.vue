<template>
  <fragment>
      <h4 :class="'title ' + classNames">{{title}}</h4>
        <ul :class="'content ' + classNames">
          <li v-for="(e, i) in linkItensRefined" :key="i" >
              <router-link :to="e.path || e.namedRoute">{{e.label}}</router-link>
          </li>
        </ul>
  </fragment>
</template>

<script>
    export default {
        name: 'LiFooter',
        props:{
          title: {},
          linkItens:{
            type: Array
          },
          classNames:{
            type: String,
            default: ''
          }
        },
        computed:{
          linkItensRefined() {
            return this.linkItens.map( e => {
              let obj = { label: e.label}
              if( e.path){
                obj.path = e.path
              } else if ( e.namedRoute){
                obj.namedRoute = { name: e.namedRoute }
              }
              return obj
            })
          }
        }
    }
</script>

<style>

</style>