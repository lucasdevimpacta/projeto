<template>
  <main class="pagina-depoimentos">
    <section class="display-banner-component-container">
      <DisplayBanner 
        :urlImage="['../../statics/img/webp/banner_tesmonials.webp','../../statics/img/webp/banner_tesmonials.webp','../../statics/img/webp/banner_tesmonials.webp']"
        :imageHeight="['31%', '55%', '125.5%']"
      >
        <BreadCrumb :breadcrumb="$route.meta.breadcrumb" :dynamicrumbs="{}" className="alter"></BreadCrumb>
        <div class="banner-text-content">
          <h1 class="destaque-500 title text-uppercase text-center adorno-container-center">
            <i class="adorno-retangular"></i>Histórias de sucesso
          </h1>
          <p class="text-center">
            "A impressão sobre os treinamentos da Impacta é muito boa. Os profissionais são altamente capacitados e dispostos a nos ensinar dentro e fora da escola -
          </p>
          <p class="author">
            Marcelo Kiilian, Analista de informação
          </p>
        </div>
      </DisplayBanner>
    </section>
    
    <section class="testmonials-video">
      <div class="container">
        <div class="primary-video-container text-center">
          <h2 class="title text-uppercase destaque-500 adorno-container-center">
            <i class="adorno-retangular"></i>Quem faz, entende
          </h2>
          <p>
            Saber que somos super premiados e que estamos no ramo há mais de 30 anos te mostra que a gente tá bem conceituado no mercado, né?
          </p>
          <p>
            Mas sabe qual reconhecimento que deixa nossos times cheios de orgulho?<br><span class="text-uppercase">O dos nossos alunos!</span>
          </p>
          <p>
            E quem melhor para falar sobre a experiência de estudar aqui e a diferença que faz ter um certificado Impacta no CV do que pessoas que passaram pelos nossos treinamentos?
          </p>
          <div class="course-card-component-container primary-video-play">
            <CourseCard 
              :urlImage="['../../statics/img/webp/depoimentoseo.webp']" :imageHeight="['73.3%']"
              classNames=""
              :borderRadius="{ container: '20px'}"
              :displayVideo="{
                url: 'https://www.youtube.com/embed/B7X_JVoaCnk'
              }"
            >
            </CourseCard>
          </div>
        </div>
        <div class="other-videos row">
          <div v-for="(d, i) in depoVideos" :key="i" class="col-lg-3 col-6"> 
                 
            <CourseCard 
              :urlImage="[d.imageUrl]" :imageHeight="['65.7%']"
              classNames=""
              :borderRadius="{ container: '10px'}"
              :displayVideo="{
                url: d.vid
              }"
            >
            </CourseCard>
          </div>
        </div>
      </div>
    </section>
    <SectionTestmonials :textInTop="true" :amountItems="deviceSize === 'lg' ? 8 : 4" classNames="bg-circles" :displayLoadMore="true" />
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
import DisplayBanner from '../../components/DisplayBanner'
import CourseCard from '../../components/CourseCard'
import SectionTestmonials from '../../components/SectionTestmonials'
import BreadCrumb from '../../components/BreadCrumb'

export default {
  name: "Depoimentos",
  data(){
    return{
      siteAreas:[
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
      depoVideos:[{
          vid: 'https://www.youtube.com/embed/9tgr-aH8W9s',
          imageUrl: '../../statics/img/webp/depoimentocorporativoead.webp'
        },{
          vid: 'https://www.youtube.com/embed/N3fY4UNfKCk',
          imageUrl: '../../statics/img/webp/depoimentorobo.webp'        
        },{
          vid: 'https://www.youtube.com/embed/VihykFx2jbY',
          imageUrl: '../../statics/img/webp/depoimentonatalia.webp'
        },{
          vid: 'https://www.youtube.com/embed/RjzdkiHMkoM',
          imageUrl: '../../statics/img/webp/depoimentohackathon.webp'
      }]
    }
  },
  computed: {
    deviceSize(){
      return this.$store.state.app.deviceSize
    }
  },
  components: {
    DisplayBanner,
    CourseCard,
    SectionTestmonials,
    BreadCrumb
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Histórias de sucesso',
      meta: {
        title: { name: 'title', content: 'Histórias de sucesso' },
        description: { name: 'description', content: 'A impressão sobre os treinamentos da Impacta é muito boa. Os profissionais são altamente capacitados e dispostos a nos ensinar dentro e fora da escola - Marcelo Kiilian, Analista de informação' },
        //keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: 'Histórias de sucesso' },
        ogDescription: { name: 'og:description', content: 'A impressão sobre os treinamentos da Impacta é muito boa. Os profissionais são altamente capacitados e dispostos a nos ensinar dentro e fora da escola - Marcelo Kiilian, Analista de informação' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Histórias de sucesso' },
        twDescription: { name: 'twitter:description', content: 'A impressão sobre os treinamentos da Impacta é muito boa. Os profissionais são altamente capacitados e dispostos a nos ensinar dentro e fora da escola - Marcelo Kiilian, Analista de informação' },
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
              "name": "Histórias de sucesso",
              "description": "A impressão sobre os treinamentos da Impacta é muito boa. Os profissionais são altamente capacitados e dispostos a nos ensinar dentro e fora da escola - Marcelo Kiilian, Analista de informação",
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

  .pagina-depoimentos{
    .display-banner-component-container{
      position: relative;
      color: white;
      margin-bottom: 80px;
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
    }
    .primary-video-container{
      margin-bottom: 35px;
      .title{
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        color: #272727;
        margin-bottom: 15px;
      }
      p{
        font-weight: 300;
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        color: #364E5E;
        max-width: 644px;
        margin: 0 auto;
        margin-bottom: 25px;
      }
      .course-card-component-container{
        max-width: 644px;
        margin: 0 auto;
      }
    }
    .other-videos{
      margin-bottom: 80px;
      > *{
        margin-bottom: 20px;
      }
    }
    .section-testmonials-component{
      .btn-component-container{
        padding: 20px 0 45px;
      }
      .text-in-top{
        margin-bottom: 36px !important;
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
