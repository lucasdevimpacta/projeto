<template>
  <main class="pagina-login">
    <div class="container">
      <div v-if="onForgetPassword">
        <div class="my-card soft-shadow">
          <div class="my-card-header">
            <span class="text-uppercase destaque-500 active">Esqueci a senha</span>
          </div>
          <div class="my-card-body">
            <form @submit="recoverPassword" v-if="!sendForgetPassword">
              <h3 v-if="!loginStatus" class="title destaque-500">Informe o seu e-mail</h3>
              <MyInput placeHolder="E-mail" :readOnly="loginStatus" :value="user.email" type="email" />
              <div>
                <button v-if="!loginStatus" class="style-link-default text-color-primary request-new-password-btn" type="button" @click="goBackLogin">
                  Voltar
                </button>
                <Btn type="submit" :loading="onRecovering" tag='button' classNames="text-uppercase text-white" heightBtn="48px">
                  Recuperar Senha
                </Btn> 
              </div>
            </form>
            <div v-if="sendForgetPassword">
              <p>Enviamos um link para redefinição de senha para o e-mail</p>
              <p class="email-feedback">{{emailRecover}}</p>
               <button class="style-link-default text-color-primary request-new-password-btn" type="button" @click="reset">
                  Voltar para entrar
                </button>
            </div>
            <div v-else></div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="!isRegisterMoment" class="my-card soft-shadow">
          <div class="my-card-header">
            <span class="text-uppercase destaque-500 active">Login</span>
            <router-link tag="span" to="#cadastro" class="text-uppercase destaque-500" v-show="!loginStatus" >Cadastre-se</router-link>
          </div>
          <div class="my-card-body">
            <form @submit="login">
              <h3 v-if="!loginStatus" class="title destaque-500">Faça login com sua conta</h3>
              <h3 v-else class="title destaque-500">Logado</h3>
              <MyInput placeHolder="E-mail" :readOnly="loginStatus" :value="user.email" type="email" />
              <MyInput v-show="!loginStatus" placeHolder="Senha" type="password" />
              <button v-show="!loginStatus" class="style-link-default text-color-primary request-new-password-btn" type="button" @click="ForgetPassword">
                Esqueci a senha
              </button>
              <div>
                <Btn v-show="!loginStatus" type="submit" :loading="loginSending" tag='button' classNames="text-uppercase text-white" heightBtn="48px">
                  Entrar
                </Btn> 
                <a target="_blank" v-show="loginStatus" v-bind:href="'https://account.impacta.com.br/account/loginExterno.php?d='+user.autologin">
                  <Btn tag='button' classNames="text-uppercase text-white" heightBtn="48px">
                    Ir para Area do Aluno
                  </Btn> 
                </a>
              </div>
            </form>
          </div>
          <div class="my-card-footer">
            <!-- <p v-if="!loginStatus" >Ou entrar com</p>
            <div v-if="!loginStatus" class="btn-group">
              <Btn tag='button' classNames="text-uppercase text-white btn-outline" heightBtn="40px">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="12" viewBox="0 0 60 12" fill="none">
                  <path d="M4.66368 1.79903C3.94619 1.79903 3.76682 2.15884 3.76682 2.7885V3.95788H5.65022L5.47085 5.84686H3.76682V11.5138H1.52466V5.84686H0V3.95788H1.52466V2.87846C1.52466 0.989469 2.24215 0 4.39462 0C4.84305 0 5.38117 0 5.65022 0.0899517V1.79903" fill="#0A88F4"/>
                  <path d="M5.82959 7.46634C5.82959 5.39745 6.81614 3.77832 8.87892 3.77832C10.0448 3.77832 10.6726 4.31803 11.0314 5.1276V3.95822H13.1839V11.4242H11.0314V10.2548C10.6726 10.9745 10.0448 11.5142 8.87892 11.5142C6.81614 11.5142 5.82959 9.98499 5.82959 7.82615V7.46634ZM8.07174 8.00605C8.07174 9.08547 8.52017 9.89504 9.50672 9.89504C10.4036 9.89504 10.9417 9.17543 10.9417 8.18596V7.37639C10.9417 6.29697 10.4933 5.66731 9.50672 5.66731C8.52017 5.57736 8.07174 6.38692 8.07174 7.46634V8.00605Z" fill="#0A88F4"/>
                  <path d="M17.9371 3.86768C18.8339 3.86768 19.6411 4.04758 20.0895 4.40739L19.5514 6.02652C19.1927 5.84661 18.6546 5.66671 18.0268 5.66671C16.7711 5.66671 16.233 6.38632 16.233 7.5557V8.00545C16.233 9.17483 16.7711 9.89444 18.0268 9.89444C18.6546 9.89444 19.1927 9.71454 19.5514 9.53463L20.0895 11.1538C19.6411 11.5136 18.8339 11.6935 17.9371 11.6935C15.2465 11.6935 14.0806 10.2542 14.0806 8.00545V7.5557C14.0806 5.21695 15.2465 3.86768 17.9371 3.86768Z" fill="#0A88F4"/>
                  <path d="M20.3589 8.00545V7.37579C20.3589 5.21695 21.5248 3.86768 24.036 3.86768C26.3679 3.86768 27.3544 5.3069 27.3544 7.37579V8.54517H22.601C22.6907 9.53463 23.1392 9.98439 24.3948 9.98439C25.2019 9.98439 26.0988 9.80449 26.8163 9.53463L27.2647 11.0638C26.6369 11.3337 25.471 11.6035 24.3948 11.6035C21.4351 11.6035 20.3589 10.2542 20.3589 8.00545ZM22.601 7.01599H25.2916V6.83608C25.2916 6.02652 24.9329 5.39685 23.9463 5.39685C23.0495 5.39685 22.601 6.02652 22.601 7.01599Z" fill="#0A88F4"/>
                  <path d="M35.7848 8.0057C35.7848 10.0746 34.7982 11.6937 32.7354 11.6937C31.5695 11.6937 30.852 11.154 30.4933 10.4344V11.6038H28.3408V0.179903L30.583 0V5.0373C30.9417 4.40764 31.6592 3.86792 32.6458 3.86792C34.7085 3.86792 35.6951 5.3971 35.6951 7.55595L35.7848 8.0057ZM33.5426 7.46599C33.5426 6.38657 33.0942 5.66696 32.0179 5.66696C31.1211 5.66696 30.583 6.29662 30.583 7.37604V8.09566C30.583 9.17508 31.1211 9.80474 32.0179 9.80474C33.0942 9.80474 33.5426 8.99517 33.5426 8.0057V7.46599Z" fill="#0A88F4"/>
                  <path d="M36.5024 7.9155V7.5557C36.5024 5.39685 37.758 3.86768 40.1796 3.86768C42.6908 3.86768 43.9464 5.39685 43.9464 7.5557V7.9155C43.9464 10.0743 42.6908 11.6035 40.2693 11.6035C37.758 11.6035 36.5024 10.0743 36.5024 7.9155ZM41.7042 7.37579C41.7042 6.38632 41.2558 5.57676 40.2693 5.57676C39.193 5.57676 38.8343 6.38632 38.8343 7.37579V8.09541C38.8343 9.08488 39.2827 9.89444 40.2693 9.89444C41.3455 9.89444 41.7042 9.08488 41.7042 8.09541V7.37579Z" fill="#0A88F4"/>
                  <path d="M44.6636 7.9155V7.5557C44.6636 5.39685 45.9192 3.86768 48.3407 3.86768C50.8519 3.86768 52.0178 5.39685 52.0178 7.5557V7.9155C52.0178 10.0743 50.7622 11.6035 48.3407 11.6035C45.9192 11.6035 44.6636 10.0743 44.6636 7.9155ZM49.8654 7.37579C49.8654 6.38632 49.4169 5.57676 48.4304 5.57676C47.3542 5.57676 46.9954 6.38632 46.9954 7.37579V8.09541C46.9954 9.08488 47.4438 9.89444 48.4304 9.89444C49.5066 9.89444 49.8654 9.08488 49.8654 8.09541V7.37579Z" fill="#0A88F4"/>
                  <path d="M55.2465 7.55595L57.4887 3.95788H59.9102L57.4887 7.6459L59.9999 11.5138H57.5784L55.2465 7.8258V11.5138H53.0044V0.179903L55.2465 0" fill="#0A88F4"/>
                </svg>
              </Btn> 
              <Btn tag='button' classNames="text-uppercase text-white btn-outline" heightBtn="40px">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="17" viewBox="0 0 50 17" fill="none">
                  <path d="M21.3978 8.6632C21.3978 11.0312 19.5453 12.7761 17.2719 12.7761C14.9985 12.7761 13.146 11.0312 13.146 8.6632C13.146 6.27853 14.9985 4.55029 17.2719 4.55029C19.5453 4.55029 21.3978 6.27853 21.3978 8.6632ZM19.5916 8.6632C19.5916 7.18344 18.518 6.17098 17.2719 6.17098C16.0258 6.17098 14.9521 7.18344 14.9521 8.6632C14.9521 10.1281 16.0258 11.1554 17.2719 11.1554C18.518 11.1554 19.5916 10.1263 19.5916 8.6632Z" fill="#0A88F4"/>
                  <path d="M30.2977 8.6632C30.2977 11.0312 28.4452 12.7761 26.1718 12.7761C23.8984 12.7761 22.0459 11.0312 22.0459 8.6632C22.0459 6.28038 23.8984 4.55029 26.1718 4.55029C28.4452 4.55029 30.2977 6.27853 30.2977 8.6632ZM28.4915 8.6632C28.4915 7.18344 27.4179 6.17098 26.1718 6.17098C24.9257 6.17098 23.852 7.18344 23.852 8.6632C23.852 10.1281 24.9257 11.1554 26.1718 11.1554C27.4179 11.1554 28.4915 10.1263 28.4915 8.6632Z" fill="#0A88F4"/>
                  <path d="M38.828 4.79877V12.1827C38.828 15.2201 37.0367 16.4607 34.919 16.4607C32.9256 16.4607 31.7259 15.1274 31.2734 14.037L32.8459 13.3825C33.1259 14.0519 33.812 14.8418 34.9172 14.8418C36.2727 14.8418 37.1127 14.0055 37.1127 12.4312V11.8397H37.0497C36.6454 12.3385 35.8666 12.7742 34.8838 12.7742C32.8274 12.7742 30.9434 10.983 30.9434 8.67803C30.9434 6.35641 32.8274 4.55029 34.8838 4.55029C35.8648 4.55029 36.6436 4.98606 37.0497 5.47004H37.1127V4.80063H38.828V4.79877ZM37.2407 8.67803C37.2407 7.2298 36.2746 6.17098 35.0451 6.17098C33.799 6.17098 32.755 7.2298 32.755 8.67803C32.755 10.1114 33.799 11.1554 35.0451 11.1554C36.2746 11.1554 37.2407 10.1114 37.2407 8.67803Z" fill="#0A88F4"/>
                  <path d="M41.6557 0.470215V12.5234H39.894V0.470215H41.6557Z" fill="#0A88F4"/>
                  <path d="M48.5204 10.0163L49.9222 10.9509C49.4698 11.6203 48.3794 12.7737 46.4954 12.7737C44.159 12.7737 42.4141 10.9675 42.4141 8.66076C42.4141 6.21489 44.1738 4.54785 46.2933 4.54785C48.4277 4.54785 49.4716 6.24642 49.8128 7.16431L50.0001 7.6316L44.502 9.90872C44.923 10.7339 45.5776 11.1548 46.4954 11.1548C47.4152 11.1548 48.0531 10.7024 48.5204 10.0163ZM44.2053 8.53652L47.8806 7.0104C47.6785 6.49675 47.0703 6.13887 46.3545 6.13887C45.4366 6.13887 44.159 6.94921 44.2053 8.53652Z" fill="#0A88F4"/>
                  <path d="M6.47718 7.59163V5.8467H12.3573C12.4147 6.15081 12.4444 6.51055 12.4444 6.89996C12.4444 8.20912 12.0865 9.82795 10.9331 10.9813C9.81126 12.1496 8.37786 12.7726 6.47903 12.7726C2.95951 12.7726 0 9.90583 0 6.38631C0 2.86679 2.95951 0 6.47903 0C8.42608 0 9.81312 0.763984 10.8552 1.75976L9.62397 2.99103C8.87668 2.2901 7.86421 1.74492 6.47718 1.74492C3.90707 1.74492 1.89698 3.81621 1.89698 6.38631C1.89698 8.95641 3.90707 11.0277 6.47718 11.0277C8.14422 11.0277 9.09363 10.3583 9.70186 9.75007C10.1951 9.25681 10.5196 8.55217 10.6476 7.58977L6.47718 7.59163Z" fill="#0A88F4"/> 
                </svg>
              </Btn> 
              <Btn tag='button' classNames="text-uppercase text-white btn-outline" heightBtn="40px">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="15" viewBox="0 0 60 15" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M58.9136 0H46.1307C45.5193 0 45 0.483571 45 1.07929V13.92C45 14.5164 45.3407 15 45.9521 15H58.735C59.3471 15 60 14.5164 60 13.92V1.07929C60 0.483571 59.5257 0 58.9136 0ZM50.7143 5.71429H52.7336V6.74357H52.7557C53.0636 6.18857 53.9729 5.625 55.0971 5.625C57.255 5.625 57.8571 6.77071 57.8571 8.89286V12.8571H55.7143V9.28357C55.7143 8.33357 55.335 7.5 54.4479 7.5C53.3707 7.5 52.8571 8.22929 52.8571 9.42643V12.8571H50.7143V5.71429ZM47.1429 12.8571H49.2857V5.71429H47.1429V12.8571ZM49.5536 3.21429C49.5536 3.95429 48.9543 4.55357 48.2143 4.55357C47.4743 4.55357 46.875 3.95429 46.875 3.21429C46.875 2.47429 47.4743 1.875 48.2143 1.875C48.9543 1.875 49.5536 2.47429 49.5536 3.21429Z" fill="#0A88F4"/>
                  <path d="M42.8572 12.8569H40.8572V12.0062H40.8358C40.3908 12.5219 39.6179 12.9461 38.3079 12.9461C36.5222 12.9461 34.9844 11.6026 34.9844 9.29329C34.9844 7.09329 36.5001 5.62472 38.3751 5.62472C39.5358 5.62472 40.2565 6.03758 40.6929 6.56472H40.7144V2.14258H42.8572V12.8569ZM38.9137 7.23186C37.6887 7.23186 37.0001 8.10544 37.0001 9.26686C37.0001 10.429 37.6887 11.339 38.9137 11.339C40.1401 11.339 40.8572 10.4526 40.8572 9.26686C40.8572 8.04829 40.1401 7.23186 38.9137 7.23186Z" fill="#0A88F4"/>
                  <path d="M34.0438 11.7064C33.5381 12.3614 32.4966 12.9464 30.8152 12.9464C28.5716 12.9464 27.1431 11.4614 27.1431 9.12714C27.1431 7.05357 28.4374 5.625 30.8781 5.625C32.9859 5.625 34.2859 7.00929 34.2859 9.44429C34.2859 9.68786 34.2466 9.92857 34.2466 9.92857H29.1652L29.1774 10.1493C29.3181 10.765 29.7831 11.5179 30.8502 11.5179C31.7816 11.5179 32.4202 11.0171 32.7088 10.625L34.0438 11.7064ZM32.2238 8.57143C32.2381 7.81786 31.6852 7.05357 30.8138 7.05357C29.7766 7.05357 29.2231 7.86357 29.1652 8.57143H32.2238Z" fill="#0A88F4"/>
                  <path d="M27.1429 5.71401H24.6429L22.1429 8.57115V2.14258H20V12.8569H22.1429V9.28544L24.785 12.8569H27.315L24.2857 8.95186L27.1429 5.71401Z" fill="#0A88F4"/>
                  <path d="M11.4287 5.71429H13.448V6.74357H13.4701C13.778 6.18857 14.6873 5.625 15.8116 5.625C17.9694 5.625 18.5716 6.99429 18.5716 8.89286V12.8571H16.4287V9.28357C16.4287 8.23214 16.0494 7.5 15.1623 7.5C14.0851 7.5 13.5716 8.35286 13.5716 9.42643V12.8571H11.4287V5.71429Z" fill="#0A88F4"/>
                  <path d="M7.85735 12.8573H10.0002V5.71443H7.85735V12.8573ZM8.92949 4.50014C9.63949 4.50014 10.2145 3.92443 10.2145 3.21443C10.2145 2.50443 9.63949 1.92871 8.92949 1.92871C8.22021 1.92871 7.64307 2.50443 7.64307 3.21443C7.64307 3.92443 8.22021 4.50014 8.92949 4.50014Z" fill="#0A88F4"/>
                  <path d="M2.14286 2.14258H0V12.8569H6.42857V10.714H2.14286V2.14258Z" fill="#0A88F4"/>
                </svg>
              </Btn> 
            </div> -->
            <div class="btn-group">
              <Btn @click="logout" tag='button' classNames="text-uppercase text-white btn-outline" heightBtn="48px">
                Sair
              </Btn>
            </div>
          </div>
        </div>
        <div v-else class="my-card soft-shadow">
          <div class="my-card-header">
            <router-link tag="span" to="#" class="text-uppercase destaque-500">Login</router-link>
            <span v-if="!loginStatus" class="text-uppercase destaque-500 active">Cadastre-se</span>
          </div>
          <div class="my-card-body">
            <form id="signup" @submit="signUp">
              <h3 class="title destaque-500">Cadastre-se e aproveite<br>nossas vantagens!</h3>
              <MyInput placeHolder="Nome completo*" :validation="fullNameValidation" />
              <MyInput placeHolder="CPF*" :mask="cpfMask" :validation="cpfValidation" />
              <MyInput placeHolder="E-mail*" type="email" :validation="emailValidation" />
              <MyInput placeHolder="Telefone" :required="false" :mask="phoneMask" />
              <MyInput placeHolder="Senha*" type="password" v-model="cadObj.password" classNames="my-w-50" />
              <MyInput placeHolder="Confirmar senha*" type="password" :validation="e => passwordMatch(e, cadObj.password)" classNames="my-w-50" />
              <MyCheckbox
                label="Sou empresa"
                widthInput="100%"
                v-model="cadObj.eh_empresa"
                classNames="form-register-checkbox"
                :isRequired=false
              />
              <div>
                <Btn tag="button" type="submit" classNames="text-uppercase text-white" heightBtn="48px" :loading="onSignUp">
                  Criar conta
                </Btn> 
              </div>
            </form>
          </div>
          <div class="my-card-footer">
            <p>
              Ao se cadastrar, você concorda com a 
              <router-link class="style-link-default" :to="{ name: 'politicas-seguranca-privacidade'}">
                Política de Privacidade 
              </router-link>
               e 
              <router-link class="style-link-default" :to="{ name: 'termos-uso' }">
                Termos de Uso
              </router-link>
               e aceita receber novidades e ofertas da Impacta e parceiros.
            </p>
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
    }
  },
  data(){
    return {
      cadObj:{
        eh_empresa: false,
        password: ''
      },
      onForgetPassword:false,
      sendForgetPassword:false,
      onRecovering:false,
      emailRecover:'',
      onSignUp:false
    }
  },
  mounted(){
    this.getCarrinho();
  },
  computed: {
    user() {
      return this.$store.state.app.user
    },
    loginSending() {
      return this.$store.state.app.loginSending
    },
    loginStatus() {
      return this.$store.state.app.loginStatus
    },
    carrinho(){
      return this.$store.state.carrinho.carrinho;
    }
  },
  methods: {
    async getCarrinho(e){
      await this.$store.dispatch('carrinho/fetchGetCarrinho');
    },
    async login(e){
      e.preventDefault()
      const { currentTarget:[ { value: email }, { value: senha } ] } = e
      await this.$store.dispatch( 'app/login', { email, senha })

      if (typeof this.carrinho.produtos != "undefined" && this.loginStatus) {
        window.location.href = "inscricao";
      }
    },
    async recoverPassword(e){
      e.preventDefault()
      const { currentTarget:[ { value: email }] } = e
      this.emailRecover = email;
      this.onRecovering = true;
      await this.$store.dispatch( 'app/forgetpassword', { email})
      this.onRecovering = false;
      this.sendForgetPassword = true;
    },
    logout(e){
      e.preventDefault()
      this.$store.commit('app/RESET_USER_AND_RELATED', null)
    },
    signUp(e){
      e.preventDefault()
      if(this.simpleValidateForm(e)) {
        this.onSignUp = true;
        const { currentTarget:[ { value: nome }, { value: cpf }, { value: email }, { value: destelefone }, { value: senha }, { value: senha_confirmacao }, { value: sou_empresa } ] } = e
        this.$store.dispatch( 'app/signup', { nome, cpf, email, destelefone, senha, senha_confirmacao, sou_empresa: !!sou_empresa })

      }
    },
    ForgetPassword(){
      this.onForgetPassword = true;
    },
    goBackLogin(){
      this.onForgetPassword = false;
    },
    reset(){
      this.sendForgetPassword = false;
      this.onForgetPassword = false;
      this.emailRecover = '';
    },
    fullNameValidation,
    cpfMask,
    cpfValidation,
    emailValidation,
    phoneMask,
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
    > div{
      text-align:center;
      font-weight:100;
      .email-feedback{
        padding-bottom:15px;
        font-weight:400;
        border-bottom:1px solid #0A88F4;
      }
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