export default class Tag {
  constructor(){
    this.name = '';
    this.slug = '';
    this.count_itens = 0
  }

  static buildTag( objReceiveid) {
    let thisObj = new Tag()
    Object.keys( thisObj).map( key => {
        thisObj[key] = objReceiveid[key] || this[key]
    })
    return thisObj
  }
}