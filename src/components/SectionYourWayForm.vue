<template>
  <section :class="'section-your-way-form-component ' + classNames">
    <svg class="contorno-superior" xmlns="http://www.w3.org/2000/svg" width="1440" height="115" viewBox="0 0 1440 115" fill="none" style="&#10;    width: 100%;&#10;    height: unset;&#10;">
      <path d="M38.7292 101.116L0 114.8V0H38.7292H232.375H464.75H697.125H929.5H1161.88H1440.25V68.3163C1362.79 76.3625 1239.33 104.037 1161.88 98.4C1084.42 92.7625 1006.96 54.8375 929.5 43.7163C852.042 32.8 774.583 49.2 697.125 57.4C619.667 65.6 542.208 65.6 464.75 60.1162C387.292 54.8375 309.833 43.5625 232.375 51.9163C154.917 59.9625 77.4583 87.6375 38.7292 101.116Z" fill="#F8F9FD" style="&#10;"/>
    </svg>
    <svg class="contorno-inferior" xmlns="http://www.w3.org/2000/svg" width="1440" height="115" viewBox="0 0 1440 115" fill="none" style="&#10;    width: 100%;&#10;    height: unset;&#10;">
      <path d="M38.7292 13.6836L-1.00361e-05 -0.000190735L0 114.8L38.7292 114.8L232.375 114.8L464.75 114.8L697.125 114.8L929.5 114.8L1161.88 114.8L1440.25 114.8L1440.25 46.4834C1362.79 38.4372 1239.33 10.7622 1161.87 16.3997C1084.42 22.0372 1006.96 59.9622 929.5 71.0835C852.042 81.9997 774.583 65.5997 697.125 57.3997C619.667 49.1998 542.208 49.1998 464.75 54.6835C387.292 59.9623 309.833 71.2373 232.375 62.8835C154.917 54.8373 77.4583 27.1623 38.7292 13.6836Z" fill="#F8F9FD"/>
    </svg>
    <div class="container">
      <div class="logo-area">
        <div class="display-image-component-container">
          <DisplayImage :urlImage="['/statics/img/webp/logo-yourway.webp']" :imageHeight="['60.8%']" />
        </div>
      </div>
      <p class="text-call-to-action text-uppercase destaque-500 adorno-container-center"><i class="adorno-retangular"></i>{{title}}</p>
      <div class="card-container">
        <slot name="main">
        </slot>
      </div>
      <div class="slot-area">
          <slot name="after"></slot>
      </div>
    </div>
  </section>
</template>

<script>
import DisplayImage from './DisplayImage'
import Btn from './Btn'

export default {
  name: 'SectionYourWayForm',
  props:{
    classNames:{
      type: String,
    },
    title: {
      type: String,
    }
  },
  data(){
    return{
      code: (Math.random() * 1000).toFixed(0)
    }
  },
  computed:{
    treinamento(){
      return{
        preco_nominal: 1798.8,
        preco_promocional: 1198.8,
        preco_promocional_a_vista: 999.90,
        numero_maximo_parcelas: 12,
      }
    }
  },
  methods:{
    calcValQuota( total, numQuota){
      numQuota = numQuota || 1
      let result = total / numQuota
      return `R$ ${result.toFixed(2).replace('.',',')}`
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

.section-your-way-form-component{
  position: relative;
  padding: 110px 0 130px;
  .adorno-retangular:before {
    background: white;
    top: -1.5vmax;
  }
  .contorno-superior{
    position: absolute;
    top: -2px;
  }
  .contorno-inferior{
    position: absolute;
    bottom: -2px;
  }
  .text-purple{
    color: #2E126F;
  }
  .text-cyan{
    color: #009583;
  }
  &.bg-gradient{
    background: #2e126f;
    background: -moz-linear-gradient(45deg, #2e126f 18%, #009583 89%, #1a4b78 125%);
    background: -webkit-linear-gradient(45deg, #2e126f 18%, #009583 89%, #1a4b78 125%);
    background: linear-gradient(45deg, #2e126f 18%, #009583 89%, #1a4b78 125%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2e126f",endColorstr="#1a4b78",GradientType=1);
  }
  .container{
    position: relative;
  }
  .logo-area{
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    .display-image-component-container{
      width: 125px;
      height: 75px;
    }
  }
  .text-call-to-action{
    font-size: 24px;
    color: white;
    text-align: center;
    margin-bottom: 35px;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 685px;
    margin: 0 auto 50px;
    .title, p {
      text-align: center;
    }
    li {
      font-weight: 300;
      font-size: 16px;
      line-height: 18px;
      padding: 5px 0 5px 5px;
      color: #272727;
    }
    .my-card {
      background: white;
      border-radius: 8px;
      padding: 36px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .your-way-form{
    color: #364E5E;
    label{
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 8px;
      display: block;
      text-align: left;
      color: #364E5E;
    }
    input{
      padding: 10px 12px;
      margin-bottom: 15px;
      border: 2px solid #364E5E;
      background: none;
      border-radius: 4px;
    }
    button{
      margin-top: 20px;
    }
  }
  .slot-area{
    display: flex;
    justify-content: center;
    color: white;
    .title {
      font-size: 22px;
    }
  }
}
</style>