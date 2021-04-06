<template>
  <div
    :class="'my-input-component my-w-100 ' + classNames"
    :style="widthInput ? {
      width: widthInput
    } : {}"
  >
    <label v-if="label" class="text-uppercase" :for="makeId">{{label}}</label>
    <input 
      class="bg-white"
      :id="makeId"
      :type="type"
      :placeholder="placeHolderComputed"
      :value="value"
      :required="isRequired"
      :name="makeId"
      @input="$emit('input', mask($event))"
      :readonly="readOnly"
      @blur="$emit('blur', validation($event))"
    />
    <span class="error-message" v-text="errorMessage"></span>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  data(){
    return{
      code: (Math.random() * 1000).toFixed(0)
    }
  },
  props:{
    classNames:{
      type: String,
      default: ''
    },
    value:{},
    label:{
      type: String
    },
    type:{
      type: String,
      default: 'text'
    },
    placeHolder:{
      type: String,
    },
    widthInput:{
      type: String,
    },
    isRequired:{
      type: Boolean,
      default: true
    },
    mask:{
      type: Function,
      default: (e) => e.target.value
    },
    validation:{
      type: Function,
      default: () => null
    },
    errorMessage:{
      type: String,
      default: 'verifique o preenchimento'
    },
    readOnly:{
      default: false
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
        return 'Digite seu ' + this.label + '...'
      }
    },
    makeId(){
      let result = ''
      if( this.label) result = this.label.match(/\w+/g).join('').toLowerCase()
      else if( this.placeHolder) result = this.placeHolder.match(/\w+/g).join('').toLowerCase()
      return `input_${result}_${this.code}`
    }
  },
}
</script>

<style lang="scss">
  .my-input-component{
    display: inline-block;
    margin-bottom: 15px;
    padding: 0 7px;
    position: relative;
    label{
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 8px;
      display: block;
      text-align: left;
      color: #364E5E;
    }
    input{
      padding: 10px 12px;
      border: 2px solid #364E5E;
      background: none;
      border-radius: 4px;
      width: 100%;
      &::placeholder{
        color: #364e5e80;
      }
      font-size: 14px;
      height: 2.85em;
      &[class*="error"] ~ .error-message{
        display: inline-block;
      }
      &[readonly] {
        color: #364e5e80;
        border-color: #364e5e80;
      }
    }
    &.error{
      .error-message{
        display: inline-block;
      }
    }
    .error-message{
      font-size: 12px;
      color: #bf0e0e;
      display: none;
      position: absolute;
      left: 8px;
      line-height: 13px;
      top: 100%;
    }
  }
</style>