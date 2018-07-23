
var axios = require('axios')

var baseURL = 'http://47.106.148.205:8899/'

var methods = {
  request: obj => {
    axios.get(`${baseURL}${obj.url}`,obj.data || {}).then(obj.success|| (() => {}),obj.error || (()=>{}))
  }
}

module.exports.request = methods.request
