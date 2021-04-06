import Treinamento from '../model/Treinamento.js'

export function UPDATE_CURSO (state, payload) {
    state.data = Treinamento.buildTreinamento(payload.data)
    state.metadata = payload.metadata
}

export function UPDATE_AGENDA ( state, payload){
    state.data.agenda = payload
}

export function UPDATE_INSTRUTOR ( state, payload){
    state.data.instrutor = payload.data[0]
}