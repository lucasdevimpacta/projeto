<template>
  <main class="pagina-formacao-home">
    <section class="banner-top">
      <div class="container">
        <div class="text-container">
          <h1 class="text-uppercase adorno-container title"><i class="adorno-retangular"></i>Formações</h1>
          <p class="sub-title">Uma sequência de cursos e conteúdos para você se tornar o </p>
          <h2 class="text-uppercase text-color-primary sub-title">Profissional que o mercado procura</h2>
        </div>
      </div>
    </section>
    <BreadCrumb :breadcrumb="$route.meta.breadcrumb"></BreadCrumb>
    <section class="display-qualifications">
      <div class="container">
        <div class="filter-controler">
          <div class="container-btn-modalidade">
            <h5 class="text-uppercase destaque-500">Modalidade</h5>
            <div class="btn-group">
              <Btn
                tag="button"
                borderRadius="4px 0 0 4px"
                classNames="text-uppercase destaque-500"
                :class="{'desable': !presencial}"
                data-keytochange="presencial"
                @click="toggleStatus"
                >Presencial</Btn
              >
              <Btn
                tag="button"
                borderRadius="unset"
                classNames="text-uppercase destaque-500"
                :class="{'desable': !online}"
                data-keytochange="online"
                @click="toggleStatus"
                >Online</Btn
              >
              <Btn
                tag="button"
                borderRadius="0 4px 4px 0"
                classNames='text-uppercase destaque-500 '
                :class="{'desable': !aovivo}"
                data-keytochange="ao vivo"
                @click="toggleStatus"
                >Ao vivo</Btn
              >
            </div>
          </div>
        </div>
        <div>
          <div v-for="( c, i) in formacoes" :key="'card-qualification-' + i" class="qualification-card soft-shadow">
            <div class="header-qualification-card">
              <CategoryBtn 
                :text="c.pacote_formacao"
                :icon="c.icon"
                classNames="style-default solid"
              />
            </div>
            <div class="row no-gutters">
              <div v-for="( f, _i) in c.formacoes" :key="'qualification-' + i + '-' + _i" v-if="filterModality( f.modalidade)" class="col-lg-4 col-md-6 category-btn-component-container">
                <CategoryBtn 
                  :icon="c.icon"
                  classNames="style-default"
                >
                  <div class="container-qualification-simplified">
                    <p class="modalidade">Formação {{f.modalidade}}</p>
                    <router-link :to="{name: 'single-formacao', params: { formacao: f.slug}}"><h3>{{f.titulo}}</h3></router-link>
                    <p class="total-course">{{f.total_cursos}} cursos</p>
                  </div>
                </CategoryBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Btn from '../../components/Btn'
import CategoryBtn from '../../components/CategoryBtn'
import BreadCrumb from '../../components/BreadCrumb'

export default {
  name: 'Formacoes',
  props:{
      myFilters: {
      type: Object,
      default: function(){
          return {
            presencial: true,
            online: false,
            'ao vivo': false,
          }
        }
      }
  },
  computed:{
    formacoes(){
      return this.$store.state.treinamentosFormacaoSimplificada.data
    },
    presencial(){
      return this.myFilters.presencial;
    },
    online(){
      return this.myFilters.online;
    },
    aovivo(){
      return this.myFilters['ao vivo'];
    }
  },
  filters:{
  },
  methods:{
    toggleStatus( e){
      let currentTarget = e.currentTarget
      let keytochange = currentTarget.dataset.keytochange

      currentTarget.classList.toggle('desable')
      this.myFilters[keytochange] = ! this.myFilters[keytochange]
    },
    fetch(){
      this.$store.dispatch( 'treinamentosFormacaoSimplificada/fetchDataFormacaoSimplificada')
    },
    filterModality( val){
      return this.myFilters[ val]
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
    CategoryBtn,
    Btn,
    BreadCrumb
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Formações',
      meta: {
        title: { name: 'title', content: 'Formações' },
        description: { name: 'description', content: 'Uma sequência de cursos e conteúdos para você se tornar o profissional que o mercado procura' },
        keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional, formações' },

        ogTitle: { name: 'og:title', content: 'Formações' },
        ogDescription: { name: 'og:description', content: 'Uma sequência de cursos e conteúdos para você se tornar o profissional que o mercado procura' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Formações' },
        twDescription: { name: 'twitter:description', content: 'Uma sequência de cursos e conteúdos para você se tornar o profissional que o mercado procura' },
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
              "name": "Formações",
              "description": "Uma sequência de cursos e conteúdos para você se tornar o profissional que o mercado procura",
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

.pagina-formacao-home{
  .banner-top{
    min-height: 220px;
    padding-top: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0px 1px 0px #cccccc80;
    background: white;
    margin-bottom: 30px;
    .title{
      font-weight: 500;
      font-size: 40px;
    }
    .sub-title{
      font-weight: 300;
      font-size: 22px;
      color: #364E5E;
      margin-bottom: 0;
    }
    h2.sub-title{
      font-weight: 500;
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
    margin-bottom: 30px;
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
  .qualification-card{
    border-radius: 10px;
    background: white;
    margin-bottom: 15px;
    padding-bottom: 10px;
    .category-btn-component{
      background: none;
    }
  }
  .category-btn-component-container{
    color: #364E5E;
  }
  .container-qualification-simplified{
    .modalidade{
      font-size: 14px;
      color: #364E5E;
      margin-bottom: 0;
    }
    h3{
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 0;
    }
    .total-course{
      font-weight: 300;
      font-size: 14px;
      color: #364E5E;
      margin-bottom: 0;
    }
  }
}

</style>
