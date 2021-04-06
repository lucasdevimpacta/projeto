export default class Exames{
    constructor(){
        this.curso = '';
        this.id = 0;
    }

    static buildExame( objReceiveid) {
        let thisObj = new Exames()
        Object.keys( thisObj).map( key => {
            thisObj[key] = objReceiveid[key] || thisObj[key]
        })
        return thisObj
    }
}