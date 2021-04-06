export default class TreinamentoSimplificado{
    constructor(){
        this.id = 0;
        this.produto = '';
        this.slug = '';
        this.carga_horaria = 0;
        this.modulo = 0;
        this.modalidade = '';
        this.imagem_capa = '';
        this.valor = 0;
        this.valor_promocional = 0;
        this.valor_avista = 0;
        this.parcela_maxima = 0
    }

    static buildTreinamentoSimplificado( objReceiveid) {
        let thisObj = new TreinamentoSimplificado()
        Object.keys( thisObj).map( key => {
            thisObj[key] = objReceiveid[key] || this[key]
        })
        return thisObj
    }
}