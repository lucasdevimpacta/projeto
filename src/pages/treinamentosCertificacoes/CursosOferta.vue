<template>
  <main class="pagina-oferta-treinamento">
    <section class="banner-top">
      <div class="container">
        <h1 claass="title destaque-500">
          Cursos em Oferta
        </h1>
      </div>
    </section>
    <BreadCrumb :breadcrumb="$route.meta.breadcrumb" :dynamicrumbs="{}"></BreadCrumb>
    <section class="treinamento-list">
      <div class="container">
        <div class="row">
          <div class="col-lg-2">
            <div class="container-tags">
              <h5 @click="toggleVisibility"  data-idtarget="tag_drop_637" class="text-uppercase destque-500">Filtrar por: <i class="fas fa-chevron-down ml-2 d-lg-none"></i></h5>
              <div class="drop-menu" id="tag_drop_637">
                <router-link v-for="( t, i) in tagsTreinamentos" :to="{ name: 'tag', params: { tag: t.slug } }"  tag="a" :key="'link_tag_' + i">{{t.name + '(' + t.count_itens + ')'}}</router-link>
              </div>
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
                <div class="my-input-as-select-component my-w-100 my-w-30 border-gray">
                  <label>DATA</label>
                  <Datepicker
                    classNames="my-input-as-select-component my-w-100 my-w-30 border-gray" 
                    v-model="date"
                    format="dd/MM/yyyy"
                    placeholder="__/__/____"
                    :disabled-dates="disableDatas"
                    :language=br
                  ></Datepicker>
                </div>
                <MyInputAsSelect 
                  label="Período"
                  classNames="my-w-30 border-gray by-period"
                  placeHolder="Manhã"
                  :options="periodListToFilter" 
                  v-model="period"
                />
                <MyInputAsSelect 
                  label="preço"
                  classNames="my-w-30 border-gray by-price"
                  placeHolder="Maior desconto"
                  :options="priceListOptionsToFilter" 
                  v-model="price"
                />
              </div>
            </div>
            <p v-if="metadataTreinamentos && metadataTreinamentos.total_itens_geral > 1" class="display-total" v-text="`Total de ${metadataTreinamentos.total_itens_geral} cursos`">
            </p>
            <div class="row">
              <div
                v-for="(o, i) in treinamentos"
                class="col-lg-3 col-md-6 mb-3"
                :key="i"
                v-if="treinamentos.length"
              >
                <router-link
                  class="link-reset"
                  :to="{ name:'single-curso', params: {curso: o.slug} }"
                >
                  <CourseCard
                    :urlImage="[o.imagem_capa]"
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
                  >
                    <template v-slot:contentDownImage>
                      <div
                        class="content-down-image-container info-treinamento"
                      >
                        <p class="carga-horaria d-none d-lg-block">
                          Carga horária:
                          <span class="text-uppercase"
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
                          ou R$ {{ o.valor_avista }} á vista
                        </p>
                      </div>
                    </template>
                  </CourseCard>
                </router-link>
              </div>
              <div v-if="treinamentos.length == 0" class="noresults">
                <div style="text-align:center; font-size:15px;">
                  Nenhum produto localizado.
                </div>
              </div>
              <div v-if="treinamentos.length == 0" class="noresults">
                <div>
                  <div style="text-align:center; font-size:15px;">
                   Filtros utilizados:
                  </div>
                  <div>
                    <span style="display:inline-block; width:78px;">Presencial</span>:
                    <span v-if="filterPresencial" style="font-weight:bold"><i class="fa fa-check"></i></span>
                    <span v-else style="font-weight:bold" ><i class="fa fa-ban"></i></span>
                  </div>
                  <div>
                    <span style="display:inline-block; width:78px;">Online</span>:
                    <span v-if="filterOnline" style="font-weight:bold"><i class="fa fa-check"></i></span>
                    <span v-else style="font-weight:bold" ><i class="fa fa-ban"></i></span>
                  </div>
                  <div>
                    <span style="display:inline-block; width:78px;">Ao Vivo</span>:
                    <span v-if="filterAovivo" style="font-weight:bold">Ativado</span>
                    <span v-else style="font-weight:bold" ><i class="fa fa-ban"></i></span>
                  </div>
                  <div>
                    <span style="display:inline-block; width:78px;">Data</span>:
                    <span v-if="date" style="font-weight:bold">{{getDateFormat(date,'DD/MM/YYYY')}}</span>
                    <span v-else style="font-weight:bold">-----</span>
                  </div>
                  <div> 
                    <span style="display:inline-block; width:78px;">Período</span>:
                    <span v-if="periodo" style="font-weight:bold">{{periodo}}</span>
                    <span v-else style="font-weight:bold">------</span>
                  </div>
                  <div>
                    <span style="display:inline-block; width:78px;">Preço</span>:
                    <span v-if="price" style="font-weight:bold">{{price}}</span>
                    <span v-else style="font-weight:bold">------</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="" v-if="treinamentos.length">
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
    <section class="treinamento-categories">
      <div class="container">
        <div class="row">
          <h4 class="col-12 text-uppercase title adorno-container"><i class="adorno-retangular tipo-1"></i>Cursos por Categoria</h4>
        </div>
        <div class="row">
          <div v-for="(c, i) in categoriasTreinamentos" class="col-md-4 category-btn-component-container mb-3" :key="i" >
            <CategoryBtn 
              borderRadius="6px"
              :text="c.categoria"
              :pathToDestine="c.slug"
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
import MyInputAsSelect from '../../components/MyInputAsSelect'
import BreadCrumb from '../../components/BreadCrumb'

import moment from 'moment'

import {ptBR} from 'vuejs-datepicker/dist/locale'

moment.locale('pt-br');

const itemsPerPage = 12
const numOfShortcutIsShowed = 7

var disabledDates =  new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate()+2));

export default {
  name: 'CursosOferta',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }){

      return store.dispatch( 'treinamentosCursosSimplificados/fetchDataTreinamentoOfertaServer', {
        tagSlug: '',
        page: 1,
        price: 'maior_desconto',
        date: '',
        period: '',
        presencial: false,
        online: false,
        aovivo: false
      })
  },
  data(){
    return {
      br: ptBR,
      priceListOptionsToFilter: [
        {
          text: 'Todos',
          value: 'todos',
        },
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
        }
      ],
      price: '',

      date: '',

      periodListToFilter: [
        {
          value: 'todos',
          text: 'Todos'
        },
        {
          value: 'manha',
          text: 'Manhã'
        },
        {
          value: 'tarde',
          text: 'Tarde'
        },
        {
          value: 'noite',
          text: 'Noite'
        }
      ],
      period: '',

      paginaAtual: 1,
      numPageMax: 1,

      filterPresencial: false,
      filterOnline: false,
      filterAovivo: false,

      treinamentosFiltered:[],
      disableDatas:{
        to: disabledDates
      }
    }
  },
  props: {
    tag: {
      type: String,
      default: ''
    }
  },
  computed:{
    categoriasTreinamentos() {
      return this.$store.state.treinamentosCategorias.data
    },
    dateListToFilter() {
      return this.$store.state.treinamentoOferta.datesList
    },
    tagsTreinamentos() {
      return this.$store.state.treinamentosTags.data
    },
    metadataTreinamentos() {
      return this.$store.state.treinamentosCursosSimplificados.metadata
    },
    treinamentos(){
      this.setPagination(this.metadataTreinamentos);
      return this.$store.state.treinamentosCursosSimplificados.data;
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
    price(){
      this.fetch()
    },
    date(){
      this.fetch()
    },
    period(){
      this.fetch()
    },
    paginaAtual(){
      this.fetch()
    },
    filterPresencial(){
      this.fetch()
    },
    filterOnline(){
      if ( this.filterOnline ) this.date = "";
      this.fetch()
    },
    filterAovivo(){
      this.fetch()
    }
  },
  created(){
    this.fetch()
    this.fetchTags()
  },
  beforeRouteUpdate(t,f,n){
    this.fetch(t.params.tag)
    n()
  },
  methods:{
    getDateFormat(v, format){
      if ( v != '' ) {
        return moment(v,'YYYY/MM/DD').format(format)
      } else {
        return v;
      }
    },
    fetch(tag){
      if ( this.date != '' ) {
        this.date = this.getDateFormat(this.date, 'YYYY-MM-DD');
      }
      this.$store.dispatch( 'treinamentosCursosSimplificados/fetchDataTreinamentoOferta', {
        tagSlug: tag || this.tag,
        page: this.paginaAtual,
        price: this.price,
        date: this.date,
        period: this.period,
        presencial: this.filterPresencial,
        online: this.filterOnline,
        aovivo: this.filterAovivo
      })
      this.$store.dispatch( 'treinamentosTags/fetchDataTagOfertas',{
        page: this.paginaAtual,
        price: this.price,
        date: this.date,
        period: this.period,
        presencial: this.filterPresencial,
        online: this.filterOnline,
        aovivo: this.filterAovivo
      })
    },
    fetchTags() {
      this.$store.dispatch( 'treinamentosTags/fetchDataTagOfertas',{})
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
    },
    toggleStatus( e){
      let currentTarget = e.currentTarget
      let keytochange = currentTarget.dataset.keytochange

      currentTarget.classList.toggle('desable')
      this[keytochange] = ! this[keytochange]
      this.paginaAtual = 1;
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
  components:{
    CourseCard,
    Btn,
    CategoryBtn,
    MyInputAsSelect,
    BreadCrumb
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Cursos em Oferta',
      meta: {
        title: { name: 'title', content: 'Cursos em Oferta' },
        description: { name: 'description', content: 'Confira os cursos Impacta com últimas chamadas e ofertas especiais por tempo limitado. Aproveite e matricule-se já!' },
        keywords: { name: 'keywords', content: 'Cursos em oferta, promoções' },

        ogTitle: { name: 'og:title', content: 'Cursos em Oferta' },
        ogDescription: { name: 'og:description', content: 'Confira os cursos Impacta com últimas chamadas e ofertas especiais por tempo limitado. Aproveite e matricule-se já!' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Cursos em Oferta' },
        twDescription: { name: 'twitter:description', content: 'Confira os cursos Impacta com últimas chamadas e ofertas especiais por tempo limitado. Aproveite e matricule-se já!' },
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
              "name": "Cursos em Oferta",
              "description": "Confira os cursos Impacta com últimas chamadas e ofertas especiais por tempo limitado. Aproveite e matricule-se já!",
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

  main.pagina-oferta-treinamento{
    background: #F8F9FD;
  }
  .pagina-oferta-treinamento {
    color: #272727;
    .border-gray {
      input {
        border: 2px solid #E3E9ED;
      }
    }
    h1{
      font-size: 24px;
      line-height: 28px;
      color: white;
    }
    $iconDimension: 90px;
    .banner-top {
      background: #0053d5;
      background: -moz-linear-gradient(90deg, #0053d5 0%, #0d8af5 50%, #6eb1fc 100%);
      background: -webkit-linear-gradient(90deg, #0053d5 0%, #0d8af5 50%, #6eb1fc 100%);
      background: linear-gradient(90deg, #0053d5 0%, #0d8af5 50%, #6eb1fc 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0053d5",endColorstr="#6eb1fc",GradientType=1);
      min-height: 200px;
      display: flex;
      align-items: center;
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
      h3{
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
        .text-container{
          margin-left: 25px;
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
      border-bottom: 1px solid #E3E9ED;
      margin-bottom: 20px;
      h5 {
        font-size: 14px;
        margin-bottom: 10px;
      }
      @include d( sxs){
        flex-direction: column;
        margin-top: 10px;
      }
    }
    .display-total {
      font-weight: normal;
      font-size: 16px;
      line-height: 135%;
      color: #364E5E;
      margin-bottom: 18px;
    }
    .container-btn-modalidade {
      margin-bottom: 20px;
      button {
        display: inline-block;
        width: unset;
        color: white;
        outline: none;
        white-space: nowrap;
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
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
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
      .router-link-active {
        font-weight: 500;
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
    }
    & + .geral-footer-component{
      .main-footer{
        border-top: 1px solid #E3E9ED;
      }
    }
    .noresults{
      background: linear-gradient(90deg, #0053d5 0%, #0d8af5 50%, #6eb1fc 100%); 
      border-radius:5px; 
      border: 1px solid #cecece; 
      padding:10px; 
      width:100%; 
      margin:10px; 
      color:white;
    }
  }
</style>
