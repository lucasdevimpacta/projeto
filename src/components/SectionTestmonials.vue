<template>
  <section :class="'section-testmonials-component ' + classNames">
      <div class="container"> 
          <div class="row">
              <div :class="textInTop ? 'col-lg-12 title-container mb-3 text-in-top' :'col-lg-3 col-md-6 title-container mb-3'">
                  <h4 class="title text-uppercase destaque-500">O que os alunos dizem sobre a Impacta</span></h4>
                  <router-link v-show="! displayLoadMore" :to="{name: 'depoimentos'}" class="style-link-default">Ver mais depoimentos</router-link>
              </div>
              <div :class="textInTop ? 'col-lg-12 col-md-6 my-4' :'col-lg-9 col-md-6 my-4'">
                <div class="container"> 
                  <div class="row">
                    <div v-for="( t, i) in testmonials" :class="textInTop ? 'col-lg-3 col-md-6 card-testmonials-container my-4' :'col-lg-4 col-md-6 card-testmonials-container my-4'" :key="'t_i_' + i">
                      <TestmonialsCard 
                        :urlImage="t.avatar_url"
                        imageHeight="100%"
                        :text="t.mensagem"
                        :autor="t.autor"
                        :cargo="t.cargo"
                      />
                    </div>

                  </div>
                </div>
              </div>
              <!-- <div v-show="displayLoadMore" class="col-lg-12 btn-component-container">
                    <Btn tag='button' classNames="my-btn-outline destaque-500" heightBtn="40px">
                        Carregar mais depoimentos
                    </Btn>
              </div> -->
          </div>
      </div>
  </section>
</template>

<script>
import TestmonialsCard from './TestmonialsCard'
import Btn from './Btn'

export default {
    name: 'SectionTestmonials',
    props: {
        classNames: {
            type: String,
            default: ''
        },
        amountItems: {
            type: Number,
            default: 3
        },
        textInTop:{
            type: Boolean,
            default: false
        },
        displayLoadMore:{
            type: Boolean,
            default: false
        }
    },
    computed:{
        testmonials(){
            const allTestmonials = this.$store.state.institucionalDepoimentos.data
            const len = allTestmonials.length
            let result = []
            let randomIndex = allTestmonials.map( ( e, i) => i).sort(()=> Math.random() - 0.5)

            if( len){
                for( let i = 0; i < this.amountItems && i < len; i++ ){
                    result.push( allTestmonials[ randomIndex[ i]])
                }
            }
  
            return result
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
            this.$store.dispatch( 'institucionalDepoimentos/fetchDataDepoimento', 1)
        }
    },
    components: {
        TestmonialsCard,
        Btn
    }
}
</script>

<style lang="scss">
    @import '../css/my_mixins.scss';

    .section-testmonials-component{
        position: relative;
        z-index: 10;
        box-shadow: 0px 1px 0px #cccccc4d;
        overflow: hidden;
        .btn-component-container{
            .my-btn-outline{
                max-height: 48px;
                max-width: 200px;
                margin: 0 auto;
                background: none;
                border: solid 1px $primary;
                color: $primary;
                font-size: 14px;
            }
        }
        .title-container{
            text-align: center;
            @include d( lm){
                align-self: center;
                text-align: initial;
            }
            &.text-in-top{
                h4{
                    display: flex;
                    justify-content: center;
                    &::before{
                        left: unset;
                    }
                }
            }
        }
        h4.title{
            font-size: 22px;
            position: relative;
            &::before{
                content: '\f10d';
                position: absolute;
                font-weight: 900;
                font-family: "Font Awesome 5 Pro";
                -webkit-font-smoothing: antialiased;
                display: inline-block;
                font-style: normal;
                font-variant: normal;
                text-rendering: auto;
                line-height: 1;
                color: $primary;
                left: 0;
                top: calc( -1em - 12px);
                @include d( sxs){
                    width: 100%;
                }
            }
        }
        &.bg-circles:after{
            //circle-bottom
            content: '';
            position: absolute;
            bottom: 0;
            left: 36vw;
            width: 21vw;
            height: 10vw;
            background-image: url('../statics/img/circle_bottom.svg');
            background-size: cover;
            z-index: -4;
        }
        &.bg-circles:before{
            //circle-bottom
            content: '';
            position: absolute;
            right: 0;
            width: 12vw;
            height: 24vw;
            top: 5vw;
            background-image: url('../statics/img/circle_right.svg');
            background-size: cover;
            z-index: -4;
        }
    }
</style>