<template>
  <main class="pagina-centro-exames">
    <section class="display-banner-component-container">
      <DisplayBanner 
        :urlImage="['../../statics/img/webp/banner_centro_exames.webp','../../statics/img/webp/banner_centro_exames.webp','../../statics/img/webp/banner_centro_exames.webp']"
        :imageHeight="['24%', '45%', '125.5%']"
      >
        <div class="banner-text-content">
          <h1 class="destaque-500 title text-uppercase text-center adorno-container-center">
            <i class="adorno-retangular"></i>Centro de Exames
          </h1>
          <p class="text-center">
            A maior Certificadora Microsoft e o maior Centro de Exames Prometric da América Latina estão no mesmo lugar: aqui na Impacta!
          </p>
        </div>
      </DisplayBanner>
    </section>
    <section class="authorized-players">
      <div class="container">
        <h2 class="title text-uppercase adorno-container-center">
          Centro autorizado das principais certificadoras em tecnologia
        </h2>
        <p>
          O ambiente - físico ou online - ideal e validado para você tirar a sua certificação nas principais tecnologias e ferramentas do mercado
        </p>
        <div class="container-logos">
          <div class="row">
            <div v-for="n in (deviceSize === 'lg' ? 6 : 3)" :key="n" class="col logo-partner">
              <DisplayImage :urlImage="logoPartner[n - 1].url" :imageHeight="logoPartner[n - 1].ratio" />
            </div>
          </div>
        </div>
        <div class="btn-component-container">
            <Btn tag="a" classNames="text-uppercase text-white" v-scroll-to="'#agendamento'">Agende seu Exame</Btn>
        </div>
      </div>
    </section>
    <section class="attributes">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <DisplayImage :urlImage="['../../statics/img/centro_exames_01.png']" :imageHeight="['65.9%']" :borderRadius="'10px'"/>
          </div>
          <div class="col-lg-8 col-md-6 text-content first">
            <h3 class="title text-uppercase ">
              <i class="adorno-retangular"></i>Faça seu Exame Online!
            </h3>
            <p>
              As provas para tirar a Centro de Exames - ICS podem ser feitas em ambiente totalmente online, diretamente da sua casa ou de onde quiser, seguindo, é claro, as regras de segurança e confiabilidade.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 col-md-6 text-content second">
            <h3 class="title text-uppercase ">
              <i class="adorno-retangular"></i>Receba o resultado da prova na hora!
            </h3>
            <p> 
              Ao terminar o seu Exame, em ambiente online ou comparecendo até o Centro de Exames Impacta, localizado no 21º andar do edifício na Avenida Paulista - 1009, você recebe o resultado impresso ou digital na mesma hora!
            </p>
          </div>
          <div class="col-lg-4 col-md-6 order-1">
            <DisplayImage :urlImage="['../../statics/img/centro_exames_02.png']" :imageHeight="['65.9%']" :borderRadius="'10px'"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <DisplayImage :urlImage="['../../statics/img/centro_exames_03.png']" :imageHeight="['65.9%']" :borderRadius="'10px'"/>
          </div>
          <div class="col-lg-8 col-md-6 text-content third">
            <h3 class="title text-uppercase ">
              <i class="adorno-retangular"></i>Certificado entregue em até 60 dias!
            </h3>
            <p>
              Quando aprovado, você poderá receber a sua Certificação nas versões online e impressa em um prazo de 45 à 60 dias, de acordo com prova e certificadora escolhida.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section-form" id="agendamento">
      <div class="container">
        <p class="destaque-500 title text-center">São mais de 20 opções de Certificações</p>
        <h2 class="text-uppercase title destaque-500 text-center">Entre em contato e agende seu exame<br>agora mesmo!</h2>
        <form @submit="scheduleExam">
          <MyInput label="nome" v-model="formObj.nome"/>  
          <MyInput label="e-mail" type="email" classNames="my-w-50" v-model="formObj.email" /> 
          <MyInput label="telefone" :mask="phoneMask" classNames="my-w-50" v-model="formObj.telefone" />
          <MyInputAsSelect 
            label="curso"
            widthInput="100%"
            :options="examList" 
            v-model="formObj.curso"
          />
          <MyInput label="data de preferencia" :mask="dateMask" widthInput="50%" placeHolder="Ex: 29/07/2020" v-model="formObj.data_preferencia" /> 
          <MyInput label="horário de preferência" :mask="hourMask" widthInput="50%" placeHolder="00:00" v-model.lazy="formObj.horario_preferencia" />
          <div class="btn-component-container">
            <Btn tag='button' :loading="scheduleExamSending" type="submit" classNames="text-uppercase text-white" heightBtn="48px">
              Enviar
            </Btn>  
          </div>
        </form> 
      </div>   
    </section>
    <Modal @handleClose="modalClose" :show="scheduleExamStatus != undefined" classNames="over-layer default">
      <template v-slot:main >
        <div class="my-modal-content">
          <h3 v-if="scheduleExamStatus" class="title">
            Sucesso no agendamento do Exame<br>
            Procolo do processo: {{scheduleExamProtocol}}
          </h3>
          <h3 v-else class="title">
            Falha no agentamento, contate-nos<br> pelo telefone: 11 1219-2121
          </h3>
        </div>
      </template>
    </Modal>
  </main>
</template>

<script>
import DisplayBanner from '../../components/DisplayBanner'
import DisplayImage from '../../components/DisplayImage'
import MyInput from '../../components/MyInput'
import MyInputAsSelect from '../../components/MyInputAsSelect'
import Btn from '../../components/Btn'
import ModalGeral from '../../components/ModalGeral'

import { dateMask, hourMask, phoneMask } from '../../utils/helper'

import moment from 'moment'

moment.locale('pt-br');

import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo)

export default {
  name: 'CentroExames',
  data(){
    return{
      formObj:{
        nome: '',
        email: '',
        telefone: '',
        curso: '',
        data_preferencia: '',
        horario_preferencia: ''
      },
      logoPartner: [
        {
          url: [`../../statics/img/webp/prometric.webp`],
          ratio: [`42.1%`]
        },
        {

          url: [`../../statics/img/webp/EXIN-Logo.webp`],
          ratio: [`44.2%`]          
        },
        {
          url: [`../../statics/img/webp/person.webp`],
          ratio: [`43.3%`]
        },
        {
          url: [`../../statics/img/webp/Kryterion-Testing-Center-Logo.webp`],
          ratio: [`22.3%`]
        },
        {
          url: [`../../statics/img/webp/Ics.webp`],
          ratio: [`90%`]
        },
        {
          url: [`../../statics/img/webp/people_cert.webp`],
          ratio: [`39%`]
        }
      ]
    }
  },
  computed: {
    deviceSize(){
      return this.$store.state.app.deviceSize
    },
    examList(){
      return this.$store.state.app.examList.map(({ id, curso }) => ({ value: id, text: curso }))
    },
    scheduleExamStatus(){
      return this.$store.state.app.scheduleExamStatus
    },
    scheduleExamSending(){
      return this.$store.state.app.scheduleExamSending
    },
    scheduleExamProtocol(){
      return this.$store.state.app.scheduleExamProtocol
    }
  },
  methods: {
    fetch(){
      this.$store.dispatch( 'app/fetchExames')
    },
    dateMask,
    hourMask,
    phoneMask,
    scheduleExam(e){
      e.preventDefault()
      const { nome, email, telefone, curso: id_exame, data_preferencia: data_agendamento_exame, horario_preferencia: hora } = this.formObj
      this.$store.dispatch( 'app/scheduleExam',{
        nome,
        email,
        telefone: telefone.toString().replace(/\D/g, ''),
        idexame: id_exame,
        data: moment(data_agendamento_exame,'YYYY/MM/DD').format('YYYY-MM-DD'),        
        hora
      })
      e.currentTarget.reset()
    },
    modalClose(){
      this.$store.commit('app/UPDATE_SCHEDULE_EXAM_STATUS', {})
    }
  },
  created(){
    this.fetch()
  },
  beforeRouteUpdate(t,f,n){
    this.fetch()
    n()
  },
  components: {
    DisplayBanner,
    DisplayImage,
    MyInput,
    MyInputAsSelect,
    Btn,
    Modal: ModalGeral
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Centro de Exames',
      meta: {
        title: { name: 'title', content: 'Centro de Exames' },
        description: { name: 'description', content: 'A maior Certificadora Microsoft e o maior Centro de Exames Prometric da América Latina estão no mesmo lugar: aqui na Impacta!' },
        //keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: 'Centro de Exames' },
        ogDescription: { name: 'og:description', content: 'A maior Certificadora Microsoft e o maior Centro de Exames Prometric da América Latina estão no mesmo lugar: aqui na Impacta!' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Centro de Exames' },
        twDescription: { name: 'twitter:description', content: 'A maior Certificadora Microsoft e o maior Centro de Exames Prometric da América Latina estão no mesmo lugar: aqui na Impacta!' },
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
              "name": "Centro de Exames",
              "description": "A maior Certificadora Microsoft e o maior Centro de Exames Prometric da América Latina estão no mesmo lugar: aqui na Impacta!",
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

  .pagina-centro-exames{
    .display-banner-component-container{
      position: relative;
      color: white;
      margin-bottom: 100px;
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
        padding-top: 20px;
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
        /*font-style: italic;*/
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
    .authorized-players{
      margin-bottom: 80px;
      .title{
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        color: #272727;
        margin-bottom: 16px;
      }
      p{
        font-weight: 300;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #364E5E;
        margin-bottom: 30px;
        max-width: 530px;
        margin: 24px auto 50px;
      }
      .btn-component-container{
            height: 48px;
            max-width: 343px;
            margin: 0 auto;
            margin-top: 25px;
        }
      .container-logos{
        /*max-width: 840px;*/
        /*margin: 0 auto;*/
      }
      .logo-partner{
        padding: 0 5vmin;
      }
      @include d(sxs){
        margin-bottom: 60px;
      }
    }
    .attributes{
      /*background: #E5E5E5;*/
      background: #e5e5e585;
      border: 1px solid #E3E9ED;
      padding: 50px 0;
      .row{
          margin-bottom: 40px;
        }
      .text-content{
        display: flex;
        flex-direction: column;
        padding-top: 44px;
        @include d(sxs){
          &.second{
            order: 2;
          }
        }
        @include d(l){
          &.first{
            padding-left: 50px;
          }
          &.second{
            padding-right: 50px;
          }
          &.third{
            padding-right: 50px; 
          }
        }
      }
      .title{
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
        color: #272727;
        margin-bottom: 28px;
      }
      p{
        font-weight: 300;
        font-size: 18px;
        line-height: 30px;
        color: #364E5E;
      }
      @include d(l){
        .row{
          margin-bottom: 80px;
        }
        .container{
          max-width: 1040px;
        }
      }
    }
    .section-form{
      background: #F5F5F5;
      border: 1px solid #E3E9ED;
      padding: 50px 0;
      .title{
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        color: #272727;
        margin-bottom: 20px;
      }
      form{
        max-width: 410px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        .btn-component-container{
          margin-top: 10px;
          padding: 0 7px;
          width: 100%;
        }
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