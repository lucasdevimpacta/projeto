const dictionary = {}

export default class Carrinho{
  constructor(){
    this.valor_desconto = 0;
    this.valor_bruto =0;
    this.valor_liquido = 0;
    this.produtos = [];
    this.id = 0;
    this.session = "";
    this.fechado = false;
    this.cadastrado_em = null;
    this.errorMessage = '';
    this.voucher = "";
  }

  static buildCarrinho( objReceiveid) {
    let thisObj = new Carrinho()
    Object.keys( thisObj).map( key => {
      thisObj[key] = objReceiveid[dictionary[key] || key] || thisObj[key]
    })
    return thisObj
  }

}