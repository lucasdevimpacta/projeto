export default class Blog{
  constructor(){
    this.id = 0;
    this.title = '';
    this.date = '';
    this.link = '';
    this.author = '';
    this.image = '';
  }

  static buildBlog( objReceiveid) {
    let thisObj = new Blog()
    Object.keys( thisObj).map( key => {
        thisObj[key] = objReceiveid[key] || this[key]
    })
    return thisObj
  }
}