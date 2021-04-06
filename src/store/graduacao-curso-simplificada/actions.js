import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_CURSO = `${API}/graduacao/`

export async function fetchDataBacharelado (context, page = 1) {
  let url = `${API_URL_CURSO}/bacharelado?page=${page}`
  let hashCode = hash.MD5( url)
  let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

  if( payloadCached){
      context.commit('UPDATE_GRADUACAO_BACHARELADO', payloadCached)
  } else {
      try{
          let resp = await axios.get( url)
          let data = resp.data
          
          context.commit('UPDATE_GRADUACAO_BACHARELADO', data)
          window.sessionStorage.setItem( hashCode, JSON.stringify( data))
      }catch( error){
          console.log(error)
      }
  }
}

export async function fetchDataTecnologo (context, page = 1) {
  let url = `${API_URL_CURSO}/tecnologo?page=${page}`
  let hashCode = hash.MD5( url)
  let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

  if( payloadCached){
      context.commit('UPDATE_GRADUACAO_TECNOLOGO', payloadCached)
  } else {
      try{
          let resp = await axios.get( url)
          let data = resp.data
          
          context.commit('UPDATE_GRADUACAO_TECNOLOGO', data)
          window.sessionStorage.setItem( hashCode, JSON.stringify( data))
      }catch( error){
          console.log(error)
      }
  }
}
