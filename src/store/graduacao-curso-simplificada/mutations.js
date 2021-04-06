import GraduacaoSimplificada from '../model/GraduacaoSimplificada.js'

export function UPDATE_GRADUACAO_BACHARELADO (state, payload) {
  state.bacharelado.data = payload.data.map( curso => GraduacaoSimplificada.buildGraduacaoSimplificada( curso) )
  state.bacharelado.metadata = payload.metadata
}
export function UPDATE_GRADUACAO_TECNOLOGO (state, payload) {
  state.tecnologo.data = payload.data.map( curso => GraduacaoSimplificada.buildGraduacaoSimplificada( curso))
  state.tecnologo.metadata = payload.metadata
}
