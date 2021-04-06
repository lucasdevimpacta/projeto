<template>
  <section :class="'section-blog-component ' + classNames">
    <div class="container">
      <div class="row">
        <div class="col-md-8 post-list">
          <h4 class="text-uppercase destaque-500"><i class="adorno-retangular tipo-1"></i>Blog</h4>
          <div class="row">
            <div class="col-md-6 d-none d-md-block">
              <a class="posts" v-bind:href="posts[0].link" v-if="posts.length >0" target="_blank" rel="noopener">
                <div class="display-image-component-container">
                  <DisplayImage :urlImage="[posts[0].image.url]" :imageHeight="['33.9%']" borderRadius="6px" classNames="bg-size-cover" />
                </div>
                <h5 class="title destaque-500">{{posts[0].title}}</h5>
                <p><i class="far fa-clock"></i>{{posts[0].date | toDateLiteral }} | Por: {{posts[0].author}}</p>
              </a>
            </div>
            <div class="col-md-6">
              <a v-for="(p, i) in posts" class="posts" :key='i' v-if="i" v-bind:href="p.link" target="_blank" rel="noopener">
                <h5 class="title destaque-500">{{p.title}}</h5>
                <p><i class="far fa-clock"></i>{{p.date | toDateLiteral }} | Por: {{p.author}}</p>
                <hr>
              </a>
              <button class="text-color-primary style-link-default action-see-more">
                <a href="https://www.impacta.com.br/blog" target="_blank">Acesse o Blog Impacta</a>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4 event-list">
          <h4 class="text-uppercase destaque-500"><i class="adorno-retangular tipo-1"></i>Próximos eventos</h4>
          <ul >
            <LiEventList v-for="(e, i) in events" :key='i' :date=" e.data | toDateShortLiteralInArray" :text="e.titulo" :link="e.link" />
          </ul>
          <button class="text-color-primary style-link-default action-see-more">Ver todos os eventos</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import DisplayImage from './DisplayImage'
  import LiEventList from './LiEventList'

    const arrMonth = ['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

  export default {
    name: 'SectionBlog',
    props:{
      classNames:{
        type: String,
        default: ''
      }
    },
    computed:{
      posts(){
        return this.$store.state.blog.data;
      },
      events(){
        return[
          {
            data: '30/10/2020',
            titulo:  'Master Class Online - MBA Gestão Ágil de Projetos',
            link: '#'
          },
          {
            data: '15/11/2020',
            titulo:  'Webinar: ITIL 4 - Gestão de serviços de TI',
            link: '#'
          },
          {
            data: '30/11/2020',
            titulo:  'Master Class Online - MBA Gestão Ágil de Projetos',
            link: '#'
          },
          {
            data: '21/12/2020',
            titulo:  'Workshop: Lei Geral de Proteção de dados 2ª Edição',
            link: '#'
          },
        ]
      }
    },
    filters:{
      toDateLiteral( val){
        let arrTemp = val.split(/[\/|\-]/)
        return ` ${arrTemp[0]} de ${arrMonth[+arrTemp[1]]} de ${arrTemp[2]}`
      },
      toDateShortLiteralInArray( val){
        let arrTemp = val.split(/[\/|\-]/)
        return [ arrTemp[0] , arrMonth[ +arrTemp[1]].toUpperCase().substring( 0, 3)]
      }
    },
    mounted(){
      this.getPosts();
    },
    methods:{
      getRatioImagePercent(img) {
        return `${((img.height / img.width) * 100).toFixed(1)}%`
      },
      getPosts(){
        return this.$store.dispatch( 'blog/getPosts')
      }
    },
    components: {
      DisplayImage,
      LiEventList
    }
  }
</script>

<style lang="scss">
  @import '../css/my_mixins.scss';

 .section-blog-component{
   > .container{
    padding-bottom: 40px;
    border-bottom: 1px solid #0000001a;
   }
   h4{
     margin-bottom: 25px;
   }
    @include d( sxs){
      .post-list{
        margin-bottom: 40px;
      }
    }
   .posts{
    color: #364E5E;
    .title{
      font-size: 16px;
    }
    p,a{
      font-size: 14px;
      font-weight: 300;
    }
    a{
      text-decoration: underline;
      color: #364E5E;
    }
    .display-image-component-container{
      margin-bottom: 20px;
    }
   }
 }
</style>