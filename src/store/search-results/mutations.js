import SeachResult from '../model/SearchResult'

export function UPDATE_SEARCH_RESULTS(state, payload) {
  state.data = payload.data.map(r => SeachResult.buildSearchResult(r))
  state.metadata = payload.metadata
}