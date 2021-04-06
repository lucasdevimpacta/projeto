import TreinamentoSimplificado from '../model/TreinamentoSimplificado.js'

export function UPDATE_CURSO_SIMPLIFICADO (state, payload) {
    let iInferior = payload.metadata.indice_inferior_pagina_atual || 1
    let isFirstLoad = ! (iInferior - 1)
    // if( isFirstLoad){
        state.data = []
    // }
    state.data.push( ...payload.data.map( cursoSimplificado => TreinamentoSimplificado.buildTreinamentoSimplificado( cursoSimplificado)))
    state.metadata = payload.metadata
}
