<template>
  <main v-if="!!Object.values(formacao).length" class="pagina-single-formacao">
    <section v-bind:class="classGradient(formacao.modalidade)">
      <div class="container">
        <div class="text-content">
          <div class="navigation">
            <router-link to="{ name: 'formacoes' }">
              <i class="fas fa-chevron-left"></i><span class="style-link-default"> Voltar</span>
            </router-link>
          </div>
          <p class="about-modalities">
            <span class="tag-modality text-uppercase destaque-500">{{formacao.modalidade}}</span>
            <span class="other-modality ml-3"><i class="fas fa-info-circle"></i> </span>
          </p>
          <h1 class="title destaque-500">
            {{formacao.titulo}} 
          </h1>
          <p class="short-description">
            {{formacao.subtitulo}}
          </p>
          <div class="about-course-states">
            <div class="total-curso"><i class="far fa-file-alt"></i> Total de <span >{{formacao.total_cursos}} cursos</span></div>
            <div class="carga-horaria"><i class="far fa-clock"></i> Carga horária: <span class="destaque-500 text-uppercase">{{formacao.carga_horaria}} horas</span></div>
            <div class="total-historico-alunos" v-if="formacao.total_historico_alunos > 100"><i class="fas fa-users"></i> +{{formacao.total_historico_alunos}} alunos inscritos </div>
            <button class="style-link-default btn-chat text-white my-3 d-lg-none" @click="playVideo = ! playVideo">
              <i class="fas fa-play-circle mr-2"></i>Ver apresentação deste curso
            </button>
          </div>
          <div class="btn-component-container">
            <Btn tag="button" heightBtn="48px" classNames="destaque-500 text-uppercase text-white btn-gradient" v-if="formacao.modalidade == 'online'" v-scroll-to="'#CompreYw'">Inscreva-se</Btn>            

            <Btn tag="button" heightBtn="48px" classNames="destaque-500 text-uppercase text-white btn-gradient" v-scroll-to="'#ComprarAgora'" v-else>Inscreva-se</Btn>
          </div>
        </div>
      </div>
      <svg class="contorno-inferior" width="1440" height="86" viewBox="0 0 1440 86" fill="none" xmlns="http://www.w3.org/2000/svg" style="&#10;    width: 100%;&#10;    height: unset;&#10;">
        <path d="M0 86H1440V16.3789C1331.33 5.45965 1239 0 1163 0C821.995 0 821.995 45.7087 426 45.7087C262.448 45.7087 120.448 35.9321 0 16.3789V86Z" fill="#F8F9FD"/>
      </svg>
    </section>
    <BreadCrumb :breadcrumb="$route.meta.breadcrumb" :lastcrumb="formacao.titulo"></BreadCrumb>
    <section class="qualification-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 offset-lg-1 order-lg-1">
            <h4 class="destaque-500 title-about-qualification">Sobre a formação {{formacao.titulo}}</h4>
            <div class="course-card-component-container">
              <CourseCard 
                :urlImage="['../../statics/img/capa_formacao_example.png']" :imageHeight="['66.4%']"
                :borderRadius="{containerImage: '10px'}"
                classNames="top-course-card"
                :displayVideo="{
                  url: 'https://www.youtube.com/embed/Qg8aRSW4Umk'
                }"
                :title="{
                  text: 'Ver apresentação desta formação'
                }"
                :playVideo="playVideo"
              >
                <template v-slot:contentDownImage >
                  <div class="container-content-down">
                    <h3 class="title destaque-500">Por que se especializar em {{formacao.titulo}}</h3>
                    <p class="text-content">{{formacao.descricao_curta}}</p>
                  </div>
                </template>
              </CourseCard>
            </div>
          </div>
          <div class="col-lg-7 order-lg-0">
            <h4 class="destaque-500 title">Passo a passo para o seu sucesso</h4>
            <div class="cards-container">
              <div v-for="(n, ni) in cursosContent">
                <h4 class="text-uppercase destaque-500 nivel-title adorno-blue-ball">{{ni}}</h4>
                <div v-for="( c, i) in n " :key="'list-courses-1-' + i" class="my-card soft-shadow">
                  <div :class="'my-card-header adorno-blue-big-ball content-' + ( i + 1)">
                    <span class="tag-solid text-uppercase ">{{c.modalidade}}</span>
                    <div class="carga-horaria"><i class="far fa-clock"></i> Carga horária: <span class="destaque-500 text-uppercase">{{c.carga_horaria}} horas</span></div>
                  </div>
                  <div class="my-card-body">
                    <h2 class="title">{{c.produto}}</h2>
                    <p class="sub-title">{{c.subtitulo}}</p>
                    <p class="sub-title" v-html="c.sobre_curso"></p>
                    <router-link :to="{ name: 'single-curso', params: { curso: c.slug} }">
                      <span class="style-link-default">Saiba mais</span>
                    </router-link>
                  </div>
                </div>

                <p v-if="formacao.composicao_cursos[ni].carteirinha"  class="adorno-blue-check">Ao ser aprovado nas certificações Impacta do módulo {{ni}}, você poderá solicitar a <span class="destaque-500">credencial ICS {{ni}}</span>. Saiba mais sobre a <router-link :to="{name: 'certificacao-impacta'}">certificação Impacta</router-link></p>
              </div>
              <!--
              <h4 class="text-uppercase destaque-500 nivel-title adorno-blue-ball">Essentials</h4>
              <div v-for="( c, i) in cursosIntermediario" :key="'list-courses-2-' + i" class="my-card soft-shadow">
                <div :class="'my-card-header adorno-blue-big-ball content-' + ( i + 1 + cursosBasicos.length)">
                  <span class="tag-solid text-uppercase ">{{c.modalidade}}</span>
                  <div class="carga-horaria"><i class="far fa-clock"></i> Carga horária: <span class="destaque-500 text-uppercase">{{c.carga_horaria}} horas</span></div>
                </div>
                <div class="my-card-body">
                  <h2 class="title">{{c.produto}}</h2>
                  <p class="sub-title">{{c.subtitulo}}</p>
                    <p class="sub-title">{{c.sobre_curso}}</p>
                    <router-link :to="{ name: 'single-curso', params:{curso: c.slug}}">
                      <span class="style-link-default">Saiba mais</span>
                    </router-link>
                </div>
              </div>

              <p class="adorno-blue-check">Ao ser aprovado nas certificações Impacta do módulo Essentials, você poderá solicitar a <span class="destaque-500">credencial ICS Essentials</span>. Saiba mais sobre a <router-link :to="{name: 'certificacao-impacta'}">certificação Impacta</router-link></p>
            
              <h4 class="text-uppercase destaque-500 nivel-title adorno-blue-ball">Advanced</h4>
              <div v-for="( c, i) in cursosAvancado" :key="'list-courses-3-' + i" class="my-card soft-shadow">
                <div :class="'my-card-header adorno-blue-big-ball content-' + ( i + 1 + cursosBasicos.length + cursosAvancado.length)">
                  <span class="tag-solid text-uppercase ">{{c.modalidade}}</span>
                  <div class="carga-horaria"><i class="far fa-clock"></i> Carga horária: <span class="destaque-500 text-uppercase">{{c.carga_horaria}} horas</span></div>
                </div>
                <div class="my-card-body">
                  <h2 class="title">{{c.produto}}</h2>
                  <p class="sub-title">{{c.subtitulo}}</p>
                    <p class="sub-title">{{c.sobre_curso}}</p>
                    <router-link :to="{ name: 'single-curso', params:{curso: c.slug}}">
                      <span class="style-link-default">Saiba mais</span>
                    </router-link>
                </div>
              </div>

              <p class="adorno-blue-check">Ao ser aprovado nas certificações Impacta do módulo Essentials, você poderá solicitar a <span class="destaque-500">credencial ICS Advanced</span>. Saiba mais sobre a <router-link :to="{name: 'certificacao-impacta'}">certificação Impacta</router-link></p>
              -->
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <SectionYourWayForm classNames="bg-gradient form-your-way" v-if="formacao.modalidade == 'online'" title="Assine e tenha acesso a essa e mais formações online:" id="CompreYw">
      <template v-slot:main>
        <fragment>
          <div class="my-card">
            <h4 class="title destaque-500">
              <span class="text-purple">Plano </span>
              <span class="text-cyan">Anual</span>
            </h4>
            <p>
              Apenas R$ 89,90/mês
            </p>
            <Btn heightBtn="48px" classNames="text-uppercase text-white btn-gradient">Assine já</Btn>
          </div>
          <div class="my-card">
            <h4 class="title destaque-500">
              <span class="text-purple">Plano </span>
              <span class="text-cyan">Semestral</span>
            </h4>
            <p>
              Apenas R$ 129/mês
            </p>
            <Btn heightBtn="48px" classNames="text-uppercase text-white btn-gradient">Assine já</Btn>
          </div>
        </fragment>
      </template>
    </SectionYourWayForm>
    <!-- <section v-else class="main-form">
      <div class="container">
        <h4 class="text-uppercase destaque-500 title adorno-container-center text-center"><i class="adorno-retangular"></i>Receba todos os detalhes desta Formação</h4>
        <p class="text-center">Comprando a Formação você <span class="destaque-500">economiza até R$120,00</span></p>
        <form>
          <MyInput label="nome"  />  
          <MyInput label="e-mail" /> 
          <MyInput label="telefone" />
          <div class="btn-component-container">
            <Btn tag='button' type="submit" classNames="text-uppercase text-white btn-gradient" heightBtn="48px">
              Enviar
            </Btn> 
          </div>
          <div class="call-consultant">
            <button class="style-link-default btn-chat">
              Falar com consultor
            </button>
          </div>
        </form>
      </div>
    </section> -->
    <section v-else class="main-form" id="ComprarAgora">
      <div class="container">
        <h4 class="text-uppercase destaque-500 title adorno-container-center text-center"><i class="adorno-retangular"></i>{{ formacao.titulo}}

        </h4>
        <form>
          <div class="btn-component-container">
            <Btn tag='button' type="button" classNames="text-uppercase text-white btn-gradient" heightBtn="48px" @click="comprarFormacao" :loading="comprandoFormacao">
              Comprar Agora
            </Btn> 
          </div>
          <div class="call-consultant">
            <button class="style-link-default btn-chat">
              Falar com consultor
            </button>
          </div>
        </form>
      </div>
    </section>
    <SectionTestmonials classNames="treinamento-home bg-circles"/>
  </main>
  <main v-else class="pagina-single-formacao"></main>
</template>

<script>
import Btn from '../../components/Btn'
import MyInput from '../../components/MyInput'
import CourseCard from '../../components/CourseCard'
import SectionTestmonials from '../../components/SectionTestmonials'
import SectionYourWayForm from '../../components/SectionYourWayForm'
import BreadCrumb from '../../components/BreadCrumb'
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo)

export default {
  name: 'SingleFormacao',
  data(){
    return{
      playVideo: false,
      comprandoFormacao:false
    }
  },
  props:{
    slug_formacao:{}
  },
  computed:{
    formacao(){
      return this.$store.state.treinamentosFormacao.data
    },
    cursosContent(){
      return this.$store.state.treinamentosFormacao.data.composicao_cursos_content
    },
    cursosBasicos(){
      return this.$store.state.treinamentosFormacao.data.composicao_cursos_content.basico
    },
    cursosIntermediario(){
      return this.$store.state.treinamentosFormacao.data.composicao_cursos_content.intermediario
    },
    cursosAvancado(){
      return this.$store.state.treinamentosFormacao.data.composicao_cursos_content.avancado
    },
    loginStatus() {
      return this.$store.state.app.loginStatus
    }
  },
  methods:{
    fetch(){
      this.$store.dispatch( 'treinamentosFormacao/fetchDataFormacao',this.slug_formacao)
    },
    classGradient(string){
      return  'banner-gradient ' + string.replace(/\s/g, '') + '-gradient formacao-contorno';
    },
    async comprarFormacao(){
      this.comprandoFormacao = true;

      await this.$store.dispatch( 'app/fetchFormacao',{formacao_id: this.formacao.id, formacao: this.formacao.titulo});

      if ( this.loginStatus ) {
        window.location.href= "inscricao";
      } else {
        window.location.href= "login";
      }
    }
  },
  created(){
    this.fetch()
  },
  beforeRouteUpdate(t,f,n){
    this.fetch()
    n()
  },
  components:{
    Btn,
    MyInput,
    CourseCard,
    SectionTestmonials,
    SectionYourWayForm,
    BreadCrumb
  },
  meta () {
    console.info(this)
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: this.formacao.titulo,
      meta: {
        title: { name: 'title', content: this.formacao.titulo },
        description: { name: 'description', content: 'As projeções de investimentos com TI não param de crescer: em 2013, devem chegar a US$ 3,7 tri em todo o mundo. Você conhece os cursos disponíveis no mercado?' },
        keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: this.formacao.titulo },
        ogDescription: { name: 'og:description', content: 'As projeções de investimentos com TI não param de crescer: em 2013, devem chegar a US$ 3,7 tri em todo o mundo. Você conhece os cursos disponíveis no mercado?' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: this.formacao.titulo },
        twDescription: { name: 'twitter:description', content: 'As projeções de investimentos com TI não param de crescer: em 2013, devem chegar a US$ 3,7 tri em todo o mundo. Você conhece os cursos disponíveis no mercado?' },
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
              "name": "${ this.formacao.titulo }",
              "description": "As projeções de investimentos com TI não param de crescer: em 2013, devem chegar a US$ 3,7 tri em todo o mundo. Você conhece os cursos disponíveis no mercado?",
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
@import '../../css/my_mixins';

.pagina-single-formacao{
  h1{
    font-size: 38px;
    line-height: 44px;
  }
  h4, h3{
    font-size: 22px;
    line-height: 25px;
  }
  p{
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
  }
  .banner-gradient{
    font-size: 14px;
    display: flex;
    align-items: center;
    min-height: 290px;
    position: relative;
    .container{
      padding-bottom: calc( 4vw + 40px);
    }
    .contorno-inferior{
      position: absolute;
      bottom: -2px;
    }
    &.presencial-gradient{
      background: #0052d4;
      background: -moz-linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
      background: -webkit-linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
      background: linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0052d4",endColorstr="#6fb1fc",GradientType=1);
    }
    &.aovivo-gradient{
      background: #0052d4;
      background: -moz-linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
      background: -webkit-linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
      background: linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0052d4",endColorstr="#6fb1fc",GradientType=1);
    }
    &.online-gradient{
      background: #2e126f;
      background: -moz-linear-gradient(106deg, #2e126f 18%, #1a4b78 91%, #009583 112%);
      background: -webkit-linear-gradient(106deg, #2e126f 18%, #1a4b78 91%, #009583 112%);
      background: linear-gradient(106deg, #2e126f 18%, #1a4b78 91%, #009583 112%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2e126f",endColorstr="#009583",GradientType=1);
    }
    padding: 35px 0;
    color: white;
    margin-bottom: 23px;
    a {
      color: white;
    }
    .container{
      position: relative;
    }
    .navigation{
      margin-bottom: 23px;
    }
    .tag-modality{
      color: $primary;
      background: white;
      font-size: 14px;
      line-height: 14px;
      padding: 4px 8px;
      border-radius: 6px;
      display: inline-block;
    }
    .short-description{
      font-size: 20px;
      line-height: 28px;
      margin-left: auto;
      margin-right: auto;
    }
    .about-course-states{
      font-weight: 300;
      margin-bottom: 20px;
    }
    .btn-component-container{
      width: 100%;
      @include d( m){
        max-width: 340px;
        margin: 0 auto;
      }
    }
    @include d( l){
      margin-bottom: 35px;
      .short-description{
        margin-left: 0;
        max-width: 710px;
      }
      .about-course-states{
        > div{
          display: inline-block;
        }
        div + div{
          &::before{
            content: '|';
            margin: 0 13px;
          }
        }
      }
      .btn-component-container{
        max-width: 340px;
      }
    }
    @include d( msxs){
      padding: 15px 0;
      h1{
        font-size: 24px;
        line-height: 28px;
      }
      > *{
        text-align: center;
      }
      .navigation{
        text-align: left;
      }
      .short-description{
        font-size: 16px;
        line-height: 25px;
      }
    }
  }
  .top-course-card{
      @include d( msxs){
      .container-image > *:not(.display-video-component-container), .display-video-component-container > *:not(.video-content){
        display: none;
      }
      .btn-chat{
        color: white;
      }
      .call-to-action{
        margin-top: 20px;
      }
    }
  }
  $cardPaddingLeft: 20px;
  .cards-container{
    margin-top: 30px;
    margin: 0 0 45px 45px;
    position: relative;
    $distanceOfCards: -30px;
    $widthOfRuler: 5px;
    &::before{
      content: '';
      background: #0a88f440;
      width: $widthOfRuler;
      height: calc( 100% - 12px);
      position: absolute;
      left: $distanceOfCards;
    }
    $dimensionOfBalls: 12px;
    .adorno-blue-ball{
      position: relative;
      &::before{
        content: '';
        left: #{$distanceOfCards - ( $dimensionOfBalls / 2) + ( $widthOfRuler / 2)};
        width: $dimensionOfBalls;
        height: $dimensionOfBalls;
        border-radius: 50%;
        background: $primary;
        position: absolute;
      }
    }

    $dimensionOfBalls: 26px;
    .adorno-blue-big-ball{
      position: relative;
      &::before{
        content: '';
        left: #{$distanceOfCards - ( $dimensionOfBalls / 2) + ( $widthOfRuler / 2) - $cardPaddingLeft};
        width: $dimensionOfBalls;
        height: $dimensionOfBalls;
        border-radius: 50%;
        background: $primary;
        position: absolute;
        color: white;
        text-align: center;
        line-height: $dimensionOfBalls;
        font-size: #{ $dimensionOfBalls / 2};
      }
    }

    .adorno-blue-check{
      position: relative;
      &::before{
        left: #{$distanceOfCards - ( $dimensionOfBalls / 2) + ( $widthOfRuler / 2) };
        width: $dimensionOfBalls;
        height: $dimensionOfBalls;
        border-radius: 50%;
        background: $primary;
        position: absolute;
        color: white;
        text-align: center;
        line-height: $dimensionOfBalls !important;
        font-size: #{ $dimensionOfBalls / 2};

        font-family: "Font Awesome 5 Free";
        font-weight: 700;
        -webkit-font-smoothing: antialiased;
        display: inline-block;
        font-style: normal;
        font-variant: normal;
        text-rendering: auto;
        line-height: 1;
        content: "\f00c";

        top: calc( -#{$dimensionOfBalls / 2} + 50%);
      }
    }
  }
  h4.nivel-title{
    font-size: 15px;
    color: #364E5E;
    line-height: 100%;
    margin: 35px 0 15px;
  }
  .my-card{
    border-radius: 20px;
    background: white;
    padding: $cardPaddingLeft;
    margin-bottom: 15px;
    //margin-left: 45px;
    .my-card-header{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .tag-solid{
      color: white;
      background: $primary;
      padding: 3px 8px;
      display: inline-block;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .carga-horaria{
      font-size: 12px;
      font-weight: 300;
      i{
        font-size: 14px;
      }
      & * {
        line-height: 22px !important;
      }
    }
    h2.title{
      font-size: 18px;
      font-weight: 500;
    }
    p.sub-title{
      font-weight: 300;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .container-content-down{
    margin-top: 30px;
    p{
      color: #364E5E;
    }
  }
  .qualification-content{
    margin-bottom: 40px;
  }
  .main-form{
    background: #F5F5F5;
    border: 1px solid #E3E9ED;
    padding: 60px 50px;
    p{
      color: #364E5E;
      margin-bottom: 30px;
    }
    form{
      margin: 0 auto;
      max-width: 280px;
    }
    .btn-component-container{
      margin-top: 20px;
      padding: 0 7px;
    }
    .call-consultant{
      color: $primary;
      text-align: center;
      margin-top: 15px;
      button{
        color: $primary;
      }
    }
  }
  .form-your-way {
    .my-card {
      max-width: 320px;
      width: 100%;
    }
  }
  .section-testmonials-component{
    padding: 35px 0;
  }
}
</style>



