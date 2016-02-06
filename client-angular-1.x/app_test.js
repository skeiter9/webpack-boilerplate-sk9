const test = require('tape');
const angularMocks = require('angular-mocks');
const oclazyload = require('oclazyload');

const routesTests = require('./app/routes/routes_test.js');

(() => {

  window.addEventListener('load', () => {

    const app = angular.bootstrap(document.body, ['app', 'oc.lazyLoad', 'ngMock']);
    const $state = app.get('$state');

    routesTests(test, app);

  });

})();
