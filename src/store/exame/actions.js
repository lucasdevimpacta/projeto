import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_EXAMES = `${API}/centroexames/`

export async function fetchDataExames (context) {
    let url = `${API_URL_EXAMES}exames`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    
    if( payloadCached){
        context.commit('UPDATE_EXAME', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data 
            
            context.commit('UPDATE_EXAME', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}



