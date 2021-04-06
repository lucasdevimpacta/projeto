<template>
  <section :class="'section-related-qualification ' + classNames">
      <div class="imagem-principal-container d-none d-md-block">
            <div class="display-image"></div>
      </div>
      <div class="text-content">
            <h5 class="title text-uppercase">
                {{formacao.titulo}}
            </h5>
            <div v-html="formacao.descricao" class="descricao"></div>
            <div class="container-call-to-action">
              <div class="btn-component-container">
                  <Btn tag="button" @click="redirectToQualification" classNames="text-white">Ver Formação</Btn>
              </div>
              <router-link :to="{name: 'formacoes'}" class="style-link-default ml-md-3" >Ver todas as formações</router-link>
            </div>
      </div>
  </section>
</template>

<script>
  import Btn from './Btn'

  export default {
    name: 'SectionRelatedQualification',
    props:{
      classNames: {
        type: String,
        default: ''
      },
      course_id: {
        type: Number,
        required: true
      }
    },
    computed:{
      formacao(){
        //retorno temporario mockado
        return {
          titulo: 'Formação Android',
          descricao: `<p>Pellentesque ut est ac felis luctus iaculis at vitae odiom, nullam egestas sapien sit amet nunc eleifend consectetur aellentesque ut est ac felis luctus iaculis at vitae odiom, nullam egestas sapien sit amet nunc eleifend consectetur</p>`,
          path_formacao: `formacao-android__1`,
          icon:{
            class: 'formacao-android__1'
          }
        }
      }
    },
    methods:{
      redirectToQualification(e){
        this.$router.push({name: 'single-formacao', params: { formacao: this.formacao.path_formacao }})
      }
    },
    components:{
      Btn
    }
  }
</script>

<style lang="scss">
  @import '../css/my_mixins.scss';

  .section-related-qualification{
      position: relative;
      padding: 35px 0;
      overflow: hidden;
      color: #272727;

    .text-content{
      margin-left: calc( 300px + 5vw);
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      .descricao{
        margin: 20px 0;
        @include d( l){
          width: 70%;
        }
      }
      p{
        margin-bottom: 0;
        font-weight: 300;
        font-size: 16px;
        line-height: 30px;
      }
      @include d( sxs){
          margin: 0 auto;
          text-align: center;
          max-width: 510px;
          padding-right: 15px;
          padding-left: 15px;
      }
    }
    .btn-component-container{
      height: 40px;
      width: 140px;
      display: inline-block;
      font-size: 14px;
      @include d( sxs){
        display: block;
        width: 90%
      }
    }
    .title{
        font-weight: 700;
        font-size: 24px;
    }
  }
</style>