export default class TecnicoSimplificado {
  constructor(){
    this.titulo = '';
    this.subtitulo_curto = '';
    this.icon = {};
    this.id = 0
  }
  
  static buildTecnicoSimplificado( objReceiveid) {
    let thisObj = new TecnicoSimplificado()
    Object.keys( thisObj).map( key => {
        thisObj[key] = objReceiveid[key] || this[key]
    })
    return thisObj
  }
}