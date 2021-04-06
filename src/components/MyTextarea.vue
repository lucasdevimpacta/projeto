<template>
  <div
    :class="'my-input-component my-w-100 ' + classNames"
    :style="widthInput ? {
      width: widthInput
    } : {}"
  >
    <label v-if="label" class="text-uppercase" :for="makeId">{{label}}</label>
    <textarea 
      class="bg-white"
      :id="makeId"
      :type="type"
      :placeholder="placeHolderComputed"
      :value="value"
      :required="isRequired"
      :name="makeId"
      @input="$emit('input', $event.target.value)"
      :rows="rows"
    />
  </div>
</template>

<script>
export default {
  name: 'MyTextarea',
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
    rows:{
      type: String,
      default: '2'
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
    label{
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 8px;
      display: block;
      text-align: left;
      color: #364E5E;
    }
    textarea{
      padding: 10px 12px;
      border: 2px solid #364E5E;
      background: none;
      border-radius: 4px;
      width: 100%;
      &::placeholder{
        color: #364e5e80;
      }
      font-size: 14px;
    }
  }
</style>