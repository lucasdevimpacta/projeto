<template>
  <li :class="'li-collapsive-component ' + classNames">
      <div class="title-always-visible">
        <span class="titulo">
            <i v-if="showIcon" :data-idtarget="'elm_target_' + code" @click="toggleVisibility" class="fas fa-plus"></i>{{content.titulo}}
        </span>
        <span v-if="content.carga_horaria" class="carga_horaria">{{content.carga_horaria}}</span>
      </div>
      <button v-if="! showIcon" :data-idtarget="'elm_target_' + code" @click="toggleVisibility" class="style-link-default order-1"><span class="ver">Ver</span><span class="ocultar">Ocultar</span> detalhes</button>
      <div class="contet-sometimes-visible order-0 initial-hided" :id="'elm_target_' + code" v-if="typeof( content.conteudo)  == 'string'" v-html="content.conteudo">
      </div>
      <CustomUlCollapsive :id="'elm_target_' + code" v-else :content="content.conteudo" classNames="initial-hided" /> 
  </li>
</template>

<script>
    import CustomUlCollapsive from './CustomUlCollapsive'

    export default {
        name: "LiCollapsive",
        props:{
            classNames: {
                type: String,
                default: ''
            },
            content: {
                type: Object,
                default: ''
            },
            showIcon:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                code: (Math.random() * 1000).toFixed(0)
            }
        },
        methods:{
            toggleVisibility( e){
                // let idTarget = e.currentTarget.dataset.idtarget

                // document.getElementById( idTarget).classList.toggle('show')
                let currentTarget = e.currentTarget
                let idTarget = currentTarget.dataset.idtarget

                document.getElementById( idTarget).classList.toggle('show')
                currentTarget.classList.toggle('is-collapse')
            }
        },
        components:{
            CustomUlCollapsive
        }
    }
</script>

<style lang="scss">
    .li-collapsive-component{
        display: flex;
        flex-direction: column;

        .title-always-visible{
            justify-content: space-between;
            align-items: center;
            display: flex;
        }
        button{
            color: $primary;
            align-self: baseline;
            .ver{
                display: inline;
            }
            .ocultar{
                display: none;
            }
        }
        button.is-collapse{
            .ver{
                display: none;
            }
            .ocultar{
                display: inline;
            }
        }
    }
    .li-collapsive-component:not(.initial-ul){
        padding: 18px 3px;
    }
    .li-collapsive-component:not(.initial-ul) + .li-collapsive-component:not(.initial-ul){
        border-top: 1px solid #E3E9ED;
    }
    .initial-ul.li-collapsive-component{
        .titulo{
            font-size: 16px;
            line-height: 20px;
            color: #272727;
        }
        .carga_horaria{
            font-style: italic;
            font-weight: 300;
            font-size: 14px;
            line-height: 16px;
            color: #364E5E;
        }
        i{
            width: 31px;
            line-height: 31px;
            color: white;
            text-align: center;
            border-radius: 8px;
            margin-right: 8px;
        }
        .fa-plus{
            background: $primary;
            &.is-collapse{
                background: #cccccc;
                &:before{
                    content: '\f068';
                }
            }
        }
    }
</style>