const dictionary = {
  nome_completo: 'pessoa',
  codigo_pessoa: 'id'
}

export default class User{
  constructor(){
    this.nome_completo = '';
    this.codigo_pessoa = '';
    this.cpf = '';
    this.rg = '';
    this.email = '';
    this.pne = false;
    this.autologin = '';
  }

  static buildUser( objReceiveid) {
    let thisObj = new User()
    Object.keys( thisObj).map( key => {
      thisObj[key] = objReceiveid[dictionary[key] || key] || this[key]
    })
    return thisObj
  }
}