<template>
    <div :class="'course-content-component ' + classNames">
        <div class="row">
            <div :class="'text-about ' + classColumnTexts" v-html="renderContentEverVivisble()">
            </div>
        </div>
        <div class="row">
            <div v-if="otherContents" class="col" >
                <div class="titulos-inline text-uppercase">
                    <span v-for="({titulo}, i) in otherContents" :key="i" v-html="lineWrap(titulo)" :data-conteudo="'text_visibility_' + code +'_' + i" :class="'title ' + (i ? '': 'selected')" @click="selectTextContentToShow"></span>
                </div>
                <hr>
                <div class="conteudo-to-show">
                    <div v-for="({conteudo}, i) in otherContents" :key="i" v-html="conteudo" :id="'text_visibility_' + code +'_' + i" :class="'content ' + (i ? '': 'show')"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CourseContent',
    data(){
        return{
            code: (Math.random() * 100).toFixed(0),
            otherContents: null
        }
    },
    props:{
        content:{
            required: true,
            type: Array
        },
        classNames:{
            type: String,
            default: ''
        },
        classColumnTexts:{
            type: String,
            default: ''
        }
    },
    computed:{
        contentEverVisible(){
            let numMaxBeginVisible = 4
            if( this.content.length <= numMaxBeginVisible){
                return this.content
            } else {
                let cutIndex = numMaxBeginVisible - 1
                this.otherContents = this.content.filter( ( e, i) => i >= cutIndex )
                return this.content.filter( ( e, i) => i < cutIndex )
            }
        }
    },
    methods:{
        renderContentEverVivisble(){
            return this.contentEverVisible.reduce( ( a, e, i) => a += `${e.titulo}${e.conteudo}`,'')
        },
        selectTextContentToShow(event){
            let idTarget = event.currentTarget.dataset.conteudo
            let valToQuery = idTarget.match(/.+_/)[0]

            Object.assign( [], document.querySelectorAll(`*[id*='${valToQuery}'`))
            .forEach( e => {
                if( e.id == idTarget){
                    e.classList.add('show')
                } else {
                    e.classList.remove('show')
                }
            })

            Object.assign( [], document.querySelectorAll(`*[data-conteudo*='${valToQuery}'`))
            .forEach( e => {
                if( e.dataset.conteudo == idTarget){
                    e.classList.add('selected')
                } else {
                    e.classList.remove('selected')
                }
            })
        },
        lineWrap(str){
            let len = str.length
            if( len > 20){
                let halfLen = (str.length / 2).toFixed(0)
                let iMax = str.length - 1
                for( let i = halfLen; i < iMax; i++){
                    if(str.charAt(i) == ' '){
                        return str.slice(0,i) + '<br>' + str.slice(i + 1, len)
                    }
                }
            }
            return str
        }
    }
}
</script>

<style lang="scss">
    .course-content-component{
        h1, h2, h3, h4, h5, h6{
            font-size: 22px;
            line-height: 25px;
        }
        p{
            font-weight: 300;
            font-size: 16px;
            line-height: 30px;
        }
        .content{
            display: none;
            &.show{
                display: block;
            }
        }
        .titulos-inline{
            display: flex;
            justify-content: flex-start;
            color: #27272766;
            > *{
                margin-right: 25px;
                margin-bottom: 0;
                padding-bottom: 14px;
                &.selected{
                    color: #272727;
                    font-weight: 500;
                    border-bottom: 3px solid #0A88F4;
                    position: relative;
                }
            }
            h1, h2, h3, h4, h5, h6{
                font-size: 14px;
                line-height: 18px;
            }
        }
        hr{
            margin-top: 0;
        }
    }
</style>