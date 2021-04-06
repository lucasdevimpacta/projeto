const routes = [
  //paginas temporarias para a versao atual. Reestruturar rotas para as demais [INICIO]
  {
    path:'/',
    component: () => import('layouts/TreinamentoCertificacaoLayout.vue'),
    children:[{
        name: 'cursos-home',
        path: '',
        component: () => import('pages/treinamentosCertificacoes/TreinamentosCertificacoesHome.vue')
    }]
  },
  {
    path:'/',
    component: () => import('layouts/TreinamentoCertificacaoLayout.vue'),
    props: {
      noFooter: true
    },
    children:[
      {
        name: 'login',
        path: 'login',
        props: (route) => {
          return {
            isRegisterMoment: route.hash === '#cadastro'
          }
        },
        component: () => import('pages/Login.vue')
      },
      {
        name: 'recover',
        path: 'recover',
        props: (route) => {
          return {
            d: route.query.d,
          }
        },
        component: () => import('pages/Forget.vue')
      }
    ]
  },
  {
    path:'/',
    component: () => import('layouts/TreinamentoCertificacaoLayout.vue'),
    meta: {
      breadcrumb: [{
        name: 'Home'
      }]
    },
    children:[{
        name: 'busca',
        path: 'busca',
        component: () => import('pages/institucionais/PaginaResultado.vue')
      },
      {
        name: 'sobre',
        path: 'sobre',
        component: () => import('pages/institucionais/ImpactaSobre.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Sobre', last: true
          }]
        }
      },
      {
        name: 'sobre-premios',
        path: 'sobre#premios',
        props: {
          anchorHash: 'premios'
        },
        component: () => import('pages/institucionais/ImpactaSobre.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Sobre', last: true
          }]
        }
      },
      {
        name: 'sobre-infraestrutura',
        path: 'sobre#infraestrutura',
        props: (route) => {
          return {
            anchorHash: 'infraestrutura'
          }
        },
        component: () => import('pages/institucionais/ImpactaSobre.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Sobre', last: true
          }]
        }
      },
      {
        name: 'sobre-unidades',
        path: 'sobre#unidades',
        props: {
          anchorHash: 'unidades'
        },
        component: () => import('pages/institucionais/ImpactaSobre.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Sobre', last: true
          }]
        }
      },
      {
        name: 'depoimentos',
        path: 'depoimentos',
        component: () => import('pages/institucionais/Depoimentos.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Depoimentos', last: true
          }]
        }
      },
      {
        name: 'certificacao-impacta',
        path: 'certificacao-impacta',
        component: () => import('pages/treinamentosCertificacoes/CertificacaoImpacta.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Certificação', last: true
          }]
        }
      }
    ]
  },

  {
    path: '/',
    props: {
      noFooter: true
    },
    component: () => import('layouts/TreinamentoCertificacaoLayout.vue'),
    children: [
      {
        name: 'inscricao-treinamentos-certificacoes',
        path: 'inscricao',
        component: () => import('pages/treinamentosCertificacoes/Inscricao.vue')
      },
      {
        name: 'pagamento-sucesso',
        path: 'pagamento-sucesso',
        component: () => import('pages/treinamentosCertificacoes/PagamentoSucesso.vue')
      }
    ]
  },

  {
    path:'/',
    component: () => import('layouts/TreinamentoCertificacaoLayout.vue'),
    props: {
      noSectionBlog: true
    },
    meta: {
      breadcrumb: [{
        name: 'Home'
      }]
    },
    children:[
      {
        name: 'fale-conosco',
        path: 'contato',
        component: () => import('pages/institucionais/Contato.vue')
      },
      {
        name: 'impactando-vidas',
        path: 'impactando-vidas',
        component: () => import('pages/institucionais/ProgramaImpactandoVidas.vue')
      },
      {
        name: 'politicas-seguranca-privacidade',
        path: 'politicas-seguranca-privacidade',
        component: () => import('pages/institucionais/PoliticasSegurancaPrivacidade.vue')
      },
      {
        name: 'termos-uso',
        path: 'termos-uso',
        component: () => import('pages/institucionais/TermosUso.vue')
      },
      {
        name: 'centro-exames',
        path: 'centro-exames',
        component: () => import('pages/institucionais/CentroExames.vue')
      },

      {
        name: 'formacoes',
        path: 'formacoes/',
        component: () => import('pages/treinamentosCertificacoes/Formacoes.vue'),
        props: (route) => {

          return {
            myFilters: {
              presencial: (route.query.c == undefined) ? true : false,
              online: (route.query.c == 'online') ? true : false,
              'ao vivo': false
            }
          }
        },
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Formações'
          }]
        }
      },
      {
        name: 'single-formacao',
        path: 'formacoes/:formacao',
        props: (route) => {
          return {
            slug_formacao: route.params.formacao,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/SingleFormacao.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Formações', link: '/formacoes', last: false
          }, {
            name: 'Formação', last: true
          }]
        }
      },
      {
        name: 'your-way',
        path: 'your-way',
        component: () => import('pages/treinamentosCertificacoes/YourWay.vue'),
        meta:{
          breadcrumb:[{
            name:'Home', link:'/', last:false
          },{
            name:'Your way', last:true
          }]
        }
      },
      {
        name: 'your-way-cursos',
        path: 'your-way/cursos',
        component: () => import('pages/treinamentosCertificacoes/CursosYourWay.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Your-Way', link: '/your-way', last: false
          }, {
            name: 'Cursos', last: true
          }]
        }
      },
      {
        name: 'your-way-cursos-por-tag',
        path: 'your-way/cursos/:tag',
        props: (route) => {
          return {
            tag: route.params.tag,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosYourWay.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Your-Way', link: '/your-way', last: false
          }, {
            name: 'Cursos', last: true
          }]
        }
      },
    ]
  },

  // PAGINAS DE TREINAMENTOS
  {
    path:'/cursos',
    component: () => import('layouts/TreinamentoCertificacaoLayout.vue'),
    props: {
      noSectionBlog: true
    },
    meta: {
      breadcrumb: [{
        name: 'Home'
      }]
    },
    children:[
      {
        name: 'oferta',
        path: 'ofertas/',
        component: () => import('pages/treinamentosCertificacoes/CursosOferta.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Ofertas', last: true
          }]
        }
      },
      {
        name: 'oferta-por-tag',
        path: 'ofertas/:tag',
        props: (route) => {
          return {
            tag: route.params.tag,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosOferta.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Ofertas', last: true
          }]
        }
      },
      {
        name: 'categoria-art-design',
        path: 'art-design',
        props: (route) => {

          return {
            cat: 'art-design'
          }

        },
        component: () => import('pages/treinamentosCertificacoes/CursosPorCategoria.vue'),
        meta: {
          categoria:'art-design',
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'categoria', last: true
          }]
        }
      },
      {
        name: 'categoria-desenvolvimento',
        path: 'desenvolvimento',
        props: (route) => {
          return {
            cat: 'desenvolvimento'
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosPorCategoria.vue'),
        meta: {
          categoria:'desenvolvimento',
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'categoria', last: true
          }]
        }
      },
      {
        name: 'categoria-gestao-e-negocios',
        path: 'gestao-e-negocios',
        props: (route) => {
          return {
            cat: 'gestao-e-negocios'
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosPorCategoria.vue'),
        meta: {
          categoria:'gestao-e-negocios',
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'categoria', last: true
          }]
        }
      },
      {
        name: 'categoria-infraestrutura-e-seguranca-de-ti',
        path: 'infraestrutura-e-seguranca-de-ti',
        props: (route) => {
          return {
            cat: 'infraestrutura-e-seguranca-de-ti'
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosPorCategoria.vue'),
        meta: {
          categoria:'infraestrutura-e-seguranca-de-ti',
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'categoria', last: true
          }]
        }
      },
      {
        name: 'categoria-marketing-digital',
        path: 'marketing-digital',
        props: (route) => {
          return {
            cat: 'marketing-digital'
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosPorCategoria.vue'),
        meta: {
          categoria:'marketing-digital',
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'categoria', last: true
          }]
        }
      },
      {
        name: 'categoria-office',
        path: 'office',
        props: (route) => {
          return {
            cat: 'office'
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosPorCategoria.vue'),
        meta: {
          categoria:'office',
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'categoria', last: true
          }]
        }
      },
      {
        name: 'tag',
        path: 'tag/:tag',
        props: (route) => {
          return {
            tag: route.params.tag,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosPorTag.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/', last: false
          }, {
            name: 'Tag', last: true
          }]
        }
      },
      {
        name: 'single-curso',
        path: ':curso',
        props: (route) => {
          return {
            curso: route.params.curso,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/SingleCurso.vue'),
        meta: {
          breadcrumb:[{
            name:'Home', link:'/', last:false
          },{
            name:'{categoria}', link:'{link}', last:false, dynamic: true, key:"categoria"
          },{
            name:'Curso', last:true
          }]
        }
      }
    ]
  }
  //paginas temporarias para a versao atual. Reestruturar rotas para as demais [TERMINO]

  //pagina Home Geral, sem topBar, sem geralFotter e com showSearchInMainNav
  /*
  {
    path: '/',
    component: () => import('layouts/InstitucionalLayout.vue'),
    props: {
      noFooter: true,
      noTopBar: true,
      showSearchInMainNav: true
    },
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/institucionais/Home.vue')
      }
    ]
  },

  //paginas sem FOOTER
  {
    path: '/',
    component: () => import('layouts/InstitucionalLayout.vue'),
    props: {
      noFooter: true
    },
    children: [
      {
        name: 'login',
        path: 'login',
        props: (route) => {
          return {
            isRegisterMoment: route.hash === '#cadastro'
          }
        },
        component: () => import('pages/Login.vue')
      },
      {
        name: 'recover',
        path: 'recover',
        props: (route) => {
          return {
            d: route.query.d,
          }
        },
        component: () => import('pages/Forget.vue')
      }
    ]
  },

  //paginas institucionais/gerais COM FOOTER sobre, busca etc...
  {
    path: '/',
    component: () => import('layouts/InstitucionalLayout.vue'),
    children: [
      {
        name: 'busca',
        path: 'busca',
        component: () => import('pages/institucionais/PaginaResultado.vue')
      },
      {
        name: 'sobre',
        path: 'sobre',
        component: () => import('pages/institucionais/ImpactaSobre.vue')
      },
      {
        name: 'sobre-premios',
        path: 'sobre#premios',
        props: {
          anchorHash: 'premios'
        },
        component: () => import('pages/institucionais/ImpactaSobre.vue')
      },
      {
        name: 'sobre-infraestrutura',
        path: 'sobre#infraestrutura',
        props: {
          anchorHash: 'infraestrutura'
        },
        component: () => import('pages/institucionais/ImpactaSobre.vue')
      },
      {
        name: 'sobre-unidades',
        path: 'sobre#unidades',
        props: {
          anchorHash: 'unidades'
        },
        component: () => import('pages/institucionais/ImpactaSobre.vue')
      },
      {
        name: 'depoimentos',
        path: 'depoimentos',
        component: () => import('pages/institucionais/Depoimentos.vue')
      },
      {
        name: 'centro-exames',
        path: 'centro-exames',
        component: () => import('pages/institucionais/CentroExames.vue')
      }
    ]
  },

  //paginas institucionais/gerais COM FOOTER e SEM SECTION BLOG
  {
    path: '/',
    props: {
      noSectionBlog: true
    },
    component: () => import('layouts/InstitucionalLayout.vue'),
    children: [
      {
        name: 'fale-conosco',
        path: 'contato',
        component: () => import('pages/institucionais/Contato.vue')
      },
      {
        name: 'impactando-vidas',
        path: 'impactando-vidas',
        component: () => import('pages/institucionais/ProgramaImpactandoVidas.vue')
      },
      {
        name: 'politicas-seguranca-privacidade',
        path: 'politicas-seguranca-privacidade',
        component: () => import('pages/institucionais/PoliticasSegurancaPrivacidade.vue')
      },
      {
        name: 'termos-uso',
        path: 'termos-uso',
        component: () => import('pages/institucionais/TermosUso.vue')
      }
    ]
  },
  //paginas treinamento e certificação COM SECTION BLOG e COM FOOTER
  {
    path: '/treinamento-certificacao',
    component: () => import('layouts/TreinamentoCertificacaoLayout.vue'),
    meta: {
      breadcrumb: [{
        name: 'Home'
      }]
    },
    children: [
      {
        name: 'treinamentos-certificacao-home',
        path: '/',
        component: () => import('pages/treinamentosCertificacoes/TreinamentosCertificacoesHome.vue'),
      },
      {
        path: 'categoria/',
        component: () => import('pages/treinamentosCertificacoes/TreinamentosCertificacoesHome.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao'
          }, {
            name: 'categoria'
          }]
        }
      },
      {
        path: 'tag/',
        component: () => import('pages/treinamentosCertificacoes/TreinamentosCertificacoesHome.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao'
          }, {
            name: 'tag'
          }]
        }
      },
      {
        path: 'curso/',
        component: () => import('pages/treinamentosCertificacoes/TreinamentosCertificacoesHome.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao'
          }, {
            name: 'curso'
          }]
        }
      }
    ]
  },

  //paginas treinamento e certificação SEM SECTION BLOG mas COM FOOTER
  {
    path: '/treinamento-certificacao',
    props: {
      noSectionBlog: true
    },
    component: () => import('layouts/TreinamentoCertificacaoLayout.vue'),
    children: [
      {
        name: 'categoria',
        path: 'categoria/:cat',
        props: (route) => {
          return {
            cat: route.params.cat,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosPorCategoria.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao', last: false
          }, {
            name: 'categoria', last: true
          }]
        }
      },
      {
        name: 'tag',
        path: 'tag/:tag',
        props: (route) => {
          return {
            tag: route.params.tag,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosPorTag.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao', last: false
          }, {
            name: 'Tag', last: true
          }]
        }
      },
      {
        name: 'single-curso',
        path: 'curso/:curso',
        props: (route) => {
          return {
            curso: route.params.curso,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/SingleCurso.vue'),
        meta: {
          breadcrumb:[{
            name:'Home', link:'/treinamento-certificacao', last:false
          },{
            name:'{categoria}', link:'/treinamento-certificacao/categoria/{link}', last:false, dynamic: true, key:"categoria"
          },{
            name:'Curso', last:true
          }]
        }
      },
      {
        name: 'your-way',
        path: 'your-way/',
        component: () => import('pages/treinamentosCertificacoes/YourWay.vue'),
        meta:{
          breadcrumb:[{
            name:'Home', link:'/treinamento-certificacao', last:false
          },{
            name:'Your way', last:true
          }]
        }
      },
      {
        name: 'formacoes',
        path: 'formacoes/',
        component: () => import('pages/treinamentosCertificacoes/Formacoes.vue'),
        props: (route) => {

          return {
            myFilters: {
              presencial: (route.query.c == undefined) ? true : false,
              online: (route.query.c == 'online') ? true : false,
              'ao vivo': false
            }
          }
        },
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao', last: false
          }, {
            name: 'Formações'
          }]
        }
      },
      {
        name: 'single-formacao',
        path: 'formacoes/:formacao',
        props: (route) => {
          return {
            slug_formacao: route.params.formacao,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/SingleFormacao.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao', last: false
          }, {
            name: 'Formações', link: '/treinamento-certificacao/formacoes', last: false
          }, {
            name: 'Formação', last: true
          }]
        }
      },
      {
        name: 'certificacao-impacta',
        path: 'certificacao-impacta',
        component: () => import('pages/treinamentosCertificacoes/CertificacaoImpacta.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao', last: false
          }, {
            name: 'Certificação', last: true
          }]
        }
      },
      {
        name: 'treinamentos-oferta',
        path: 'ofertas/',
        component: () => import('pages/treinamentosCertificacoes/CursosOferta.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao', last: false
          }, {
            name: 'Ofertas', last: true
          }]
        }
      },
      {
        name: 'treinamentos-oferta-por-tag',
        path: 'ofertas/:tag',
        props: (route) => {
          return {
            tag: route.params.tag,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosOferta.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao', last: false
          }, {
            name: 'Ofertas', last: true
          }]
        }
      },
      {
        name: 'treinamentos-your-way',
        path: 'treinamentos-your-way/',
        component: () => import('pages/treinamentosCertificacoes/CursosYourWay.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao', last: false
          }, {
            name: 'Your-Way', link: '/treinamento-certificacao/your-way', last: false
          }, {
            name: 'Cursos', last: true
          }]
        }
      },
      {
        name: 'treinamentos-your-way-por-tag',
        path: 'treinamentos-your-way/:tag',
        props: (route) => {
          return {
            tag: route.params.tag,
          }
        },
        component: () => import('pages/treinamentosCertificacoes/CursosYourWay.vue'),
        meta: {
          breadcrumb: [{
            name: 'Home', link: '/treinamento-certificacao', last: false
          }, {
            name: 'Your-Way', link: '/treinamento-certificacao/your-way', last: false
          }, {
            name: 'Cursos', last: true
          }]
        }
      },
    ]
  },

  //paginas treinamento e certificação SEM FOOTER
  {
    path: '/treinamento-certificacao',
    props: {
      noFooter: true
    },
    component: () => import('layouts/TreinamentoCertificacaoLayout.vue'),
    children: [
      {
        name: 'inscricao-treinamentos-certificacoes',
        path: 'inscricao',
        component: () => import('pages/treinamentosCertificacoes/Inscricao.vue')
      },
      {
        name: 'pagamento-sucesso',
        path: 'pagamento-sucesso',
        component: () => import('pages/treinamentosCertificacoes/PagamentoSucesso.vue')
      },
      {
        name: 'treinamento-login',
        path: 'login',
        props: (route) => {
          return {
            isRegisterMoment: route.hash === '#cadastro'
          }
        },
        component: () => import('pages/Login.vue')
      }
    ]
  },

  //paginas graduação COM SECTION BLOG
  {
    path: '/graduacao',
    component: () => import('layouts/GraduacaoLayout.vue'),
    children: [
      {
        name: 'graduacao-home',
        path: '/',
        component: () => import('pages/graduacao/GraduacaoHome.vue')
      },
      {
        path: 'curso/',
        component: () => import('pages/graduacao/GraduacaoHome.vue')
      }
    ]
  },
  //paginas graduação SEM SECTION BLOG
  {
    path: '/graduacao',
    props: {
      noSectionBlog: true
    },
    component: () => import('layouts/GraduacaoLayout.vue'),
    children: [
      {
        name: 'single-curso-graduacao',
        path: 'curso/:curso',
        props: (route) => {
          return {
            curso: route.params.curso,
          }
        },
        component: () => import('pages/graduacao/SingleProdutoGraduacao.vue')
      },
      {
        name: 'transferencia-graduacao',
        path: 'transferencia',
        component: () => import('pages/graduacao/TransferenciaInstituicao.vue')
      },
      {
        name: 'plano-estendido',
        path: 'plano-estendido',
        component: () => import('pages/graduacao/PlanoEstendido.vue')
      },
      {
        name: 'programas-intercambio',
        path: 'programas-intercambio',
        component: () => import('pages/graduacao/ProgramasIntercambio.vue')
      }
    ]
  },

  //paginas pós mba COM FOOTER
  {
    path: '/mba',
    component: () => import('layouts/MbaPosGraduacaoLayout.vue'),
    children: [
      {
        path: '/',
        name: 'pos-mba-home',
        component: () => import('pages/mbaPosGraduacao/MbaPosGraduacaoHome.vue')
      },
      {
        path: 'curso',
        component: () => import('pages/mbaPosGraduacao/MbaPosGraduacaoHome.vue')
      },
      {
        path: 'curso/:curso',
        props: (route) => {
          return {
            curso: route.params.curso,
          }
        },
        component: () => import('pages/mbaPosGraduacao/SingleCursoSuperior.vue')
      },
    ]
  },
  //paginas pós mba SEM FOOTER
  {
    path: '/mba',
    props: {
      noFooter: true
    },
    component: () => import('layouts/MbaPosGraduacaoLayout.vue'),
    children: [
      {
        name: 'inscricao-mba',
        path: 'inscricao',
        component: () => import('pages/mbaPosGraduacao/MbaInscricao.vue')
      }
    ]
  },

  //paginas da escola técnica COM SECTION BLOG
  {
    path: '/curso-tecnico',
    component: () => import('layouts/EscolaTecnicaLayout.vue'),
    children: [
      {
        path: '/',
        name: 'escola-tecnica-home',
        component: () => import('pages/escolaTecnica/EscolaTecnicaHome.vue')
      },
      {
        path: 'curso',
        component: () => import('pages/escolaTecnica/EscolaTecnicaHome.vue')
      },
    ]
  },
  //paginas da escola técnica SEM SECTION BLOG
  {
    name: 'escola-tecnica',
    path: '/curso-tecnico',
    props: {
      noSectionBlog: true
    },
    component: () => import('layouts/EscolaTecnicaLayout.vue'),
    children: [
      {
        name: 'obter-crea',
        path: 'como-obter-crea',
        component: () => import('pages/escolaTecnica/ObterCrea.vue')
      },
      {
        name: 'single-curso-tecnico',
        path: 'curso/:curso',
        props: (route) => {
          return {
            curso: route.params.curso,
          }
        },
        component: () => import('pages/escolaTecnica/SingleCursoTecnico.vue')
      },
      {
        name: 'inscricao-curso-tecnico',
        path: 'inscricao',
        component: () => import('pages/escolaTecnica/InscricaoCursoTecnico.vue')
      }
    ]
  },

  //paginas corporativas COM SECTION BLOG
  {
    path: '/corporativo',
    component: () => import('layouts/CorporativoLayout.vue'),
    children: [
      {
        path: '/',
        name: 'corporativo-home',
        component: () => import('pages/corporativo/CorporativoHome.vue')
      },
      {
        name: 'treinamentos-na-empresa',
        path: 'treinamentos-in-company',
        component: () => import('pages/corporativo/TreinamentosInCompany.vue')
      },
      {
        name: 'aluguel-sala',
        path: 'aluguel-sala',
        component: () => import('pages/corporativo/AluguelSala.vue')
      },
      {
        name: 'ead-corporativo',
        path: 'planos-ead',
        component: () => import('pages/corporativo/PlanosEadCorporativos.vue')
      },
      {
        name: 'convenios-corporativo',
        path: 'convenios-corporativo',
        component: () => import('pages/corporativo/CoveniosCorporativos.vue')
      }
    ]
  },
  //paginas corporativas SEM SECTION BLOG
  {
    name: 'corporativo',
    path: '/corporativo',
    props: {
      noSectionBlog: true
    },
    component: () => import('layouts/CorporativoLayout.vue'),
    children: [
      {
        name: 'cadastro-vaga',
        path: 'cadastro-vaga',
        component: () => import('pages/corporativo/CadastroVaga.vue')
      }
    ]
  }, */
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes