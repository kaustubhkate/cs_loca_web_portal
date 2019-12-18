// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // baseUrlS: 'http://35.182.130.214:8080/experience', 
  baseUrlS: 'http://3.88.196.126:8080/LocA',
  // baseUrlS: 'http://localhost:8080',
  fcmUrl: 'http://35.182.130.214:8080/eafcmpushnotifications',

  baseUrl: 'http://35.182.130.214:8080/experience',
  homestayUrl : 'http://35.182.130.214:8080/homestayrest',
  catererUrl : 'http://35.182.130.214:8080/cateringrest',
  insuranceUrl : 'http://35.182.130.214:8080/insurancerest',
  transportUrl : 'http://35.182.130.214:8080/transportationrest'
};


// http://35.182.130.214:7001