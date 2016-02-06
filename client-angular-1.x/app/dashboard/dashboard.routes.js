export const dashboardRules = ($uRP) => {

  //$uRP.when('/', '/');

};

export const dashboardRoutes = ($sP) => {

  $sP

    .state('dashboard', {
      parent: 'layout',
      url: '/dashboard',
      resolve: {
        r: ['$q', 'layout', ($q, l) => {
          l.hideAppbar = false;
          l.hideSearch = false;
          l.title = 'profile';
          l.leftIconName = 'menu';
          return $q.when();
        }]
      },
      views: {
        content: {
          template: '<wagon-dashboard-page />'
        }
      }
    })

};
