import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_CURSO = `${API}/treinamento/curso/`
const API_URL_CURSO_SLUG = `${API}/treinamento/curso/slug/`
const API_URL_AGENDA = `${API}/treinamento/agenda/`
const API_URL_AGENDA_SLUG = `${API}/treinamento/agenda/slug/`
const API_URL_COLABORADOR = `${API}/institucional/colaborador/`

export async function fetchDataTreinamentoWithAgenda (context, id) {
    let url = `${API_URL_CURSO}${id}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_CURSO', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data 
            
            context.commit('UPDATE_CURSO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
    this.dispatch( 'treinamentosCurso/fetchDataAgenda', id)
    this.dispatch( 'treinamentosCurso/fetchDataColaborador',id)
}

export async function fetchDataAgenda (context, id) {
    let url = `${API_URL_AGENDA}${id}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_AGENDA', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            context.commit('UPDATE_AGENDA', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataTreinamentoSlugWithAgenda (context, slug) {
    let url = `${API_URL_CURSO_SLUG}${slug}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_CURSO', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data 
            
            context.commit('UPDATE_CURSO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
    this.dispatch( 'treinamentosCurso/fetchDataAgendaSlug', slug)
    // this.dispatch( 'treinamentosCurso/fetchDataColaborador',id)
}

export async function fetchDataTreinamentoSlugWithAgendaServer (context, slug) {
    let url = `${API_URL_CURSO_SLUG}${slug}`
    let hashCode = hash.MD5( url)

    try{
        let resp = await axios.get( url)
        let data = resp.data 
        
        context.commit('UPDATE_CURSO', data)
    }catch( error){
        console.log(error)
    }
    this.dispatch( 'treinamentosCurso/fetchDataAgendaSlugServer', slug)
    // this.dispatch( 'treinamentosCurso/fetchDataColaborador',id)
}

export async function fetchDataAgendaSlug (context, slug) {
    let url = `${API_URL_AGENDA_SLUG}${slug}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_AGENDA', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            context.commit('UPDATE_AGENDA', data)
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataAgendaSlugServer (context, slug) {
    let url = `${API_URL_AGENDA_SLUG}${slug}`
    let hashCode = hash.MD5( url)
    try{
        let resp = await axios.get( url)
        let data = resp.data
        context.commit('UPDATE_AGENDA', data)
    }catch( error){
        console.log(error)
    }
}

export async function fetchDataColaborador (context, id) {
    let url = `${API_URL_COLABORADOR}${id}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_INSTRUTOR', payloadCached)
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data
            context.commit('UPDATE_INSTRUTOR', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }

}


