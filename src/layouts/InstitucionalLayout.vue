<template>
  <fragment>
    <MainHeader
      :noTopBar="noTopBar"
      :showSearchInMainNav="showSearchInMainNav"
      :navigationLinks="[...siteSections,...otherLinks]"
      :siteSections="[...homeThisSection,...siteSections]"
      searchInputPlaceholder="Buscar cursos..."
      :showLoginArea="false"
      :classNames="'institucional-header ' + (isHomeDesktop ? 'is-home' : '')"
      :logo="{
        urlImage: ['../../statics/img/impacta_logo_treianamento_area.svg'],
        imageHeight: ['13.1%']
      }"
      :isHomeDesktop="isHomeDesktop"
    />
    <router-view />
    <SectionBlog
      v-if="!(noSectionBlog || noFooter)"
      :classNames="'treinamento-certificacao-section-blog ' + (isHomeDesktop ? 'is-home' : '')"
    />
    <GeralFooter
      v-if="!noFooter"
      :classNames="'treinamento-certificacao-footer ' + (isHomeDesktop ? 'is-home' : '')"
    />
  </fragment>
</template>

<link rel="preconnect" href="https://via.placeholder.com" />

<script>
import MainHeader from "../components/MainHeader";
import GeralFooter from "../components/GeralFooter";
import SectionBlog from "../components/SectionBlog";
import DisplayImage from "../components/DisplayImage";

export default {
  name: "TreinamentoCertificacaoLayout",
  props: ["noFooter", "noSectionBlog", "noTopBar", "showSearchInMainNav"],
  created() {
    this.$store.dispatch(
      "treinamentosCategorias/fetchDataTreinamentoCategorias",
      this.id
    );
  },
  components: {
    MainHeader,
    GeralFooter,
    SectionBlog,
    DisplayImage
  },
  data() {
    return {
      homeThisSection:[
        {
          label: "HUB Impacta",
          routName: "sobre"
        }
      ],
      siteSections: [
        {
          label: "Treinamento e Certificação",
          routName: "cursos-home"
        },
        {
          label: "Graduação",
          // routName: "graduacao-home"
          url: 'https://www.impacta.edu.br/graduacao'
        },
        {
          label: "Pós e MBA",
          // routName: "pos-mba-home"
          url: 'https://www.impacta.edu.br/pos-e-mba'
        },
        {
          label: "Escola Técnica",
          // routName: "escola-tecnica-home"          
          url: 'https://www.impacta.edu.br/tecnicos'
        },
        {
          label: "Para Empresas",
          // routName: "corporativo-home"
          url: 'http://conteudo.impacta.com.br/solucoes-corporativas'
        }
      ],
      otherLinks: [
        {
          label: "A Impacta",
          content:[
            {
              label: "Sobre a Impacta",
              routName: 'sobre'
            },
            {
              label: "Prêmios e Reconhecimentos",
              routName: 'sobre-premios'
            },
            {
              label: "Infraestrutura",
              routName: 'sobre-infraestrutura'
            },
            {
              label: "Unidades",
              routName: 'sobre-unidades'
            },
            {
              label: "Depoimento de alunos",
              routName: 'depoimentos'
            },
            {
              label: "Centro de exames",
              routName: 'centro-exames'
            }
          ]
        }
      ]
    };
  },
  computed: {
    deviceSize(){
      return this.$store.state.app.deviceSize
    },
    isHomeDesktop(){
      return this.showSearchInMainNav && (this.deviceSize === 'lg')
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
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.updateDeviceSize)
  }
};
</script>
<style lang="scss">
@import '../css/my_mixins';
/* situação excepcional para a Home geral */
@media (min-width: 1200px){
  .is-home {
    .container, .container-lg, .container-md, .container-sm, .container-xl {
      max-width: 1240px;
    }
  }
}

.treinamento-certificacao-section-blog {
  margin-top: 50px;
  .tipo-1:before {
    width: 40px;
    top: -1.5vmax;
  }
}
.institucional-header.main-header-component{

  @include d( sxs){
    .main-nav-container{
      justify-content: space-between !important;
    }
  }
}
</style>
