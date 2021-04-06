import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import blog from './blog'
import carrinho from './Carrinho'
import exame from './exame'
import institucionalDepoimentos from './institucional-depoimentos'
import pagamento from './Pagamento'
import searchResults from './search-results'
import treinamentosCurso from './treinamentos-curso'
import treinamentosCategorias from './treinamentos-categorias'
import treinamentosCursosSimplificados from './treinamento-curso-simplificado'
import treinamentosFormacao from './treinamento-formacao'
import treinamentosFormacaoSimplificada from './treinamento-formacao-simplificada'
import treinamentosTags from './treinamentos-tags'
import treinamentoOferta from './treinamento-oferta'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      app,blog,carrinho,exame,institucionalDepoimentos,pagamento,searchResults,treinamentosCurso,treinamentosCategorias,treinamentosCursosSimplificados,treinamentosFormacao,treinamentosFormacaoSimplificada,treinamentoOferta,treinamentosTags
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
