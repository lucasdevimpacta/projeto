import User from '../model/User'
import Endereco from '../model/Endereco'

export function UPDATE_DEVICE_SIZE (state, payload) {
  state.deviceSize = payload
}

export function UPDATE_SIGN_NEWSLETTER_STATUS (state, payload) {
  state.signNewsletterStatus = payload
}

export function UPDATE_SIGN_NEWSLETTER_SENDING (state, payload) {
  state.signNewsletterSending = payload
}

export function UPDATE_SCHEDULE_EXAM_STATUS (state, { status, protocolNumber}) {
  state.scheduleExamStatus = status
  state.scheduleExamProtocol = protocolNumber
}

export function UPDATE_SCHEDULE_EXAM_SENDING (state, payload) {
  state.scheduleExamSending = payload
}

export function UPDATE_EXAM_LIST (state, payload) {
  state.examList = payload.data
}

export function UPDATE_CONTACT_US_STATUS (state, payload) {
  state.contactUsStatus = payload
}

export function UPDATE_CONTACT_US_SENDING (state, payload) {
  state.contactUsSending = payload
}

export function UPDATE_LOGIN_STATUS (state, payload) {
  state.loginStatus = payload
}

export function UPDATE_LOGIN_SENDING (state, payload) {
  state.loginSending = payload
}

export function UPDATE_USER(state, payload) {
  state.loginToken = payload.login_token
  state.user = User.buildUser(payload.pessoa)
  state.userAddressList = payload.pessoa.enderecos.map(e => Endereco.buildEndereco(e))
}

export function RESET_USER_AND_RELATED(state) {
  window.sessionStorage.clear()
  window.localStorage.clear()
  state.user = new User();
  state.userAddressList = []
  state.loginStatus = null
}

export function UPDATE_USER_ADDRESS_LIST(state, newAddressList) {
  state.userAddressList = newAddressList.map(e => Endereco.buildEndereco(e))
}

export function UPDATE_RECOVER_USER(state, payload) {
  state.recover.codigo_pessoa = payload.id;
  state.recover.valid = payload.valid;
}

export function UPDATE_RECOVER_USER_SUCCESS(state, payload) {
  state.recover.success = payload;
}

export function UPDATE_SIGN_NEW_DATE_TO_COURSE_STATUS (state, payload) {
  state.signNewsAboutCoursesDateStatus = payload
}

export function UPDATE_SIGN_NEW_DATE_TO_COURSE_SENDING (state, payload) {
  state.signNewsAboutCoursesDateSending = payload
}

export function UPDATE_SIGN_DOWNLOAD_COURSE_CONTENT_STATUS (state, payload) {
  state.signDownloadCourseContentStatus = payload
}

export function UPDATE_SIGN_DOWNLOAD_COURSE_CONTENT_SENDING (state, payload) {
  state.signDownloadCourseContentSending = payload
}

export function UPDATE_BUYING_FORMATION(state, payload){
  state.formacao.bought = payload;
}

export function UPDATE_TITULO_FORMATION(state, payload){
  state.formacao.titulo = payload;
}