import Tag from '../model/Tag.js'

export function UPDATE_TAG (state, payload) {
  state.data = payload.data.map( rawTag => Tag.buildTag( rawTag)),
  state.metadata = payload.metadata
}
