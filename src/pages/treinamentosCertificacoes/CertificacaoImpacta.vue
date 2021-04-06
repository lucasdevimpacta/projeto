<template>
  <main class="pagina-certificacao">
    <section class="display-banner-component-container">
      <DisplayBanner 
        :urlImage="['../../statics/img/webp/banner_topo_pagina_certificacao.webp', '../../statics/img/webp/banner_topo_pagina_certificacao.webp', '../../statics/img/webp/banner_topo_pagina_certificacao.webp']"
        :imageHeight="['29.1%', '55%', '150%']"
        classNames="blue-filter"
      >
        <BreadCrumb
          :breadcrumb="$route.meta.breadcrumb"
          :dynamicrumbs="{}"
          className="alter"
        ></BreadCrumb>
        <h1 class="text-uppercase adorno-container"><i class="adorno-retangular tipo-2"></i>Certificação Impacta</h1>
        <p>
          Já são mais de 5 mil <strong>Profissionais Certificados </strong>aqui na Impacta, garantindo <strong>destaque e melhores oportunidades </strong>na carreira: faça parte desse grupo e seja reconhecido na sua área!
        </p>
        <div class="display-image-component-container">
          <DisplayImage :urlImage="['/statics/img/webp/certificado-digital.webp']" :imageHeight="['74%']" />
        </div>
      </DisplayBanner>
    </section>
    <section class="about-impacta-certification">
      <div class="container">
        <h2 class="text-uppercase destaque-500 adorno-container-center text-center"><i class="adorno-retangular"></i>O que é a certificação Impacta?</h2>
        <p class="text-center sub-title">
          Baseada em nossa exclusiva <strong>Metodologia de Ensino </strong>e com foco nas exigências do mercado, criamos um dos <strong>títulos mais valorizados pelas empresas </strong>de todo o Brasil!
        </p>
        <div class="card-container">
          <div class="my-card soft-shadow">
            <div class="destaque-500 text-color-primary">1</div>
            <h3 class="destaque-500">Escolha a área em que deseja se Certificar</h3>
            <p>
              Após finalizar um conjunto de cursos em uma área de aprendizado ou trilha de formação aqui na Impacta, <strong>você já pode agendar a sua Certificação!</strong>
            </p>
          </div>
          <div class="my-card soft-shadow">
            <div class="destaque-500 text-color-primary">2</div>
            <h3 class="destaque-500">Agende seu Exame de Certificação sem Custos</h3>
            <p>
              Quem faz os nossos cursos <strong>não precisa pagar nada </strong>a mais para tentar tirar a Certificação Impacta pela 1ª vez. Basta agendar sua prova aqui no site ou mesmo pessoalmente!
            </p>
          </div>
          <div class="my-card soft-shadow">
            <div class="destaque-500 text-color-primary">3</div>
            <h3 class="destaque-500">Receba o resultado da prova na hora!</h3>
            <p>
              Ao terminar o seu Exame, você já confere o <strong>resultado na hora! </strong>Quando aprovado, receberá a sua Certificação Impacta nas versões online e impressa.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="about-impacta-certification">
      <div class="container">
        <h2 class="text-uppercase destaque-500 adorno-container-center text-center"><i class="adorno-retangular"></i>Provas realizadas no centro de exames Impacta</h2>
        <p class="text-center sub-title">
          Todos os exames para a Certificação Impacta são realizados no nosso <strong>centro autorizado Prometric </strong>na Unidade Paulista, seguindo as normas e procedimentos internacionais que garantem a credibilidade dos resultados!
        </p>
        <div class="btn-component-container">
          <router-link
            class="h-none"
            :to="{name: 'centro-exames'}"
          >
            <Btn
              tag='button'
              classNames="text-uppercase text-white"
            >
              Conheça o centro de exames
            </Btn>
          </router-link>
        </div>
      </div>
    </section>
    <section class="about-impacta-certification section-form">
      <div class="container">
        <h2 class="text-uppercase destaque-500 text-center">AGENDE SEU EXAME E TIRE SUA<br>CERTIFICAÇÃO IMPACTA</h2>
        <form>
          <MyInput
            label="nome"
            v-model="formObj.nome"
          />
          <MyInput
            label="e-mail"
            classNames="my-w-50"
            v-model="formObj.email"
          />
          <MyInput
            label="telefone"
            classNames="my-w-50"
            v-model="formObj.telefone"
          />
          <MyInputAsSelect
            label="curso"
            widthInput="100%"
            :selectFields="{value:'id', text:'curso'}"
            :options=exames
            v-model="formObj.curso"
          />
          <MyInput
            label="data de preferencia"
            widthInput="50%"
            placeHolder="Ex: 29/07/2020"
            v-model="formObj.data_preferencia"
          />
          <MyInput
            label="horário de preferência"
            widthInput="50%"
            placeHolder="00:00"
            v-model="formObj.horario_preferencia"
          />
          <Btn
            tag='button'
            type="submit"
            classNames="text-uppercase text-white"
            heightBtn="48px"
          >
            Enviar
          </Btn>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
import DisplayBanner from '../../components/DisplayBanner'
import DisplayImage from '../../components/DisplayImage'
import Btn from '../../components/Btn'
import MyInput from '../../components/MyInput'
import MyInputAsSelect from '../../components/MyInputAsSelect'
import BreadCrumb from '../../components/BreadCrumb'

export default {
  name: 'CertificacaoImpacta',
  data () {
    return {
      formObj: {
        nome: '',
        email: '',
        telefone: '',
        curso: '',
        data_preferencia: '',
        horario_preferencia: ''
      }
    }
  },
  created () {
    this.fetch()
  },
  computed: {
    exames () {
      return this.$store.state.exame.data
    }
  },
  methods: {
    fetch () {
      this.$store.dispatch('exame/fetchDataExames', null)
    }
  },
  components: {
    DisplayBanner,
    DisplayImage,
    Btn,
    MyInput,
    MyInputAsSelect,
    BreadCrumb
  },
  meta () {
    console.info(this)
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Certificação Impacta',
      meta: {
        title: { name: 'title', content: 'Certificação Impacta' },
        description: { name: 'description', content: 'Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!' },
        keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: 'Certificação Impacta' },
        ogDescription: { name: 'og:description', content: 'Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Certificação Impacta' },
        twDescription: { name: 'twitter:description', content: 'Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!' },
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
              "name": "Certificação Impacta",
              "description": "Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!",
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
@import "../../css/my_mixins.scss";

.pagina-certificacao {
  h1 {
    font-weight: 500;
    font-size: 40px;
  }
  .display-banner-component-container {
    color: white;
    text-align: center;
    position: relative;
    margin-bottom: calc(50px + 5vw);
    p {
      max-width: calc(480px + 20vw);
      align-self: center;
      font-size: 22px;
      line-height: 135%;
    }
    $widthImage: 85vw;
    .display-image-component-container {
      align-self: center;
      max-width: 535px;
      width: $widthImage;
      height: calc(#{$widthImage} * 0.81);
      max-height: 393px;
    }
    @include d(lm) {
      padding-bottom: 230px;
      .display-image-component-container {
        top: 60%;
        position: absolute;
      }
      p {
        padding-bottom: 100px;
      }
    }
    @include d(sxs) {
      h1 {
        font-size: 32px;
      }
      p {
        font-size: 18px;
      }
    }
  }
  .about-impacta-certification {
    margin-bottom: 120px;
    h2 {
      font-size: 24px;
      color: #272727;
      margin-bottom: 20px;
    }
    .sub-title {
      font-weight: 300;
      font-size: 18px;
      line-height: 21px;
      color: #364e5e;
      max-width: 520px;
      margin: 0 auto 40px;
    }
    .card-container {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
    .my-card {
      max-width: 304px;
      min-height: 265px;
      padding: 20px 40px 40px 40px;
      background: white;
      border-radius: 4px;
      margin-bottom: 30px;
      position: relative;
      > * {
        margin-bottom: 20px;
      }
      h3 {
        font-size: 18px;
        line-height: 21px;
        color: #272727;
      }
      p {
        font-weight: 300;
        font-size: 16px;
        line-height: 24px;
        color: #364e5e;
      }
      @include d(l) {
        &:nth-child(2) {
          top: 25px;
        }
        &:nth-child(3) {
          top: 50px;
        }
      }
    }
    .btn-component-container {
      height: 48px;
      max-width: 343px;
      margin: 0 auto;
    }
    form {
      max-width: 410px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      button {
        margin: 10px 7px 0;
      }
    }
  }
  .section-form {
    background: #f5f5f5;
    border-top: 1px solid #e3e9ed;
    border-bottom: 1px solid #e3e9ed;
    padding: 50px 0 65px;
  }
}
</style>