<template>
  <footer :class="'geral-footer-component '  + classNames">
    <div class="container main-footer">
      <div class="row">
        <div class="col-lg-4 order-lg-3">
          <div class="row">
            <form @submit="signNewsletter" class="col-lg-7 form-newsletter">
              <h6 class="text-uppercase">Receba nossas novidades</h6>
              <div class="form-fields-newsletter-container">
                <MyInput classNames="nogutter" placeHolder="Nome..." />
                <MyInput classNames="nogutter" placeHolder="E-mail..." type="email" /> 
                <div class="btn-component-container">
                  <Btn type="submit" :loading="signNewsletterSending" tag='button' classNames="text-white bg-dark-gray">
                    Enviar
                  </Btn>
                </div>
                <span :class="'sign-result ' + (signNewsletterStatus ? 'success' : 'fail')" v-if="signNewsletterStatus != null">{{signNewsletterStatus ? 'Sucesso na assinatura!' : 'Falha na assinatura'}}</span>
              </div>
            </form>
            <div class="col-lg-4 offset-lg-1 pr-0 d-none d-lg-block">
              <h6 class="text-uppercase">Seus dados 100% seguros</h6>
              <div class="display-image-component-container selo-rapid">
                <DisplayImage :urlImage="['https://via.placeholder.com/300x150.png?text=SELO']" :imageHeight="['33%']" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-2 order-lg-1 pr-0">
          <div class="display-image-component-container logo-container d-none d-lg-block">
            <DisplayImage :urlImage="logo.urlImage" :imageHeight="logo.imageHeight" />
          </div>
          <div class="redes-sociais">
            <h6 class="text-uppercase">Nossas redes sociais</h6>
            <div class="container-icon-redes-sociais d-flex">
              <span><a href="https://www.fb.com/impactaoficial" target="_blank"><i class="fab fa-facebook-f"></i></a></span>
              <span><a href="https://www.instagram.com/impactaoficial_/" target="_blank"><i class="fab fa-instagram"></i></a></span>
              <span><a href="https://www.linkedin.com/school/impactaoficial" target="_blank"><i class="fab fa-linkedin-in"></i></a></span>
              <span><a href="https://twitter.com/impactaoficial_" target="_blank"><i class="fab fa-twitter"></i></a></span>
              <span><a href="https://www.youtube.com/user/GrupoImpacta" target="_blank"><i class="fab fa-youtube"></i></a></span>
            </div>
          </div>
          <address  class="contato-info">
            <div>
              <h6 class="text-uppercase">Unidade Paulista</h6>
              <p>
                Av. Paulista, 1009<br>
                Bela Vista<br>
                01311-100<br>
                Tel:(11) 3254-2200
              </p>
            </div>
            <div >
              <h6 class="text-uppercase">Unidade Barra Funda</h6>
              <p>
                Av. Rudge, 315<br>
                Barra Funda<br>
                01153-000<br>
                Tel:(11) 3254-8300
              </p>
            </div>
          </address>
        </div>
        <div class="col-lg-6 order-lg-2">
          <div class="d-flex justify-content-between menu-nav-footer">
            <div class="navigation-ul">
              <LiFooterOuter :title="infoCol1.title" :linkItens="infoCol1.links" />
            </div>
            <div class="navigation-ul">
              <LiFooter :title="infoCol2.title" :linkItens="infoCol2.links" />
            </div>
            <div class="navigation-ul">
              <LiFooter :title="infoCol3.title" :linkItens="infoCol3.links" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container bottom-bar d-flex justify-content-between align-items-center">
      <p class="copyright">
        © 2021 IMPACTA CNPJ: 59.069.914/0005-05
      </p>
      <p>
        <router-link :to="{name: 'politicas-seguranca-privacidade'}" class="text-dark-gray">
          Pólitica de privacidade
        </router-link>
        <router-link :to="{name: 'termos-uso'}" class="text-dark-gray ml-2">
          Política de Cancelamento, Reembolso e Troca
        </router-link>
      </p>
    </div>
  </footer>
</template>

<script>
  //componentes impacta theme
  import DisplayImage from '../components/DisplayImage'
  import LiFooter from '../components/LiFooter'
  import LiFooterOuter from '../components/LiFooterOuter'
  import Btn from '../components/Btn'
  import MyInput from '../components/MyInput'

  export default {
    name: 'GeralFooter',
    props: {
      classNames:{
        type: String,
        default: ''
      }
    },
    data(){
      return {
        infoCol1:{
          title: 'HUB Impacta',
          links:[
            {
              label: 'Treinamentos e Certificações',
              namedRoute: 'cursos-home'
            },
            {
              label: 'Graduação',
              // namedRoute: 'graduacao-home',
              url: 'https://www.impacta.edu.br/graduacao'
            },
            {
              label: 'Pós e MBA',
              // namedRoute: 'pos-mba-home',
              url: 'https://www.impacta.edu.br/pos-e-mba'
            },{
              label: 'Escola Técnica',
              // namedRoute: 'escola-tecnica-home',
              url: 'https://www.impacta.edu.br/tecnicos'
            },
            {
              label: 'Para empresas',
              // namedRoute: 'corporativo-home'
              url: 'http://conteudo.impacta.com.br/solucoes-corporativas'
            }
          ]
        },
        infoCol2:{
          title: 'A Impacta',
          links:[
            {
              label: 'Sobre a Impacta',
              namedRoute: 'sobre'
            },
            {
              label: 'Prêmio e reconhecimentos',
              path: '/sobre#premios'
            },
            {
              label: 'Infraestrutura',
              path: '/sobre#infraestrutura'
            },{
              label: 'Unidades',
              path: '/sobre#unidades'
            },
            {
              label: 'Depoimentos de alunos',
              namedRoute: 'depoimentos'
            },
            {
              label: 'Centro de exames',
              namedRoute: 'centro-exames'
            },
            /*{
              label: 'Imprensa',
              namedRoute: 'cursos-home'
            },*/
            {
              label: 'Blog',
              namedRoute: 'cursos-home'
            },
            {
              label: 'Eventos',
              namedRoute: 'cursos-home'
            }
          ]
        },
        infoCol3:{
          title: 'Contato',
          links:[
            {
              label: 'Fale conosco',
              namedRoute: 'fale-conosco'
            },
          ]
        },
        logo:{
          urlImage: ['../../statics/img/impacta_logo_footer.svg'],
          imageHeight: ['13.1%']
        }
      }
    },
    computed: {
      signNewsletterSending(){
        return this.$store.state.app.signNewsletterSending
      },
      signNewsletterStatus(){
        return this.$store.state.app.signNewsletterStatus
      }
    },
    methods:{
      signNewsletter(e){
        e.preventDefault()
        const { currentTarget:[ { value: nome }, { value: email } ] } = e
        this.$store.dispatch( 'app/signNewsletter', { nome, email })
        e.currentTarget.reset()
      }
    },
    components:{
      DisplayImage,
      LiFooter,
      LiFooterOuter,
      Btn,
      MyInput
    }
  }
</script>

<style lang="scss">
  @import "../css/main.scss";

  .geral-footer-component{
    color: $dark_gray_text;
    .main-footer{
      padding-top: 40px;
      margin-bottom: 30px;
    }
    h6,h4.title{
      //white-space: nowrap;
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 10px;
    }
    h4.title{
      line-height: 15px;
    }
    p{
      font-weight: 300;
      font-size: 14px;
    }
    .logo-container{
      max-width: 155px;
      width: 33vw;
      max-height: 22px;
      height: 4.1vw;
      margin-bottom: 22px;
    }
    .container-icon-redes-sociais{
      margin-bottom: 35px;
      justify-content: space-between;
      span{
        background: $dark_gray_text;
        height: 32px;
        width: 32px;
        border-radius: 18px;
      }
      i{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: white;
      }
      @include d( sxs){
        justify-content: center;
        > span{
          margin: 0 5px;
        }
      }
      @include d( m){
        max-width: 40%;
      }
    }
    .navigation-ul{
      @include d( l){
        margin-left: 40px;
      }
      ul{
        font-weight: 300;
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 14px;
        a{
          color: $dark_gray_text;
        }
      }

    }
    .form-newsletter{
      margin-bottom: 20px;
      $gutter: 7px;
      .btn-component-container{
        padding: 0 $gutter;
        max-width: #{ $gutter * 2 + 80px};
        width: 100%;
        height: 40px;
      }
      .sign-result{
        &.fail{
          color:#bf0e0e;
        }
      }
      .form-fields-newsletter-container{
        margin: 0 -#{ $gutter};
      }
      h6{
        white-space: nowrap;
      }
      @include d( sxs){
        .btn-component-container, input{
          width: 100%;
          max-width: unset;
        }
      }
      @include d( m){
        .form-fields-newsletter-container{
          display: flex;
          input{
            margin-bottom:0;
            margin-right: 15px;
          }
        }
      }
    }
    .bottom-bar{
      border-top: 1px solid #E3E9ED;
      min-height: 60px;
      p{
        @include d( l){
          margin-bottom: 0;
        }
      }
    }
    @include d( m){
      .contato-info{
        display: flex;
        > div{
          margin-right: 40px;
        }
      }
      .bottom-bar p{
        font-size: 12px;
      }
    }
    @include d( sxs){
      *{
        text-align: center;
      }
      .menu-nav-footer{
        flex-direction: column;
      }
      .bottom-bar{
        display: block !important;
        padding-top: 15px;
        a {
          display: block !important;
          color: inherit;
        }
      }
    }
  }
  .display-image-component-container.selo-rapid{
    width: 95px;
    height: 51px;
    .copyright{
      flex-grow: 1;
    }
  }
</style>