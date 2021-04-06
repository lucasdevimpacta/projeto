<template>
  <main class="pagina-your-way">
    <section class="banner-top">
      <div class="container">
        <BreadCrumb :breadcrumb="$route.meta.breadcrumb" :dynamicrumbs="{}" className="alter"></BreadCrumb>
        <div class="text-container">
          <h1 class="text-uppercase destaque-700 title">
            Your Way
          </h1>
          <p>
            Plano de Assinatura Mensal por <strong class="text-uppercase">menos de R$1,00 por curso!</strong>
          </p>
          <p>
            <strong>Você decide como e o que quer estudar em mais <br class="d-none d-md-inline">de 150 dos Melhores Cursos Online do mercado</strong>
          </p>
          <router-link to="#" class="btn-component-container">
            <Btn tag="button" heightBtn="48px" classNames="destaque-500 text-uppercase text-white btn-gradient" v-scroll-to="'#boxyw'">Teste agora</Btn>
          </router-link>
        </div>
      </div>
      <span class="adorn-bottom"></span>
    </section>
    <section class="about-your-way">
      <div class="container">
        <h2 class="title text-uppercase adorno-container-center destaque-500">
          <i class="adorno-retangular"></i>O que é o <span class="yw-light-blue">Your </span>Way?
        </h2>
        <p>
          Um <strong class="destaque-500 text-uppercase">novo jeito de aprender: </strong>assista ao vídeo e entenda porque o Your Way é a plataforma ideal para aprender de verdade e no seu ritmo para construir um currículo incrível!
        </p>
      </div>
    </section>
    <section class="banner-video">
      <div class="container">
        <iframe src="https://www.youtube.com/embed/P_K77JS5KCQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>      
      </div>
    </section>
    <section class="courses">
      <div class="container">
        <h3 class="title text-uppercase adorno-container-center">
          <i class="adorno-retangular"></i>São mais de <strong>150 opções de cursos </strong>com novidades no portfólio chegando todos os meses:
        </h3>
        <div class="my-group">
          <div v-for="(c) in courses" :key="c.text" class="my-card">
            <DisplayImage classNames="course-icon" :urlImage="c.url" :imageHeight="['100%']" />
            <p>{{c.text}}</p>
          </div>
        </div>
        <router-link :to="{ name: 'your-way-cursos' }" class="btn-component-container">
          <Btn tag="button" heightBtn="48px" classNames="destaque-500 text-uppercase text-white">Conheça os cursos do Your Way</Btn>
        </router-link>
      </div>
    </section>
    <section class="differentials-your-way">
      <div class="container">
        <h2 class="title text-uppercase adorno-container-center destaque-500">
          <i class="adorno-retangular"></i>Unimos o melhor em tradição e inovação no ensino para você ter o melhor aprendizado com o <strong class="yw-light-blue">Your </strong><strong class="yw-dark-blue">Way</strong>
        </h2>
        <p>
          Tenha acesso a mais de 23.500 vídeos que somam 19 mil horas de conteúdo para sua carreira
        </p>
        <div class="row">
          <div v-for="(d, i) in differentialList" :key="'diff_' + i" class="col-md-4">
            <div class="differentials-card">
              <DisplayImage classNames="img-icon" :urlImage="d.url" :imageHeight="['100%']" />
              <h3 class="title">{{d.title}}</h3>
              <p v-html="d.text"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="original-qualifications">
      <div class="container">
        <h2 class="title text-uppercase destaque-500 adorno-container-center">
          <i class="adorno-retangular"></i>Conheça as Formações do <span class="yw-light-blue">Your </span><span class="yw-dark-blue">Way</span>
        </h2>
        <p>
          São diversas trilhas de formação exclusiva com cursos ideais para te especializar em áreas ou carreiras em alta no mercado
        </p>
        <router-link to="formacoes?c=online" class="btn-component-container">
          <Btn tag="button" heightBtn="48px" classNames="destaque-500 text-uppercase text-white">Veja as formações do Your Way</Btn>
        </router-link>
      </div>
    </section>
    <SectionYourWayForm classNames="bg-gradient form-your-way" title="Escolha seu plano e assine agora:" id="boxyw">
      <template v-slot:main>
        <fragment>
          <div class="my-card" v-show="onYourWayFreeForm == false">
            <h4 class="title destaque-500">
              <span class="text-purple">Your Way </span>
              <span class="text-cyan">Free</span>
            </h4>
            <ul>
              <li>100% Gratuito;</li>
              <li>Mini-Cursos Completos;</li>
              <li>Certificado para cada mini-curso;</li>
              <li>Acesso às primeiras aulas de TODOS os cursos;</li>
              <li>E-books exclusivos;</li>
              <li>Webinars e Palestras Gratuitas</li>
            </ul>
            <Btn heightBtn="48px" classNames="text-uppercase text-white btn-gradient" @click="setOnYourWayFreeForm(true)">Teste agora</Btn>
          </div>
          <div class="my-card" v-show="onYourWayFreeForm == true">
            <h4 class="title destaque-500">
              <span class="text-purple">Your Way </span>
              <span class="text-cyan">Free</span>
            </h4>
            <h5 class="title destaque-500">Cadastre-se</h5>
            <form id="formYourWayFree" @submit="submitYourWayFree">
              <MyInput placeHolder="Nome Completo*"/>
              <MyInput placeHolder="CPF*" :mask="cpfMask" :validation="cpfValidation" />
              <MyInput placeHolder="E-mail*" type="email" :validation="emailValidation"/>
              <MyInput placeHolder="Telefone*"  :mask="phoneMask" :required="false"/>
               <MyInput placeHolder="Senha*" type="password" v-model="cadObj.password"/>
              <MyInput placeHolder="Confirmar senha*" type="password" :validation="e => passwordMatch(e, cadObj.password)"/>
              <div>
                <Btn tag="button" heightBtn="48px" classNames="text-uppercase text-white btn-gradient" type="submit" :loading="formYourWayFreeGif">Confirmar</Btn>
              </div>
            </form>
          </div>
          <div class="my-group-card">
            <div class="my-card">
              <h4 class="title destaque-500">
                <span class="text-purple">Plano </span>
                <span class="text-cyan">Semestral</span>
              </h4>
              <ul>
                <li>Acesso ilimitado a TODOS os cursos;</li>
                <li>Mais de 23 mil horas de aulas da Faculdade Impacta;</li>
                <li>Certificado de Conclusão para cada curso;</li>
                <li>Direito à prova de Certificação gratuita;</li>
                <li>E-books exclusivos;</li>
                <li>Webinars e Palestras Gratuitas;</li>
                <li>Descontos em eventos da Impacta</li>
              </ul>
            </div>
            <div class="my-alternative-card">
              <h4 class="title destaque-500">
                Anual
              </h4>
              <p>
                R$ 89,90/mês
              </p>
              <Btn heightBtn="34px" classNames="text-uppercase text-white btn-gradient" @click="getPlanoAnual" :loading="yourWayAnual">Assine já</Btn>
            </div>
            <div class="my-alternative-card">
              <h4 class="title destaque-500">
                Semestral
              </h4>
              <p>
                R$ 129/mês
              </p>
              <Btn heightBtn="34px" classNames="text-uppercase text-white btn-gradient" @click="getPlanoSmestral" :loading="yourWaySemestral">Assine já</Btn>
            </div>
          </div>
        </fragment>
      </template>
    </SectionYourWayForm>
    <SectionTestmonials classNames="bg-circles"/>
  </main>
</template>

<script>
import MyInput from '../../components/MyInput'
import Btn from '../../components/Btn'
import DisplayImage from '../../components/DisplayImage'
import SectionYourWayForm from '../../components/SectionYourWayForm'
import SectionTestmonials from "../../components/SectionTestmonials"
import BreadCrumb from '../../components/BreadCrumb'
import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo)

import { fullNameValidation, cpfMask, cpfValidation, emailValidation, phoneMask, passwordMatch, simpleValidateForm } from '../../utils/helper'

const pathImg = '../../statics/img/'

export default {
  name: 'YourWay',
  data(){
    return {
      cadObj:{
        password: ''
      },
      yourWayAnual: false,
      yourWaySemestral: false,
      onYourWayFreeForm: false,
      formYourWayFreeGif: false,
      differentialList: [
        {
          url: [pathImg + 'star_yw_icon.svg'],
          title: 'Qualidade de ensino Impacta',
          text: 'Há mais de 30 anos formando os melhores profissionais do mercado'
        },
        {
          url: [pathImg + 'portfolio_yw_icon.svg'],
          title: 'Portfólio completo de cursos',
          text: '+ de 150 treinamentos disponíveis e inclusão de <strong>novos cursos todo mês.</strong>'
        },
        {
          url: [pathImg + 'smart_class_yw_icon.svg'],
          title: 'Smart Class',
          text: 'Acesso aos conteúdos gravados das aulas da Faculdade Impacta, para assistir quando e onde quiser'
        },
        {
          url: [pathImg + 'original_method_yw_icon.svg'],
          title: 'Metodologia exclusiva',
          text: 'Cursos desenvolvidos por instrutores atuantes no mercado'
        },
        {
          url: [pathImg + 'unlimited_access_yw_icon.svg'],
          title: 'Acesso ilimitado',
          text: 'Assista e reveja quantas aulas quiser e em qualquer dispositivo'
        },
        {
          url: [pathImg + 'more_things_yw_icon.svg'],
          title: 'Ainda mais benefícios',
          text: 'Acesso e descontos exclusivos nos eventos e workshops Impacta'
        },
      ],
      courses : [
        {
          url: [pathImg + '1icon-cursos-desenvolvimento.png'],
          text: 'C#, SQL, ASP.NET, Java, Phyton e mais...'
        },
        {
          url: [pathImg + '2icon-cursos-design.png'],
          text: 'Photoshop, UX, AutoCAD, Revit, Fotografia e mais...'
        },
        {
          url: [pathImg + '3icon-cursos-gestao.png'],
          text: 'Scrum, PMI, Project e mais...'
        },
        {
          url: [pathImg + '4icon-cursos-mkt.png'],
          text: 'Seo, Inbound Marketing, E-mail mkt e mais...'
        },
        {
          url: [pathImg + '5icon-cursos-office.png'],
          text: 'Excel, Word, Office 365, VBA, Power BI e mais...'
        },
        {
          url: [pathImg + '6icon-cursos-redes.png'],
          text: 'Conceitos e Infraestrutura de Redes e mais...'
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.app.user
    },
    loginStatus() {
      return this.$store.state.app.loginStatus
    },
  },
  methods:{
    async getPlanoAnual(){
      this.yourWayAnual = true;
      await this.$store.dispatch( 'app/fetchYourWayAnual')

      if ( this.loginStatus ) {
        window.location.href= "inscricao";
      } else {
        window.location.href= "login";
      }
    },
    async getPlanoSmestral(){
      this.yourWaySemestral = true;
      await this.$store.dispatch('app/fetchYourWaySemiAnual')
      if ( this.loginStatus ) {
        window.location.href= "inscricao";
      } else {
        window.location.href= "login";
      }
    },
    async submitYourWayFree(e){
      e.preventDefault()
      this.formYourWayFreeGif = true;
      
      if(this.simpleValidateForm(e)) {
        const { currentTarget:[ { value: nome }, {value: cpf}, {value: email} ,{value: telefone}, {value: senha}, {value: senha_confirmacao}] } = e

        await this.$store.dispatch( 'app/fetchYourWayFree', { nome, cpf,  email, telefone, senha, senha_confirmacao});
        this.formYourWayFreeGif = false;
        location.reload();
      } else {
        this.formYourWayFreeGif = false;
      }

    },
    setOnYourWayFreeForm(value){
      this.onYourWayFreeForm = value;
    },
    fullNameValidation,
    cpfMask,
    cpfValidation,
    emailValidation,
    phoneMask,
    passwordMatch,
    simpleValidateForm
  },
  components: {
    Btn,
    DisplayImage,
    SectionYourWayForm,
    SectionTestmonials,
    MyInput,
    BreadCrumb
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Your Way',
      meta: {
        title: { name: 'title', content: 'Your Way' },
        description: { name: 'description', content: 'Plano de Assinatura Mensal por MENOS DE R$1,00 POR CURSO! Você decide como e o que quer estudar em mais de 150 dos Melhores Cursos Online do mercado' },
        //keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: 'Your Way' },
        ogDescription: { name: 'og:description', content: 'Plano de Assinatura Mensal por MENOS DE R$1,00 POR CURSO! Você decide como e o que quer estudar em mais de 150 dos Melhores Cursos Online do mercado' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Your Way' },
        twDescription: { name: 'twitter:description', content: 'Plano de Assinatura Mensal por MENOS DE R$1,00 POR CURSO! Você decide como e o que quer estudar em mais de 150 dos Melhores Cursos Online do mercado' },
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
              "name": "Your Way",
              "description": "Plano de Assinatura Mensal por MENOS DE R$1,00 POR CURSO! Você decide como e o que quer estudar em mais de 150 dos Melhores Cursos Online do mercado",
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

  main.pagina-your-way{
    background: #F8F9FD;
    .yw-light-blue {
      font-weight: bold;
      color: #3b9581;
    }
    .yw-dark-blue {
      font-weight: bold;
      color: #2E126F;
    }
    .banner-top{
      text-align: center;
      background: url(../../statics/img/yw_banner_top_bg.svg) no-repeat center;
      background-size: cover;
      color: white;
      min-height: 480px;
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 60px;
      .adorn-bottom {
        position: absolute;
        bottom: -4vw;
        left: 0;
        height: 9.7vw;
        right: 0; 
        background: url(../../statics/img/adorn_bottom_yw_top_banner.svg) no-repeat center;
        background-size: cover;
        &::before {
          content: "";
          opacity: 0.08;
          position: absolute;
          bottom: 2vw;
          left: 0;
          height: 9.7vw;
          right: 0; 
          background: url(../../statics/img/adorn_bottom_yw_top_banner.svg) no-repeat center;
          background-size: cover;
        }
        &::after {
          content: "";
          opacity: 0.08;
          position: absolute;
          bottom: 4vw;
          left: 0;
          height: 9.7vw;
          right: 0; 
          background: url(../../statics/img/adorn_bottom_yw_top_banner.svg) no-repeat center;
          background-size: cover;
        }
      }
      .text-container {
        padding-bottom: 40px;
      }
      .title{
        font-size: 40px;
        line-height: 115%;
        margin-bottom: 10px;
      }
      p{
        font-weight: 300;
        font-size: 22px;
        line-height: 136%;
        margin-bottom: 6px;
      }
      .btn-component-container{
        margin: 23px auto;
        display: block;
        @include d(lm) {
          width: 343px;
        }
      }
      @include d(sxs) {
        margin-bottom: 30px;
        .adorn-bottom {
          transform: scaleX(2.5);
        }
      }
    }
    .about-your-way {
      padding-top: 60px;
      text-align: center;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        background: url(../../statics/img/yw_manch_q1.svg);
        background-size: contain;
        width: 147px;
        height: 353px;
      }
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        background: url(../../statics/img/yw_manch_q3.svg);
        background-size: contain;
        width: 80px;
        height: 94px;
      }
      @include d(sxs) {
        &::before, &::after {
          display: none;
        }
      }
      .title {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 24px;
        color: #2E126F;
      }
      p {
        font-weight: 300;
        font-size: 18px;
        line-height: 21px;
        color: #364E5E;
        margin: 0 auto 50px;
        max-width: 520px;
      }
      @include d(sxs) {
        padding-top: 30px;
      }
    }
    .banner-video {
      margin-bottom: 60px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 60px;
        background: url(../../statics/img/yw_manch_q2.svg);
        background-size: contain;
        width: 53px;
        height: 94px;
      }
      &::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 60px;
        background: url(../../statics/img/yw_manch_q4.svg);
        background-size: contain;
        width: 50px;
        height: 200px;
      }
      @include d(sxs) {
        &::before, &::after {
          display: none;
        }
      }
      > .container {
        display: flex;
        justify-content: center;
      }
      iframe {
        height: 361px;
        width: 644px;
        margin-bottom: 74px;
        border-radius: 10px;
        overflow: hidden;
      }
      @include d(sxs) {
        iframe {
          margin-bottom: 50px;
        }
      }
    }
    section.courses {
      text-align: center;
      .title {
        font-weight: normal;
        font-size: 24px;
        line-height: 28px;
        color: #272727;
        margin-bottom: 38px;
      }
      .my-group {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 0 -25px 0;
      }
      .my-card {
        padding: 0 25px;
        margin-bottom: 40px;
        max-width: calc(100% / 6);
        height: 100%;

      }
      p {
        font-weight: 300;
        font-size: 16px;
        line-height: 144%;
        color: #364E5E;
      }
      .course-icon {
        padding: 0 20px;
      }
      .btn-component-container{
        margin: 0 auto 74px;
        display: block;
        @include d(lm) {
          width: 343px;
        }
      }
    }
    .differentials-your-way {
      padding-top: 70px;
      text-align: center;
      margin-bottom: 40px;
      .title {
        font-size: 24px;
        line-height: 28px;
        max-width: 870px;
        margin: 0 auto 24px;
      }
      p{
        font-weight: 300;
        font-size: 18px;
        line-height: 21px;
        color: #364E5E;
        max-width: 520px;
        margin: 0 auto 70px;
      }
    }
    .differentials-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      min-height: 100%;
      .img-icon {
        height: 80px;
        margin-bottom: 18px
      }
      .title {
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        color: #272727;
        margin-bottom: 5px;
      }
      p {
        font-weight: 300;
        font-size: 16px;
        line-height: 144%;
        color: #364E5E;
        margin-bottom: 18px
      }
      @include d(sxs) {
        .img-icon {
          height: 60px;
        }
      }
    }
    .original-qualifications {
      padding-top: 35px;
      text-align: center;
      .title {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 20px;
      }
      p {
        font-weight: 300;
        font-size: 18px;
        line-height: 21px;
        color: #364E5E;
        max-width: 520px;
        margin: 0 auto 38px;
      }
      .btn-component-container {
        margin: 0 auto 40px;
        display: block;
        @include d(lm) {
          width: 343px;
        }
      }

    }
    .form-your-way {
      ul {
        flex-grow: 1;
      }
      .my-card, .my-group-card {
        max-width: 320px;
        width: 100%;
        margin-bottom: 15px;
      }
      .my-group-card {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .my-alternative-card {
        width: calc(50% - 6px);
        padding: 16px;
        border-radius: 8px;
        background: white;
        margin-top: 10px;
      }
    }
    .section-testmonials-component {
      //min-height: 230px;
      padding-bottom: 40px;
      margin-top: 60px;
    }
  }
</style>