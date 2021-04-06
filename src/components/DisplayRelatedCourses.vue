<template>
  <div :class="'row display-related-courses-component ' + classNames">
    <SimpleCarrousel @setSlideCurrentIndex="setSlideCurrentIndex" :count="historySlides">
        <div v-for="i in historySlides" :key="'row_' + i" class="row" v-show="(i - 1) === slideCurrentIndex">
          <div v-for="j in cardsPerSlides" :key="'ch_' + j" class="col-lg-3 col-md-4">
            <router-link class="link-reset" :to="{ name: 'single-curso', params:{ curso: getRelatedCourse(i, j).slug } }" v-if="getRelatedCourse(i,j)">
              <CourseCard 
                :urlImage="[getRelatedCourse(i, j).imagem_capa || '../../statics/img/webp/no_imagem.webp']" :imageHeight="['59.3%']"
                :titleTag="{ 
                  text: getRelatedCourse(i, j).modalidade.toUpperCase()
                }"
                :title="{
                  text: getRelatedCourse(i, j).produto
                }"
                :titleModulo="{
                  text: 'MÓDULO ' + getRelatedCourse(i, j).modulo
                }"
                :borderRadius="{ container: '6px', containerImage: '6px 6px 0 0'}"
                classNames="default-style soft-shadow default-filter"
                :adjusteThumb="true"
              >
                <template v-slot:contentDownImage >
                  <div class="content-down-image-container info-treinamento">
                    <p class="carga-horaria d-none d-lg-block">Carga horária: <span class="text-uppercase destaque-500">{{getRelatedCourse(i, j).carga_horaria}} horas</span></p>
                    <p class="parcelamento">A partir de {{getRelatedCourse(i, j).parcela_maxima.toLocaleString()}}x <span class="destaque-tachado text-red">{{calcValQuota(getRelatedCourse(i, j).valor, getRelatedCourse(i, j).parcela_maxima)}}</span>
                    <p class="preco">{{calcValQuota( getRelatedCourse(i, j).valor_promocional, getRelatedCourse(i, j).parcela_maxima)}}</p>
                    <p class="valor-a-vista">ou R${{getRelatedCourse(i, j).valor_avista.toLocaleString()}} á vista</p>
                  </div>
                </template>
              </CourseCard>
            </router-link>
          </div>
        </div> 
      </SimpleCarrousel>
  </div>
</template>

<script>
  import CourseCard from './CourseCard'
  import SimpleCarrousel from '../components/SimpleCarrousel'

  export default {
    name: 'DisplayRelatedCourses',
    props:{
      classNames:{
        type: String,
        default: ''
      },
      id:{
        typer: Number,
        required: true
      }
    },
    data(){
      return {
        slideCurrentIndex: 0
      }
    },
    computed:{
      relatedCourses(){
        return this.$store.state.treinamentosCursosSimplificados.data
      },
      deviceSize(){
        return this.$store.state.app.deviceSize
      },
      cardsPerSlides(){
        return (this.deviceSize === 'lg' && 4) || (this.deviceSize === 'md' && 3) || 1
      },
      historySlides(){
        return Math.ceil(this.relatedCourses.length / this.cardsPerSlides)
      }
    },
    created(){
      this.fetch()
    },
    methods:{
      fetch(){
        this.$store.dispatch( 'treinamentosCursosSimplificados/fetchDataTreinamentoRelated', this.id)
      },
      calcValQuota( total, numQuota){
        numQuota = numQuota || 1
        let result = total / numQuota
        return `R$ ${result.toFixed(2).replace('.',',')}`
      },
      setSlideCurrentIndex(val) {
        this.slideCurrentIndex = val;
      },
      getRelatedCourse(a,b){
        a = ( a - 1) * this.cardsPerSlides;
        b = ( b - 1);
        return this.relatedCourses[a+b];
      }
    },
    beforeRouteUpdate(t,f,n){
      this.fetch()
      n()
    },
    components:{
      CourseCard,
      SimpleCarrousel
    },
    watch:{
      id({value}){
        this.fetch()
      }
    }
  }
</script>

<style lang="scss">
@import '../css/main.scss';

.display-related-courses-component{
   
}
  .row{
      margin:0px;
      width:100%;
    }

</style>