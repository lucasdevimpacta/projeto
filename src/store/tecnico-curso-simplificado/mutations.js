import TecnicoSimplificado from '../model/TecnicoSimplificado'

export function UPDATE_TECNICO_SIMPLIFICADO( state, payload){
  state.data = payload.data.map( curso => TecnicoSimplificado.buildTecnicoSimplificado( curso))
  state.metadata = payload.metadata
}