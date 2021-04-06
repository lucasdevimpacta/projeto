import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_CURSO = `${API}/mba_pos/curso/`

export async function fetchDataPos (context, id) {
    let url = `${API_URL_CURSO}${id}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    
    if( payloadCached){
        context.commit('UPDATE_POS_CURSO', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data 
            
            context.commit('UPDATE_POS_CURSO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}
