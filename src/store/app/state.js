import User from '../model/User'

export default function () {
  return {
    deviceSize: '',
    signNewsletterStatus: null,
    signNewsletterSending: false,
    scheduleExamStatus: null,
    scheduleExamSending: false,
    scheduleExamProtocol: undefined,
    examList: [],
    contactUsStatus: null,
    contactUsSending: false,
    user: new User(),
    userAddressList: [],
    loginStatus: false,
    loginSending: false,
    loginToken: '',
    recover:{
        codigo_pessoa:0,
        valid:false,
        success:false
    },
    signNewsAboutCoursesDateStatus: null,
    signNewsAboutCoursesDateSending: false,
    signDownloadCourseContentStatus: null,
    signDownloadCourseContentSending: false,
    formacao:{ 
        bought: false,
        titulo:''
    }
  }
}
