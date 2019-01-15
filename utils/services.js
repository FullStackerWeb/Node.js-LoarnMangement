// Third party imports
const https = require('https')

/**
 * getHttpRequestPromise: Make a request to Moneeda API with the provided options
 * @param { Object } options: Includes the request host, method, path and headers object
 * @returns { Object } Returns a promise object for the request
 */
const getHttpRequestPromise = options => {
  return new Promise((resolve, reject) => {
    const request = https.request(options, (res) => {
      let responseData = ''
      res.on('data', (data) => {
        responseData += data
      })
      res.on('end', () => {
        const parsedData = JSON.parse(responseData)
        resolve(parsedData)
      })
    }).on('error', (error) => {
      reject(error)
    })

    request.end()
    return request
  })
}

module.exports = {
  getHttpRequestPromise
}
