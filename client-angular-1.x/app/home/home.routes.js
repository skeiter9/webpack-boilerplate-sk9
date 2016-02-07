export const homeRules = ($uRP) => {

  $uRP

  .rule(($injector, $location) => {
    const path = $location.path();
    const normalized = $location.path().toLowerCase();
    if ($location.path() !== normalized) return normalized;
  })

  .rule(($injector, $location) => {
    let path = $location.path();
    if (/\s/.test(path)) return path.replace(/\s/g, '-');
  });

};

export const homeRoutes = ($sP) => {

  $sP

    .state('home', {
      parent: 'layout',
      url: '/',
      resolve: {
        r: ['$q', 'layout', ($q, l) => {
          l.hideAppbar = true;
          return $q.when();
        }]
      },
      views: {
        content: {
          template: '<h1>webpack boilerplate</h1>'
        }
      }
    });

};
