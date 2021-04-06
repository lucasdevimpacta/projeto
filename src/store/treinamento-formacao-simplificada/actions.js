import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_FORMACAO = `${API}/treinamento/formacao/`

export async function fetchDataFormacaoSimplificada (context) {
    let url = `${API_URL_FORMACAO}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_FORMACAO_SIMPLIFICADA', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data 
            
            context.commit('UPDATE_FORMACAO_SIMPLIFICADA', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}
