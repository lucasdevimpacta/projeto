import axios from 'axios'
import hash from 'object-hash'
const API = process.env.API

export function updateDeviceSize (context) {
  let result = '';
  if( globalThis.matchMedia('(min-width: 992px)').matches){
    result = 'lg';
  } else if( globalThis.matchMedia('(min-width: 768px)').matches){
    result = 'md';
  } else if( globalThis.matchMedia('(min-width: 576px)').matches){
    result = 'sm';
  } else {
    result = 'xs';
  }

  context.commit('UPDATE_DEVICE_SIZE', result);
}

export async function signNewsletter (context, payload) {
  let url = `${API}/formularios/newsletter`
  context.commit('UPDATE_SIGN_NEWSLETTER_STATUS', null)
  context.commit('UPDATE_SIGN_NEWSLETTER_SENDING', true)
  try{
      let resp = await axios.post( url, payload)
      let data = resp.status === 201
      context.commit('UPDATE_SIGN_NEWSLETTER_STATUS', data)
  }catch( error){
      context.commit('UPDATE_SIGN_NEWSLETTER_STATUS', false)
      console.log(error)
  }finally{
    context.commit('UPDATE_SIGN_NEWSLETTER_SENDING', false)
    setTimeout(() => context.commit('UPDATE_SIGN_NEWSLETTER_STATUS', null), 30000)
  }
}

export async function signNewsAboutCoursesDate (context, payload) {
  let url = `${API}/formularios/novasdatas`
  context.commit('UPDATE_SIGN_NEW_DATE_TO_COURSE_STATUS', null)
  context.commit('UPDATE_SIGN_NEW_DATE_TO_COURSE_SENDING', true)
  try{
      let periodo = '';
      if(payload.diurno){periodo += 'diurno,'}
      if(payload.noturno){periodo += 'noturno,'}
      if(payload.sabado){periodo += 'sabado,'}
      if(payload.domingo){periodo += 'domingo,'}
      if(payload.manha){periodo += 'manha,'}
      if(payload.tarde){periodo += 'tarde'}

      payload.periodo = periodo;
      
      let resp = await axios.post( url, payload)
      let data = resp.status === 201
      context.commit('UPDATE_SIGN_NEW_DATE_TO_COURSE_STATUS', data)
  }catch( error){
      context.commit('UPDATE_SIGN_NEW_DATE_TO_COURSE_STATUS', false)
      console.log(error)
  }finally{
    context.commit('UPDATE_SIGN_NEW_DATE_TO_COURSE_SENDING', false)
    setTimeout(() => context.commit('UPDATE_SIGN_NEW_DATE_TO_COURSE_STATUS', null), 30000)
  }
}

export async function signDownloadCourseContent (context, payload) {
  let url = `${API}/formularios/download-conteudo-treinamento`
  context.commit('UPDATE_SIGN_DOWNLOAD_COURSE_CONTENT_STATUS', null)
  context.commit('UPDATE_SIGN_DOWNLOAD_COURSE_CONTENT_SENDING', true)
  try{
      let resp = await axios.post( url, payload)
      let data = resp.status === 201
      context.commit('UPDATE_SIGN_DOWNLOAD_COURSE_CONTENT_STATUS', data)
  }catch( error){
      context.commit('UPDATE_SIGN_DOWNLOAD_COURSE_CONTENT_STATUS', false)
      console.log(error)
  }finally{
    context.commit('UPDATE_SIGN_DOWNLOAD_COURSE_CONTENT_SENDING', false)
    setTimeout(() => context.commit('UPDATE_SIGN_DOWNLOAD_COURSE_CONTENT_STATUS', null), 30000)
  }
}

export async function scheduleExam (context, payload) {
  let url = `${API}/formularios/centroexames/`
  context.commit('UPDATE_SCHEDULE_EXAM_STATUS', {})
  context.commit('UPDATE_SCHEDULE_EXAM_SENDING', true)
  try{
      let resp = await axios.post( url, payload)
      let data = { status: resp.status === 200, protocolNumber: resp.data.data[0].numero_protocolo }
      context.commit('UPDATE_SCHEDULE_EXAM_STATUS', data)
  }catch( error){
      context.commit('UPDATE_SCHEDULE_EXAM_STATUS', { status: undefined, protocolNumber: undefined})
      console.log(error)
  }finally{
    context.commit('UPDATE_SCHEDULE_EXAM_SENDING', false)
  }
}

export async function fetchExames (context) {
  let url = `${API}/centroexames/exames`
  let hashCode = hash.MD5( url)
  let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

  if( payloadCached){
      context.commit('UPDATE_EXAM_LIST', payloadCached)
  } else {
      try{
          let resp = await axios.get( url)
          let data = resp.data 
          context.commit('UPDATE_EXAM_LIST', data)
          window.sessionStorage.setItem( hashCode, JSON.stringify( data))
      }catch( error){
          console.log(error)
      }
  }
}

export async function sendContactMessage (context, payload) {
  let url = `${API}/formularios/contato/`
  context.commit('UPDATE_CONTACT_US_STATUS', null)
  context.commit('UPDATE_CONTACT_US_SENDING', true)
  try{
      let resp = await axios.post( url, payload)
      let data = resp.status === 201
      context.commit('UPDATE_CONTACT_US_STATUS', data)
  }catch( error){
      context.commit('UPDATE_CONTACT_US_STATUS', false)
      console.log(error)
  }finally{
    context.commit('UPDATE_CONTACT_US_SENDING', false)
  }
}

export async function login (context, payload) {
  const url =  `${API}/account/treinamento/login`

  context.commit('UPDATE_LOGIN_STATUS', null)
  context.commit('UPDATE_LOGIN_SENDING', true)
  try{
    const resp = await axios.post( url, payload)
    resp.status === 200 || throw new Error(`Falha no login http - ${resp.status} ao invés de 200`)
    const data = resp.data.data
    context.commit('UPDATE_LOGIN_STATUS', true)
    context.commit('UPDATE_USER', data)
    window.sessionStorage.setItem( 'user', JSON.stringify( data))
  }catch( error){
    context.commit('UPDATE_LOGIN_STATUS', false)
    window.alert('Falha no login!')
    console.log(error)
  }finally{
    context.commit('UPDATE_LOGIN_SENDING', false)
  }
}

export async function forgetpassword(context, payload){
  const url =  `${API}/account/treinamento/forget`

  const resp = await axios.post( url, payload)
  
}

export async function changepassword(context, payload){
  const url =  `${API}/account/treinamento/login/edit`

  const resp = await axios.post( url, payload)
  
  try{

    context.commit('UPDATE_RECOVER_USER_SUCCESS', true);

  }catch( error){
    context.commit('UPDATE_RECOVER_USER_SUCCESS', false);
    window.alert('Falha na redefinição de senha! Tente novamente mais tarde')
  }

}

export async function validateRecoverString(context, payload){
  const url =  `${API}/account/treinamento/forget/validate`

  const resp = await axios.post( url, payload);

  context.commit('UPDATE_RECOVER_USER', resp.data);
  
}

export async function loginSession (context) {
  let payloadCached = JSON.parse( window.sessionStorage.getItem( 'user'))

  if( payloadCached){
      context.commit('UPDATE_USER', payloadCached)
      context.commit('UPDATE_LOGIN_STATUS', true)
  }
}

export async function signup (context, payload) {
  const url =  `${API}/account/treinamento/signup`
  context.commit('UPDATE_LOGIN_STATUS', null)
  context.commit('UPDATE_LOGIN_SENDING', true)
  try {
    const resp = await axios.post( url, payload)
    resp.status === 200 || throw new Error(`Falha no cadastro http - ${resp.status} ao invés de 200`)
    const { email, senha } = payload
    context.commit('RESET_USER_AND_RELATED')
    await this.dispatch('app/login', { email, senha })
    window.location.href = "login";
  }catch( error){
    context.commit('UPDATE_LOGIN_STATUS', false)
    window.alert('Falha no login!')
    console.log(error)
  }finally{
    context.commit('UPDATE_LOGIN_SENDING', false)
  }
}

export async function fetchYourWaySemiAnual(context, payload){

  const url =  `${API}/carrinho/yourway/premium/semiannual`
  const resp = await axios.post( url)

  let hashCode = hash.MD5('CARRINHO_IMPACTA')
  let data = resp.data 
  window.sessionStorage.setItem( hashCode, JSON.stringify( data))

}

export async function fetchYourWayAnual(context, payload){

  const url =  `${API}/carrinho/yourway/premium/yearly` 
  const resp = await axios.post( url)

  let hashCode = hash.MD5('CARRINHO_IMPACTA')
  let data = resp.data 
  window.sessionStorage.setItem( hashCode, JSON.stringify( data))

}

export async function fetchYourWayFree(context, payload){

  const url =  `${API}/treinamento/edools/your-way/free` 
  const resp = await axios.post( url, payload)

  try{

    let data = resp.data;
    var w = window.open();

    w.location.href = "http://account.impacta.com.br/loginExterno.php?d="+data.data.key;

  }catch(e){

    alert(error.response.data.details[0]);    

  }

}

export async function addAddress(context, payload){

  const url =  `${API}/pessoa/endereco/add` 
  const resp = await axios.post( url, payload);

  return resp;

}

export async function removeAddress(context, id){
  const url =  `${API}/pessoa/endereco/remove` 
  const resp = await axios.post( url, payload);
}

export async function getCepData(context, cep){

    return new Promise((resolve, reject) =>{

      var xml = new XMLHttpRequest();
      xml.open("GET",`https://viacep.com.br/ws/${cep}/json/`);

      xml.onreadystatechange = async function() {

          if ( this.readyState == 4 ) {
              let response = JSON.parse(this.response);
              switch(this.status){
                  case 200:
                      resolve(response);
                      break;
              }
          }
      }

      xml.send();
    });

}

export async function fetchFormacao(context, payload){

  const url =  `${API}/carrinho/formacao/comprar` 
  let hashCode = hash.MD5('CARRINHO_IMPACTA');
  let hashFormacao = hash.MD5('FORMACAO');
  let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
  let formacaoCached = JSON.parse( window.sessionStorage.getItem( hashFormacao))

  if( formacaoCached ){

    context.commit('UPDATE_BUYING_FORMATION',true);
    context.commit('UPDATE_TITULO_FORMATION', formacaoCached.formacao);
  } else if (payload != undefined ) {
    try{

      const resp = await axios.post( url, payload)
      let data = resp.data 

      window.sessionStorage.setItem( hashCode, JSON.stringify( data))
      window.sessionStorage.setItem( hashFormacao, JSON.stringify( payload))
      context.commit('UPDATE_BUYING_FORMATION',true);
      context.commit('UPDATE_TITULO_FORMATION', payload.formacao);
    }catch(e){
      alert("Ocorreu um erro tente novamente!");

    }
  }
}

export async function sendEmailFormacao(context, payload){

  const url =  `${API}/emails/formacao` 
  const resp = await axios.post( url, payload);

  let hashFormacao = hash.MD5('FORMACAO');
  window.sessionStorage.removeItem(hashFormacao);

}