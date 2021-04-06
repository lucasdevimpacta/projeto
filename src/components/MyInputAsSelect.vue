<template>
  <div
    :class="'my-input-as-select-component my-w-100 ' + classNames"
    :style="widthInput ? {
      width: widthInput
    } : {}"
  >
    <label class="text-uppercase" :for="makeId">{{label}}</label>
    <i
      class="fas fa-sort-down"
      :data-classtarget="'dropdown_class_' + code"
      @click="toggleVisibility" 
    ></i>
    <input 
      class="bg-white" 
      :id="makeId" :type="type" 
      :placeholder="placeHolderComputed"
      :data-classtarget="'dropdown_class_' + code"
      @click="toggleVisibility" 
      :value="value"
      :required="isRequired"
      :name="makeId"
      readonly
    />
    <ul
      :class="'bg-white initial-hided dropdown-options' + (' dropdown_class_' + code)" 
      @click="toggleVisibility"
      :data-classtarget="'dropdown_class_' + code"
    >
      <li v-if="selectFields != undefined " v-for="( o, i) in options" @click="setValue" :data-value="o[selectFields.value] || o.value || o.text || o" :key="'mias_' + i">
      {{ o[selectFields.text] || o.text || o}}
      </li>

      <li v-if="selectFields == undefined " v-for="( o, i) in options" @click="setValue" :data-value="o.value || o.text || o" :key="'mias_' + i">
      {{o.text || o}}
      </li>
    </ul>
    <div
      :class="'drop-bg-to-close initial-hided' + (' dropdown_class_' + code)"
      @click="toggleVisibility"
      :data-classtarget="'dropdown_class_' + code"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'MyInputAsSelect',
  data(){
    return{
      code: (Math.random() * 1000).toFixed(0),
      value: this.defaultValue
    }
  },
  props:{
    classNames:{
      type: String,
      default: ''
    },
    label:{
      type: String
    },
    type:{
      type: String,
      default: 'text'
    },
    placeHolder:{
      type: String,
      default:''
    },
    widthInput:{
      type: String,
    },
    options:{
      type: Array,
      required: true
    },
    isRequired:{
      type: Boolean,
      default: true
    },
    selectFields:{
      type: Object
    },
    defaultValue: {
      default: ''
    }
  },
  filters:{
    firstUp( val){
      return val.replace( /./, val.match(/./)[0].toUpperCase())
    }
  },
  computed:{
    placeHolderComputed(){
      if(!this.placeHolder && this.placeHolder !== undefined){
        return ''
      } else if( this.placeHolder){
        return this.placeHolder
      } else if( this.label){
        return 'Selecione o ' + this.label + '...'
      }
    },
    makeId(){
      let result = ''
      if( this.label) result = this.label.match(/\w+/g).join('').toLowerCase()
      else if( this.placeHolder) result = this.placeHolder.match(/\w+/g).join('').toLowerCase()
      return `input_${result}_${this.code}`
    }
  },
  methods:{
    toggleVisibility( e){
      let currentTarget = e.currentTarget
      let classTarget = currentTarget.dataset.classtarget

      Object.assign( [], document.getElementsByClassName( classTarget)).forEach( e => e.classList.toggle('show'))
      currentTarget.classList.toggle('is-collapse')
    },
    setValue( {target}){
      const value = target.dataset.value || target.textContent
      this.$emit('input', value)
      this.value = target.textContent
    }
  }
}
</script>

<style lang="scss">
  $distanceSideLimit: 7px;
  .my-input-as-select-component{
    display: inline-block;
    margin-bottom: 15px;
    padding: 0 $distanceSideLimit;
    position: relative;
    > i{
      position: absolute;
      font-size: 1em;
      right: 1em;
      color: #364e5ede;
      bottom: 1em;
    }
    label{
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 8px;
      display: block;
      text-align: left;
      color: #364E5E;
    }
    input,.dropdown-options{
      border: 2px solid #364E5E;
      padding: 10px 12px;
      border-radius: 4px;
      width: 100%;
    }
    input{
      background: none;
      &::placeholder{
        color: #364e5e80;
      }
      font-size: 14px;
      height: 2.85em;
    }
    .dropdown-options{
      position: absolute;
      max-height: 200px;
      left: $distanceSideLimit;
      right: 0;
      overflow-y: scroll;
      z-index: 100;
      width: calc( 100% - #{ $distanceSideLimit * 2})
    }
    .drop-bg-to-close{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
    }
  }
</style>