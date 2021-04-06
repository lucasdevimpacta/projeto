export default class Categoria{
  constructor(){
    this.id = 0;
    this.descricao = '';
    this.categoria = '';
    this.slug = '';
    this.count_itens = 0;
    this.icon = {}
  }

  static buildCategoria( objReceiveid) {
    let thisObj = new Categoria()
    Object.keys( thisObj).map( key => {
        thisObj[key] = objReceiveid[key] || this[key]
    })
    return thisObj
  }
}