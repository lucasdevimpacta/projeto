<template>
  <main class="pagina-resultados">
    <section class="introduction">
      <div class="container">
        <a href="#">Voltar</a>
        <p class="label">Total de</p>
        <p>{{this.total}} resultados encontrados para "{{this.searchValue}}"</p>
      </div>
    </section>
    <section class="result-items">
      <div class="container">
        <router-link v-for="r in resultados" :key="r.title" :to="r.link" class="my-card soft-shadow">
          <h3 class="category text-uppercase">{{r.type}}</h3>
          <h2 class="modalidade text-uppercase">{{r.modalidade}}</h2>
          <h3 class="modulo text-uppercase" v-if="r.modulo != 'único'">Modulo {{r.modulo}}</h3>
          <h2 class="title">{{r.name}}</h2>
          <p>
            {{r.short_description}}
          </p>
        </router-link>
        <div class="">
          <div class="btn-group pagination-group-btns">
            <Btn
              tag="button"
              borderRadius="unset"
              classNames="text-uppercase destaque-500 pagination-btn"
              :data-newvaluetocurrentpage="paginaAtual - 1"
              @click="setPageAtual"
              ><i class="fas fa-chevron-left mr-2"></i>Anterior</Btn
            >
            <Btn
              v-for="( b, i) in pageShortcuts"
              :key="i"
              tag="button"
              borderRadius="unset"
              :classNames="'text-uppercase destaque-500 pagination-btn ' + b.classNames"
              :data-newvaluetocurrentpage="b.value"
              @click="setPageAtual"
              >{{b.value}}</Btn
            >
            <Btn
              tag="button"
              borderRadius="unset"
              classNames="text-uppercase destaque-500 pagination-btn"
              :data-newvaluetocurrentpage="paginaAtual + 1"
              @click="setPageAtual"
              >Próximo<i class="fas fa-chevron-right ml-2"></i></Btn
            >
          </div>
        </div>
      </div>
    </section>
    <section class="site-areas">
      <div class="container">
        <h2 class="text-uppercase title destaque-500 adorno-container-center">
          <i class="adorno-retangular">HUB Impacta</i>
        </h2>
        <p class="subtitle">
          Aqui na Impacta nós temos cursos que vão desde os mais básicos e iniciais até os MBAs mais inovadores que o mercado busca Independente do seu nível de conhecimento, aqui você pode ir do 0 ao MBA!
        </p>
        <div class="row justify-content-center">
          <div v-for="( a, i) in siteAreas" class="col-md-4 card-site-areas-container" :key="'sa_'+i">
            <router-link v-if="a.link" :to="a.link" class="card-site-areas soft-shadow">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="9" viewBox="0 0 30 9" fill="none">
                  <path d="M24.2656 2.93721V1.14034C24.2656 0.723671 24.4609 0.437213 24.8516 0.280963C25.2422 0.124713 25.5807 0.189817 25.8672 0.476275L29.2266 3.83565C29.3568 3.96586 29.4349 4.10909 29.4609 4.26534C29.513 4.42159 29.513 4.57784 29.4609 4.73409C29.4349 4.89034 29.3568 5.03357 29.2266 5.16378L25.8672 8.52315C25.5807 8.80961 25.2422 8.87471 24.8516 8.71846C24.4609 8.56221 24.2656 8.27575 24.2656 7.85909V6.06221H0.46875C0.15625 6.06221 0 5.90596 0 5.59346V3.40596C0 3.09346 0.15625 2.93721 0.46875 2.93721H24.2656Z" fill="#0A88F4"/>
                </svg>
              </div>
              <h3 class="card-title destaque-500">
                {{a.title}}
              </h3>
              <p class="card-content">
                {{a.text}}
              </p>
            </router-link>
            <a v-else v-bind:href="a.url" target="_blank" class="card-site-areas soft-shadow">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="9" viewBox="0 0 30 9" fill="none">
                  <path d="M24.2656 2.93721V1.14034C24.2656 0.723671 24.4609 0.437213 24.8516 0.280963C25.2422 0.124713 25.5807 0.189817 25.8672 0.476275L29.2266 3.83565C29.3568 3.96586 29.4349 4.10909 29.4609 4.26534C29.513 4.42159 29.513 4.57784 29.4609 4.73409C29.4349 4.89034 29.3568 5.03357 29.2266 5.16378L25.8672 8.52315C25.5807 8.80961 25.2422 8.87471 24.8516 8.71846C24.4609 8.56221 24.2656 8.27575 24.2656 7.85909V6.06221H0.46875C0.15625 6.06221 0 5.90596 0 5.59346V3.40596C0 3.09346 0.15625 2.93721 0.46875 2.93721H24.2656Z" fill="#0A88F4"/>
                </svg>
              </div>
              <h3 class="card-title destaque-500">
                {{a.title}}
              </h3>
              <p class="card-content">
                {{a.text}}
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Btn from '../../components/Btn'

const itemsPerPage = 12
const numOfShortcutIsShowed = 7

export default {
  name: 'PaginaResultado',
  data(){
    return{
      siteAreas: [
        {
          title: 'Treinamento e certificação',
          text: 'Uma boa forma de entrar em um mercado e melhorar seus conhecimentos sobre um assunto (ou mais!) em pouco tempo',
          link: { name: 'cursos-home'}
        },
        {
          title: 'Graduação',
          text: 'Se você quer uma formação mais ampla e entender mais sobre um assunto, essa é sua escolha!',
          url: "https://www.impacta.edu.br/graduacao"
          // link: { name: 'graduacao-home'}
        },
        {
          title: 'Pós e MBA',
          text: 'Para quem busca se aprofundar ainda mais e se tornar um especialista de verdade',
          url: "https://www.impacta.edu.br/pos-e-mba"
          // link: { name: 'pos-mba-home'}
        },
        {
          title: 'Escola técnica',
          text: 'A escolha certa para quem quer entrar no mercado bem rápido e com uma formação 100% prática e mão na massa',
          url: "https://www.impacta.edu.br/tecnicos"
          // link: { name: 'escola-tecnica-home'}
        },
        {
          title: 'Para empresas',
          text: 'Tudo que a gente aplica para nossos alunos, nós podemos aplicar na sua empresa: é só conversar com nosso pessoal',
          url: "http://conteudo.impacta.com.br/solucoes-corporativas"
          // link: { name: 'corporativo-home'}
        }
      ],
      paginaAtual: 1,
      numPageMax: 1
    }
  },
  computed: {
    page(){
      return this.$route.query.page || 1
    },
    searchValue() {
      return this.$route.query.searchvalue || ''
    },
    resultados() {
      this.setPagination(this.$store.state.searchResults.metadata)
      return this.$store.state.searchResults.data
    },
    total(){
      return this.$store.state.searchResults.metadata.total_itens_geral;
    },
    indexBottom(){
      return (this.paginaAtual * itemsPerPage) - itemsPerPage
    },
    indexTop(){
      return (this.paginaAtual * itemsPerPage) - 1
    },
    pageShortcuts(){
      let pgCurrent = +this.paginaAtual
      let middlePoint = Math.ceil( numOfShortcutIsShowed / 2)
      let iMin = 1
      let iMax = numOfShortcutIsShowed + 1
      let result = []

      if( pgCurrent > middlePoint){
        iMin = pgCurrent - Math.floor(numOfShortcutIsShowed / 2)
        iMax = iMin + numOfShortcutIsShowed

      }
      for(  ; (iMin < iMax) && (iMin <= this.numPageMax); iMin++){
        result.push({
          value: iMin,
          classNames: iMin === pgCurrent ? ' is-current ' : '',
        })
      }

      return result
    }
  },
  watch:{
    paginaAtual(){
      this.fetch(this.paginaAtual)
    }
  },
  created(){
    this.fetch()
  },
  updated(){
    //this.fetch()
  },
  beforeRouteUpdate(t,f,n){
    n()
    this.fetch()
  },
  methods: {
    fetch(pageAtual){
      const page = pageAtual || this.page
      this.searchValue && this.$store.dispatch( 'searchResults/fetchDataByQueryValue', { page: page, query: this.searchValue })
    },
    setPageAtual(e){
      let currentTarget = e.currentTarget
      let value = +currentTarget.dataset.newvaluetocurrentpage
      
      if( value && (value <= this.numPageMax)){             //não pode ser zero
        this.paginaAtual = value
      }
    },
    setPagination(metadata){
      if ( metadata != undefined ) this.numPageMax = metadata.numero_paginas;
    },
    calcNumPageMax( length){
      let add = length % itemsPerPage ? 1 : 0
      return Math.floor((length / itemsPerPage) + add)
    }
  },
  components: {
    Btn
  }
}
</script>

<style lang="scss">
  @import '../../css/my_mixins.scss';
  main.pagina-resultados {
    background: #E5E5E5;
    .introduction {
      background: white;
      padding: 20px 0 36px;
      border-bottom: 1px solid #cccccc80;
      a {
        text-decoration: underline; 
        font-weight: normal;
        font-size: 16px;
        margin-bottom: 20px;
      }
      .label {
        font-weight: 300;
        font-size: 18px;
        line-height: 135%;
        color: #364E5E;
      }
      p {
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        color: #272727;
        margin-bottom: 0;
      }
    }
    .result-items {
      padding: 30px 0 60px;
      .my-card {
        padding: 20px 22px 24px;
        background: white;
        border-radius: 10px;
        margin-bottom: 16px;
        display: block;
        .category {
          font-weight: bold;
          font-size: 12px;
          line-height: 13px;
          color: white;
          background: #0A88F4;
          border-radius: 6px;
          padding: 4px 8px;
          margin-bottom: 12px;
          display: inline-block;
        }
        .modulo{
          font-weight: bold;
          font-size: 12px;
          line-height: 13px;
          color: white;
          background: $orangered;
          border-radius: 6px;
          padding: 4px 8px;
          margin-bottom: 12px;
          margin-left:5px;
          display: inline-block;
        }
        .modalidade{
          font-weight: bold;
          font-size: 12px;
          line-height: 13px;
          color: #0A88F4;
          border: 1px solid #0A88F4;
          border-radius: 6px;
          padding: 4px 8px;
          margin-bottom: 12px;
          margin-left:5px;
          display: inline-block;
        }
        .title {
          font-weight: 500;
          font-size: 16px;
          line-height: 125%;
          color: #272727;
          margin-bottom: 8px;
        }
        p {
          font-weight: 300;
          font-size: 14px;
          line-height: 18px;
          color: #272727;
          margin-bottom: 0;
        }
      }
    }
    .pagination-group-btns{
      height: 40px;
      border: 2px solid #E3E9ED;
      > *:first-child{
        border-right: 2px solid #E3E9ED;
      }
      > *:last-child{
        border-left: 2px solid #E3E9ED;
      }
      .pagination-btn{
        font-size: 14px;
        display: flex;
        align-items: center;
        background: white;
      }
      .is-current{
        color: $primary;
        text-decoration: underline;
      }
      button, i{
        color: #364E5E;
      }
    }
    .site-areas{
      border: 1px solid #E3E9ED;
      background: #F5F5F5;
      padding: 60px 0 30px;
      .title{
        text-align: center;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        color: #272727;
      }
      .subtitle{
        font-weight: 300;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #364E5E;
        max-width: 520px;
        margin: 0 auto 40px;
      }
      .card-site-areas-container{
        margin-bottom: 20px;
      }
      .card-site-areas{
        background: white;
        display: block;
        padding: 27px;
        border-radius: 10px;
        height: 100%;
      }
      .card-title{
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #272727;
        margin: 10px 0 16px;
      }
      .card-content{
        font-weight: 300;
        font-size: 15px;
        line-height: 22px;
        color: #364E5E;
      }
      @include d(l){
        .card-site-areas-container{
          max-width: 20%;
        }
      }
    }
  }
</style>