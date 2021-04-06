<template>
  <main v-if="!!Object.values(treinamento).length" class="treinamento-single">
    <section v-bind:class="classGradient(treinamento.modalidade)">
      <div class="container">
        <div class="text-content">
          <div class="navigation">
            <router-link :to="{ name: 'cursos-home' }">
              <i class="fas fa-chevron-left"></i><span class="style-link-default"> Voltar</span>
            </router-link>
          </div>
          <p class="about-modalities">
            <span :class="'tag-modality text-uppercase destaque-500 ' + treinamento.modalidade">{{treinamento.modalidade}}</span>
            <span class="other-modality ml-3" v-if="!!treinamento.modalidadealternativas.length">
              <i class="fas fa-info-circle"></i> 
              <span class="d-none d-md-inline" v-if="treinamento.modalidadealternativas.length == 1"> Curso disponível na modalidade 
                <router-link :to="{name: 'single-curso', params: { curso: treinamento.modalidadealternativas[0].slug } }" class="text-uppercase style-link-default destaque-500">{{treinamento.modalidadealternativas[0].modalidade}}
                </router-link>
              </span>
              <span class="d-none d-md-inline" v-if="treinamento.modalidadealternativas.length > 1"> Curso disponível nas modalidades 
                <router-link :to="{name: 'single-curso', params: { curso: treinamento.modalidadealternativas[0].slug } }" class="text-uppercase style-link-default destaque-500">{{treinamento.modalidadealternativas[0].modalidade}}
                </router-link>
                e
                <router-link :to="{name: 'single-curso', params: { curso: treinamento.modalidadealternativas[1].slug } }" class="text-uppercase style-link-default destaque-500">{{treinamento.modalidadealternativas[1].modalidade}}
                </router-link>
              </span>
            </span>
          </p>
          <h1 class="title destaque-500">
            <span :style="scaleTextByLength(treinamento.produto, 36, 0.8)">{{treinamento.produto}} <span class="modulo-info" v-if="treinamento.modulo"><br> Módulo {{treinamento.modulo}}</span></span>
          </h1>
          <p class="short-description">
            {{treinamento.detalhes}}
          </p>
          <div class="about-course-states">
            <div v-if="!!Object.values(treinamento.instrutor).length" class="info-instrutor"><i class="fas fa-graduation-cap"></i> Ministrado por <span>{{treinamento.instrutor.nome_completo}}</span></div>
            <div class="carga-horaria"><i class="far fa-clock"></i> Carga horária: <span class="destaque-500 text-uppercase">{{treinamento.carga_horaria}} horas</span></div>
            <div class="total-historico-alunos" v-if="treinamento.total_historico_alunos > 100"><i class="fas fa-users"></i> +{{treinamento.total_historico_alunos}} alunos inscritos </div>
            <button class="style-link-default btn-chat text-white my-3 d-lg-none" @click="playVideo = ! playVideo">
              <i class="fas fa-play-circle mr-2"></i>Ver apresentação deste curso
            </button>
          </div>
        </div>
        <div class="course-card-component-container float-card">
          <CourseCard 
            :urlImage="[treinamento.imagem_capa]" :imageHeight="['59.3%']"
            classNames="top-card-single soft-lg-shadow"
            :borderRadius="{ container: '10px', containerImage: '6px 6px 0 0'}"
            :title="{
              text: 'Ver apresentação desse curso'
            }"
            :displayVideo="{
              url: treinamento.url_video_apresentacao

            }"
            :playVideo="playVideo"
            :adjusteThumb="true"
          >
            <template v-slot:contentDownImage >
              <div class="content-down-image-container info-treinamento">
                <p class="parcelamento">A partir de {{treinamento.parcela_maxima.toLocaleString()}}x <span class="destaque-tachado text-red">{{calcValQuota(treinamento.valor, treinamento.parcela_maxima)}}</span>
                <p class="preco">{{calcValQuota( treinamento.valor_promocional, treinamento.parcela_maxima)}}</p>
                <p class="valor-a-vista">ou R${{treinamento.valor_avista.toLocaleString()}} á vista</p>
              </div>
              <div class="call-to-action">
                <Btn tag="button" classNames="text-uppercase text-white btn-gradient" heightBtn="48px" v-scroll-to="'#AgendaAnchor'" v-if="treinamento.modalidade !=  'online'">
                  Inscreva-se
                </Btn>
                <Btn tag="button" classNames="text-uppercase text-white btn-gradient" heightBtn="48px" v-scroll-to="'#YourWayAnchor'" v-else>
                  Inscreva-se
                </Btn>
                <button class="style-link-default btn-chat">
                  Falar com consultor
                </button>
              </div>
            </template>
          </CourseCard>
        </div>
      </div>
    </section>
    <BreadCrumb :breadcrumb="$route.meta.breadcrumb" :lastcrumb="curso" :dynamicrumbs="{
      categoria:{ name: treinamento.categoria, link: treinamento.categoriaslug}
    }"></BreadCrumb>
    <section class="treinamento-single course-content">
      <div class="container">
        <CourseContent :content="treinamento.sobre_curso_conteudo" classColumnTexts="col-lg-7" />
      </div>
    </section>
    <section v-if="treinamento.lista_recursos.length" class="lista-recursos">
      <div class="container">
        <h3>Este curso inclui</h3>
        <ul>
          <li v-for="( e, i) in treinamento.lista_recursos" :key="'list_re' + i"><i :class="e.icon.class"></i><span v-html="e.texto"></span></li>
        </ul>
      </div>
    </section>
    <section class="treinamento-single conteudo-programatico ">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-8 ">
            <div class="d-flex justify-content-between title">
              <h4 class="destaque-500">Conteúdo programático</h4>
              <button @click="setExpandAll" class="style-link-default text-color-primary"><span v-if="! expandAll">Expandir</span><span v-else>Ocultar</span> tudo</button>
            </div>
            <div class="custom-ul-collapsive-component-container">
              <CustomUlCollapsive :content="treinamento.conteudo_programatico" :showIcon="true" :expandAll="expandAll" classNames="initial-ul"/> 
            </div>
            <div class="d-flex justify-content-end">
              <button @click="() => showFormDownloadCourseContent = true" class="style-link-default text-color-primary">Download do conteúdo do curso</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="treinamento-single outros-dados">
      <div class="container">
        <div class="row item" v-if="treinamento.pre_requisitos.length > 0">
          <div class="col-lg-7 col-md-8">
            <h4 class="destaque-500">Pré-requisitos</h4>
            <div class="requisitos" v-html="treinamento.pre_requisitos[0].conteudo">
            </div>
          </div> 
        </div>
        <div v-if="!!Object.values(treinamento.instrutor).length" class="row item about-instructor">
          <div class="col-lg-7 col-md-8">
            <h4 class="destaque-500">Sobre o instrutor</h4>
            <div class="display-image-component-container">
              <DisplayImage :urlImage="[treinamento.instrutor.image_path]" :imageHeight="['100%']" borderRadius="15px" />
            </div>
            <div class="display-html-component-conteiner" v-html="treinamento.instrutor.apresentacao"></div>
          </div>
        </div> 
        <div class="row item about-certification">
          <div class="col-lg-7 col-md-8">
            <h4 class="destaque-500">Certificação Impacta</h4>
            <div class="display-image-component-container">
              <DisplayImage :urlImage="['/statics/img/webp/Certificate.webp']" :imageHeight="['100%']" />
            </div>
            <div class="display-html-component-conteiner certificacao-paragraph">
              Um dos títulos mais respeitados do país, atesta a qualidade e os conhecimentos de profissionais especializados nas mais variadas áreas de TI, Gestão e Design. Ao concluir o curso, você tem 90 dias a contar da data de término do curso para agendar seu exame.<br>
              <router-link :to="{ name: 'certificacao-impacta' }" class="style-link-default text-color-primary mt-2">Saiba mais sobre a certificação Impacta</router-link>
            </div>
          </div>
        </div> 
      </div>
    </section>
    <SectionYourWayForm classNames="bg-gradient form-your-way" v-if="treinamento.modalidade == 'online'" title="Assine e tenha acesso a esse e mais centenas de cursos online:" id="YourWayAnchor">
      <template v-slot:main>
        <fragment>
          <div class="my-card">
            <h4 class="title destaque-500">
              <span class="text-purple">Plano </span>
              <span class="text-cyan">Anual</span>
            </h4>
            <p>
              Apenas R$ 89,90/mês
            </p>
            <Btn heightBtn="48px" classNames="text-uppercase text-white btn-gradient" :loading="yourWayAnual" @click="getPlanoAnual">Assine já</Btn>
          </div>
          <div class="my-card">
            <h4 class="title destaque-500">
              <span class="text-purple">Plano </span>
              <span class="text-cyan">Semestral</span>
            </h4>
            <p>
              Apenas R$ 129/mês
            </p>
            <Btn heightBtn="48px" classNames="text-uppercase text-white btn-gradient" :loading="yourWaySemestral" @click="getPlanoSmestral">Assine já</Btn>
          </div>
        </fragment>
      </template>
      <template v-slot:after>
        <div class="container-slot">
          <p class="destaque-500 title">Ou comprar este curso avulso</p>
          <p class="parcelamento">em até {{treinamento.parcela_maxima}}x <span class="destaque-tachado">{{calcValQuota(treinamento.valor, treinamento.parcela_maxima)}}</span>
          <p class="preco">{{calcValQuota( treinamento.valor_promocional, treinamento.parcela_maxima)}}</p>
          <p class="valor-a-vista">ou R${{treinamento.valor_avista}} á vista</p>
          <Btn tag="button" classNames="text-uppercase text-white" heightBtn="48px" @click="BuyOnline" :loading="buyingOnlineAvulso">
            Comprar agora
          </Btn>
        </div>
      </template>
    </SectionYourWayForm>
    <section class="treinamento-single next-class bg-f5" v-if="treinamento.modalidade != 'online'" id="AgendaAnchor">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <h3 class="text-uppercase destaque-500 text-center">
              Próximas turmas
            </h3>
            <div class="display-next-class-component-container">
              <DisplayNextClass :toggleFormNewDates="() => showFormNewDateToCourses = true" :content="agendaPreparedData"/>
            </div>
            <div class="btn-component-container">
              <Btn tag='button' classNames="text-uppercase my-btn-inline destaque-500" heightBtn="40px">
                Quero falar com um consultor
              </Btn>
            </div>
            <div class="btn-component-container" v-if="treinamento.hasonlineaovivo">
              <Btn tag='button' classNames="text-uppercase my-btn-outline destaque-500" heightBtn="40px">
              <router-link target="_blank" :to="treinamento.onlineaovivoslug">Veja datas no formato online ao vivo
                </router-link>
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
    <SectionTestmonials classNames="bg-circles"/>
    <!-- <SectionRelatedQualification :course_id="id" />-->
    <section class="treinamento-single course-related">
      <div class="container">
        <div class="row">
          <h4 class="col-12 text-uppercase title adorno-container"><i class="adorno-retangular tipo-1"></i>Cursos Relacionados </h4>
        </div>
        <DisplayRelatedCourses :id="treinamento.id" />
      </div>
    </section>
    <Modal @handleClose="() => showFormNewDateToCourses = false" :show="showFormNewDateToCourses" classNames="over-layer default modal-model-one">
      <template v-slot:main >
        <form @submit.prevent="(e) => sendData(e, 'app/signNewsAboutCoursesDate', 'objFormNewDatesToCourse')">
          <h3 class="title">Avise-me quando tiver data</h3>
          <MyInput placeHolder="Nome completo" :validation="fullNameValidation" v-model="objFormNewDatesToCourse.nome" />
          <MyInput placeHolder="Email" type="email" v-model="objFormNewDatesToCourse.email" />
          <MyInput placeHolder="Telefone" :mask="phoneMask" v-model="objFormNewDatesToCourse.telefone" />
          <MyCheckbox
            v-model="objFormNewDatesToCourse.diurno"
            label="Diurno"
            widthInput="100%"
            :isRequired="false"
          />
          <MyCheckbox
            v-model="objFormNewDatesToCourse.noturno"
            label="Noturno"
            widthInput="100%"
            :isRequired="false"
          />
          <MyCheckbox
            v-model="objFormNewDatesToCourse.sabado"
            label="Sábado"
            widthInput="100%"
            :isRequired="false"
          />
          <MyCheckbox
            v-model="objFormNewDatesToCourse.domingo"
            label="Domingo"
            widthInput="100%"
            :isRequired="false"
          />
          <MyCheckbox
            v-model="objFormNewDatesToCourse.manha"
            label="Manhã"
            widthInput="100%"
            :isRequired="false"
          />
          <MyCheckbox
            v-model="objFormNewDatesToCourse.tarde"
            label="Tarde"
            widthInput="100%"
            :isRequired="false"
          />
          <vue-recaptcha
            ref="recaptcha"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
            sitekey="6LdQ_RgUAAAAAML3bI1tTUM0VsF9RnbizQvpDZUL"
            :loadRecaptchaScript="true"
          >
          </vue-recaptcha>
          <p v-if="recaptchaMessage" class="text-red">Captcha necessário</p>
          <div class="btn-component-container">
            <Btn tag="button" type="submit" classNames="text-uppercase text-white" heightBtn="40px" :loading="signNewsAboutCoursesDateSending">Quero ser avisado</Btn>
          </div>
          <p class="required-message">
            *Todos os campos são obrigatórios
          </p>
        </form>
      </template>
    </Modal>
    <Modal @handleClose="() => showFormDownloadCourseContent = false" :show="showFormDownloadCourseContent" classNames="over-layer default modal-model-one">
      <template v-slot:main >
        <form  @submit.prevent="(e) => sendData(e, 'app/signDownloadCourseContent', 'objFormDownloadCourseContent')">
          <h3 class="title">Download do conteúdo do curso</h3>
          <MyInput placeHolder="Nome completo*" :validation="fullNameValidation" v-model="objFormDownloadCourseContent.nome" />
          <MyInput placeHolder="Email*" type="email" v-model="objFormDownloadCourseContent.email" />
          <MyInput placeHolder="Telefone*" :mask="phoneMask" v-model="objFormDownloadCourseContent.telefone" />
          <MyCheckbox
            v-model="objFormDownloadCourseContent.imediatamente"
            label="Sim, imediatamente"
            widthInput="100%"
            :isRequired="false"
          />
          <MyCheckbox
            v-model="objFormDownloadCourseContent.proximo_mes"
            label="No próximo mês"
            widthInput="100%"
            :isRequired="false"
          />
          <MyCheckbox
            v-model="objFormDownloadCourseContent.nesse_semestre"
            label="Em 6 meses"
            widthInput="100%"
            :isRequired="false"
          />
          <MyCheckbox
            v-model="objFormDownloadCourseContent.nesse_ano"
            label="Este ano"
            widthInput="100%"
            :isRequired="false"
          />
          <MyCheckbox
            v-model="objFormDownloadCourseContent.indefinido"
            label="Não tenho interesse no momento"
            widthInput="100%"
            :isRequired="false"
          />
          <vue-recaptcha
            ref="recaptcha"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
            sitekey="6LdQ_RgUAAAAAML3bI1tTUM0VsF9RnbizQvpDZUL"
            :loadRecaptchaScript="true"
          >
          </vue-recaptcha>
          <p v-if="recaptchaMessage" class="text-red">Captcha necessário</p>
          <div class="btn-component-container">
            <Btn tag="button" type="submit" classNames="text-uppercase text-white" heightBtn="40px" :loading="signDownloadCourseContentSending">Quero receber</Btn>
          </div>
        </form>
      </template>
    </Modal>
  </main>
  <main v-else class="treinamento-single"></main>
</template>

<script>
import CourseCard from '../../components/CourseCard'
import CustomUlCollapsive from '../../components/CustomUlCollapsive'
import DisplayNextClass from '../../components/DisplayNextClass'
import Btn from '../../components/Btn'
import SectionTestmonials from '../../components/SectionTestmonials'
import SectionRelatedQualification from '../../components/SectionRelatedQualification'
import DisplayRelatedCourses from '../../components/DisplayRelatedCourses'
import DisplayImage from '../../components/DisplayImage'
import SectionYourWayForm from '../../components/SectionYourWayForm.vue'
import CourseContent from '../../components/CourseContent'

import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import Modal from '../../components/ModalGeral'
import MyInput from '../../components/MyInput'
import MyCheckbox from '../../components/MyCheckbox'
import VueRecaptcha from 'vue-recaptcha'
import BreadCrumb from '../../components/BreadCrumb';


import { fullNameValidation, phoneMask, simpleValidateForm } from '../../utils/helper'

Vue.use(VueScrollTo)

export default {
  name: 'SingleCurso',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }){

     return store.dispatch( 'treinamentosCurso/fetchDataTreinamentoSlugWithAgendaServer', currentRoute.params.curso);
  },
  data(){
    return{
      expandAll: false,
      playVideo: false,
      yourWayAnual: false,
      yourWaySemestral: false,
      buyingOnlineAvulso: false,

      showFormNewDateToCourses: false,
      objFormNewDatesToCourse: {
        nome: '',
        email: '',
        telefone: '',
        diurno: false,
        noturno: false,
        sabado: false,
        domingo: false,
        manha: false,
        tarde: false
      },

      showFormDownloadCourseContent: false,
      objFormDownloadCourseContent: {
        nome: '',
        email: '',
        telefone: '',
        imediatamente: false,
        proximo_mes: false,
        nesse_semestre: false,
        nesse_ano: false,
        indefinido: false
      },

      recaptchaMessage: false
    }
  },
  props:['curso','noSectionBlog'],
  computed: {
    treinamento(){
      return this.$store.state.treinamentosCurso.data
    },
    user() {
      return this.$store.state.app.user
    },
    loginStatus() {
      return this.$store.state.app.loginStatus
    },
    id(){
      let rawId = this.curso.match(/__(\d+)/)
      if( rawId){
        return +rawId[1]
      }
      return 0
    },
    agendaPreparedData(){
      let t = this.treinamento
      let a = t.agenda.data
      return a.map( e => {
        return {
          ...e,
          numero_maximo_parcelas: t.numero_maximo_parcelas,
          preco_promocional_a_vista: t.preco_promocional_a_vista,
          preco_promocional: t.preco_promocional
        }
      })
    },
    signNewsAboutCoursesDateStatus(){
      return this.$store.state.app.signNewsAboutCoursesDateStatus
    },
    signNewsAboutCoursesDateSending(){
      return this.$store.state.app.signNewsAboutCoursesDateSending
    },
    signDownloadCourseContentStatus(){
      return this.$store.state.app.signDownloadCourseContentStatus
    },
    signDownloadCourseContentSending(){
      return this.$store.state.app.signDownloadCourseContentSending
    }
  },
  created(){
    this.fetch()
  },
  watch:{
    id(){
      this.fetch()
    },
    curso(){
      this.fetch()
    }
  },
  methods:{
    async BuyOnline(el){
      this.buyingOnlineAvulso = true;
      await this.$store.dispatch( 'carrinho/fetchAddProdutoOnline', {
          carrinho_id: this.$store.state.carrinho.carrinho.id,
          idproduto: this.treinamento.id,
          preco: this.treinamento.valor_promocional
      });

      if ( this.loginStatus ) {
        window.location.href= "inscricao";
      } else {
        window.location.href= "login";
      }
    },
    fetch(){
      //this.$store.dispatch( 'treinamentosCurso/fetchDataTreinamentoWithAgenda', this.id)
      this.$store.dispatch( 'treinamentosCurso/fetchDataTreinamentoSlugWithAgenda', this.curso)
    },
    setExpandAll(){
      this.expandAll =! this.expandAll
    },
    calcValQuota( total, numQuota){
      numQuota = numQuota || 1
      let result = total / numQuota
      return `R$ ${result.toFixed(2).replace('.',',')}`
    },
    scaleTextByLength( text, lengthToTrigger, newScaleFactor){
      if(text.length > lengthToTrigger) return {fontSize: `${newScaleFactor}em`}
    },
    classGradient(string){
      return   'treinamento-single banner-gradient ' + string.replace(/\s/g, '') + '-gradient'
    },
    async getPlanoAnual(){
      this.yourWayAnual = true;
      await this.$store.dispatch( 'app/fetchYourWayAnual')
      if ( this.loginStatus ) {
        window.location.href= "inscricao";
      } else {
        window.location.href= "login";
      }
    },
    async getPlanoSmestral(){
      this.yourWaySemestral = true;
      await this.$store.dispatch('app/fetchYourWaySemiAnual')
      if ( this.loginStatus ) {
        window.location.href= "inscricao";
      } else {
        window.location.href= "login";
      }
    },
    onCaptchaVerified(recaptchaToken) {
      this.recaptchaToken = recaptchaToken
      this.recaptchaMessage = false
    },
    onCaptchaExpired() {
      this.recaptchaToken = ''
    },
    sendData(event, actionName, objReferActionName) {
      const qtdFieldFilled = Object.values(this[objReferActionName]).filter(e => e).length
      if(this.simpleValidateForm(event) && qtdFieldFilled > 3 && this.recaptchaToken) {
        this.$store.dispatch( actionName, { ...this[objReferActionName], produto_id: this.treinamento.id, url: this.$route.query.page, recaptchaToken: this.recaptchaToken })
      } else if(!this.recaptchaToken) {
        this.recaptchaMessage = true
      }
      this.onCaptchaExpired()
    },
    fullNameValidation,
    phoneMask,
    simpleValidateForm
  },
  beforeRouteUpdate(t,f,n){
    this.fetch()
    n()
  },
  components:{
    CourseCard,
    CustomUlCollapsive,
    DisplayNextClass,
    Btn,
    SectionTestmonials,
    SectionRelatedQualification,
    DisplayRelatedCourses,
    CourseContent,
    DisplayImage,
    SectionYourWayForm,
    Modal,
    MyInput,
    MyCheckbox,
    BreadCrumb,
    VueRecaptcha
  },
  meta () {
    //if ( this.treinamento !== undefined && Object.keys(this.treinamento).length > 0 ) {
      
      return {
        // this accesses the "title" property in your Vue "data";
        // whenever "title" prop changes, your meta will automatically update
        title: this.treinamento.produto.trim(),
        meta: {
          title: { name: 'title', content: this.treinamento.produto.trim() },
          description: { name: 'description', content: this.treinamento.detalhes.trim() },
          keywords: { name: 'keywords', content: (Array.isArray(this.treinamento.tags))? this.treinamento.categoria.trim() + ', ' + this.treinamento.tags.join(', '): this.treinamento.categoria.trim() },//+ ', ' + this.treinamento.tags.join()

          ogTitle: { name: 'og:title', content: this.treinamento.produto.trim() },
          ogDescription: { name: 'og:description', content: this.treinamento.detalhes.trim() },
          ogUrl: { name: 'og:url', content: this.$route.fullPath },

          twTitle: { name: 'twitter:title', content: this.treinamento.produto.trim() },
          twDescription: { name: 'twitter:description', content: this.treinamento.detalhes.trim() },
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
              "@type": "Product",
              "productID":"${ this.treinamento.id }",
              "name":"${ this.treinamento.produto.trim() }",
              "description": "${ this.treinamento.detalhes.trim() }",
              "category": "${ this.treinamento.categoria.trim() }",
              "sku": "0446310786",
              "mpn": "925872",
              "brand": {
                "@type": "Brand",
                "name": "Impacta Tecnologia"
              },
              "offers": {
                "@type": "Offer",
                "url": "${ this.$route.fullPath }",
                "priceCurrency": "BRL",
                "price": "${ this.treinamento.valor }",
                "availability": "https://schema.org/InStock"
              }  
            }`
          }
        }
      }
    //}
  },
}
</script>

<style lang="scss">
  @import '../../css/main.scss';

  .treinamento-single{
    background:#F8F9FD;
    h1{
      font-size: 38px;
      line-height: 44px;
    }
    h4, h3{
      font-size: 22px;
      line-height: 25px;
    }
    p{
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
    }
    .banner-gradient{
      font-size: 14px;
      display: flex;
      align-items: center;
      min-height: 290px;
      &.presencial-gradient{
        background: #0052d4;
        background: -moz-linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
        background: -webkit-linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
        background: linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0052d4",endColorstr="#6fb1fc",GradientType=1);
      }
      &.aovivo-gradient{
        background: #0052d4;
        background: -moz-linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
        background: -webkit-linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
        background: linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0052d4",endColorstr="#6fb1fc",GradientType=1);
      }
      &.online-gradient{
        background: #2e126f;
        background: -moz-linear-gradient(106deg, #2e126f 18%, #1a4b78 91%, #009583 112%);
        background: -webkit-linear-gradient(106deg, #2e126f 18%, #1a4b78 91%, #009583 112%);
        background: linear-gradient(106deg, #2e126f 18%, #1a4b78 91%, #009583 112%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2e126f",endColorstr="#009583",GradientType=1);
      }
      padding: 35px 0;
      color: white;
      margin-bottom: 23px;
      a {
        color: white;
      }
      .container{
        position: relative;
      }
      .navigation{
        margin-bottom: 23px;
      }
      .tag-modality{
        color: $primary;
        background: white;
        font-size: 14px;
        line-height: 14px;
        padding: 4px 8px;
        border-radius: 6px;
        display: inline-block;
        &.online{
          color: #2e126f;
        }
      }
      .short-description{
        font-size: 20px;
        line-height: 28px;
        max-width: 450px;
        margin-left: auto;
        margin-right: auto;
      }
      .about-course-states{
        font-weight: 300;
      }
      @include d( l){
        margin-bottom: 35px;
        h1 .modulo-info {
          font-size: 0.8em;
        }
        .short-description{
          margin-left: 0;
          max-width: 710px;
        }
        .about-course-states{
          > div{
            display: inline-block;
          }
          div + div{
            &::before{
              content: '|';
              margin: 0 13px;
            }
          }
        }
        .text-content {
          max-width: calc(100% - 280px);
        }
      }
      @include d( msxs){
        padding: 15px 0;
        h1{
          font-size: 24px;
          line-height: 28px;
        }
        > *{
          text-align: center;
        }
        .navigation{
          text-align: left;
        }
        .short-description{
          font-size: 16px;
          line-height: 25px;
        }
      }
    }
    .course-card-component-container.float-card{
      right: 0;
      top: 0;
      .btn-chat{
        display: block;
        margin: 14px auto 20px;
        color: $primary;
      }
      .info-treinamento{
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      @include d(l){
        position: absolute;
        .top-card-single{
          background: white;
          padding: 10px;
          color: #272727;
        }
      }
      @include d(lm){
        width: 280px;
        margin: 0 auto;
      }
      @include d( msxs){
        .container-image > *:not(.display-video-component-container), .display-video-component-container > *:not(.video-content){
          display: none;
        }
        .btn-chat{
          color: white;
        }
        .call-to-action{
          margin-top: 20px;
        }
      }
    }
    .btn-component-container{
      .my-btn-inline{
        max-height: 48px;
        max-width: 383px;
        margin: 0 auto;
        background: none;
        border: solid 1px $primary;
        background: $primary;
        color:white;
        font-size: 17px;
        margin-bottom:50px;
      }
      .my-btn-outline{
        max-height: 48px;
        max-width: 383px;
        margin: 0 auto;
        background: none;
        border: solid 1px $primary;
        color: $primary;
        font-size: 17px;
        a{
          color: $primary;
        }
      }
      @include d( xs){
        .my-btn-outline{
          max-height: 48px;
          max-width: 383px;
          margin: 0 auto;
          background: none;
          border: solid 1px $primary;
          color: $primary;
          font-size: 14px;
          a{
            color: $primary;
          }
        }
      }
    }
    .course-content{
      margin-bottom: 35px;
    }
    .course-content-component{
      .text-about{
        p + h3 {
          margin-top: 25px;
        }
      }
      .titulos-inline{
        white-space: nowrap;
        overflow-x: auto;
      }
    }
    .lista-recursos{
      font-weight: 300;
      font-size: 16px;
      margin-bottom: 40px;
      margin-top: -10px;
      strong{
        font-weight: 500;
      }
      li{
        color: #364E5E;
        margin-bottom: 10px;
      }
      i{
        margin-right: 10px;
      }
    }
    .conteudo-programatico{
      .title{
        margin-bottom: 5px;
      }
      margin-bottom: 25px;
    }
    .li-collapsive-component.initial-ul{
      > .contet-sometimes-visible{
        margin: 9px 5px 5px;
        padding-top: 10px; 
        border-top: 1px solid #27272713;
      }
    }
    .outros-dados{
      h4{
        margin-bottom: 15px;
      }
      .item{
        margin-bottom: 20px;
      }
      $imageWidth: 67px;
      $distanciaImage: 20px;
      .display-image-component-container{
        width: 67px;
        height: 67px;
        display: inline-block;
      }
      .about-instructor, .about-certification{
        > div{
          div.display-html-component-conteiner{
            display: inline-block;
            width: calc( 100% - #{$imageWidth + $distanciaImage});
            margin-left: $distanciaImage;
          }
        }
      }
      .certificacao-paragraph{
        vertical-align: top;
        a{
          display: inline-block;
        }
      }
    }
    .section-your-way-form-component .container-slot{
      text-align: center;
      .title{
        font-size: 22px;
        white-space: nowrap;
        margin-bottom: 15px;
      }
      p{
        font-size: 16px;
        margin-bottom: 5px;
      }
      .preco{
        font-size: 36px;
        font-weight: 500;
      }
      button{
        margin-top: 30px;
        background: none;
        border: 2px solid #FFFFFF;
      }
    }
    .next-class{
      padding: 60px 0;
    }
    .section-related-qualification{
      margin-bottom: 50px;
    } 
    .course-related{
      padding-bottom: 30px;
      .title{
        margin-bottom: 20px;
      }
    }
    .display-next-class-component{
      color:#272727;
      margin-bottom: 50px;
    }
    .form-your-way {
      .my-card {
        max-width: 320px;
        width: 100%;
      }
    }
    .section-testmonials-component{
      padding: 35px 0;
    }
    .modal-model-one {
      padding: 10px 12px 6px;
      .modal-card {
        max-width: 340px;
      }
      .btn-close {
        margin: 5px 8px;
        font-size: 14px;
      }
      .title {
        font-weight: 500;
        font-size: 20px;
        text-align: center;
        color: #272727;
        margin-bottom: 20px;
      }
      .my-checkbox-component {
        display: flex;
        flex-direction: row-reverse;
        align-items: baseline;
        justify-content: flex-end;
        margin-bottom: 0;
        input {
          height: 19px;
          width: 19px;
          margin-right: 8px;
          padding: 2px;
          font-size: 10px;
        }
      }
      .btn-component-container {
        padding: 0 7px;
        margin: 16px 0 6px;
      }
      .required-message {
        font-style: italic;
        font-weight: 300;
        font-size: 14px;
        line-height: 150%;
        text-align: center;
        color: #000000;
        margin: 0;
      }
    }
  }
</style>