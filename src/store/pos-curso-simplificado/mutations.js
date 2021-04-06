import PosSimplificada from '../model/PosSimplificada'

export function UPDATE_POS_SIMPLIFICADA (state, payload) {
  state.pos.data = payload.data.map( curso => PosSimplificada.buildPosSimplificada( curso))
  state.pos.metadata = payload.metadata
}
export function UPDATE_MBA_SIMPLIFICADA (state, payload) {
  state.mba.data = payload.data.map( curso => PosSimplificada.buildPosSimplificada( curso))
  state.mba.metadata = payload.metadata
}
