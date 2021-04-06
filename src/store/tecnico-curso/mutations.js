import Tecnico from '../model/Tecnico.js'

export function UPDATE_TECNICO_CURSO ( state, payload){
  state.data = Tecnico.buildTecnico( payload.data[0])   //data sempre é retornado como um array
  state.metadata = payload.metadata
}