export const dateMask = (e) => {
  const val = e.target.value
  const str = val.toString()
  let result = str.replace(/\D/g,'')
  .replace(/\d*(?=\d{8}$)/,'')
  .replace(/((?<=^\d{2})\B)|((?<=^\d{4})\B)/g,'/')
  
  e.target.value = result
  return result
}

export const hourMask = (e) => {
  const val = e.target.value
  const str = val.toString().replace(/\D/g,'')
  let result = ''

  if(str.length > 4) {
    const [ hour, minute ] = str.split(/\B(?=\d{2}$)/)
    result = `${hour % 24}:${minute % 60}`
  } else {
    result = str.replace(/\d*(?=\d{4}$)/,'')
      .replace(/((?<=^\d{2})\B)/g,':')
  }

  e.target.value = result
  return result
}

export const phoneMask = (e) => {
  const val = e.target.value
  const str = val.toString().replace(/\D/g,'')
  let result = ''

  if(str.length < 11){
    result = str.replace(/\B(?=\d{4}$)/g,'-')
      .replace(/\B(?=.{9}$)/g,' ')
  } else {
    result = str.replace(/\d*(?=\d{11}$)/,'')
      .replace(/\B(?=\d{4}$)/g,'-')
      .replace(/(\B(?=.{9}$))|(\B(?=.{10}$))/g,' ')
  }

  e.target.value = result
  return result
}

export const cpfMask = (e) => {
  const val = e.target.value
  const str = val.toString().replace(/\D|(?<=.{14}).*/g,'')
  let result = ''

  result = str.replace(/(?<=^\d{3})\B|(?<=^\d{6})\B/g, '.')
    .replace(/(?<=^.{11})\B/g, '-')

  e.target.value = result
  return result
}

export const cartaoNoMask = (e) => {

  const val = e.target.value
  const str = val.toString().replace(/\D|(?<=.{19}).*/g,'')
  let result = ''
  
  result = str.replace(/(?<=^\d{4})\B|(?<=^\d{8})|\B(?<=^\d{12})\B/g, ' ')

  e.target.value = result
  return result

}

export const fullNameValidation = (e) => {
  const val = e.target.value
  if(val && !/[^\s]{3,}\s{1}[^\s]{3,}/gm.test(val)){
    e.target.classList.add('error')
    return false
  }
  e.target.classList.remove('error')
  return true
}

export const cpfValidation = (e) => {
  const val = e.target.value
  const str = val.toString().replace(/\D|(?<=.{14}).*/g,'')
  if(str.length < 11 || (new Set(Array.from(str))).size === 1) {
    e.target.classList.add('error')
    return false
  }

  const [ num1 ] = Array.from(str.replace(/(?<=.{9}).*/g, '')).reduce((a,e) => {
    a[0] = (a[0] + (+e * a[1]--))
    return a
  },[0, 10])
  if(((num1 * 10) % 11) % 10 !== +str[9]) {
    e.target.classList.add('error')
  }

  const [ num2 ] = Array.from(str.replace(/(?<=.{10}).*/g, '')).reduce((a,e) => {
    a[0] = (a[0] + (+e * a[1]--))
    return a
  },[0, 11])
  if(((num2 * 10) % 11) % 10 !== +str[10]) {
    e.target.classList.add('error')
    return false
  }
  e.target.classList.remove('error')
  return true
}

export const emailValidation = (e) => {
  const val = e.target.value
  if(val && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm.test(val)){
    e.target.classList.add('error')
    return false
  }
  e.target.classList.remove('error')
  return true
}

export const passwordMatch = (e, mainVal) => {
  const val = e.target.value
  if(val !== mainVal) {
    e.target.classList.add('error')
    return false
  }
  e.target.classList.remove('error')
  return true
}

export const simpleValidateForm = (e) => {
  let hasError = false
  Array.from(e.target.querySelectorAll(`*[required]`))
    .forEach(e => e.value || (hasError = true))
  Array.from(e.target.querySelectorAll(`input[class*="error"], textarea[class*="error"], select[class*="error"]`)).length && (hasError = true)

  return !hasError
}
