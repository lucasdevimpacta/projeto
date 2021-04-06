<template>
  <div
    :class="'my-checkbox-component ' + classNames"
    :style="{
      width: widthInput
    }"
  >
    <label v-if="label" class="text-uppercase" :for="makeId">{{label}}</label>
    <input 
      class="bg-white"
      :id="makeId"
      :type="type"
      :value="value ? '' : ''"
      :required="isRequired"
      :name="makeId"
      readonly
      @click="hadleSetValue"
    />
  </div>
</template>

<script>
export default {
  name: 'MyCheckbox',
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
      default: '100%'
    },
    isRequired:{
      type: Boolean,
      default: true
    }
  },
  filters:{
    firstUp( val){
      return val.replace( /./, val.match(/./)[0].toUpperCase())
    }
  },
  computed:{
    makeId(){
      let result = ''
      if( this.label) result = this.label.match(/\w+/g).join('').toLowerCase()
      else if( this.placeHolder) result = this.placeHolder.match(/\w+/g).join('').toLowerCase()
      return `input_${result}_${this.code}`
    },
  },
  methods:{
    hadleSetValue(e){
      this.$emit('input', (!this.value))
    }
  }
}
</script>

<style lang="scss">
  .my-checkbox-component{
    display: inline-block;
    width: 100%;
    margin-bottom: 15px;
    padding: 0 7px;
    label{
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 8px;
      display: block;
      text-align: left;
      color: #364E5E;
      cursor: pointer;
    }
    input{
      padding: 10px 12px;
      border: 2px solid #364E5E;
      background: none;
      border-radius: 4px;
      width: 100%;
      cursor: pointer;

      font-family: "Font Awesome 5 Free";
      font-weight: 700;
      -webkit-font-smoothing: antialiased;

      &::placeholder{
        color: #364e5e80;
      }
    }
  }
</style>