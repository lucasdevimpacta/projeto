<template>
  <main class="pagina-contato">
    <section class="display-banner-component-container">
      <DisplayBanner 
        :urlImage="['../../statics/img/webp/banner_fale_conosco.webp','../../statics/img/webp/banner_fale_conosco.webp','../../statics/img/webp/banner_fale_conosco.webp']"
        :imageHeight="['24%', '50%', '115.0%']"
      >
        <div class="banner-text-content">
          <h1 class="destaque-500 title text-center adorno-container-center">
            <i class="adorno-retangular"></i>Fale conosco
          </h1>
          <p class="text-center">
            O espaço ideal para você enviar uma mensagem e esclarecer alguma dúvida, dar a sua sugestão ou elogio
          </p>
        </div>
      </DisplayBanner>
    </section>
    <section class="section-form">
      <div class="container soft-shadow">
        <form @submit="sendMessage">
          <MyInput label="nome" v-model="formObj.nome"/>  
          <MyInput label="e-mail" type="email" classNames="my-w-50" v-model="formObj.email" /> 
          <MyInput label="telefone" :mask="phoneMask" classNames="my-w-50" v-model="formObj.telefone" />
          <MyInputAsSelect 
            label="assunto"
            widthInput="100%"
            :options="[
              { value: 'elogio', text: 'elogio'},
              { value: 'critica', text: 'critica'},
              { value: 'mensagem', text: 'mensagem'}
            ]" 
            v-model="formObj.assunto"
          />
          <MyTextarea rows="4" label="Mensagem" widthInput="100%" v-model="formObj.mensagem" />
          <div class="btn-component-container">
            <Btn tag='button' :loading="contactUsSending" type="submit" classNames="text-uppercase text-white" heightBtn="48px">
              Enviar
            </Btn>  
          </div>
        </form> 
      </div>   
    </section>
    <Modal @handleClose="modalClose" :show="contactUsStatus != null" classNames="over-layer default">
      <template v-slot:main >
        <div class="my-modal-content">
          <h3 v-if="contactUsStatus" class="title">
            Sucesso envio da mensagem,<br>
            Obrigado pelo contato
          </h3>
          <h3 v-else class="title">
            Falha no envio da mensagem,<br>
            Tente novamente mais tarde
          </h3>
        </div>
      </template>
    </Modal>
  </main>
</template>

<script>
import DisplayBanner from '../../components/DisplayBanner'
import MyInput from '../../components/MyInput'
import MyInputAsSelect from '../../components/MyInputAsSelect'
import MyTextarea from '../../components/MyTextarea'
import Btn from '../../components/Btn'
import { phoneMask } from '../../utils/helper'
import ModalGeral from '../../components/ModalGeral'

export default {
  name: 'Contato',
  data(){
    return{
      formObj:{
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      }
    }
  },
  computed: {
    contactUsStatus(){
      return this.$store.state.app.contactUsStatus
    },
    contactUsSending(){
      return this.$store.state.app.contactUsSending
    },
  },
  methods: {
    phoneMask,
    modalClose(){
      this.$store.commit('app/UPDATE_CONTACT_US_STATUS', null)
    },
    sendMessage(e){
      e.preventDefault()
      const { nome, email, telefone, assunto, mensagem } = this.formObj
      this.$store.dispatch( 'app/sendContactMessage',{
        nome,
        email,
        telefone: telefone.toString().replace(/\D/g, ''),
        assunto,
        mensagem
      })
      e.currentTarget.reset()
    }
  },
  components: {
    DisplayBanner,
    MyInput,
    MyInputAsSelect,
    MyTextarea,
    Btn,
    Modal: ModalGeral
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Fale conosco',
      meta: {
        title: { name: 'title', content: 'Fale conosco' },
        description: { name: 'description', content: 'O espaço ideal para você enviar uma mensagem e esclarecer alguma dúvida, dar a sua sugestão ou elogio' },
        //keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: 'Fale conosco' },
        ogDescription: { name: 'og:description', content: 'O espaço ideal para você enviar uma mensagem e esclarecer alguma dúvida, dar a sua sugestão ou elogio' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Fale conosco' },
        twDescription: { name: 'twitter:description', content: 'O espaço ideal para você enviar uma mensagem e esclarecer alguma dúvida, dar a sua sugestão ou elogio' },
        twUrl: { name: 'twitter:url', content: this.$route.fullPath },
      },
      link: {
        canonical: { rel: 'canonical', href: this.$route.fullPath },
      },
      script: {
        ldJson: {
          type: 'application/ld+json',
          innerHTML: `{
              "@context":"https://schema.org",
              "@type": "WebPage",
              "name": "Fale conosco",
              "description": "O espaço ideal para você enviar uma mensagem e esclarecer alguma dúvida, dar a sua sugestão ou elogio",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": 
                ${this.$route.meta.breadcrumb.map(function (item, index) {
                  return `{
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "item": {
                        "@id": ${(!item.last)? 'https://impacta.com.br' + item.link: 'https://impacta.com.br'},
                        "name": ${item.name}
                    }
                  }`
                }).join("")}
              }
            }`
        }
      }
    }
  },
}
</script>

<style lang="scss">
  @import '../../css/my_mixins.scss';

  .pagina-contato{
    .display-banner-component-container{
      position: relative;
      color: white;
      &::after{
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        background: rgba(10, 136, 244, 0.8);
      }
      .banner-text-content{
        padding-bottom: 20px;
      }
      .title{
        font-weight: 500;
        font-size: 40px;
        line-height: 46px;
        margin-bottom: 22px;
      }
      .adorno-retangular:before{
        background: white;
      }
      p{
        font-style: italic;
        font-weight: 300;
        font-size: 22px;
        line-height: 34px;
        text-align: center;
        max-width: 670px;
        margin: 0 auto 10px;
        &.author{
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
        }
      }
      @include d(sxs){
        margin-bottom: 60px;
      }
    }
    .section-form{
      .container{
        position: relative;
        z-index: 1;
        width: 93vw;
        background: white;
        border-radius: 10px;
        padding: 40px 15px;
        margin: -130px auto 60px;
      }
      .btn-component-container{
        margin-top: 10px;
        padding: 0 7px;
      }
      @include d(lm){
        .container{
          padding: 50px 45px;
          max-width: 620px;
          margin: -100px auto 60px;
        }
      }
    }
    & + .geral-footer-component{
      .main-footer{
        border-top: 1px solid #E3E9ED;
      }
    }
    .my-modal-content{
      display: flex;
      align-items: center;
      flex-grow: 1;
      text-align: center;
    }
  }
</style>