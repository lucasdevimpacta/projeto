<template>
  <fragment>
    <MainHeader 
      :navigationLinks="navigationLinks" 
      :siteSections="siteSections"  
      searchInputPlaceholder="Buscar cursos..."

      :logo="{
        urlImage: ['../../statics/img/impacta_logo_treianamento_area.svg'],
        imageHeight: ['13.1%']
      }"
    />
    <router-view />
    <SectionBlog v-show="! (noSectionBlog || noFooter)"
      classNames="treinamento-certificacao-section-blog"
    />
    <GeralFooter v-show="! noFooter" 
      classNames="treinamento-certificacao-footer"
    />
  </fragment>
</template>

<link rel="preconnect" href="https://apiv2.impacta.com.br" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link rel="preconnect" href="https://parceiros.impacta.com.br" />

<script>

export default {
  name: 'TreinamentoCertificacaoLayout',
  props: ['noFooter', 'noSectionBlog'],
  created() {
    this.$store.dispatch( 'treinamentosCategorias/fetchDataTreinamentoCategorias', this.id)
  },
  components:{
    MainHeader: () => import('../components/MainHeader'),
    GeralFooter:  () => import('../components/GeralFooter'),
    SectionBlog:  () => import('../components/SectionBlog'),
    DisplayImage:  () => import('../components/DisplayImage')
  },
  data () {
    return {
      siteSections:[
        {
          label: 'Treinamento e Certificação',
          routName: 'cursos-home'
        },
        {
          label: 'Graduação',
          // routName: 'graduacao-home'
          url: 'https://www.impacta.edu.br/graduacao'
        },
        {
          label: 'Pós e MBA',
          // routName: 'pos-mba-home'
          url: 'https://www.impacta.edu.br/pos-e-mba'
        },
        {
          label: 'Escola Técnica',
          // routName: 'escola-tecnica-home'
          url: 'https://www.impacta.edu.br/tecnicos'
        },
        {
          label: 'Para Empresas',
          // routName: 'corporativo-home'
          url: 'http://conteudo.impacta.com.br/solucoes-corporativas'
        },
        {
          label: 'HUB Impacta',
          routName: 'sobre'
        }
      ]
    }
  },
  computed: {
    navigationLinks() {
      let cat = this.$store.state.treinamentosCategorias.data
      const getCategoriesAndMakeNavLinkObj = () => {
        return cat.map( catName => {
          return {
            label: catName.categoria,
            path: `/cursos/${catName.slug}`
          }
        })
      }

      return [
        {
          label: 'Cursos',
          content: getCategoriesAndMakeNavLinkObj()
        },
        {
          label: 'Formações',
          path: '/formacoes',
        },
        {
          label: 'Your Way',
          path: '/your-way',
        },
        {
          label: 'Certificação Impacta',
          path: '/certificacao-impacta',
        },
        {
          label: 'A Impacta',
          content: [
            {
              label: 'Sobre a Impacta',
              path: '/sobre',
            },
            {
              label: 'Prêmios e Reconhecimentos',
              path: '/sobre#premios',
            },
            {
              label: 'Infraestrutura',
              path: '/sobre#infraestrutura',
            }
          ],
        }
      ]
    }
  },
  methods: {
    updateDeviceSize(){
      return this.$store.dispatch( 'app/updateDeviceSize')
    }
  },
  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener('resize', this.updateDeviceSize)
    this.updateDeviceSize()
  },
}
</script>
<style lang="scss">
  .treinamento-certificacao-section-blog{
    margin-top: 50px;
    .tipo-1:before{
      width: 40px;
      top: -1.2vmax;
    }
  }
</style>
