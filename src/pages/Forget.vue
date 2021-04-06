<template>
  <main class="pagina-login">
    <div class="container">
      <div class="my-card soft-shadow">
        <div class="my-card-header">
          <span class="text-uppercase destaque-500 active" v-if="user.codigo_pessoa > 0 && user.valid">Recuperar</span>
          <span class="text-uppercase destaque-500 active" v-else>Aviso</span>
        </div>
        <div class="my-card-body">
          <div v-if="user.codigo_pessoa > 0 && user.valid">
            <form @submit="setNewPassword">
              <h3 class="title destaque-500">Redefinir sua senha</h3>
              <MyInput placeHolder="Senha*" type="password" v-model="cadObj.password"/>
              <MyInput placeHolder="Confirmar senha*" type="password" :validation="e => passwordMatch(e, cadObj.password)"/>
              <div>
                <Btn type="submit" :loading="loginSending" tag='button' classNames="text-uppercase text-white" heightBtn="48px">
                  Alterar Senha
                </Btn> 
              </div>
              <div v-if="user.success" class="success-message">
                Senha redefinida com sucesso, direcionando para página de login em 3 segundos.
              </div>
            </form>
          </div>
          <div v-else class="invalid-hash">
            <span v-if="!user.codigo_pessoa > 0"> Link inválido </span>
            <span v-else> Link expirou! </span>
          </div>
        </div>
        <div class="my-card-footer">
          <div class="btn-group">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Btn from '../components/Btn'
import MyInput from '../components/MyInput'
import MyCheckbox from '../components/MyCheckbox'

import { fullNameValidation, cpfMask, cpfValidation, emailValidation, phoneMask, passwordMatch, simpleValidateForm } from '../utils/helper'

export default {
  name: 'Login',
  props: {
    isRegisterMoment:{
      Type: Boolean,
      default: false
    },
    d:{
      Type: String,
    }
  },
  data(){
    return {
      cadObj:{
        password: ''
      },
      onForgetPassword:false,
      loginSending:false,
      codigo_pessoa:0
    }
  },
  mounted(){
    this.validateString();
  },
  computed: {
    user(){
      return this.$store.state.app.recover;
    }
  },
  methods: {
    async validateString(){
      await this.$store.dispatch( 'app/validateRecoverString', {hash: this.d});
    },
    async setNewPassword(e){
      e.preventDefault()

      let pessoa_id = this.user.codigo_pessoa

      if ( +pessoa_id > 0 ) {

        this.loginSending = true;

        const { currentTarget:[ { value: senha }, { value: senha_confirmacao } ] } = e

        await this.$store.dispatch( 'app/changepassword', { pessoa_id, senha, _method:'PUT' });

        this.loginSending = false;
        setTimeout(() => {
          location.href = 'login'
        },3000)
      }

    },
    passwordMatch,
    simpleValidateForm
  },
  components:{
    Btn,
    MyInput,
    MyCheckbox
  }
}
</script>

<style lang="scss">
@import '../css/my_mixins';
.pagina-login{
  height: 100%;
  color: #272727;
  .container{
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .my-card{
    margin-top: 40px;
    max-width: 360px;
    padding: 15px 0 40px;
    background: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .my-card-header{
    min-height: 45px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border-bottom: solid 1px #21212114;
    margin-bottom: 30px;
    span{
      padding: 15px;
      font-size: 14px;
      line-height: 18px;
      border: solid 3px transparent;
      cursor: pointer;
      &.active{
        border-bottom: solid 3px $primary;
      }
    }
  }
  .my-card-body{
    padding: 0 30px;
    margin-bottom: 20px;
    .invalid-hash{
      color:red;
      font-size:18px;
    }
    .success-message{
      color:green;
      font-size:18px;
      margin-top:10px;
    }
  }
  form{
    h3{
      font-size: 20px;
      text-align: center;
      margin-bottom: 25px;
    }
    .request-new-password-btn, > div{
      padding: 0 7px;
    }
    .request-new-password-btn{
      margin-bottom: 25px;
    }
    .my-input-component{
      font-size: 14px;
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
  }
  .my-card-footer{
    font-weight: 300;
    font-size: 14px;
    text-align: center;
    color: #364E5E;
    padding: 0 30px;
    .btn-outline{
      background: transparent;
      color: $primary !important;
      border: solid 2px $primary;
    }
    .btn-group{
      display: flex;
      padding: 0 7px;

      *.btn-component + *.btn-component{
        margin-left: 7px;
      }
    }
  }
}
</style>