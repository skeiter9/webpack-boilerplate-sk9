export const layoutRoutes = ($sP) => {

  $sP
    .state('layout', {
      abstract: true,
      template: require('./templates/layout.jade')(),
      controller: 'LayoutController',
      controllerAs: 'layout'
    });

};
