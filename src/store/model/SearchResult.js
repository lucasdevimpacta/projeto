const dictionary = {
  type: 'tipo',
  name: 'produto',
  short_description: 'detalhes',
  link: 'link',
  modulo: 'modulo',
  modalidade:'modalidade'
}

export default class SearchResult{
  constructor(){
    this.type = '',
    this.name = '',
    this.short_description = '',
    this.link = '',
    this.modulo = '',
    this.modalidade = ''
  }

  static buildSearchResult( objReceiveid) {
    let thisObj = new SearchResult()
    Object.keys( thisObj).map( key => {
        thisObj[key] = objReceiveid[dictionary[key] || key] || this[key]
    })
    return thisObj
  }
}