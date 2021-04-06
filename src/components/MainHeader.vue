<template>
  <header :class="'main-header-component ' + classNames" :style="isHomeDesktop ? { paddingTop: '3vh' } : {}">
    <nav
      v-if="!noTopBar"
      class="top-bar"
      :style="{ background: themeSecondaryColor }"
    >
      <div class="container top-bar-container">
        <div class="search-field-container">
          <input
            :type="searchInputType"
            :placeholder="searchInputPlaceholder"
            name="searchValue"
            v-model="searchFieldValue"
            @keyup.enter="gotoResults"
          />
          <span @click="gotoResults" class="search-component-icon"
            ><i class="fas fa-search"></i
          ></span>
        </div>
        <div class="menu-dropdown-container">
          <div class="d-flex h-100 align-items-center">
            <span
              class="drop-item-text text-uppercase"
              data-idelementtocollapse="menuDropdown12322"
              @click="toggleVisibilityMenu"
            >
              {{ siteSections[0].label
              }}<i class="fas fa-chevron-down ml-3"></i>
              <div class="menu-click-background-to-close"></div>
            </span>
          </div>
          <ul
            class="menu-dropdown"
            id="menuDropdown12322"
            :style="{ background: themeSecondaryColor }"
          >
            <li
              v-for="(e, i) in siteSections"
              class="drop-item text-uppercase"
              :key="i"
              v-if="i"
            >
              <div v-if="e.url">
                <a target="_blank" v-bind:href="e.url"><span class="drop-item-text">{{ e.label }}</span></a>
              </div>
              <div v-else>
                <router-link
                  :to="e.path ? e.path : { name: e.routName }"
                  v-if="i"
                >
                  <span class="drop-item-text">{{ e.label }}</span>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav class="main-nav " :style="{ background: themePrimaryColor }">
      <div class="container d-flex main-nav-container">
        <div class="logo-container">
          <router-link :to="{ name: siteSections[0].routName }">
            <DisplayImage
              :urlImage="logo.urlImage"
              :imageHeight="logo.imageHeight"
            />
          </router-link>
        </div>
        <div class="navigation-container">
          <MainHeaderNavigation
            classNames="all-text-uppercase"
            :navigationLinks="navigationLinks"
          />
        </div>
        <div v-if="showSearchInMainNav" class="search-container">
          <slot>
            <div class="search-field-home">
              <input type="text" @keyup.enter="gotoResults" placeholder="Buscar cursos..." name="search_field_value" v-model="searchFieldValue">
              <router-link :to="{name: 'busca', query: { searchvalue: searchFieldValue }}" v-slot="{ navigate }">
                <i class="fas fa-search" @click="(e) => (searchFieldValue || (deviceSize != 'lg')) && (navigate(e))"></i>
              </router-link>
            </div>
          </slot>
        </div>
        <div v-if="showLoginArea" class="login-container">
          <i class="fas fa-shopping-cart ">
            <span v-show="carrinhoProdutos > 0">{{carrinhoProdutos}}</span>
          </i>
          <div class="btn-component-container d-none d-md-block">
            <router-link
              :to="{ name: 'login', params: { isRegister: true } }"
              class="default"
            >
              <Btn tag="div" classNames="text-white">LOGIN</Btn>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import DisplayImage from "./DisplayImage";
import Btn from "./Btn";
import MainHeaderNavigation from "./MainHeaderNavigation";

export default {
  name: "MainHeader",
  props: {
    noTopBar: {
      type: Boolean,
      default: false
    },
    themePrimaryColor: {
      type: String,
      default: "white"
    },
    themeSecondaryColor: {
      type: String,
      default: "#f5f5f5"
    },
    showSearchInMainNav: {
      type: Boolean,
      default: false
    },
    navigationLinks: {
      type: Array,
      required: true
    },
    siteSections: {
      type: Array,
      required: true
    },
    searchInputType: {
      type: String,
      default: "text"
    },
    searchInputPlaceholder: {
      type: String,
      default: ""
    },
    logo: {
      type: Object,
      default: {
        urlImage: ["../statics/img/impacta_logo_treianamento_area.svg"],
        imageHeight: ["13,1%"]
      }
    },
    classNames: {
      type: String,
      default: ''
    },
    showLoginArea: {
      type: Boolean,
      default: true
    },
    isHomeDesktop: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      searchFieldValue: ''
    }
  },
  computed: {
    deviceSize(){
      return this.$store.state.app.deviceSize
    },
    carrinho() {
      return this.$store.state.carrinho.carrinho;
    },
    carrinhoProdutos() {
        if ( this.carrinho.produtos != undefined ) {
          return this.carrinho.produtos.length
        } else {
          return 0;
        }
    }
  },
  components: {
    DisplayImage,
    Btn,
    MainHeaderNavigation
  },
  mounted() {
    this.createCarrinho();
  }, 
  methods: {
    createCarrinho(e){
      this.$store.dispatch('carrinho/fetchNewCarrinho');
    },
    toggleVisibilityMenu(e) {
      let idElementToCollapse = e.currentTarget.dataset.idelementtocollapse;
      let self = e.currentTarget;
      let bgToClose = self.getElementsByClassName(
        "menu-click-background-to-close"
      )[0];

      if (
        document.getElementById(idElementToCollapse).classList.toggle("visible")
      ) {
        bgToClose.classList.add("visible");
      } else {
        bgToClose.classList.remove("visible");
      }
      //e.stopPropagation()
    },
    gotoResults(e) {
      e.preventDefault();
      this.searchFieldValue && this.$router.push({name: 'busca', query: { searchvalue: this.searchFieldValue }})
    }
  }
};
</script>

<style lang="scss">
@import "../css/main.scss";

*.menu-click-background-to-close {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  height: 100vh;
  cursor: default;
}

*.menu-click-background-to-close.visible {
  display: block;
}

$sidePaddingContainers: 15px;
$widthContainers: 260px;
.main-header-component {
  .top-bar {
    border-bottom: 1px solid #cccccc4d;
    font-size: 15px;
    position: relative;
    z-index: 300;

    .top-bar-container {
      display: flex;
      justify-content: flex-end;
      @include d(sxs) {
        flex-direction: row-reverse;
      }
    }

    .search-field-container {
      min-width: $widthContainers;
    }
    .search-field-container,
    .menu-dropdown-container {
      height: 40px;
      display: flex;
      position: relative;
      border-left: 1px solid #cccccccc;
      display: flex;
      align-items: center;
      padding: 0 $sidePaddingContainers;
      @include d(sxs) {
        min-width: unset;
      }
    }
    .search-field-container + .menu-dropdown-container {
      border-right: 1px solid #cccccccc;
    }
    .menu-dropdown-container {
      color: #364e5e;
      @include d(sxs) {
        flex-grow: 1;
        padding-left: 0;
        border-left: none !important;
      }
    }
    .drop-item-text {
      color: #364e5e;
      font-size: 12px;
      cursor: pointer;
    }
    .menu-dropdown {
      display: none;
      position: absolute;
      top: 100%;
      white-space: nowrap;
      right: -1px;
      z-index: 100;
      min-width: calc(100% + 2px);
      padding: 5px $sidePaddingContainers;
      border: 1px solid #cccccccc;
      @include d(sxs) {
        left: -15px;
      }
    }
    .menu-dropdown.visible {
      display: block;
    }
  }
  input {
    background: none;
    outline: none;
    font-size: 1em;
    border: none;
    color: #364e5ed9;
    font-weight: 400;
    &::placeholder {
      font-size: 1em;
      color: #364e5e66;
    }
    @include d(sxs) {
      display: none;
    }
  }
  .search-component-icon {
    position: absolute;
    right: $sidePaddingContainers;
    z-index: 10;
    color: #364e5e;
    @include d(sxs) {
      left: 11px;
    }
  }
  .main-nav {
    border-bottom: 1px solid #cccccc4d;

    .main-nav-container {
      position: relative;
      justify-content: space-between;
      z-index: 210;
      @include d(sxs) {
        justify-content: flex-start;
        & > div {
          height: 60px;
        }
      }
    }
    &, a, span {
      color: #364e5e;
      font-size: 14px;
    }
    .logo-container {
      width: 130px;
      margin-left: 15px;
      height: 60px;
      @include d(l) {
        width: 160px;
        margin-left: unset;
      }
      @include d( lm){
        height: 80px;
      }
    }
    .login-container {
      order: 2;
      flex-grow: 1;
      //width: $widthContainers;
      display: flex;
      height: 80px;
      align-items: center;
      justify-content: flex-end;
      & > * {
        margin-left: 20px;
      }
      i{
        position:relative;
      }
      i > span{
        background: linear-gradient(90deg, #4CB8C4 0%, #3CD3AD 66.67%);
        width:16px;
        height:16px;
        color:white;
        position:absolute;
        border-radius:6px;
        font-size:8px;
        line-height:16px;
        text-align:center;
        left:7px;
        top:-8px;
      }
      @include d(l) {
        order: unset;
        flex-grow: unset;
      }
    }
    .btn-component-container {
      width: 120px;
      height: 40px;
      .default:hover {
        text-decoration: none;
      }
    }
    .menu-dropdown {
      font-size: 0.8em;
      color: #364e5e;
      .drop-item {
        width: 100%;
      }
    }
    .logo-container {
      order: 1;
      @include d(l) {
        order: unset;
      }
    }
    .navigation-container {
      order: 0;
      align-self: center;
      @include d(sxs) {
        display: flex;
        align-items: center;
      }
      @include d(l) {
        order: unset;
        flex-grow: 1;
      }
      .fa-bars {
        font-size: 18px;
      }
    }
    .search-container {
      order: 2;
      display: flex;
      align-items: center;
      align-self: center;
      .search-field-home{
        display: flex;
        align-items: center;
        position: relative;
        i{
          font-size: 16px;
          line-height: 20px;
          color: #364E5E;
          cursor: pointer;
          padding: 4px;
        }
      }
      input{
        display: none;
      }
      @include d(l) {
        order: unset;
        input{
          display: initial;
          width: 195px;
          height: 48px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          line-height: 20px;
          padding: 0 36px 0 15px;
          background: #00000033;
          color: white;
          font-weight: normal;
          @supports (backdrop-filter: blur(5px)) {
            backdrop-filter: blur(5px);
          }
          &::placeholder{
            color: white;
          }
        }
        .search-field-home {
          i{
            position: absolute;
            right: 12px;
            color: white;
          }
        }
      }
    }
  }
}
</style>
