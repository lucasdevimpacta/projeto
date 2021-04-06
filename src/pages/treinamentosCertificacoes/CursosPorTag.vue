<template>
  <main class="pagina-treinamentos-tag">
    <section class="banner-selected-category">
      <div v-if="tag" class="container">
        <div class="content-container">
          <div class="text-container">
            <p>Busca por tag</p>
            <h1 class="title destaque-500">{{tag}}</h1>
          </div>
        </div>
      </div>
    </section>
    <BreadCrumb :breadcrumb="$route.meta.breadcrumb" :lastcrumb="tag" :dynamicrumbs="{}"></BreadCrumb>
    <section class=" treinamento-list">
      <div class="container">
        <div class="row">
          <div class="col-lg-2">
            <div class="container-tags">
              <h5 @click="toggleVisibility"  data-idtarget="tag_drop_637" class="text-uppercase destque-500">Tag relacionadas <i class="fas fa-chevron-down ml-2 d-lg-none"></i></h5>
              <!-- <div class="drop-menu" id="tag_drop_637">
                <router-link v-for="( t, i) in tagsTreinamentos" :to="{name: tag, params: {tag: t.slug} }" tag="a" :key="'link_tag_' + i">{{t.name + '(' + t.count_itens + ')'}}</router-link>
              </div> -->
              <hr class="d-lg-none">
            </div>
          </div>
          <div class="col-lg-10">
            <div class="filter-controler">
              <div class="container-btn-modalidade">
                <h5 class="text-uppercase destaque-500">Modalidade</h5>
                <div class="btn-group">
                  <Btn
                    tag="button"
                    borderRadius="4px 0 0 4px"
                    classNames="text-uppercase destaque-500 desable"
                    data-keytochange="filterPresencial"
                    @click="toggleStatus"
                    >Presencial</Btn
                  >
                  <Btn
                    tag="button"
                    borderRadius="unset"
                    classNames="text-uppercase destaque-500 desable"
                    data-keytochange="filterOnline"
                    @click="toggleStatus"
                    >Online</Btn
                  >
                  <Btn
                    tag="button"
                    borderRadius="0 4px 4px 0"
                    classNames="text-uppercase destaque-500 desable"
                    data-keytochange="filterAovivo"
                    @click="toggleStatus"
                    >Ao vivo</Btn
                  >
                </div>
              </div>
              <div class="container-sort">
                <h5 class="text-uppercase destque-500">Ordenar Por</h5>
                <div class="drop-menu">
                  <span
                    class="default-value"
                    @click="toggleVisibility"
                    data-idtarget="drop_99"
                    :data-ordemvalue="ordem.value"
                    >{{ ordem.text }}</span
                  >
                  <ul class="drop-list  initial-hided" id="drop_99">
                    <li
                      v-for="(op, i) in valuesOfFielOrdem"
                      @click="toggleVisibility"
                      data-idtarget="drop_99"
                      :key="i"
                      :data-ordemvalue="op.value"
                    >
                      {{ op.text }}
                    </li>
                    <li
                      class="drop-bg-to-close"
                      @click="toggleVisibility"
                      data-idtarget="drop_99"
                    ></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <!-- <div
                v-for="(o, i) in treinamentos"
                class="col-lg-3 col-md-6 mb-3"
                :key="i"
                v-if="(i >= indexBottom) && (i <= indexTop)"
              > -->
              <div
                v-for="(o, i) in treinamentos"
                class="col-lg-3 col-md-6 mb-3"
                :key="i"
              >
                <router-link
                  class="link-reset"
                  :to="{ name: 'single-curso', params:{ curso: o.slug } }"
                >
                  <CourseCard
                    :urlImage="[o.imagem_capa || '../../statics/img/webp/no_imagem.webp']"
                    :imageHeight="['59.3%']"
                    :titleTag="{
                      text: o.modalidade.toUpperCase()
                    }"
                    :title="{
                      text: o.produto
                    }"
                    :titleModulo="{
                      text: 'MÓDULO ' + o.modulo
                    }"
                    :borderRadius="{ container: '6px', containerImage: '6px 6px 0 0'}"
                    classNames="default-style soft-shadow default-filter"
                    :adjusteThumb="true"
                  >
                    <template v-slot:contentDownImage>
                      <div
                        class="content-down-image-container info-treinamento"
                      >
                        <p class="carga-horaria d-none d-lg-block">
                          Carga horária:
                          <span class="text-uppercase destaque-500"
                            >{{ o.carga_horaria }} horas</span
                          >
                        </p>
                        <p class="parcelamento">
                          A partir de {{ o.parcela_maxima }}x
                          <span class="destaque-tachado text-red">{{
                            calcValQuota(
                              o.valor,
                              o.parcela_maxima
                            )
                          }}</span>
                        </p>
                        <p class="preco">
                          {{
                            calcValQuota(
                              o.valor_promocional,
                              o.parcela_maxima
                            )
                          }}
                        </p>
                        <p class="valor-a-vista">
                          ou R${{ o.valor_avista }} á vista
                        </p>
                      </div>
                    </template>
                  </CourseCard>
                </router-link>
              </div>
            </div>
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
        </div>
      </div>
    </section>
     <section class="treinamento-categories ">
      <div class="container">
        <div class="row">
          <h4 class="col-12 text-uppercase title adorno-container"><i class="adorno-retangular tipo-1"></i>Cursos por Categoria</h4>
        </div>
        <div class="row">
          <div v-for="(c, i) in categoriasTreinamentos" class="col-md-4 category-btn-component-container mb-3" :key="i" >
            <CategoryBtn 
              borderRadius="6px"
              :text="c.categoria"
              :pathToDestine="'/cursos' + c.slug"
              :icon="c.icon"
              classNames="style-default solid soft-shadow"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import CourseCard from '../../components/CourseCard'
import Btn from '../../components/Btn'
import CategoryBtn from '../../components/CategoryBtn'
import BreadCrumb from '../../components/BreadCrumb';

const initialValuesOrdem = [
        {
          text: 'Maior desconto',
          value: 'maior_desconto',
        },
        {
          text: 'Menor preço',
          value: 'menor_preco',
        },
        {
          text: 'Maior preço',
          value: 'maior_preco',
        },
        {
          text: 'Mais vendido',
          value: 'mais_vendido',
        }
      ]

const itemsPerPage = 12
const numOfShortcutIsShowed = 7

export default {
  name: 'CursosPorTag',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }){

      let tag = currentRoute.params.tag

      return store.dispatch( 'treinamentosCursosSimplificados/fetchDataTreinamentoPerTagServer', { 
        tag, 
        ordem: 'maior_desconto',
        page: 1,
        presencial: false,
        online: false,
        aovivo: false
      })
  },
  data(){
    return {
      valuesOfFielOrdem: initialValuesOrdem,
      ordem: initialValuesOrdem[0],

      paginaAtual: 1,
      numPageMax: 1,

      filterPresencial: false,
      filterOnline: false,
      filterAovivo: false,

      treinamentosFiltered:[]
    }
  },
  props:{
    tag:{
      type: String
    }
  },
  computed:{
    treinamentos(){
      //return this.filterCourses( this.$store.state.treinamentosCursosSimplificados.data)
      this.setPagination(this.$store.state.treinamentosCursosSimplificados.metadata);
      return this.$store.state.treinamentosCursosSimplificados.data;
    },
    categoriasTreinamentos() {
      return this.$store.state.treinamentosCategorias.data
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
    ordem({value}){
      this.fetch()
    },
    paginaAtual({value}){
      this.fetch()
    },
    filterPresencial(){
      this.fetch()
    },
    filterOnline(){
      this.fetch()
    },
    filterAovivo(){
      this.fetch()
    },
    tag(){
      this.fetch()
    }
    
  },
  created(){
    this.fetch()
  },
  beforeRouteUpdate(t,f,n){
    this.fetch()
    n()
  },
  methods:{
    fetch(){
      let tag = this.tag
      this.$store.dispatch( 'treinamentosCursosSimplificados/fetchDataTreinamentoPerTag', { 
        tag, 
        ordem: this.ordem.value,
        page: this.paginaAtual,
        presencial: this.filterPresencial,
        online: this.filterOnline,
        aovivo: this.filterAovivo
      })
      //this.$store.dispatch( 'treinamentosTags/fetchDataTag',{slug})
    },
    calcValQuota( total, numQuota){
      numQuota = numQuota || 1
      let result = total / numQuota
      return `R$ ${result.toFixed(2).replace('.',',')}`
    },
    toggleVisibility( e){
      let currentTarget = e.currentTarget
      let idTarget = currentTarget.dataset.idtarget

      document.getElementById( idTarget).classList.toggle('show')
      currentTarget.classList.toggle('is-collapse')

      if( this.setOrdemValue( e)){
        document.getElementsByClassName('default-value')[0].classList.add('selected-value')
      }
    },
    toggleStatus( e){
      let currentTarget = e.currentTarget
      let keytochange = currentTarget.dataset.keytochange

      currentTarget.classList.toggle('desable')
      this[keytochange] = ! this[keytochange]
    },
    setOrdemValue( e){
      let currentTarget = e.currentTarget
      let value = currentTarget.dataset.ordemvalue

      if( value){
        let text = currentTarget.textContent
        this.ordem = { text, value}
        return true
      }
      return false
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
    filterCourses( treinamentos){
      const filter = ( val) => {
        if( (val === 'presencial') && this.filterPresencial ){
          return true
        } else if( ( val === 'online') && this.filterOnline){
          return true
        } else if ( ( val === 'aovivo') && this.filterAovivo){
          return true
        }
        return false
      }

      let subtotal = treinamentos.filter( t => filter( t.modalidade))
      this.numPageMax = this.calcNumPageMax( subtotal.length)
      return subtotal
    },
    calcNumPageMax( length){
      
      let add = length % itemsPerPage ? 1 : 0
      return Math.floor((length / itemsPerPage) + add)
    }
  },
  components:{
    CourseCard,
    Btn,
    CategoryBtn,
    BreadCrumb
  },
  meta () {
    console.info(this)
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Busca pela tag ' + this.tag,
      meta: {
        title: { name: 'title', content: 'Busca pela tag ' + this.tag },
        description: { name: 'description', content: '' },
        keywords: { name: 'keywords', content: this.tag },

        ogTitle: { name: 'og:title', content: 'Busca pela tag ' + this.tag },
        ogDescription: { name: 'og:description', content: '' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Busca pela tag ' + this.tag },
        twDescription: { name: 'twitter:description', content: '' },
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
              "name": "Busca pela tag ${ this.tag }",
              "description": "${ '' }",
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
  @import '../../css/main.scss';

  .main.pagina-treinamentos-tag{
    background: #F8F9FD;
  }
  .pagina-treinamentos-tag {
    color: #272727;
    h1{
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 35px;
    }
    $iconDimension: 90px;
    .banner-selected-category{
      background: white;
      margin-bottom: 30px;
      border-bottom: 1px solid #cccccc4d;
      @include d( l){
        margin-bottom: 60px;
      }
    }
    .content-container{
      display: flex;
      align-items: center;
      min-height: 150px;
      flex-direction: column;
      i{
        width: $iconDimension;
        height: $iconDimension;
        display: flex;
        background: $primary;
        font-size: 40px;
        align-items: center;
        justify-content: center;
        border-radius: $iconDimension / 2;
        color: white;
      }
      h1{
        font-weight: 500;
        font-size: 24px;
      }
      p{
        font-weight: 300;
        font-size: 18px;
        line-height: 135%;
        color: #364E5E;
      }
      @include d( sxs){
        text-align: center;
        i{
          width: 74px;
          height: 74px;
          font-size: 30px;
          border-radius: 37px;
          margin-bottom: 10px;
        }
      }
      @include d( lm){
        flex-direction: row;
        p{
          max-width: 620px;
        }
      }
      @include d( l){
        min-height: 190px;
      }
    }
    .treinamento-list{
      > .container{
        padding-bottom: 35px;
        border-bottom: 1px solid #E3E9ED;
      }
    }
    .filter-controler {
      display: flex;
      justify-content: space-between;
      color: #364e5e;
      h5 {
        font-size: 14px;
        margin-bottom: 10px;
      }
      @include d( sxs){
        flex-direction: column;
        margin-bottom: 20px;
        margin-top: 10px;
      }
    }
    .container-btn-modalidade {
      margin-bottom: 20px;
      button {
        display: inline-block;
        width: unset;
        color: white;
        outline: none;
        &.desable {
          background: white;
          color: #364e5e;
          border: 2px solid #e3e9ed;
        }
      }
      button.desable + button.desable{
        border-left: none !important;
      }
    }
    $heightSecontRowControlFiltersArea: 40px !important;
    .container-btn-modalidade button {
      height: $heightSecontRowControlFiltersArea;
      font-size: 14px;
      padding: 0 16px;
    }
    .container-sort{
      @include d( l){
        // h5{
        //   text-align: right;
        // }
      }
    }
    .drop-menu {
      width: 165px;
      position: relative;
      > span {
        min-height: $heightSecontRowControlFiltersArea;
        display: flex;
        align-items: center;
        width: 100%;
        border-radius: 4px;
        padding-left: 16px;
        border: 2px solid #364E5E;
      }
      .default-value{
        color: #364e5e80;
        &.selected-value{
          color: inherit;
        }
      }
      .drop-list{
        width: 100%;
        position: absolute;
        top: 0;
        border-radius: 4px;
        padding-left: 16px;
        border: 2px solid #364E5E;
        background: white;
        z-index: 20;
        li{
          margin: 5px 0;
          &:not(.drop-bg-to-close){
            position: relative;
            z-index: 100;
          }
        }
        .drop-bg-to-close{
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
        }
      }
    }
    .container-tags{
      h5{
        font-size: 14px;
        color: #364E5E;
      }
      a{
        font-weight: 300;
        color: #364E5E;
        text-decoration: underline;
        &:hover{
          color: $primary;
        }
      }
      .drop-menu{
        display: none;
        &.show{
          display: initial;
        }
      }
      a + a{
        margin-left: 15px;
      }
      @include d( l){
        .drop-menu{
          display: initial;
        }
        a{
          display: block;
          margin-bottom: 8px;
          margin-left: 0!important;
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
    .treinamento-categories{
      padding-top: 60px;
      margin-bottom: 40px;
      .title{
        margin-bottom: 20px;
      }
      .category-btn-component-container{
        //max-height: 90px;
        //height: 7.8vh;
        //min-height: 68px;
      }
    }
  }
</style>
