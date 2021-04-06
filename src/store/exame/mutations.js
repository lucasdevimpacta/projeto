import Exame from '../model/Exames.js'

export function UPDATE_EXAME (state, payload) {
  state.data = []
  state.data.push( ...payload.data.map( exame => Exame.buildExame(exame)))
  state.metadata = payload.metadata
}
