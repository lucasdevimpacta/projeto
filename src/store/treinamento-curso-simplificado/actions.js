import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_CURSO = `${API}/treinamento`

export async function fetchDataTreinamentoSimplificado (context, page = 1) {
    let url = `${API_URL_CURSO}?page=${page}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_CURSO_SIMPLIFICADO', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_CURSO_SIMPLIFICADO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataTreinamentoPerCategory (context, {slug, ordem, page, presencial, online, aovivo}) {
    let url = `${API_URL_CURSO}/categoria/${slug}?ordem=${ordem}&page=${page}&presencial=${presencial}&online=${online}&aovivo=${aovivo}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_CURSO_SIMPLIFICADO', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_CURSO_SIMPLIFICADO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataTreinamentoPerCategoryServer (context, {slug, ordem, page, presencial, online, aovivo}) {
    let url = `${API_URL_CURSO}/categoria/${slug}?ordem=${ordem}&page=${page}&presencial=${presencial}&online=${online}&aovivo=${aovivo}`
    let hashCode = hash.MD5( url)

    try{
        let resp = await axios.get( url)
        let data = resp.data
        
        context.commit('UPDATE_CURSO_SIMPLIFICADO', data)
    }catch( error){
        console.log(error)
    }
}

export async function fetchDataTreinamentoPerTag (context, {tag, ordem, page, presencial, online, aovivo}) {
    let url = `${API_URL_CURSO}/tag/${tag}?ordem=${ordem}&page=${page}&presencial=${presencial}&online=${online}&aovivo=${aovivo}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_CURSO_SIMPLIFICADO', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_CURSO_SIMPLIFICADO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataTreinamentoPerTagServer (context, {tag, ordem, page, presencial, online, aovivo}) {
    let url = `${API_URL_CURSO}/tag/${tag}?ordem=${ordem}&page=${page}&presencial=${presencial}&online=${online}&aovivo=${aovivo}`
    let hashCode = hash.MD5( url)

    try{
        let resp = await axios.get( url)
        let data = resp.data
        
        context.commit('UPDATE_CURSO_SIMPLIFICADO', data)
    }catch( error){
        console.log(error)
    }
}

export async function fetchDataTreinamentoOferta (context, { tagSlug = '', ...payload }) {
    let url = `${API_URL_CURSO}/cursos_oferta/${tagSlug}?${Object.entries(payload).filter(v => v[1] && !/todos/i.test(v[1])).map(v => v.join('=')).join('&')}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_CURSO_SIMPLIFICADO', payloadCached)
        context.commit('treinamentoOferta/UPDATE_CURSOS_OFERTAS_DATAS', payloadCached, {root:true})
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_CURSO_SIMPLIFICADO', data)
            context.commit('treinamentoOferta/UPDATE_CURSOS_OFERTAS_DATAS', data, {root:true})
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataTreinamentoOfertaServer (context, { tagSlug = '', ...payload }) {
    let url = `${API_URL_CURSO}/cursos_oferta/${tagSlug}?${Object.entries(payload).filter(v => v[1] && !/todos/i.test(v[1])).map(v => v.join('=')).join('&')}`
    let hashCode = hash.MD5( url)

    try{
        let resp = await axios.get( url)
        let data = resp.data
        
        context.commit('UPDATE_CURSO_SIMPLIFICADO', data)
        context.commit('treinamentoOferta/UPDATE_CURSOS_OFERTAS_DATAS', data, {root:true})
    }catch( error){
        console.log(error)
    }
}

export async function fetchDataTreinamentoYourWay (context, { tagSlug, page }) {
    let url = `${API_URL_CURSO}/yourway/cursos/${tagSlug}?page=${page}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_CURSO_SIMPLIFICADO', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_CURSO_SIMPLIFICADO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataTreinamentoRelated (context, id) {
    let url = `${API_URL_CURSO}/relacionado/${id}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_CURSO_SIMPLIFICADO', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            
            context.commit('UPDATE_CURSO_SIMPLIFICADO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}
