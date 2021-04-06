import axios from 'axios'
import hash from 'object-hash'
const API = process.env.API

export async function getPosts (context) {
  let url = `${API}/blog`;
  let hashCode = hash.MD5( url)
  let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

  if( payloadCached){
      context.commit('UPDATE_BLOG', payloadCached)
  } else {
      try{
          let resp = await axios.get( url)
          let data = resp.data 
          
          context.commit('UPDATE_BLOG', data)
          window.sessionStorage.setItem( hashCode, JSON.stringify( data))
      }catch( error){
          console.log(error)
      }
  }

}