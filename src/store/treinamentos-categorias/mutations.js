import Categoria from '../model/Categoria.js'

export function UPDATE_CATEGORIA (state, payload) {
  state.data = payload.data.map( cat => new Categoria.buildCategoria( cat))
  state.metadata = payload.metadata
}
