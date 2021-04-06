import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_CURSO = `${API}/mba_pos/`

export async function fetchDataMba (context, page = 1) {
  let url = `${API_URL_CURSO}/mba?page=${page}`
  let hashCode = hash.MD5( url)
  let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

  if( payloadCached){
      context.commit('UPDATE_MBA_SIMPLIFICADA', payloadCached)
  } else {
      try{
          let resp = await axios.get( url)
          let data = resp.data
          
          context.commit('UPDATE_MBA_SIMPLIFICADA', data)
          window.sessionStorage.setItem( hashCode, JSON.stringify( data))
      }catch( error){
          console.log(error)
      }
  }
}

export async function fetchDataPos (context, page = 1) {
  let url = `${API_URL_CURSO}/pos?page=${page}`
  let hashCode = hash.MD5( url)
  let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

  if( payloadCached){
      context.commit('UPDATE_POS_SIMPLIFICADA', payloadCached)
  } else {
      try{
          let resp = await axios.get( url)
          let data = resp.data
          
          context.commit('UPDATE_POS_SIMPLIFICADA', data)
          window.sessionStorage.setItem( hashCode, JSON.stringify( data))
      }catch( error){
          console.log(error)
      }
  }
}
