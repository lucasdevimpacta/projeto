<template>
  <main class="treinamento-home">
    <section class="display-banner-component-container treinamento-home">
      <DisplayBanner 
        :urlImage="['../../statics/img/webp/img_treinamentos_banner_topo.webp', '../../statics/img/webp/img_treinamentos_banner_topo.webp', '../../statics/img/webp/img_treinamentos_banner_topo_mobile.webp']"
        :imageHeight="['27.9%', '55%', '125.5%']"
      >
        <h4 class="text-uppercase adorno-container"><i class="adorno-retangular tipo-2"></i>Vá atrás dos seus Objetivos</h4>
        <p>Combos com até <span class="text-uppercase text-blue">33% de Desconto</span> para fazer seu ano<br>começar a rodar</p>
        <div class="btn-component-container">
          <Btn tag='a' classNames="text-uppercase text-white">
            Aperte o play
          </Btn>
        </div>
      </DisplayBanner>
    </section>
    <section class="treinamento-stats treinamento-home">
      <div class="container d-flex justify-content-center direction-mobile-column">
        <div class="insert-icon-left chalkboard">
          <h5 class="text-uppercase">Experiência consolidada</h5>
          <p>Estamos há mais de 30 anos no mercado da educação</p>
        </div>
        <div class="insert-icon-left trophy">
          <h5 class="text-uppercase">Empresa premiada</h5>
          <p>Somos 6x premiados como a maior instituição nacional de ensino de TI</p>
        </div>
      </div>
    </section>
    <section class="treinamentos-em-oferta treinamento-home">
      <div class="container">
        <div class="row">
          <h4 class="col-12 text-uppercase title"><i class="adorno-retangular tipo-1"></i>Cursos em oferta </h4>
        </div>
        <div class="row">
          <div v-for="(o, i) in treinamentosOferta" v-if="i < 4" class="col-lg-3 col-md-6 mb-3" :key="i">
            <router-link class="link-reset" :to="{name: 'single-curso', params: { curso: o.slug} }" >
              <CourseCard 
                :urlImage="['../../statics/img/webp/no_imagem.webp']" :imageHeight="['59.3%']"
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
                <template v-slot:contentDownImage >
                  <div class="content-down-image-container info-treinamento">
                    <p class="carga-horaria d-none d-lg-block">Carga horária: <span class="text-uppercase destaque-500">{{o.carga_horaria}} horas</span></p>
                    <p class="parcelamento">A partir de {{o.parcela_maxima}}x <span class="destaque-tachado text-red">{{calcValQuota(o.valor, o.parcela_maxima)}}</span>
                    <p class="preco">{{calcValQuota( o.valor_promocional, o.parcela_maxima)}}</p>
                    <p class="valor-a-vista">ou R${{o.valor_promocional}} á vista</p>
                  </div>
                </template>
              </CourseCard>
            </router-link>
          </div>
        </div>
        <div class="row justify-content-center">
          <router-link class="text-color-primary style-link-default action-see-more" :to="{ name: 'oferta' }">Ver todos os cursos em oferta</router-link>
        </div>
      </div>
    </section>
    <section class="treinamento-categories treinamento-home">
      <div class="container">
        <div class="row">
          <h4 class="col-12 text-uppercase title"><i class="adorno-retangular tipo-1"></i>Cursos por Categoria</h4>
        </div>
        <div class="row">
          <div v-for="(c, i) in categoriasTreinamentos" class="col-md-4 category-btn-component-container mb-3" :key="i" >
            <CategoryBtn 
              borderRadius="6px"
              :text="c.categoria"
              :pathToDestine="'/cursos/' + c.slug"
              :icon="c.icon"
              classNames="style-default solid soft-shadow"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="motivos-impacta treinamento-home">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-md-6 text-center">
            <h5 class="title text-uppercase destaque-500 adorno-container"><i class="adorno-retangular tipo-3"></i>Por que a impacta?</h5>
            <p class="texto-300 d-none d-md-block">
              A escolha de onde estudar e se especializar é muito importante.
              Encontrar um lugar que te acolha e te guie para o sucesso pode fazer toda diferença.
              Confira alguns motivos que fazem da Impacta a melhor escolha para sua carreira
            </p>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-md-10">
            <!-- <h5 class="title text-uppercase text-center destaque-500 mt-5">Portfolio completo</h5> -->
            <div class="row conhecimento-sem-limites">
              <div class="col-md-4 display-image-container">
                <DisplayImage :urlImage="['../../statics/img/webp/ilustracao_portfolio.webp']" :imageHeight="['80.3%']" />
              </div>
              <div class="col-md-8 text-content">
                <h5 class="title text-uppercase destaque-500 adorno-container"><i class="adorno-retangular tipo-3 d-none d-md-inline"></i>Portfolio completo</h5>
                <p class="texto-300">
                  Do 0 ao MBA. Independente do seu nível de conhecimento, é assim que pode ser sua relação com a gente. Na Impacta nós temos desde os cursos mais básicos e iniciais até MBAs inovadores e de acordo com o que o mercado busca.
                </p>
              </div>
            </div>
            <div class="row certificacao-reconhecida">
              <div class="col-md-4 display-image-container order-lg-1">
                <DisplayImage :urlImage="['../../statics/img/webp/ilustracao_mercado_confia.webp']" :imageHeight="['85.6%']" />
              </div>
              <div class="col-md-8 text-content order-lg-0">
                <h5 class="title text-uppercase destaque-500">O mercado confia</h5>
                <p class="texto-300">
                  A gente não está no mercado há mais de 3 décadas à toa. São anos buscando aliar uma experiência única com o melhor conteúdo para nossos alunos. E sabe como nós sabemos que o mercado confia? Se liga na nossa taxa de empregabilidade: 98%!
                </p>
              </div>
            </div>
            <div class="row metodologia-modelo">
              <div class="col-md-4 display-image-container">
                <DisplayImage :urlImage="['../../statics/img/ilustracao_metodologia_modelo.svg']" :imageHeight="['80.4%']" />
              </div>
              <div class="col-md-8 text-content">
                <h5 class="title text-uppercase destaque-500">Conteúdo exclusivo</h5>
                <p class="texto-300">
                  Sabia que a Impacta tem uma metodologia própria? A gente sabe que de nada adianta ter todo expertise do mundo se nós não conseguimos passar para nossos alunos. Nossos mais de xx cursos, xx graduações e xx MBAs foram criados para que nossos alunos absorvam o máximo da experiência.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row col text-center justify-content-center action-see-more">
          <router-link :to="{name: 'sobre'}" class="style-link-default">Saiba mais sobre a impacta</router-link>
        </div>
      </div>
    </section>
    <SectionTestmonials classNames="treinamento-home bg-circles"/>
    <SectionYourWay />
  </main>
</template>

<script>
import DisplayBanner from '../../components/DisplayBanner'
import Btn from '../../components/Btn'
import CourseCard from '../../components/CourseCard'
import CategoryBtn from '../../components/CategoryBtn'
import DisplayImage from '../../components/DisplayImage'
import SectionTestmonials from '../../components/SectionTestmonials'
import SectionYourWay from '../../components/SectionYourWay'

export default {
  name: 'TreinamentosCertificacoesHome',
  computed: {
    page(){
      return this.$route.query.page || 1
    },
    treinamentosOferta() {
      return this.$store.state.treinamentosCursosSimplificados.data
    },
    categoriasTreinamentos() {
      return this.$store.state.treinamentosCategorias.data
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
      this.$store.dispatch( 'treinamentosCursosSimplificados/fetchDataTreinamentoOferta', { page: this.page })
    },
    calcValQuota( total, numQuota){
      numQuota = numQuota || 1
      let result = total / numQuota
      return `R$ ${result.toFixed(2).replace('.',',')}`
    }
  },
  components:{
    DisplayBanner,
    Btn,
    CourseCard,
    CategoryBtn,
    DisplayImage,
    SectionTestmonials,
    SectionYourWay
  }
}
</script>

<style lang="scss">
  @import '../../css/main.scss';

  main.treinamento-home{
    background: #F8F9FD;
    .tipo-1::before{
      top: -16px;
    }
    .tipo-2::before{
      width: 60px;
      @include d( s){
        display: none;
      }
    }
    .insert-icon-left{
      position: relative;
      padding-left: 54px;
      &::before{
        font-weight: 900;
        font-family: "Font Awesome 5 Pro";
        -webkit-font-smoothing: antialiased;
        display: inline-block;
        font-style: normal;
        font-variant: normal;
        text-rendering: auto;
        line-height: 1;

        font-size: 34px;
        left: 0;
        top: 0;
        bottom: 0;
        align-items: center;
        display: flex;

        position: absolute;

        color: $primary;
      }
      @include d( l){
        &.trophy::before{
          content: "\f091";
        }
        &.chalkboard::before{
          content: "\f51c";
        }
      }
    }
  }

  .display-banner-component-container.treinamento-home{

    .btn-component-container{
      max-width: 340px;
      width: 50%;
      max-height: 48px;
      height: 12vw;
    }
    .text-blue{
      color: $primary;
      font-weight: 700;
    }
    h4{
      color: #272727;
      font-size: 40px;
      font-weight: 500;
      margin-bottom: 12px
    }
    p{
      font-weight: 300;
      font-size: 22px;
      color: #364E5E;
      margin-bottom: 2.2vw;
    }
  }
  .treinamento-stats.treinamento-home{
    background: #F5F5F5;
    border: 1px solid #cccccc4d;

    h5{
      margin-top: 16px;
      font-size: 16px;
      font-weight: 500;
    }
    p{
      font-size: 14px;
      font-weight: 300;
      margin-bottom: 16px;
      max-width: 300px;
    }
    div + div{
      margin-left: 80px;
    }
    @include d( sxs){
      flex-direction: column;
      div + div{
        margin-left: 0;
      }
    }
  }

  .treinamentos-em-oferta.treinamento-home{
    //.course-card-component.course-card-home{
      // .display-image{
      //   span{
      //     //position: absolute;
      //     //content: '';
      //     //top: 0;
      //     //width: 100%;
      //     //height: 100%;
      //     background: -moz-linear-gradient(180deg,#00000021 0%,#0000004c 0.01%, #222222d9 54.69%);
      //     background: -webkit-linear-gradient(180deg,#00000021 0%,#0000004c 0.01%, #222222d9 54.69%);;
      //     background: linear-gradient(180deg,#00000021 0%,#0000004c 0.01%, #222222d9 54.69%);;
      //     filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000021",endColorstr="#222222d9",GradientType=1);
      //   }
      // }
      // .title-over-tag{ 
      //   color: white;
      // }
      // @include d( msxs){
      //   padding: 10px;
      //   $widthImagem: 50px;
      //   .container-image{
      //     width: 100%;
      //     height: 42px;
      //     span{
      //       background: none;
      //     }
      //   }
      //   .container-mobile{
      //     width: $widthImagem;
      //     height: 42px;
      //     border-radius: 6px !important;
      //     overflow: hidden;
      //     .display-image{
      //       background-size: cover;
      //     }
      //   }
      //   .title-tag{
      //     font-weight: bold;
      //     font-size: 10px;
      //     line-height: 13px;
      //     top: 0;
      //     bottom: unset;
      //     right: unset;
      //     left: 0;
      //     border-radius: 3px;
      //     margin-left: calc( #{$widthImagem} + 20px);
      //   }
      //   .title-over-tag{
      //     margin-left: calc( #{$widthImagem} + 20px);
      //     color: #272727;
      //     height: 100%;
      //     top: 0;
      //     align-self: center;
      //     display: flex;
      //     align-items: flex-end;
      //   }
     //}
    //}
    margin-bottom: 60px;
    .action-see-more{
      margin-top: 20px;
    }
    .title{
      margin-top: 70px;
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 500;
      @include d( sxs){
        margin-top: 30px;
      }
    }
    .parcelamento, .preco, .valor-a-vista{
      margin-bottom: 0;
    }
    .info-treinamento{
      @include d( l){
        padding: 17px;
        p.preco{
          font-size: 32px;
          font-weight: 500;
        }
      }
      @include d( msxs){
        p.preco,p.valor-a-vista{
          display: inline;
          &::after{
            content: ' ';
          }
        }
      }
      p{
        font-weight: 300;
      }
      p.preco{
        font-weight: 700;
      }
    }
    
  }

  .treinamento-categories.treinamento-home{
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

  $distanciaVertical: 75px;
  .motivos-impacta.treinamento-home{
    padding: $distanciaVertical 0;
    background: white;
    position: relative;
    h5{
      font-size: 24px;
      @include d( sxs){
      }
    }
    .tipo-3:before{
      width: 40px;
    }
    p{
      font-size: 18px;
      margin-bottom: 0;
    }
    .conhecimento-sem-limites, .certificacao-reconhecida, .metodologia-modelo, .action-see-more {
      margin-top: 80px;
    }
    @include d( sxs){
      padding: #{$distanciaVertical * 0.4} 0;
      text-align: center;
      .display-image-container{
        max-width: 45vw;
        margin-bottom: 16px;
      }
      .conhecimento-sem-limites,.certificacao-reconhecida,.metodologia-modelo{
        justify-content: center;
        margin-top: 30px;
      }
      .action-see-more{
        margin-top: 20px;
      }
      h5{
        font-size: 16px;
      }
      p{
        font-size: 14px;
        line-height: 26px;
      }
    }
    .text-content{
      align-self: center;
    }
  }
  .section-testmonials-component.treinamento-home{
    > .container:before{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      z-index: 100;
      border-top: 8.5vw solid white;
      border-right: 100vw solid transparent;
      top: 0;
    }
    padding: 170px 0 60px;
    @include d( sxs){
      padding-top: 95px;
    }
  }
</style>