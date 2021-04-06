import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_CURSO = `${API}/treinamento/tag-por-categoria`
const API_URL_CURSO_OFERTAS_TAG = `${API}/treinamento/cursos_oferta/tags/list`
const API_URL_OFERTA = `${API}/treinamento/cursos_oferta`

export async function fetchDataTag (context, {slug}) {
    let url = `${API_URL_CURSO}/${slug}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    
    if( payloadCached){
        context.commit('UPDATE_TAG', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_TAG', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataTagServer (context, {slug}) {
    let url = `${API_URL_CURSO}/${slug}`
    let hashCode = hash.MD5( url)
    
    try{
        let resp = await axios.get( url)
        let data = resp.data
        
        context.commit('UPDATE_TAG', data)
    }catch( error){
        console.log(error);
    }
}

// export async function fetchDataTagOfertas (context) {
//     let url = `${API_URL_OFERTA}/tags/list`
//     let hashCode = hash.MD5( url)
//     let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    
//     if( payloadCached){
//         context.commit('UPDATE_TAG', payloadCached)
//     } else {
//         try{
//             let resp = await axios.get( url)
//             let data = resp.data
            
//             context.commit('UPDATE_TAG', data)
//             window.sessionStorage.setItem( hashCode, JSON.stringify( data))
//         }catch( error){
//             console.log(error)
//         }
//     }
// }

export async function fetchDataTagYourWay (context) {
    let url = `${API}/treinamento/yourway/tags`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    
    if( payloadCached){
        context.commit('UPDATE_TAG', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_TAG', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataTagOfertas (context, {price = '', date = '', period = '', presencial = '', online = '', aovivo = ''}) {
    let url = `${API_URL_CURSO_OFERTAS_TAG}?price=${price}&date=${date}&period=${period}&presencial=${presencial}&online=${online}&aovivo=${aovivo}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    
    if( payloadCached){
        context.commit('UPDATE_TAG', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_TAG', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}