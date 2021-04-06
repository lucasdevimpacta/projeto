export default class Tecnico{
  constructor(){
    this.titulo = '';
    this.subtitulo_curto = '';
    this.icon = {};
    this.modalidade = '';
    this.modalidades_alternativas = [];
    this.carga_horaria = 0;
    this.duracao = 0;
    this.subtitulo_longo = '';
    this.sobre_curso_conteudo = [];
    this.conteudo_programatico = [];
    this.link_download_conteudo_curso = '';
    this.imagem_capa = '';
    this.id_coordenador = 0;
    this.diferenciais_curso = [];
    this.id = 0
  }

  static buildTecnico( objReceiveid) {
    let thisObj = new Tecnico()
    Object.keys( thisObj).map( key => {
        thisObj[key] = objReceiveid[key] || this[key]
    })
    return thisObj
  }
}