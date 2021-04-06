import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_BUSCA = `${API}/treinamento/busca`

export async function fetchDataByQueryValue (context, { page, query }) {
    let url = `${API_BUSCA}?page=${page}&busca=${query}`

    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    
    if( payloadCached){
        context.commit('UPDATE_SEARCH_RESULTS', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)            
            let data = resp.data
            
            context.commit('UPDATE_SEARCH_RESULTS', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}
