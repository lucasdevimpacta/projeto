import Carrinho from '../model/Carrinho.js'
import Pagamento from '../model/Pagamento.js'

export function CARRINHO (state, payload) {
  state.carrinho = Carrinho.buildCarrinho(payload.data);
}

export function SET_DATA (state, payload) {
  state.carrinho = Carrinho.buildCarrinho(payload.data);
}

export function SET_ERROR(state, payload){
  state.carrinho.errorMessage = payload;
}