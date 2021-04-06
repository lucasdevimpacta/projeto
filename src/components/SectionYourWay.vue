<template>
  <section class="section-your-way-component">
      <div class="imagem-principal-container d-none d-md-block">
            <DisplayImage :urlImage="[urlImagemPrincipal]" :imageHeight="[heightImagemPrincipal]" />
      </div>
      <div class="mancha-roxa-1-container d-none d-md-block">
            <DisplayImage :urlImage="[urlManchaRoxa1]" :imageHeight="[heightManchaRoxa1]" />
      </div>
      <div class="mancha-verde-container d-none d-md-block">
            <DisplayImage :urlImage="[urlManchaVerde]" :imageHeight="[heightManchaVerde]" />
      </div>
      <div class="mancha-roxa-2-container d-none d-md-block">
            <DisplayImage :urlImage="[urlManchaRoxa2]" :imageHeight="[heightManchaRoxa2]" />
      </div>
      <div class="text-content mr-md-4 mr-lg-5">
            <h5 class="title text-uppercase">
                Explore Your way
            </h5>
            <p>Planos de Assinatura Mensal por <span class="text-uppercase destaque-500 text-purple"> menos de R$1,00 por curso!</span></p>
            <p>Escolha como e o que estudar em mais de 150 dos <span class="text-uppercase destaque-500 text-purple">melhores cursos online do mercado</span></p>
            <div class="btn-component-container">
                <router-link class="h-none" :to="{name: 'your-way'}">
                    <span class="btn-component text-uppercase text-white">Conheça o Your Way</span>
                </router-link>
            </div>
      </div>
  </section>
</template>

<script>
import DisplayImage from './DisplayImage'
import Btn from './Btn'

const pathToStaticFileWebP = '../statics/img/webp/'
const pathToStaticFile = '../statics/img/'

export default {
    name: 'SectionYourWay',
    data(){
        return{
            urlImagemPrincipal: pathToStaticFileWebP + 'your_way_explore.webp',
            heightImagemPrincipal: '97.8%',
            urlManchaVerde: pathToStaticFile + 'your_way_mancha_verde.svg',
            heightManchaVerde: '33.3%',
            urlManchaRoxa1: pathToStaticFile + 'your_way_mancha_roxa_1.svg',
            heightManchaRoxa1: '29%',
            urlManchaRoxa2: pathToStaticFile + 'your_way_mancha_roxa_2.svg',
            heightManchaRoxa2: '188.3%',
        }
    },
    components:{
        DisplayImage,
        Btn
    }
}
</script>

<style lang="scss">
    @import '../css/my_mixins.scss';

    .section-your-way-component{
        position: relative;
        height: 320px;
        overflow: hidden;

        .btn-component-container{
            max-width: 340px;
            max-height: 48px;
            height: 12vw;
            width: 90%;
            margin-top: 15px;
        }
        @include d( sxs){
            background: -moz-linear-gradient(51.78deg,#2E126F 18.28%,#009583 89.15%, #1A4B78 125.55%);
            background: -webkit-linear-gradient(51.78deg,#2E126F 18.28%,#009583 89.15%, #1A4B78 125.55%);;
            background: linear-gradient(51.78deg,#2E126F 18.28%,#009583 89.15%, #1A4B78 125.55%);;
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2E126F",endColorstr=" #1A4B78",GradientType=1);
            & *{
                color: white !important;
            }
            .btn-component-container{
                margin-top: 30px;
                align-self: center;
            }
        }
        .imagem-principal-container{
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            height: 320px;
            width: 327px;
        }
        .mancha-roxa-1-container{
            position: absolute;     
            bottom: -7%;
            left: calc( 200px + 12%);
            height: 38px;
            width: 131px; 
            @include d( l){
                bottom: 0;
            }        
        }
        .mancha-verde-container{
            position: absolute; 
            bottom: -12%;
            right: -10%;
            height: 79px;
            width: 237px;  
            @include d( l){
                bottom: 0;
                right: 0;
            }               
        }
        .mancha-roxa-2-container{
            position: absolute;  
            right: -5%;
            top: -8%;
            height: 145px;
            width: 77px; 
            @include d( l){
                right: 0;
                top: 10%;
            }            
        }
        .text-content{
            margin-left: calc( 300px + 5vw);
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: center;
            color: #364E5E;
            p{
                margin-bottom: 0;
                font-size: 18px;
                font-weight: 300;
            }
            @include d( sxs){
                margin: 0 auto;
                text-align: center;
                max-width: 510px;
                padding-right: 15px;
                padding-left: 15px;
            }
        }
        .title{
            font-weight: 700;
            color: #019481;
            font-size: 24px;
        }
        .text-purple{
            color: #2E126F;
        }
    }
</style>