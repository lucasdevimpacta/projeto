<template>
  <main class="pagina-inscricao">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 offset-lg-1 order-lg-1 financial-data" v-if="typeof carrinho.produtos == 'undefined' || carrinho.produtos.length == 0">
          <h4 class="section-title destaque-500">Resumo da compra</h4>
          <div>
            Nenhum produto no carrinho no momento
          </div>
          <button class="style-link-default other-courses{

          }-courses">
            <router-link :to="{ name: 'cursos-home' }">Ver mais cursos</router-link>            
          </button>
        </div>
        <div class="col-lg-4 offset-lg-1 order-lg-1 financial-data" v-else>
          <h4 class="section-title destaque-500">Resumo da compra <br /><span v-if="formacao.bought">{{formacao.titulo}}</span></h4>
          <ul>
            <li  v-for="(e, i) in carrinho.produtos" :key="e.id + i"class="product" >
              <p>Curso {{e.modalidade}}</p>
              <div class="more-details">
                <h5>{{e.produto}}</h5>
                <div class="">
                  <span>
                    {{ 
                      Intl.NumberFormat( 'pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })
                      .format(e.valor || 0.00)
                    }}
                  </span>
                  <button class="style-link-default" v-on:click="removerProdutoCarrinho(e)">
                    Remover
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div class="ticket">
            <div>
              <button class="style-link-default" v-if="!addCupom && carrinho.valor_desconto == 0" v-on:click="inputCupomValue">
                Tenho um cupom
              </button>
            </div>
            <div v-if="addCupom || carrinho.valor_desconto > 0">
              <div>
                Cupom
              </div>
              <div>
                <form @submit="validarCupom"  class="cupom-input">
                  <div>
                    <input type="text" name="cupom" id="cupom" :readOnly="carrinho.valor_desconto > 0" :value="carrinho.voucher"/>
                  </div>
                  <div>
                    <button tag="button" classNames="text-uppercase ghost-btn" v-if="carrinho.valor_desconto == 0">
                      Validar
                    </button>
                  </div>
                  <p>{{carrinho.errorMessage}}</p>
                </form>
              </div>
            </div>
          </div>
          <div class="financial-numbers" v-if="carrinho.valor_desconto > 0">
            <p>Valor carrinho:</p>
            <span class="price-total">
              {{ 
                Intl.NumberFormat( 'pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
                .format(carrinho.valor_bruto || 0.00)
              }}
            </span>
          </div>
          <div class="financial-numbers"  v-if="carrinho.valor_desconto > 0">
            <p>Valor desconto:</p>
            <span class="price-total price-discount">
              - {{ 
                Intl.NumberFormat( 'pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
                .format(carrinho.valor_desconto || 0.00)
              }}
            </span>
          </div>
          <div class="financial-numbers">
            <p>Valor total:</p>
            <span class="price-total">
              {{ 
                Intl.NumberFormat( 'pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
                .format(carrinho.valor_liquido || 0.00)
              }}
            </span>
          </div>
          <button class="style-link-default other-courses{

          }-courses">
            <router-link :to="{ name: 'cursos-home' }">Ver mais cursos</router-link>            
          </button>
        </div>
        <div class="col-lg-7 order-lg-0 forms">
          <h4 class="section-title destaque-500 adorno-blue-big-ball content-1">Dados pessoais</h4>
          <form class="personal-data">
            <MyInput label="Nome Completo" placeHolder="Digite seu nome..." classNames="my-w-50" :value="user.nome_completo"/>
            <MyInput label="CPF" classNames="my-w-50" :value="user.cpf" />
            <MyInput label="RG" classNames="my-w-50" :value="user.rg" />
            <p class="input-note rg">
              Solicitamos o RG para agilizar o<br class="d-none d-md-inline">processo de entrada no prédio
            </p>
            <div class="input-radio-container especial-need" v-show="showNecessidadeEspecial">
              <p class="destaque-500 text-uppercase">Possui Necessidade especial?</p>
              <div>
                <input
                  type="radio"
                  :name="'input_necessidadeespecial_' + code"
                  :id="'input_necessidadeespecial_sim_' + code"
                  @click="setPNE(true)"
                />
                <label :for="'input_necessidadeespecial_sim_' + code">Sim</label>
              </div>
              <div>
                <input
                  type="radio"
                  :name="'input_necessidadeespecial_' + code"
                  :id="'input_necessidadeespecial_nao_' + code"
                  :checked="!ispne"
                  @click="setPNE(false)"
                />
                <label :for="'input_necessidadeespecial_nao_' + code">Não</label>
              </div>
            </div>
            <div class="input-check-container especial-need" v-show="ispne">
              <div>
                <input type="checkbox" :checked="pnedata.isvisual" v-model="pnedata.isvisual" :id="'input_necessidadeespecial_visual_'+code"/>
                <label :for="'input_necessidadeespecial_visual_'+code">Visual</label> 
                <MyInput type="text" v-model="pnedata.visualobs" :readOnly="!pnedata.isvisual" :isRequired="false"/>
              </div>
              <div>
                <input type="checkbox" :checked="pnedata.isfala" v-model="pnedata.isfala" :id="'input_necessidadeespecial_fala_'+code"/>
                <label :for="'input_necessidadeespecial_fala_'+code">Fala</label> 
                <MyInput type="text" v-model="pnedata.falaobs" :readOnly="!pnedata.isfala" :isRequired="false"/>
              </div>
              <div>
                <input type="checkbox" :checked="pnedata.isfisico" v-model="pnedata.isfisico" :id="'input_necessidadeespecial_fisico_'+code"/>
                <label :for="'input_necessidadeespecial_fisico_'+code">Fisico</label> 
                <MyInput type="text" v-model="pnedata.fisicoobs" :readOnly="!pnedata.isfisico" :isRequired="false"/>
              </div>
              <div>
                <input type="checkbox" :checked="pnedata.isintelectual" v-model="pnedata.isintelectual" :id="'input_necessidadeespecial_intelectual_'+code"/>
                <label :for="'input_necessidadeespecial_intelectual_'+code">Intelectual</label> 
                <MyInput type="text" v-model="pnedata.intelectualobs" :readOnly="!pnedata.isintelectual" :isRequired="false"/>
              </div>
              <div>
                <input type="checkbox" :checked="pnedata.isauditivo" v-model="pnedata.isauditivo" :id="'input_necessidadeespecial_auditivo_'+code"/>
                <label :for="'input_necessidadeespecial_auditivo_'+code">Auditivo</label> 
                <MyInput type="text" v-model="pnedata.auditivoobs" :readOnly="!pnedata.isauditivo" :isRequired="false"/>
              </div>
            </div>
            <div v-show="!enderecos.length">
              <MyInput label="cep" classNames="my-w-50" v-model="firstAdress.cep" @blur="getDataCepDataFirstAdress"/>
              <a tag="button" class="input-note cep style-link-default" @click="findCEP">Não sei o CEP</a>
              <MyInput label="endereço" classNames="my-w-70" v-model="firstAdress.endereco"/>
              <MyInput label="número" classNames="my-w-30" v-model="firstAdress.numero"/>
              <MyInput label="complemento (opcional)" placeHolder="Ex: Casa 7; ap 43" classNames="my-w-50" v-model="firstAdress.complemento"/>
              <MyInput label="bairro" classNames="my-w-50" v-model="firstAdress.bairro"/>
              <MyInput label="cidade" classNames="my-w-50" v-model="firstAdress.cidade"/>
              <MyInputAsSelect 
                label="estado"
                classNames="my-w-50"
                :options="estados" 
                v-model="firstAdress.estado"
              />
            </div>
          </form>
          <section v-show="enderecos.length" class="address-list">
            <h4 class="section-title destaque-500 adorno-blue-big-ball content-1">Endereços</h4>
            <div class="address-group">
              <SimpleCarrousel @setSlideCurrentIndex="setSlideCurrentIndex" :count="historySlides">
                <div v-for="i in historySlides" :key="'row_' + i" class="row" v-show="(i - 1) === slideCurrentIndex">
                  <div v-for="j in cardsPerSlides" :key="getAddress(i,j).cep +i+'_'+j" class="address-card col-lg-5 
                  col-md-4" v-if="getAddress(i,j)">
                    <div>
                      <p class="title tex-uppercase">
                      {{getAddress(i,j).principal ? 'Endereço principal' : 'Endereço secundário'}}
                      </p>
                      <div class="text-content">
                        <p class="label">{{user.nome_completo}}</p>
                        <p class="logradouro">{{`${getAddress(i,j).logradouro.logradouro}, ${getAddress(i,j).numero} - ${getAddress(i,j).bairro.bairro}`}}</p>
                        <p class="city">{{`${getAddress(i,j).cidade.cidade}, ${getAddress(i,j).estado.estado} ${getAddress(i,j).cep}`}}</p>
                        <p class="country">{{getAddress(i,j).pais.pais}}</p>
                        <!-- <p class="phone">Telefone: {{e}}</p> -->
                      </div>
                      <div class="call-to-action">
                        <button @click="() => changeAddress(getAddressIndex(i,j), getAddress(i,j).id)" type="button">Alterar</button>
                        <button @click="() => deleteAddress(getAddressIndex(i,j), getAddress(i,j).id)" type="button">Excluir</button>
                        <Btn tag="button" v-if="getAddress(i,j).principal" heightBtn="40px" classNames="text-uppercase text-white main-action">Selecionado</Btn>
                        <Btn tag="button" v-else heightBtn="40px" @click="() => selectAddress(getAddressIndex(i,j), getAddress(i,j).id)" classNames="text-uppercase ghost-btn main-action">Selecionar</Btn>
                      </div>
                    </div>
                  </div>
                </div>
              </SimpleCarrousel>
            </div>
            <button @click="() => toggleModal(true)" type="button" class="style-default-link add-address">+ Adicionar endereço</button>
          </section>
          <h4 class="section-title destaque-500 adorno-blue-big-ball content-2">Selecione a forma de pagamento</h4>
          <form class="payment-data" @submit="doPaymentRequest" id="dadosPagamento">
           <div class="input-radio-container pay-method">
              <div>
                <input
                  type="radio"
                  :name="'input_necessidadeespecial_' + code"
                  id="input_necessidadeespecial_cartao_"
                  value="carta"
                  @click="setFormaPagamento(1, 0)"
                  checked
                />
                <label class="text-uppercase credit" for="input_necessidadeespecial_cartao_">Cartão</label>
              </div>
              <div>
                <input
                  type="radio"
                  :name="'input_necessidadeespecial_' + code"
                  id="input_necessidadeespecial_boleto_"
                  @click="setFormaPagamento(0, 1)"
                  value="boleto"
                />
                <label class="text-uppercase billet" for="input_necessidadeespecial_boleto_">Boleto</label>
              </div>
            </div>
            <MyInput v-if="isCartao" label="nome no cartão" placeHolder="Nome impresso no cartão" classNames="my-w-50" :isRequired="isCartao" v-model="pagamentoData.cartao_nome" />
            <MyInput label="numero do cartão" classNames="my-w-50" v-if="isCartao" :isRequired="isCartao" :mask="cartaoNoMask" v-model="pagamentoData.cartao_numero" />
            <MyInputAsSelect 
              label="validade"
              placeHolder="Mês"
              widthInput="25%"
              :options="meses"
              :isRequired="isCartao"
              v-if="isCartao"
              v-model="pagamentoData.cartao_validade_mes" 
            />
            <MyInputAsSelect 
              placeHolder="Ano"
              widthInput="25%"
              :options="anos" 
              :isRequired="isCartao"
              v-if="isCartao" 
              v-model="pagamentoData.cartao_validade_ano" 
            />
            <MyInput label="código de segurança" placeHolder="CVV" widthInput="25%" classNames="cod-security" v-if="isCartao" :isRequired="isCartao" v-model="pagamentoData.cartao_codigo" />
            <MyInputAsSelect 
              label="Número de parcelas"
              :placeHolder="getPlaceHolderValue"
              classNames="my-w-50"
              :options=parcelas
              v-model="pagamentoData.nrparcela" 
            />
            <p class="my-w-50 destaque-500 sell-total" >
              Total de {{ 
                Intl.NumberFormat( 'pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
                .format(carrinho.valor_liquido || 0.00)
              }}
            </p>
          </form>
          <div id="validation-message">
            {{validationFailedMessage}}
          </div>
          <div class="call-to-action-area">
            <div class="btn-component-container my-w-50 ">
              <Btn type="submit" classNames="text-uppercase btn-gradient text-white" tag="button" heightBtn="48px" form="dadosPagamento" :loading="ispaying">
                Finalizar pagamento
              </Btn>
            </div>
            <p class="input-note payment">
              Ao concluir sua compar, você concorda com estes<br class="d-none d-md-inline"> <router-link class="style-default-link" :to="{ name: 'termos-uso'}">Termos de Uso</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <span class="securit-stamp"><i class="fas fa-lock"></i> Compra 100% segura</span>
    <Modal @handleClose="() => toggleModal()" :show="showModal" classNames="over-layer default">
      <template v-slot:main >
        <form class="address-change-modal" @submit="commitChangeAddress">
          <input type="hidden" :value="addressToChange.id" readonly />
          <MyInput label="cep" widthInput="70%" v-model="addressToChange.cep" @blur="getDataCepData"/>
          <a tag="button" class="input-note cep style-link-default" @click="findCEP">Não sei o CEP</a>
          <MyInput label="endereço" v-model="addressToChange.logradouro" />
          <MyInput label="número" v-model="addressToChange.numero" />
          <MyInput label="bairro" v-model="addressToChange.bairro" />
          <MyInput label="cidade" v-model="addressToChange.cidade" />
          <MyInputAsSelect 
            label="estado"
            classNames="my-w-50"
            :options="estados" 
            v-model="addressToChange.estado"
            :defaultValue="addressToChange.estado"
          />
          <MyInputAsSelect 
            label="pais"
            classNames="my-w-50"
            :options="paises" 
            v-model="addressToChange.pais"
            :defaultValue="addressToChange.pais"
          />
          <MyInput label="complemento (opcional)" :isRequired="false" v-model="addressToChange.complemento" placeHolder="Ex: Casa 7; ap 43" />
          <MyCheckbox
            label="Endereço principal"
            widthInput="100%"
            v-model="addressToChange.principal"
            classNames="form-register-checkbox"
            :isRequired="false"
          />
          <div class="btn-component-container">
            <Btn tag="button" type="submit" classNames="text-uppercase text-white" heightBtn="40px">Salvar</Btn>
          </div>
        </form>
      </template>
    </Modal>
  </main>
</template>

<script>
import MyInput from '../../components/MyInput'
import MyInputAsSelect from '../../components/MyInputAsSelect'
import MyCheckbox from '../../components/MyCheckbox'
import Btn from '../../components/Btn'
import Modal from '../../components/ModalGeral'
import SimpleCarrousel from '../../components/SimpleCarrousel'

import ESTADOS_PREPARED from '../../statics/data/estados_siglas_brasil.json'
import MESES_PREPARED from '../../statics/data/meses_ano.json'
import { simpleValidateForm, cartaoNoMask } from '../../utils/helper'
import Endereco from '../../store/model/Endereco'

const getListOfYears = () => {
  let yearCurrent = (new Date()).getFullYear() + 2;
  let minYear = yearCurrent - 3;
  let result = [];
  while( yearCurrent >= minYear){
    result.push( yearCurrent);
    yearCurrent--;
  }
  result.reverse();
  return result;
}

export default {
  name: 'Inscricao',
  data(){
    return{
      code: (Math.random() * 1000).toFixed(0),
      estados: ESTADOS_PREPARED,
      paises: [
        'Brasil',
        'Argentina'
      ],
      meses: MESES_PREPARED,
      anos: getListOfYears(),
      showModal: false,
      addressToChange: {
        id: 0,
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        pais: '',
        cep: '',
        numero: '',
        principal: false,
        complemento: ''
      },
      firstAdress:{
        cep:'',
        endereco:'',
        numero:'',
        complemento:'',
        bairro:'',
        cidade:'',
        estado:''
      },
      pnedata:{
        isvisual:false,
        visualobs:'',
        isfala:false,
        falaobs:'',
        isfisico:false,
        fisicoobs:'',
        isintelectual:false,
        intelectualobs:'',
        isauditivo:false,
        auditivoobs:'',
      },
      pagamentoData:{
        iscartao: 1,
        isboleto: 0,
        cartao_nome: '',
        cartao_numero: '',
        cartao_validade_mes: '',
        cartao_validade_ano: 0,
        cartao_codigo: 0,
        nrparcela: 0,
      },
      parcelas:[1,2,3],
      addCupom: false,
      validarMessageError:'',
      addressSelected:false,
      validationFailedMessage: '',
      isCartao:true,
      ispaying:false,
      ispne:false,
      showNecessidadeEspecial:false,
      slideCurrentIndex:0
    }
  },
  mounted(){
    this.getCarrinho();
    this.getFormacao();
  },
  computed:{
    user() {
      return this.$store.state.app.user
    },
    enderecos() {
      return this.$store.state.app.userAddressList
    },
    loginStatus() {
      return this.$store.state.app.loginStatus
    },
    carrinho(){
      return this.$store.state.carrinho.carrinho;
    },
    deviceSize(){
      return this.$store.state.app.deviceSize
    },
    cardsPerSlides(){
      return (this.deviceSize === 'lg' && 2) || 1
    },
    historySlides(){
      return Math.ceil(this.enderecos.length / this.cardsPerSlides)
    },
    formacao(){
      return this.$store.state.app.formacao
    },
    getPlaceHolderValue(){
      return (this.parcelas[0]) ? this.parcelas[0].toString() :  '0,00';
    }
  },
  methods: {
    getFormacao(){
      this.$store.dispatch( 'app/fetchFormacao');
    },
    setSlideCurrentIndex(val) {
      this.slideCurrentIndex = val;
    },
    getAddressIndex(a, b){
      a = ( a - 1) * this.cardsPerSlides;
      b = ( b - 1);
      return a + b;
    },
    getAddress(a, b){
      return this.enderecos[this.getAddressIndex(a,b)];
    },
    findCEP(){

      var w = window.open();

      w.location.href = "http://www.buscacep.correios.com.br/sistemas/buscacep/BuscaCepEndereco.cfm";
    },
    async getDataCepDataFirstAdress(){

        let response = await this.$store.dispatch('app/getCepData',this.firstAdress.cep);
        
        this.firstAdress.logradouro = response.logradouro;
        this.firstAdress.bairro = response.bairro;
        this.firstAdress.cidade = response.localidade;
        this.firstAdress.estado = response.localidade;
        this.firstAdress.pais = "Brasil";

    },
    async getDataCepData(){
        let response = await this.$store.dispatch('app/getCepData',this.addressToChange.cep);
        
        this.addressToChange.logradouro = response.logradouro;
        this.addressToChange.bairro = response.bairro;
        this.addressToChange.cidade = response.localidade;
        this.addressToChange.estado = response.localidade;
        this.addressToChange.pais = "Brasil";

    },
    async getCarrinho(e){
      await this.$store.dispatch('carrinho/fetchGetCarrinho');

      if ( this.carrinho.id ) {
        await this.$store.dispatch('carrinho/fetchCarrinhoPessoa',{idcarrinho: this.carrinho.id, pessoa_id: this.user.codigo_pessoa});
      }
      this.getMaxParcelas();
      this.hasPresencial();
    },
    setFormaPagamento(valuecartao, valueboleto){
      this.isCartao = valuecartao;
      this.pagamentoData.iscartao = valuecartao;
      this.pagamentoData.isboleto = valueboleto;
      this.getMaxParcelas();
    },
    async removerProdutoCarrinho(e){
      await this.$store.dispatch('carrinho/fetchRemoveProduto', {
        carrinho_id: this.$store.state.carrinho.carrinho.id,
        carrinho_produto_id: e.id
      });

      this.getMaxParcelas();
      this.hasPresencial();

    },
    hasPresencial(){
      if ( this.carrinho.produtos.length ) {
        this.carrinho.produtos.forEach((data, index) => {
          if ( data.idmodalidade == 1 ) {
            this.showNecessidadeEspecial = true;
            return false;
          }
        });

      }
    },
    getMaxParcelas(){
      if ( typeof this.carrinho.produtos != "undefined" ) {
        var maxParcelas = []

        this.parcelas = []
        if ( this.isCartao ) {
          this.carrinho.produtos.forEach((data, index) => {
            maxParcelas.push(data.parcelas);
          });
        } else {
          maxParcelas.push(1);
        }

        var valorLiquido = this.carrinho.valor_liquido;

        for(let i = 1 ; i <= Math.max.apply(null, maxParcelas) ; i++){
          var vlparcela = ' x R$ '+ (valorLiquido/i).toFixed(2).replace(".",",");
          this.parcelas.push(i +vlparcela);
        }
      }
    },
    inputCupomValue(){
      this.addCupom = true;
    },
    validarCupom(e){
      e.preventDefault()
      const { currentTarget:[ { value: cupom }] } = e
      
      this.$store.dispatch('carrinho/fetchSetVoucherCarrinho',{
        carrinho_id: this.carrinho.id,
        voucher_codigo: cupom
      });
    },  
    toggleModal(flag = false){
      this.showModal = flag
      if ( !flag ){

        this.addressToChange.logradouro = ""
        this.addressToChange.bairro = ""
        this.addressToChange.cidade = ""
        this.addressToChange.estado = ""
        this.addressToChange.pais = ""
        this.addressToChange.cep = ""
        this.addressToChange.complemento = ""
        this.addressToChange.id = 0
        this.addressToChange.principal = false

        this.firstAdress.logradouro = ""
        this.firstAdress.bairro = ""
        this.firstAdress.cidade = ""
        this.firstAdress.estado = ""
        this.firstAdress.pais = ""
        this.firstAdress.cep = ""
      }
    },
    changeAddress(index, id) {
      const targetAddress = this.enderecos[index]
      Object.keys(this.addressToChange).forEach(key => {
        if (typeof targetAddress[key] !== 'object') this.addressToChange[key] = targetAddress[key]
        else this.addressToChange[key] = targetAddress[key][key]
      })
      this.toggleModal(true)
    },
    async commitChangeAddress(e) {
      e.preventDefault()
      if(this.simpleValidateForm(e)) {
        const updatedAddress = await this.createNewAddressObj(e.target)

        const enderecos = JSON.parse(JSON.stringify(this.enderecos))
        let indexOfElementToUpdate = -1
        enderecos.forEach((e, i) => {
          if(updatedAddress.id && e.id === updatedAddress.id) indexOfElementToUpdate = i
          if(updatedAddress.principal) e.principal = false
        })
        if(indexOfElementToUpdate === -1) enderecos.push(updatedAddress)
        else enderecos.splice(indexOfElementToUpdate, 1, updatedAddress)

        this.$store.commit('app/UPDATE_USER_ADDRESS_LIST', enderecos)
      }
      this.toggleModal(false)
    },
    async createNewAddressObj(form) {
    
      const [ { value: id }, { value: cep }, { value: logradouro }, { value: numero }, { value: bairro },{ value: cidade }, { value: estado}, { value: pais}, { value: complemento }, { value: principal } ] = form

      let pessoa_id = this.user.codigo_pessoa;
      let estadossigla = this.estados.find(v => v.text == estado.trim()).value;
      
      let response = await this.$store.dispatch('app/addAddress', {
        pessoa_id: pessoa_id,
        descep: cep,
        deslogradouro: logradouro,
        desnumero: numero,
        desbairro: bairro,
        descidade: cidade,
        descomplemento: complemento,
        desestado: estado,
        desestadosigla: estadossigla,
        despais: pais,
        inprincipal: (principal ? 1 : 0)
      });

      let idendereco = response.data.data.id;

      return new Endereco.buildEndereco({
        id: idendereco,
        logradouro: { logradouro },
        numero,
        bairro: { bairro },
        cep,
        cidade: { cidade },
        estado: { estado },
        pais: { pais },
        complemento,
        principal: !!principal
      })
    },
    async deleteAddress(index, id) {
      const enderecos = JSON.parse(JSON.stringify(this.enderecos))
      if(enderecos.splice(index, 1)[0].id === id) {

        await this.$store.dispatch('app/removeAddress', {
          id
        });
      }
    },
    async addFirstAddress({idpessoa, logradouro_first, numero_first, complemento_first, bairro_first, cidade_first,
            estado_first, cep_first}){

        let response = await this.$store.dispatch('app/addAddress', {
          pessoa_id: idpessoa,
          descep: cep_first,
          deslogradouro: logradouro_first,
          desnumero: numero_first,
          desbairro: bairro_first,
          descidade: cidade_first,
          descomplemento: complemento_first,
          desestado: estado_first,
          desestadosigla: estado_first,
          despais: 'Brasil',
          inprincipal: 0
        });

        let idendereco = response.data.data.id;

        let logradouro = logradouro_first;
        let bairro = bairro_first;
        let cidade = cidade_first;
        let estado = estado_first;
        let pais = 'Brasil';

        let updatedAddress = new Endereco.buildEndereco({
          id: idendereco,
          logradouro: { logradouro },
          numero: numero_first,
          bairro: {bairro},
          cep: cep_first,
          cidade: {cidade},
          estado: {estado},
          pais: {pais},
          complemento: complemento_first,
          inprincipal: 0
        });

        const enderecos = JSON.parse(JSON.stringify(this.enderecos))
        enderecos.push(updatedAddress)

        await this.$store.commit('app/UPDATE_USER_ADDRESS_LIST', enderecos)
        this.selectAddress(0, idendereco);
    },
    selectAddress(index, id) {
      const enderecos = JSON.parse(JSON.stringify(this.enderecos))
      enderecos.forEach(e => e.principal = false)
      enderecos[index].principal = true
      this.addressSelected = true;
      this.$store.commit('app/UPDATE_USER_ADDRESS_LIST', enderecos)
    },
    setPNE(value){
      this.ispne = value;
    },
    async doPaymentRequest(e){
      e.preventDefault();

      this.ispaying = true;

      this.validationFailedMessage = "";

      if ( !this.addressSelected && this.enderecos.length > 0) {

        this.validationFailedMessage = "Não foi selecionado um endereço";
        this.ispaying = false;
        return false;

      } 

      else if ( simpleValidateForm(e) ) {

        const {
          cpf, 
          rg,
          nome_completo: nome,
          codigo_pessoa: idpessoa, 
          email
        } = this.user;

        const {
           endereco: logradouro_first,
           numero: numero_first,
           complemento: complemento_first,
           bairro: bairro_first,
           cidade: cidade_first,
           estado: estado_first,
           cep: cep_first
        } = this.firstAdress;

        if ( logradouro_first ) {

          await this.addFirstAddress({
            idpessoa,
            logradouro_first,
            numero_first,
            complemento_first,
            bairro_first,
            cidade_first,
            estado_first,
            cep_first
          });

        }

        const { 
           logradouro: {logradouro: endereco_logradouro}, 
           numero: endereco_numero, 
           complemento: endereco_complemento, 
           bairro: {bairro: endereco_bairro}, 
           cidade: {cidade: endereco_cidade}, 
           estado: {estado: endereco_estado}, 
           pais: {pais: endereco_pais}, 
           cep: endereco_cep
        } = this.enderecos.find(e => e.principal == true);

        let idcarrinho = this.carrinho.id;

        const { 
          formapagamento,
          iscartao,
          isboleto,
          cartao_nome,
          cartao_numero,
          cartao_validade_mes,
          cartao_validade_ano,
          cartao_codigo,
          nrparcela: nrparcela_selected,
        } = this.pagamentoData;

        let nrparcela = parseInt(nrparcela_selected.split(" x ")[0]);

        const {
          isvisual,
          visualobs,
          isfala,
          falaobs,
          isfisico,
          fisicoobs,
          isintelectual,
          intelectualobs,
          isauditivo,
          auditivoobs,
        } = this.pnedata;

        let ispne = this.ispne;

        let message = await this.$store.dispatch('carrinho/fetchPagamento', {
          iscartao,
          isboleto,
          cartao_nome,
          cartao_numero,
          cartao_validade_mes,
          cartao_validade_ano,
          cartao_codigo,
          nrparcela,
          idpessoa,
          nome,
          cpf,
          rg,
          email,
          idcarrinho,
          endereco_logradouro: endereco_logradouro || logradouro_first,
          endereco_numero: endereco_numero || numero_first,
          endereco_complemento: endereco_complemento || complemento_first,
          endereco_bairro: endereco_bairro || bairro_first,
          endereco_cidade: endereco_cidade || cidade_first,
          endereco_estado: endereco_estado || estado_first,
          endereco_pais: endereco_pais || 'Brasil',
          endereco_cep: endereco_cep || cep_first,
          isvisual,
          ispne,
          isvisual,
          visualobs,
          isfala,
          falaobs,
          isfisico,
          fisicoobs,
          isintelectual,
          intelectualobs,
          isauditivo,
          auditivoobs,
        });

      } else {
        this.ispaying = false;
        this.validationFailedMessage = "Há campos não preenchidos em 'Selecione a forma de pagamento'";
      }
    },
    simpleValidateForm,
    cartaoNoMask
  },
  components:{
    MyInput,
    MyInputAsSelect,
    MyCheckbox,
    Btn,
    Modal,
    MyInputAsSelect,
    SimpleCarrousel
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Resumo da compra',
      meta: {
        title: { name: 'title', content: 'Resumo da compra' },
        //description: { name: 'description', content: 'Uma sequência de cursos e conteúdos para você se tornar o profissional que o mercado procura' },
        keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: 'Resumo da compra' },
        //ogDescription: { name: 'og:description', content: 'Uma sequência de cursos e conteúdos para você se tornar o profissional que o mercado procura' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Resumo da compra' },
        //twDescription: { name: 'twitter:description', content: 'Uma sequência de cursos e conteúdos para você se tornar o profissional que o mercado procura' },
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
              "name": "Resumo da compra"
            }`
        }
      }
    }
  },
}
</script>

<style lang="scss">
@import '../../css/my_mixins';
.pagina-inscricao{
  padding-top: calc( 30px + 3vw);
  position: relative;

  $dimensionOfBalls: 26px;
  .adorno-blue-big-ball{
    position: relative;
    &::before{
      content: '';
      left: -#{$dimensionOfBalls + 15px};
      width: $dimensionOfBalls;
      height: $dimensionOfBalls;
      border-radius: 50%;
      background: $primary;
      position: absolute;
      color: white;
      text-align: center;
      line-height: $dimensionOfBalls;
      font-size: #{ $dimensionOfBalls / 2};
    }
  }
  .forms{
    padding-left: 55px;
    @include d( sxs){
      padding-left: 15px;
      h4.adorno-blue-big-ball{
        margin-left: 41px;
        margin-top: 30px;
      }
    }
  }
  .input-note{
    display: inline-block;
    //width: 50%;
    padding-left: 7px;
    position: relative;
    font-size: 12px;
    line-height: 15px;
    color: #364E5E;
    &.rg{
      top: 5px;
    }
    &.cep{
      text-align: left;
      color: $primary;
    }
  }
  .input-radio-container{
    display: inline-block;
    padding-left: 7px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    color: #364E5E;
    label{
      font-size: 14px;
    }
    &.especial-need{
      width: 50%;
      p{
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 8px;
        display: block;
        text-align: left;
        color: #364E5E;
        width: 100%;
      }
      label{
        font-weight: 300;
        margin: 0;
        margin-right: 20px;
        position: relative;
        &::before{
          content: '';
          width: 24px;
          height: 24px;
          border-radius: 50%;
          left: -32px;
          background: white;
          border: 2px solid #364E5E;
          position: absolute;
        }
      }
      @include d(sxs){
        div{
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom:10px;
        }
      }
      div{
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      input{
        width: 14px;
        height: 14px;
        margin-right: 10px;
        margin-left: 10px;
        &:checked ~ label::before{
          content: '';
          font-family: "Font Awesome 5 Free";
          font-weight: 700;
          -webkit-font-smoothing: antialiased;
          text-align: center;
          line-height: 22px;
        }
      }
    }
    $dimensionOfCard: 90px;
    &.pay-method{
      div{
        width: $dimensionOfCard;
        height: $dimensionOfCard;
        border-radius: 4px;
        

        position: relative;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        margin-right: 15px;

        font-weight: 500;
      }
      label{
        margin-bottom: 15px;
        position: absolute;
        width: $dimensionOfCard;
        height: $dimensionOfCard;
        border: 2px solid #364E5E;
        border-radius: 4px;
        background: white;
        color: inherit;
        text-align: center;

        cursor: pointer;

        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        &::before{
          content: '';

          display: flex;
          align-items: flex-start;
          padding-top: 15px;
          justify-content: center;
          font-size: 31px;

          font-family: "Font Awesome 5 Free";
          font-weight: 700;
          -webkit-font-smoothing: antialiased;
        }
        &.credit::before{
          content: '\f09d';
        }
        &.billet::before{
          content: '\f02a';
        }
      }
      input:checked ~ label{
        background: #364E5E;
        color: white;
      }
    }
  }
  .input-check-container{
    display: inline-block;
    padding-left: 7px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    color: #364E5E;
    label{
      font-size: 14px;
    }
    &.especial-need{
      width: 100%;
      p{
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 8px;
        display: block;
        text-align: left;
        color: #364E5E;
        width: 100%;
      }
      label{
        font-weight: 300;
        margin: 0;
        margin-right: 20px;
        position: relative;
        width:45px;
        &::before{
          content: '';
          width: 24px;
          height: 24px;
          left: -27px;
          background: white;
          border: 2px solid #364E5E;
          position: absolute;
        }
      }
      div{
        display: flex;
        flex-direction: row;
        align-items: center;
        width:100%;
      }
      input[type=checkbox]{
        width: 14px;
        height: 14px;
        margin-right: 10px;
        margin-left: 10px;
        &:checked ~ label::before{
          content: '';
          font-family: "Font Awesome 5 Free";
          font-weight: 700;
          -webkit-font-smoothing: antialiased;
          text-align: center;
          line-height: 22px;
        }
      }
    }
    $dimensionOfCard: 90px;
    &.pay-method{
      div{
        width: $dimensionOfCard;
        height: $dimensionOfCard;
        border-radius: 4px;
        

        position: relative;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        margin-right: 15px;

        font-weight: 500;
      }
      label{
        margin-bottom: 15px;
        position: absolute;
        width: $dimensionOfCard;
        height: $dimensionOfCard;
        border: 2px solid #364E5E;
        border-radius: 4px;
        background: white;
        color: inherit;
        text-align: center;

        cursor: pointer;

        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        &::before{
          content: '';

          display: flex;
          align-items: flex-start;
          padding-top: 15px;
          justify-content: center;
          font-size: 31px;

          font-family: "Font Awesome 5 Free";
          font-weight: 700;
          -webkit-font-smoothing: antialiased;
        }
        &.credit::before{
          content: '\f09d';
        }
        &.billet::before{
          content: '\f02a';
        }
      }
      input:checked ~ label{
        background: #364E5E;
        color: white;
      }
    }
  }
  .sell-total{
    font-size: 18px;
    display: inline-block;
    padding: 0 7px;
  }
  .price-discount{
      color:red;
  }
  .payment-data{
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 0;
    padding-bottom: 15px;
  }
  .payment-data, .personal-data{
    margin-left: -7px;
    margin-right: -7px;
    margin-bottom: 30px;
  }
  .btn-component-container{
    padding: 0 7px;
  }
  .call-to-action-area{
    margin: 25px -7px 185px;
    > * {
      display: inline-block;
    }
    p {
      margin-top: 10px;
    }
    @include d(sxs){
      margin: 15px -7px 30px;
    }
  }
  .securit-stamp{
    position: absolute;
    text-align: center;
    display: block;
    bottom: 0;
    width: 100%;

    color: #364e5e7a;
    font-size: 16px;
  }
  .financial-data{
    .product{
      padding: 5px 0;
      p{
        font-weight: 300;
        font-size: 14px;
        color: #364E5E;
        margin-bottom: 10px;
      }
      .more-details{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 0;
      }
      h5{
        font-size: 16px;
        line-height: 18px;
        font-weight: normal;
        color: #272727;
        max-width: 220px;
      }
      button{
        display: block;
        margin-left: auto;
        color: $primary;
      }
    }
    ul{
      border-bottom: 1px solid #DDDDDD;
      padding: 5px 0;
      margin-bottom: 10px;
    }
    div{
      &.ticket{
        width: 100%;
        text-align: left;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid #DDDDDD;
        form.cupom-input{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          p{
            color: #f40a0a;
            font-weight:bold;
            margin:0px;
          }
          button{
            margin-top:15px;
            border: 2px solid #0A88F4;
            background: transparent;
            color: #0A88F4;
          }
        }
      }
    }
    button{
      font-weight: 300;
      font-size: 14px;
      color: #0A88F4;
    }
    .financial-numbers{
      display: flex;
      justify-content: space-between;
      font-weight: 500;
      font-size: 18px;
      color: #272727;
    }
  }
  .cod-security{
    label{
      white-space: nowrap;
    }
  }
  .section-title {
    margin-bottom: 26px;
    span{
        color:#0A88F4;
        font-size:1.2rem;
    }
  }
  .address-list {
    .add-address {
      margin-bottom: 48px;
      font-weight: 300;
      font-size: 14px;
      text-decoration-line: underline;
      color: #0A88F4;
      border: none;
      background: transparent;
    }
  }
  .address-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: #364E5E;
    margin: 0 -7px; 
    .row{
      margin:0px;
      width:100%;
    }
    .address-card {
      margin: 0 7px 80px;
      border: 2px solid #364E5E;
      border-radius: 4px;
      position: relative;
      p {
        margin-bottom: 0;
      }
      .title {
        font-weight: 500;
        font-size: 14px;
        padding: 20px 24px 20px;
        border-bottom: 1px solid #DDDDDD;
      }
      .text-content {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        padding: 16px 24px 0;
        margin-bottom: 26px;
      }
      .call-to-action {
        padding: 0 24px;
        margin-bottom: 34px;
        button:not(.main-action) {
          border: none;
          background: transparent;
          text-decoration: underline;
          color: #0A88F4;
          font-weight: 300;
          font-size: 14px;
          line-height: 15px;
        }
      }
      .main-action {
        position: absolute;
        left: 0;
        bottom: -58px;
      }
      .ghost-btn {
        border: 2px solid #0A88F4;
        background: transparent;
        color: #0A88F4;
      }
    }
    @include d(lm) {
      .address-card {
        width: calc(50% - 14px);
      }
      button {
        max-width: 180px;
      }
    }
    @include d(sxs) {
      .address-card {
        width: 100%;
      }
    }
  }
  .form-register-checkbox{
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    input{
      height: 24px;
      width: 24px;
      padding: 2px;
      margin-right: 10px;
    }
  }
  #validation-message{
    color:red;
  }
}
</style>