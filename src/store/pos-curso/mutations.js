import Pos from '../model/Pos.js'

export function UPDATE_POS_CURSO ( state, payload){
  state.data = Pos.buildPos( payload.data[0])  //data sempre vem em forma de array
  state.metadata = payload.metadata
}
