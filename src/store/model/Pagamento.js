const dictionary = {}

export default class Pagamento{
  constructor(){
    this.pagamento = [];
    this.recibo = [];
  }

  static buildPagamento( objReceiveid) {
    let thisObj = new Carrinho()
    Object.keys( thisObj).map( key => {
      thisObj[key] = objReceiveid[dictionary[key] || key] || thisObj[key]
    })
    return thisObj
  }

}