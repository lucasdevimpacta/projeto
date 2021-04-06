export default class Treinamento{
    constructor(){
        this.produto = '';
        this.slug = '';
        this.carga_horaria = 0;
        this.modulo = 0;
        this.modalidade = '';
        this.modalidadealternativas = [];
        this.lista_recursos = [];
        this.id_instrutor = 0;
        this.instrutor = {};
        this.imagem_capa = '';
        this.valor = 0;
        this.valor_promocional = 0;
        this.valor_avista = 0;
        this.parcela_maxima = 0;
        this.detalhes = '';
        this.total_historico_alunos = 0;
        this.url_video_apresentacao = '';
        this.sobre_curso_conteudo = [];
        this.conteudo_programatico = [];
        this.link_download_conteudo_curso = '';
        this.pre_requisitos = [];
        this.possui_ics = true;
        this.categoria = '';
        this.categoriaslug = '';
        this.tags = [];
        this.id = 0;
        this.hasonlineaovivo = false;
        this.onlineaovivoslug = '';
        this.agenda = {
            data:[],
            metadata:{}
        };
        this.sobre_curso = '';
    }

    static buildTreinamento( objReceiveid) {
        let thisObj = new Treinamento()
        Object.keys( thisObj).map( key => {
            thisObj[key] = objReceiveid[key] || thisObj[key]
        })
        return thisObj
    }
}