import Graduacao from '../model/Graduacao.js'

export function UPDATE_GRADUACAO_CURSO (state, payload) {
  state.data = Graduacao.buildGraduacao( payload.data[0]) //data sempre vem como array
  state.metadata = payload.metadata
}
