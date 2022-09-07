let baseUrl = 'https://fm-api.falconconsulting.fr/api/v1';
//let mediaUrl = 'https://adzone-api-dev.falconweb.app/';
if (window.location.host === 'fm-dev.falconweb.app') {
  baseUrl = 'https://fm-api.falconconsulting.fr/api/v1';
  //mediaUrl = 'https://adzone-api-dev.falconweb.app/';
} else if (window.location.host === 'fm-qa.falconweb.app') {
  baseUrl = 'https://fm-api.falconconsulting.fr/api/v1';
  //mediaUrl = 'https://adzone-api-qa.falconweb.app/';
} else if (window.location.host === 'fm-staging.falconweb.app') {
  baseUrl = 'https://fm-api.falconconsulting.fr/api/v1';
  //mediaUrl = 'https://adzone-api-staging.falconweb.app/';
}
module.exports = { baseUrl };
