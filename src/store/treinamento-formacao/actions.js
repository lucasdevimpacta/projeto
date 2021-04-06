import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_FORMACAO = `${API}/treinamento/formacao/`
const API_URL_CURSO_SIMPLIFICADO = `${API}/treinamento/curso-simplificado/`

export async function fetchDataFormacao(context, slug) {
    let url = `${API_URL_FORMACAO}${slug}`
    let hashCode = hash.MD5( url)
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('UPDATE_FORMACAO', payloadCached)
        this.dispatch( 'treinamentosFormacao/fetchDataFormacaoCourses', {
                composicao_cursos: payloadCached.data.composicao_cursos,
                niveis_ordem: payloadCached.data.niveis_ordem
        })
    } else {
        try{
            let resp = await axios.get( url)
            let data = resp.data 
                
            context.commit('UPDATE_FORMACAO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
            this.dispatch( 'treinamentosFormacao/fetchDataFormacaoCourses', {
                composicao_cursos: data.data.composicao_cursos,
                niveis_ordem: data.data.niveis_ordem
            })
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchDataFormacaoCourses( context, {composicao_cursos, niveis_ordem}) {
    const getItem = async ( id_course, type) => {
        let url = `${API_URL_CURSO_SIMPLIFICADO}${id_course}`
        let hashCode = hash.MD5( url)
        let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

        if( payloadCached){
            context.commit('UPDATE_FORMACAO_CURSOS_CONTENT', {data: payloadCached, type})
        } else {
            try{
                let resp = await axios.get( url)
                let data = resp.data 

                context.commit('UPDATE_FORMACAO_CURSOS_CONTENT', {data,type})
                window.sessionStorage.setItem( hashCode, JSON.stringify( data))
            }catch( error){
                console.log( 'error in fetchDataFormacaoCourses:\n')
                console.log(error)
            }
        }
    }

    niveis_ordem.forEach((nivel, key) => {
        
        composicao_cursos[nivel].produtos.forEach(element => getItem(element.id, nivel));

    });
    // basico.forEach( id => getItem( id, 'basico'))
    // intermediario.forEach( id => getItem( id, 'intermediario'))
    // avancado.forEach( id => getItem( id, 'avancado'))
}
