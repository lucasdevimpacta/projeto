<template>
  <main class="pagina-pagamento-sucesso">
  	<div>
    	<i class="far fa-check-circle confirmation"></i>
    	<div class="card-sucess" v-if="pagamento.pagamento.data != undefined && pagamento.pagamento.data.idformapagamento != 51">
	    	<div>Seu pagamento está sendo processado</div>
	    	<div>Assim que for aprovado, será enviado um e-mail de confirmação do pagamento.</div>	
	    	<div v-if="formacao.bought">
	    		Também receberá um e-mail com instruções a respeito da formação adquirida
	    	</div>
    	</div>
    	<div class="boleto-sucess" v-else>
	    	<div>Boleto gerado com sucesso!</div>
	    	<div v-show="formacao.bought">
	    		Receberá um e-mail com instruções a respeito da formação adquirida
	    	</div>
	    	<div>Utilize o número do código de barras abaixo para realizar o pagamento</div>	
	    	<div>
	    		<span v-if="pagamento.pagamento.data != undefined">{{pagamento.pagamento.data.descodigodebarras}}</span>
	    		<span v-else></span>
	    	</div>	
    	</div>
    	<div v-if="pagamento.pagamento.data != undefined && pagamento.pagamento.data.idformapagamento != 51">
    		<a target="_blank" v-bind:href="'https://account.impacta.com.br/account/loginExterno.php?d='+user.autologin">
		        <Btn tag='button' classNames="text-uppercase text-white" heightBtn="48px">
		            Ir para Area do Aluno
		        </Btn> 
	        </a>
        </div>
        <div v-else>
        	<a  v-if="pagamento.pagamento.data != undefined" target="_blank" v-bind:href="pagamento.pagamento.data.despdf">
	        	<Btn tag='button' classNames="text-uppercase text-white" heightBtn="48px">
		            	Imprimir Boleto
		        </Btn> 
	        </a>
	        <a></a>
	        <a target="_blank" v-bind:href="'https://account.impacta.com.br/account/loginExterno.php?d='+user.autologin">
		        <Btn tag='button' classNames="text-uppercase text-white btn-outline" heightBtn="48px" >
		            Ir para Area do Aluno
		        </Btn> 
	        </a>
        </div>
    </div>
  </main>
</template>

<script>

import Btn from '../../components/Btn'

export default {
  nome: 'PagamentoSucesso',
  computed: {
    pagamento() {
      return this.$store.state.pagamento;
    },
    user() {
      return this.$store.state.app.user
    },
    formacao(){
      return this.$store.state.app.formacao
    }
  },
  async mounted(){
    this.getPagamento();
    await this.getFormacao();
    this.sendEmailFormacao();
  },
  methods: {
    async getPagamento(e){
      await this.$store.dispatch('pagamento/fetchGetPagamento');
    },
    async getFormacao(){
		this.$store.dispatch( 'app/fetchFormacao');
    },
    async sendEmailFormacao() {
      if ( this.formacao.bought ) {

    	let formacao = this.formacao.titulo;

    	const {email, nome_completo: pessoa} = this.user;

    	await this.$store.dispatch('app/sendEmailFormacao',{
		  formacao,
    	  email,
    	  pessoa
    	});
      }
    }
  },
  components:{
  	Btn
  },
  meta () {
    return {
      // this accesses the "title" property in your Vue "data";
      // whenever "title" prop changes, your meta will automatically update
      title: 'Pagamento em processo',
      meta: {
        title: { name: 'title', content: 'Pagamento em processo' },
        //description: { name: 'description', content: 'Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!' },
        //keywords: { name: 'keywords', content: 'certificações, cursos, oportunidades de mercado, capacitação profissional' },

        ogTitle: { name: 'og:title', content: 'Pagamento em processo' },
        //ogDescription: { name: 'og:description', content: 'Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!' },
        ogUrl: { name: 'og:url', content: this.$route.fullPath },

        twTitle: { name: 'twitter:title', content: 'Pagamento em processo' },
        //twDescription: { name: 'twitter:description', content: 'Já são mais de 5 mil Profissionais Certificados aqui na Impacta, garantindo destaque e melhores oportunidades na carreira: faça parte desse grupo e seja reconhecido na sua área!' },
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
              "name": "Pagamento em processo"
            }`
        }
      }
    }
  },
}
</script>

<style lang="scss">
	@import '../../css/my_mixins.scss';

	.pagina-pagamento-sucesso{
		padding-top: calc( 30px + 3vw);
    	position: relative;
    	> div{
    		width:400px;
    		text-align:center;
    		margin: 0 auto;
			.confirmation{
				color:#3CD3AD;
				font-size:80px;
				line-height:22px;
			}
			> div {
			   &.card-sucess{
					margin:20px 0 20px 0;
					div:nth-child(1){
						font-size:20px;
						font-weight:500;
						color: #272727;
						margin-bottom:10px;
						line-height:23px;
					}
					div:nth-child(2){
						font-size:16px;
						font-weight:300;
						color: #364E5E;
						line-height:22px;
					}
					div:nth-child(3){
						margin-top:10px;
						font-size:16px;
						font-weight:300;
						color: #364E5E;
						line-height:22px;
					}
				}
				&.boleto-sucess{
					margin:20px 0 20px 0;
					div:nth-child(1){
						font-size:20px;
						font-weight:500;
						color: #272727;
						line-height:23px;
						margin-bottom:10px;

					}	
					div:nth-child(2){
						margin-top:10px;
						margin-bottom:10px;
						font-size:16px;
						font-weight:300;
						color: #364E5E;
						line-height:22px;
					}	
					div:nth-child(3){
						font-size:15px;
						font-weight:300;
						color: #364E5E;
						line-height:22px;
						margin-bottom:10px;
					}
					div:nth-child(4){
						font-size: 16px;
						color: #364E5E;
						background: #F5F5F5;
						font-weight:500;
						border: 1px solid rgba(204, 204, 204, 0.8);
						margin-top:10px;
						box-sizing: border-box;
						border-radius: 6px;
						padding: 14px 17px;
					}		
				}
				.btn-outline {
					margin-top:20px;
				    background: transparent;
				    color: #0A88F4 !important;
				    border: solid 2px #0A88F4;
				}
			}
		}
	    @include d(xs) {
	    	> div{
    		width:320px;
    		text-align:center;
    		margin: 0 auto;
			.confirmation{
				color:#3CD3AD;
				font-size:60px;
				line-height:22px;
			}
			> div {
			   &.card-sucess{
					margin:20px 0 20px 0;
					div:nth-child(1){
						font-size:18px;
						font-weight:500;
						color: #272727;
						line-height:23px;
						margin-bottom:10px;
					}
					div:nth-child(2){
						font-size:16px;
						font-weight:300;
						color: #364E5E;
						line-height:22px;
						width:270px;
						margin-left:27px;
					}
				}
				&.boleto-sucess{
					margin:20px 0 20px 0;
					div:nth-child(1){
						font-size:18px;
						font-weight:500;
						color: #272727;
						line-height:23px;
						margin-bottom:10px;
					}
					div:nth-child(2){
						font-size:16px;
						font-weight:300;
						color: #364E5E;
						line-height:22px;
						margin-bottom:10px;
						width:270px;
						margin-left:27px;
					}
					div:nth-child(3){
						font-size: 16px;
						color: #364E5E;
						background: #F5F5F5;
						font-weight:500;
						border: 1px solid rgba(204, 204, 204, 0.8);
						margin-top:10px;
						box-sizing: border-box;
						border-radius: 6px;
						padding: 14px 17px;
					}				
				}
				.btn-outline {
					margin-top:20px;
				    background: transparent;
				    color: #0A88F4 !important;
				    border: solid 2px #0A88F4;
				}
			}
		}
	    }
	}
</style>