import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_CURSO = `${API}/tecnico`

export async function fetchDataTecnicoSimplificado (context, page = 1) {
    let url = `${API_URL_CURSO}?page=${page}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    
    if( payloadCached){
        context.commit('UPDATE_TECNICO_SIMPLIFICADO', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_TECNICO_SIMPLIFICADO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}
