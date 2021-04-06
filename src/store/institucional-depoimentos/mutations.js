export function UPDATE_INSTITUCIONAL_DEPOIMENTOS( state, payload){
    let iInferior = payload.metadata.indice_inferior_pagina_atual || 1
    let isFirstLoad = ! (iInferior - 1)
    if( isFirstLoad){
        state.data = []
    }
    state.data.push( ...payload.data)
    state.metadata = payload.metadata
}
