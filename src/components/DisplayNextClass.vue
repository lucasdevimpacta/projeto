<template>
  <div :class="'display-next-class-component ' + classNames">
    <div class="row table-row d-none d-lg-flex">
      <div class="col-lg-5">
        Data e horário
      </div>
      <div class="col-lg-2">
        Local
      </div>
      <div class="col-lg-2">
        Preços e descontos
      </div>
      <div class="col-lg-3">
      </div>
    </div>
    <div v-if="agendaContent.length == 0" class="no-class">
      <div>Nenhuma turma no momento</div>
    </div>
    <div v-for="( e ,i ) in agendaContent" class="row table-row b-b" :key="'n_c_' + i">
      <div class="col-lg-5 col-md-6">
        <p><span class="destaque-500">{{e.data_inicio}} a {{e.data_termino}}</span><br>
          <span style="white-space: normal;">{{e.periodo | firstUp}} - {{e.dias_semana | firstUp}} das {{e.hora_inicio}}h as {{e.hora_termino}}h</span>
        </p>
      </div>
      <div class="col-lg-2 col-md-3">
        {{e.local | firstUp}}
      </div>
      <div class="col-lg-2 col-md-3">
        <p><span class="destaque-500">{{e.parcela_maxima}}X de {{setQuote(e.parcela_maxima, e.valor_promocional) | toMoneyString}}</span><br>
          ou {{e.valor_avista | toMoneyString}} à vista
        </p>
      </div>
      <div class="col-lg-3 d-flex justify-content-center">
        <div class="btn-component-container">
          <Btn v-if="!e.esgotado" tag='button' :classNames="'destaque-500 text-white ' + btnStatus(e.esgotado)" v-on:click="Buy(e)">
            Comprar agora
          </Btn>
          <Btn v-else tag='button' :classNames="'destaque-500 text-white ' + btnStatus(e.esgotado)">
            Esgotado
          </Btn>
        </div>
      </div>
    </div>
    <div class="row table-row last-row">
      <div class="col">
        <button class="text-uppercase style-link-default" v-on:click="moreDates" v-if="content.length > agendaIndex">
          Ver mais datas
          <i class="fas fa-chevron-down ml-3"></i>
        </button>
      </div>
      <div class="col">
        <button class="style-link-default text-primary" @click="toggleFormNewDates">
          Avise-me quando tiver novas datas
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Btn from './Btn'

  export default {
    name: 'DisplayNextClass',
    props: {
      classNames:{
        type: String,
        default: ''
      },
      content:{
        type: Array,
        required: true
      },
      agendaIndex:{
        type: Number,
        default: 4
      },
      toggleFormNewDates: {
        type: Function,
        required: true
      }
    },
    computed:{
      agendaContent(){
        return this.content.slice(0, this.agendaIndex);
      },
      loginStatus() {
        return this.$store.state.app.loginStatus
      }
    },
    watch:{
      agendaIndex(){
        agendaContent();
      }
    },
    filters:{
      firstUp( val){
        return val.replace( /./, val.match(/./)[0].toUpperCase())
      },
      toMoneyString( val){
        return `R$${val.toLocaleString()}`
      },
    },
    methods:{
      setQuote( maxQuotes, total){
        return (total / maxQuotes).toFixed(2)
      },
      btnStatus( isEsgoted){
        return isEsgoted ? 'btn-desable' : ' btn-gradient '
      },
      moreDates(){
        if ( this.agendaIndex < this.content.length - 1 ) {
            this.agendaIndex += 4;
        }
      },
      async Buy(el){
        await this.$store.dispatch( 'carrinho/fetchAddProduto', {
            carrinho_id: this.$store.state.carrinho.carrinho.id,
            codigo_agendamento: el.codigo_agendamento,
            preco: el.valor
        });

        if ( this.loginStatus ) {
          window.location.href= "inscricao";
        } else {
          window.location.href= "login";
        }
      }
    },
    components:{
      Btn
    }
  }
</script>

<style lang="scss">
@import '../css/my_mixins.scss';

  .display-next-class-component{
    background: inherit;
    .table-row{
      text-align: center;
      white-space: nowrap;
      padding: 10px 0;
      @include d( sxs){
        text-align: left;
      }
    }
    .b-b{
      border-bottom: 1px solid #E3E9ED;
    }
    .table-row div:first-child{
      text-align: left;
    }
    .table-row div:last-child{
      text-align: right;
    }
    .btn-component-container{
      max-width: 138px;
      width: 100%;
      height: 40px;
      text-align: center;
      display: inline-block;
      margin-left: auto;
      @include d( msxs){
        margin-left: unset;
        margin-bottom: 20px;
        margin-top: 10px;
      }
    }
    .last-row{
      font-size: 14px;
    }
    p{
      margin: 0;
    }
    .no-class{
      text-align:center;
      padding:10px;
      background:#efefef;
    }
  }
</style>