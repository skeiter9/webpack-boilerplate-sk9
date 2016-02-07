import angular from 'angular';
import uiRouter from 'angular-ui-router';

import homeModule from '../home/home.js';
import layoutModule from '../layout/layout.js';

import {homeRoutes, homeRules} from '../home/home.routes.js';
import {layoutRoutes} from '../layout/layout.routes.js';

export default angular.module('appRoutes', [
  'ui.router',
  layoutModule.name,
  homeModule.name
])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($sP, $uRP, $lP) {

    $lP.html5Mode({
      enabled: true,
      requiBase: false
    });

    homeRules($uRP);

    homeRoutes($sP);
    layoutRoutes($sP);

    $sP

      .state('e404', {
        url: '/404',
        template: `
          <aside class='e404__box'>
            <span> 404 </span>
            <span> Error</span>
          </aside>
        `
      })

  }])

  .run(['$state', '$rootScope', '$ocLazyLoad', ($st, $rS, $ocL) => {

    $rS.$on('$stateChangeSuccess', (e, toState, toParams, fromState) => {
      $st.current.data =  $st.current.data || {};
      $st.current.data.prevState = fromState;
    });

    $rS.$on('$stateNotFound', (e, unfoundState, fromState, fromParams) => {
        e.preventDefault();
        $st.go('e404');
    });

  }]);
