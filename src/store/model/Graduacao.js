export default class Graduacao{
  constructor(){
    this.titulo = '';
    this.subtitulo_curto = '';
    this.icon = {};
    this.modalidade = '';
    this.modalidades_alternativas = [];
    this.carga_horaria = 0;
    this.duracao = 0;
    this.tipo_curso = '';
    this.subtitulo_longo = '';
    this.sobre_curso_conteudo = [];
    this.conteudo_programatico = []
    this.url_video_apresentacao = '';
    this.link_download_conteudo_curso = '';
    this.imagem_capa = '';
    this.id_coordenador = 0;
    this.diferenciais_curso = [];
    this.premios_curso = [];
    this.id = 0
  }

  static buildGraduacao( objReceiveid) {
    let thisObj = new Graduacao()
    Object.keys( thisObj).map( key => {
        thisObj[key] = objReceiveid[key] || this[key]
    })
    return thisObj
  }
}