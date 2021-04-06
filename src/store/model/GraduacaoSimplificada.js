export default class GraduacaoSimplificada{
  constructor(){
    this.titulo = '';
    this.subtitulo_curto = '';
    this.icon = {};
    this.id = 0
  }

  static buildGraduacaoSimplificada( objReceiveid) {
    let thisObj = new GraduacaoSimplificada()
    Object.keys( thisObj).map( key => {
        thisObj[key] = objReceiveid[key] || this[key]
    })
    return thisObj
  }
}