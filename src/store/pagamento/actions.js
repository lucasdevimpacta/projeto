import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_CARRINHO = `${API}/carrinho/`


export async function fetchGetPagamento(context){
    let hashCode = hash.MD5('PAGAMENTO')
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    if ( payloadCached ) {
       context.commit('SET_PAGAMENTO', payloadCached)
    }   
}