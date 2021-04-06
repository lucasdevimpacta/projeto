<template>
  <main class="pagina-sobre">
    <section class="display-banner-component-container">
      <DisplayBanner 
        :urlImage="['../../statics/img/webp/banner_sobre.webp','../../statics/img/webp/banner_sobre.webp','../../statics/img/webp/banner_sobre.webp']"
        :imageHeight="['31%', '55%', '125.5%']"
      >
        <BreadCrumb :breadcrumb="$route.meta.breadcrumb" :dynamicrumbs="{}"></BreadCrumb>
        <div class="banner-text-content">
          <h1 class="destaque-500 title text-uppercase text-center adorno-container-center">
            <i class="adorno-retangular"></i>A Impacta: sobre nós
          </h1>
          <p class="text-center">
            Nossa missão é apoiar pessoas e negócios para o <strong>crescimento profissional </strong>por meio da educação, unindo metodologia exclusiva de ensino a um portfólio atualizado com o mercado!
          </p>
        </div>
      </DisplayBanner>
    </section>
    <section class="impacta-history">
      <div class="container">

        <h2 class="destaque-500 text-uppercase text-center title adorno-container-center">
          <i class="adorno-retangular"></i>Nossa História
        </h2>
        <SimpleCarrousel @setSlideCurrentIndex="setSlideCurrentIndex" :count="historySlides">
          <div v-for="i in historySlides" :key="'row_' + i" class="row" v-show="(i - 1) === slideCurrentIndex">
            <div v-for="j in cardsPerSlides" :key="'ch_' + j" class="col-lg-3 col-md-4">
              <CourseCard 
                v-if="history[(i - 1) * cardsPerSlides + (j - 1)]"
                :urlImage="history[(i - 1) * cardsPerSlides + (j - 1)].img.url" :imageHeight="history[(i - 1) * cardsPerSlides + (j - 1)].img.height"
                :borderRadius="{container: '10px'}"
                classNames="history-card soft-shadow"
                
                :titleTag="{ 
                  text: history[(i - 1) * cardsPerSlides + (j - 1)].date
                }"
              >
                <template v-slot:contentDownImage >
                  <div class="container-content-down">
                    <p class="text-content" v-html="history[(i - 1) * cardsPerSlides + (j - 1)].text" ></p>
                  </div>
                </template>
              </CourseCard>
            </div>
          </div> 
        </SimpleCarrousel>
      </div>
    </section>
    <section class="impacta-awards" id="premios" ref="premios">
      <div class="container">
        <h2 class="destaque-500 text-uppercase text-center title adorno-container-center">
          <i class="adorno-retangular"></i>Prêmios e reconhecimentos
        </h2>
        <p class="text-center">
          Com mais de 3 décadas de atuação, nosso compromisso em garantir ensino de qualidade é <strong>reconhecido no mercado e em prêmios</strong>
        </p>
        <div class="row">
          <div v-for="( a, i) in awards" :key="'awc_' + i" class="col-lg-3 col-md-4 col-sm-6">
            <div class="container-impacta-awards text-center">
              <p class="number-turns">
                <span class="featured-number" v-text="a.turns">
                </span>
                {{a.multiplication}}
              </p>
              <h3 class="destaque-500">
                {{a.title}}
              </h3>
              <p class="awards-emissor">
                {{a.emissor}}
              </p>
              </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mec-stats">
      <div class="container my-card">
        <h2 class="title text-center text-uppercase">
          Faculdade Impacta
        </h2>
        <p class="text-center">
          No ensino superior a nossa atuação também é reconhecida com a alta <strong>procura do mercado por alunos Impacta, </strong>além de <strong>cursos bem avaliados no MEC e NOTA 4 em Conceito Institucional </strong>no INEP
        </p>
        <div class="row">
          <div v-for="( s, i) in mecStats" :key="'sts_' + i" class="col-lg-3 col-md-4">
            <div class="course-scores text-center">
              <h3 class="title destaque-500">
                {{s.course}}
              </h3>
              <p v-html="s.description">
              </p>
              <router-link class="style-link-default" :to="s.link">
                Conheça o curso
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="impacta-students">
      <div class="container text-center">
        <h2 class="text-uppercase title destque-500 adorno-container-center">
          <i class="adorno-retangular"></i>Mais de 1,5 milhão de alunos
        </h2>
        <p>
          Já são milhares os profissionais e empresas que aprenderam aqui e compartilharam suas jornadas e carreiras de sucesso com a gente
        </p>
        <router-link class="style-link-default main-action" :to="{name: 'depoimentos'}">Veja depoimentos dos nossos alunos</router-link>
      </div>
      <div class="impacta-customers">
        <div class="container">
          <h2 class="text-uppercase title-destaque-500 text-center">Nossos Clientes</h2>
          <div class="container-images">
            <div class="row no-gutters">
              <div v-for="( c, i) in customers" :key="'cust_' + i" class="display-image-component-container col">
                <DisplayImage :urlImage="c.url" :imageHeight="c.height" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="infraestrutura" class="impacta-infrastructure" ref="infraestrutura">
      <div class="container text-center">
        <h2 class="text-uppercase title adorno-container-center adorno-container-center">
          <i class="adorno-retangular"></i>Infraestrutura
        </h2>
        <p>
          Nossos ambientes e salas de aulas são preparados para oferecer a melhor experiência de aprendizado e incentivar conexões
        </p>
        <div class="container-card-infra">
          <div class="row">
            <div v-for="( e, i) in infrastructure" :key="'inf_' + i" class="col-lg-4 col-md-6">
                <CourseCard 
                :urlImage="e.img.url" :imageHeight="e.img.height"
                :borderRadius="{containerImage: '10px'}"
                classNames="infra-card"
              >
                <template v-slot:contentDownImage >
                  <div class="container-content-down text-center">
                    <h4 class="title destaque-500">{{e.title}}</h4>
                    <p class="text-content">{{e.text}}</p>
                  </div>
                </template>
              </CourseCard>
            </div>
        </div>
        </div> 
      </div>
    </section>
    <section id="unidades" class="impacta-units" ref="unidades">
      <div class="container text-center">
        <h2 class="title text-uppercase destque-500 adorno-container-center">
          <i class="adorno-retangular"></i>
          Unidades
        </h2>
        <p>
          <strong>Localização privilegiada: </strong>ficamos na avenida mais famosa de São Paulo ou com fácil acesso pelo Terminal da Barra Funda!
        </p>
        <div class="container-card-infra">
          <div class="row d-flex justify-content-center">
            <div v-for="( u, i) in units" :key="'inf_' + i" class="col-lg-4 col-md-6">
              <CourseCard 
                :urlImage="u.img.url" :imageHeight="u.img.height"
                :borderRadius="{containerImage: '10px'}"
                classNames="infra-card"
              >
                <template v-slot:contentDownImage >
                  <div class="container-content-down text-center">
                    <h4 class="title destaque-500">{{u.title}}</h4>
                    <p class="text-content" v-html="u.address"></p>                    
                    <a target="_blank" class="style-default-link" v-bind:href="u.link">
                      Ver mapa
                    </a>
                  </div>
                </template>
              </CourseCard>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="impacta-certification-center">
      <div class="container text-center">
        <h2 class="title destaque-500 text-uppercase adorno-container-center">
          <i class="adorno-retangular"></i>
          Parceiros Autorizados
        </h2>
        <p>
          Para garantir conhecimento atualizado e de qualidade, contamos com  parceiros nas maiores empresas e certificadoras do mercado
        </p>
        <div class="container-images">
          <div class="row no-gutters partner-logo-display">
            <div v-for="n in (deviceSize === 'lg' ? 8 : 4)" :key="'part_' + n" class="display-image-component-container col">
              <DisplayImage :urlImage="partners[n - 1].url" :imageHeight="partners[n - 1].height" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="banner-centro-exames">
      <div class="container">
        <div class="display-image-component-container">
          <DisplayImage :urlImage="[img_centro_exames.url]" :imageHeight="img_centro_exames.height" borderRadius="10px" />
        </div>
        <div class="text-content">
          <h3 class="text-uppercase destaque-500">
            Centro de exames Impacta
          </h3>
          <p>
            Exames para tirar as maiores Certificações em Tecnologia e Gestão do mercado podem ser realizados no nosso <strong>Centro Autorizado Prometric </strong>aqui na Unidade Paulista!
          </p>
          <router-link :to="{ name: 'centro-exames' }">
            <Btn class="text-white" tag="button" heightBtn="40px">
              Conheça aqui
            </Btn>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import DisplayBanner from '../../components/DisplayBanner'
import DisplayImage from '../../components/DisplayImage'
import CategoryBtn from '../../components/CategoryBtn'
import CourseCard from '../../components/CourseCard'
import SimpleCarrousel from '../../components/SimpleCarrousel'
import Btn from '../../components/Btn'
import BreadCrumb from '../../components/BreadCrumb'

const pathImg = '../../statics/img/'
const pathImgWebp = '../../statics/img/webp/'

export default {
  name: 'ImpactaSobre',
  props: ['anchorHash'],
  data(){
    return {
      history:[
        {
          img:{
            url:[pathImgWebp + '1988.webp'],
            height: ['58.9%']
          },
          date: 1988,
          text: 'No mesmo ano em que a internet chega ao Brasil, nasce a <strong>Impacta Certificação e Treinamento </strong>para suprir a falta de profissionais especializados em hardware no mercado brasileiro.'
        },
        {
          img:{
            url:[pathImgWebp + '1990.webp'],
            height: ['58.9%']
          },
          date: 1990,
          text: 'Em 2 anos de atuação já começamos a crescer! <strong>De uma sala, passamos para um andar inteiro </strong>na Avenida Paulista, n° 2001, ampliando nosso portfólio com <strong>cursos de Redes e Programação de Sistemas.</strong>'
        },
        {
          img:{
            url:[pathImgWebp + '1995.webp'],
            height: ['58.9%']
          },
          date: 1995,
          text: 'Com o avanço da internet, mais uma vez, fomos pioneiros no país e começamos a oferecer <strong>treinamentos focados no ambiente web </strong>e nas novidades que o cenário digital trouxe.'
        },
        {
          img:{
            url:[pathImgWebp + '1996.webp'],
            height: ['58.9%']
          },
          date: 1996,
          text: 'Crescendo a cada, mudamos para o nosso tradicional endereço na Avenida Paulista, 1009. Com mais salas de aula, passamos a oferecer também <strong>cursos nas áreas de telecomunicações e cabeamento.</strong>'
        },
        {
          img:{
            url:[pathImgWebp + '2001.webp'],
            height: ['58.9%']
          },
          date: 2001,
          text: 'Já reconhecido no mercado com um dos maiores centros de treinamentos autorizados <strong>Adobe, AutoDesk e LPI, </strong>fomos eleitos como o <strong>Maior polo de Certificação Prometric da América Latina!</strong>'
        },
        {
          img:{
            url:[pathImgWebp + '2003.webp'],
            height: ['58.9%']
          },
          date: 2003,
          text: 'Continuando na missão de capacitar profissionais para o mercado de tecnologia, nascem o <strong>Colégio Impacta </strong>- voltado para o ensino Técnico - e a <strong>Faculdade Impacta </strong>com cursos inovadores de Graduação e Pós!'
        },
        {
          img:{
            url:[pathImgWebp + '2006.webp'],
            height: ['58.9%']
          },
          date: 2006,
          text: '<strong>Ano de Prêmios: </strong>3 vezes eleitos como o <strong>Maior Centro de Certificação em TI na América Latina </strong>pela Prometric, a <strong>Maior empresa de Treinamentos </strong>pelo IDG Brasil (2x seguidas) e Revista Computerworld!'
        },
        {
          img:{
            url:[pathImgWebp + '2010.webp'],
            height: ['58.9%']
          },
          date: 2010,
          text: 'Por meio do <strong>Instituto Tecnológico Impacta - ITI,</strong> nos tornamos a primeira empresa brasileira a receber da ONU o <strong>Certificado de Responsabilidade Social </strong>ao cumprir os <strong>8 Objetivos do Milênio!</strong>'
        },
        {
          img:{
            url:[pathImgWebp + '2013.webp'],
            height: ['58.9%']
          },
          date: 2013,
          text: 'Para comemorar nossos 25 anos de história - além de uma grande celebração - <strong>expandimos nossa estrutura física e portfólio,</strong> que passou a oferecer um catálogo de <strong>Cursos Online </strong>para a carreira!'
        },
        {
          img:{
            url:[pathImgWebp + '2014.webp'],
            height: ['58.9%']
          },
          date: 2014,
          text: '<strong>A Faculdade Impacta ganha casa nova! </strong>Mudamos para um ambiente ampliado e com infraestrutura moderna, próximo ao terminal da Barra Funda, tornando nossos cursos ainda mais completos.'
        },
        {
          img:{
            url:[pathImgWebp + '2019.webp'],
            height: ['58.9%']
          },
          date: 2019,
          text: '<strong>Lançamento do Your Way: </strong>notando as mudanças no mercado de educação e capacitação profissional, lançamos uma <strong>plataforma completa com centenas de Cursos Online </strong>para aprender como quiser!'
        }
      ],
      awards:[
        {
          turns: 5,
          title: 'Prêmio Melhor Fornecedor de RH',
          emissor: 'Grupo Gestão RH',
          multiplication: 'vezes'
        },
        {
          turns: 6,
          title: 'Maior Instituição de Ensino de TI',
          emissor: 'Revista ComputerWorld',
          multiplication: 'vezes'
        },
        {
          turns: 5,
          title: 'Maior Centro de Certificação em TI da América Latina',
          emissor: 'Prometric',
          multiplication: 'vezes'
        },
        {
          turns: 3,
          title: 'Melhor Instituição de Ensino de TI',
          emissor: 'Editora Segmento',
          multiplication: 'vezes'
        },
        {
          turns: 2,
          title: 'Melhor Escola de Treinamentos da América Latina',
          emissor: 'Revista Seguro Total',
          multiplication: 'vezes'
        },
        {
          turns: 5,
          title: 'Vencedor do Prêmio Dr. Imre Simon',
          emissor: 'ASSESPRO',
          multiplication: 'vezes'
        },
        {
          turns: 1,
          title: 'Certificado de Responsabilidade Social - 8 Objetivos do Milênio',
          emissor: 'ONU',
          multiplication: 'vez'
        },
        {
          turns: 1,
          title: 'Prêmio Master Ciência e Tecnologia',
          emissor: 'Instituto de Estudos e Pesquisa de Qualidade',
          multiplication: 'vez'
        }
      ],
      mecStats:[
        {
          course: 'Graduação em Gestão da Tecnologia da Informação',
          description: '<strong>2º melhor Nota do Brasil </strong>na avaliação do ENADE/MEC',
          link: '#'
        },
        {
          course: 'Graduação em Sistemas da Informação',
          description: '<strong>3º melhor </strong>Curso de São Paulo<br><strong>Nota 4 </strong>na avaliação do ENADE/MEC',
          link: '#'
        },
        {
          course: 'Graduação em Análise e Dev. de Sistemas',
          description: '<strong>3º melhor </strong>Curso de São Paulo<br><strong>Nota 3 </strong>na avaliação do ENADE/MEC',
          link: '#'
        },
        {
          course: 'Graduação em Redes de Computadores',
          description: '<strong>4º melhor </strong>Curso de São Paulo<br><strong>Nota 3 </strong>na avaliação do ENADE/MEC',
          link: '#'
        }
      ],
      customers:[
        {
            url: [pathImgWebp + 'customer_adidas.webp'],
            height: ['94%']
        },
        {
            url: [pathImgWebp + 'customer_avon.webp'],
            height: ['94%']
        },
        {
            url: [pathImgWebp + 'customer_sabesp.webp'],
            height: ['94%']
        },
        {
            url: [pathImgWebp + 'customer_caixa.webp'],
            height: ['94%']
        },
        {
            url: [pathImgWebp + 'customer_globo.webp'],
            height: ['94%']
        },
        {
            url: [pathImgWebp + 'customer_vivo.webp'],
            height: ['94%']
        }
      ],
      infrastructure:[
        {
          img:{
            url:[ pathImgWebp + 'infra_computadores_rede.webp'],
            height: ['65.8%']
          },
          title: 'Espaços e Salas de Aulas',
          text: 'Auditório e salas equipadas para o aprender. Na Faculdade, o aluno aproveita ainda Espaço Maker, Laboratórios e a Biblioteca.'
        },
        {
          img:{
            url:[ pathImgWebp + 'infra_multimidia.webp'],
            height: ['65.8%']
          },
          title: 'Equipamentos',
          text: 'As aulas práticas são realizadas em computadores, projetores e lousas eletrônicas. Sempre com suporte à disposição.'
        },
        {
          img:{
            url:[ pathImgWebp + 'infra_bistro.webp'],
            height: ['65.8%']
          },
          title: 'Bistrô Impacta',
          text: 'O ponto de encontro entre alunos e professores é também uma ótima opção para tomar um café e fazer um lanchinho.'
        }
      ],
      units:[
        {
          img:{
            url:[pathImgWebp + 'unidade_av_paulista.webp'],
            height:['65.8%']
          },
          title: 'Unidade Paulista',
          address: 'Av. Paulista, 1009<br>Bela Vista<br>CEP: 01311-100',
          link: 'https://www.google.com.br/maps/place/Av.+Paulista,+1009+-+Bela+Vista,+S%C3%A3o+Paulo+-+SP,+01311-100/@-23.569967,-46.6560602,15z/data=!4m5!3m4!1s0x94ce59c7947976cb:0xcfae32dae64ebfda!8m2!3d-23.5654197!4d-46.6523329?hl=pt-BR'
        },
        {
          img:{
            url:[pathImgWebp + 'unidade_barra_funda.webp'],
            height:['65.8%']
          },
          title: 'Unidade Barra Funda',
          address: 'Av. Rudge, 315<br>Barra Funda<br>CEP: 01153-000',
          link: 'https://www.google.com.br/maps/place/Av.+Rudge,+315+-+Bom+Retiro,+S%C3%A3o+Paulo+-+SP,+11330-000/@-23.5255295,-46.6517839,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce586d6fa31fab:0x31356ea05c4cb1b!8m2!3d-23.5255295!4d-46.6495952'
        }
      ],
      partners:[
        {
          url: [ pathImgWebp + 'partner_logo_01.webp'],
          height: ['100%']
        },
        {
          url: [ pathImgWebp + 'partner_logo_02.webp'],
          height: ['100%']
        },
        {
          url: [ pathImgWebp + 'partner_logo_03.webp'],
          height: ['100%']
        },
        {
          url: [ pathImgWebp + 'partner_logo_04.webp'],
          height: ['100%']
        },
        {
          url: [ pathImgWebp + 'partner_logo_05.webp'],
          height: ['100%']
        },
        {
          url: [ pathImgWebp + 'partner_logo_06.webp'],
          height: ['100%']
        },
        {
          url: [ pathImgWebp + 'partner_logo_07.webp'],
          height: ['100%']
        },
        {
          url: [ pathImgWebp + 'partner_logo_08.webp'],
          height: ['100%']
        }
      ],
      img_centro_exames:{
        url: [ pathImgWebp + 'banner_centro_exames.webp'],
        height: [ '65.9%']
      },
      slideCurrentIndex: 0
    }
  },
  computed: {
    deviceSize(){
      return this.$store.state.app.deviceSize
    },
    cardsPerSlides(){
      return (this.deviceSize === 'lg' && 4) || (this.deviceSize === 'md' && 3) || 1
    },
    historySlides(){
      return Math.ceil(this.history.length / this.cardsPerSlides)
    }
  },
  watch:{
    anchorHash(val) {
      setTimeout(() => this.scrollMeTo(this.scrollMeTo(val)), 200)
    }
  },
  mounted() {
    setTimeout(() => this.scrollMeTo(), 200)
  },
  methods: {
    setSlideCurrentIndex(val) {
      this.slideCurrentIndex = val;
    },
    scrollMeTo(refName) {
      const refNameComputed = refName || window.location.hash.replace('#', '')
      if(refNameComputed) {
        const element = this.$refs[refNameComputed];
        const top = element.offsetTop;
  
        window.scrollTo(0, top);
      }
    }
  },
  components: {
    DisplayBanner,
    CategoryBtn,
    CourseCard,
    DisplayImage,
    Btn,
    SimpleCarrousel,
    BreadCrumb
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'A Impacta: sobre nós',
      meta: {
        title: { name: 'title', content: 'A Impacta: sobre nós' },
        description: { name: 'description', content: 'Nossa missão é apoiar pessoas e negócios para o crescimento profissional por meio da educação, unindo metodologia exclusiva de ensino a um portfólio atualizado com o mercado!' },
        //keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: 'A Impacta: sobre nós' },
        ogDescription: { name: 'og:description', content: 'Nossa missão é apoiar pessoas e negócios para o crescimento profissional por meio da educação, unindo metodologia exclusiva de ensino a um portfólio atualizado com o mercado!' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'A Impacta: sobre nós' },
        twDescription: { name: 'twitter:description', content: 'Nossa missão é apoiar pessoas e negócios para o crescimento profissional por meio da educação, unindo metodologia exclusiva de ensino a um portfólio atualizado com o mercado!' },
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
              "name": "A Impacta: sobre nós",
              "description": "Nossa missão é apoiar pessoas e negócios para o crescimento profissional por meio da educação, unindo metodologia exclusiva de ensino a um portfólio atualizado com o mercado!",
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

.pagina-sobre{
  background: white;
  h2{
    font-size: 24px;
  }
  h2 + p{
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    color: #364E5E;
  }
  h3{
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 5px;
  }
  .display-banner-component-container{
    position: relative;
    &::after{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      background: rgba(255, 255, 255, 0.9);
    }
  }
  .banner-text-content{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    max-width: 700px;

    padding-top: 30px;
    p{
      font-weight: 300;
      font-size: 22px;
      line-height: 34px;
      color: #364E5E;
    }
  }
  .impacta-history{
    background: #F8F9FD;
    padding-top: 80px;
    padding-bottom: 30px;
    h2{
      margin-bottom: 40px;
    }
    p{
      font-weight: 300;
      font-size: 14px;
      line-height: 26px;
    }
    .container-content-down{
      padding: 20px 20px 10px;
    }
    @include d( sxs){
      padding-top: 40px;
    }
  }
  .history-card{
    background: white;
    margin-bottom: 30px;
    min-height: calc(100% - 30px);
    .display-image {
      background-size: cover;
    }
  }
  .impacta-awards{
    padding-top: 80px;
    p{
      max-width: 530px;
      margin: 24px auto 50px;
    }
    @include d( sxs){
      padding-top: 40px;
    }
  }
  .container-impacta-awards{
    margin-bottom: 60px;
    .number-turns{
      font-weight: 300;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .featured-number{
      font-weight: bold;
      font-size: 50px;
      color: $primary;

      position: relative;
      bottom: -3px;
    }
    .awards-emissor{
      font-weight: 300;
      font-size: 14px;
      margin: 0;
    }
  }
  .mec-stats{
    margin-bottom: 30px;
    .my-card{
      padding: 160px 40px 70px;
      border-radius: 10px;
      background: #F5F5F5;
      border: 1px solid #cccccc4d;
    }
    h2.title{
      display: flex;
      justify-content: center;
      position: relative;
      &::before{
        content: '';
        position: absolute;
        width: 72px;
        height: 80px;
        bottom: calc( 100% + 3vw);
        //background: url('../../statics/img/webp/ilustracao_trofeu.webp') no-repeat center;
        background-size: contain;
        @include d(sxs){
          height: 50px;
        }
      }
    }
    h2 + p{
      margin: 10px auto 30px;
      max-width: 870px;
    }
    @include d( sxs){
      .my-card{
        padding-top: 70px;
      }
    }
  }
  .course-scores{
    margin-bottom: 30px;
    p{
      font-size: 14px;
      line-height: 24px;
      font-weight: 300;
      margin-bottom: 5px;
    }
    a{
      font-size: 16px;
    }
  }
  .impacta-students{
    padding-top: 80px;
    position: relative;
    p{
      margin: 20px auto ;
      max-width: 530px;
    }
    .container {
      position: relative;
      z-index: 10;
    }
    .main-action {
      margin-bottom: 5vw;
      display: inline-block;
    }
    &::before{
      content: '';
      background: url('../../statics/img/background_bottom_impacta_students.svg') no-repeat right bottom;
      background-size: cover;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    &::after{
      content: '';
      background: url('../../statics/img/background_top_imapcta_students.svg') no-repeat left top;
      background-size: cover;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }
  }
  .impacta-customers{
    margin-bottom: 80px;
    padding-bottom: 20px;
    position: relative;
    z-index: 10;
    .container-images{
      max-width: 890px;
      margin: 0 auto;
    }
  }
  .impacta-infrastructure{
    //margin-bottom: 40px;
    p{
      margin: 20px auto 40px;
      max-width: 520px;
    }
  }
  .container-card-infra{
    max-width: 960px;
    margin: 0 auto;
  }
  .infra-card{
    margin-bottom: 40px;
    h4{
      font-size: 18px;
      margin: 20px 0 10px;
    }
    p{
      font-weight: 300;
      font-size: 16px;
      line-height: 26px;
      color: #364E5E;
      margin: 0;
    }
  }
  .impacta-units{
    padding-top: 40px;
    margin-bottom: 60px;
    h2 + p{
      margin: 20px auto 40px;
      max-width: 520px;
    }
  }
  .impacta-certification-center{
    padding-top: 40px;
    margin-bottom: 80px;
    p{
      max-width: 520px;
      margin: 20px auto 10px;
    }
  }
  .banner-centro-exames{
    padding: 40px 0;
    border: 1px solid #E3E9ED;
    .container{
      display: flex;
    }
    .display-image-component-container{
      min-width: 260px;
    }
    .text-content{
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      margin-left: 45px;
    }
    h3{
      font-size: 24px;
    }
    p{
      font-weight: 300;
      font-size: 16px;
      line-height: 25px;
      color: #364E5E;
    }
    button{
      max-width: 238px;
      width: 100%;
      font-size: 14px
    }
    @include d( sxs){
      .container{
        flex-wrap: wrap;
      }
      .display-image-component-container{
        margin: 0 auto;
      }
      h3{
        margin-top: 20px;
      }
      .text-content{
        margin-left: 0;
        text-align: center;
      }
      button{
        margin: 0 auto;
      }
    }
    a:hover {
      text-decoration: none;
    }
  }
}

</style>