export default class Endereco{
  constructor(){
    this.id = 0;
    this.logradouro = {};
    this.numero = '';
    this.complemento = {};
    this.bairro = {};
    this.cidade = {};
    this.estado = {};
    this.pais = {};
    this.cep = '';
    this.complemento = '';
    this.principal = false;
  }

  static buildEndereco( objReceiveid) {
    let thisObj = new Endereco()
    Object.keys( thisObj).map( key => {
        thisObj[key] = objReceiveid[key] || this[key]
    })
    return thisObj
  }
}