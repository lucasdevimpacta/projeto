<template>
  <fragment>
      <h4 :class="'title ' + classNames">{{title}}</h4>
        <ul :class="'content ' + classNames">
          <li v-for="(e, i) in linkItensRefined" :key="i" >
            <div v-if="e.url">
              <a target="_blank" v-bind:href="e.url">{{e.label}}</a>
            </div>
            <div v-else>
              <router-link :to="e.namedRoute">{{e.label}}</router-link>
            </div>
          </li>
        </ul>
  </fragment>
</template>

<script>
    export default {
        name: 'LiFooterOuter',
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
              } else if (e.url){
                obj.url = e.url
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