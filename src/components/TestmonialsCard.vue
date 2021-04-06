<template>
  <div class="card-testmonials-component">
      <div class="header d-flex">
        <div class="avatar-container">
            <DisplayImage :urlImage="[urlImage]" :imageHeight="[imageHeight]" borderRadius="30px" />
        </div>
        <div class="title" v-html="renderTitle()">
        </div>
      </div>
      <div class="body">
          <p>{{text | quotas}}</p>
      </div>
  </div>
</template>

<script>
import DisplayImage from './DisplayImage'

export default {
    name: 'TestmonialsCard',
    props:{
        urlImage:{
            type: String,
            required: true,
        },
        imageHeight:{
            type: String,
            required: true,
        },
        text:{
            type: String,
            required: true,
        },
        autor:{
            type: String,
            required: true
        },
        cargo:{
            type: String,
            default: ' '
        }
    },
    components:{
        DisplayImage
    },
    filters:{
        quotas( text){
            return `"${text}"`
        }
    },
    methods:{
        renderTitle(){
            return `<span class="autor-name">${this.autor}</span><span class="autor-cargo">${this.cargo}</span>`
        }
    }
}
</script>

<style lang="scss">
    .card-testmonials-component{
        padding: 20px;
        background: white;
        width: 100%;
        border: 1px solid #DADADA;
        border-radius: 4px;
        min-height: 200px;
        height: 100%;
        .avatar-container{
            width: 60px;
            height: 100%;
        }
        .title{
            align-self: center;
            margin-left: 18px;
            span{
                display: block;
            }
        }
        .autor-name{
            font-size: 16px;
            font-weight: 500;
        }
        .autor-cargo{
            font-size: 13px;
            font-weight: 300;
        }
        .body{
            font-size: 14px;
            font-weight: 300;
            font-style: italic;
            margin-top: 20px;
        }
    }
</style>