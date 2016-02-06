export const homeRules = ($uRP) => {

  //$uRP.when('/', '/');
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
          template: '<wagon-home-page />'
        }
      }
    })

    .state('signUp', {
      parent: 'layout',
      url: '/sign-up',
      resolve: {
        r: ['$q', 'layout', ($q, l) => {
          l.hideAppbar = false;
          l.hideSearch = true;
          l.leftIconName = 'back';
          l.title = '';
          return $q.when();
        }]
      },
      views: {
        content: {
          template: '<wagon-sign-up></wagon-sign-up>',
          controller: ['layout', '$state', function(l, $st) {

            l.leftIconFn = () => {
              if (angular.isObject($st.current.data) &&
                angular.isString($st.current.data.prevState.name) &&
                (
                  $st.current.data.prevState.name !== '' ||
                  $st.current.data.prevState.name === ''
                )
              ) $st.go('home');
            };

          }]
        }
      }
    })

    .state('confirm', {
      parent: 'layout',
      url: '/confirm',
      resolve: {
        r: ['$q', 'layout', ($q, l) => {
          l.hideAppbar = false;
          l.hideSearch = true;
          l.leftIconName = 'back';
          l.title = '';
          return $q.when();
        }]
      },
      views: {
        content: {
          template: '<wagon-confirm></wagon-confirm>',
          controller: ['layout', '$state', function(l, $st) {

            l.leftIconFn = () => {
              if (angular.isObject($st.current.data) &&
                angular.isString($st.current.data.prevState.name) &&
                (
                  $st.current.data.prevState.name !== '' ||
                  $st.current.data.prevState.name === ''
                )
              ) $st.go('dashboard');
            };

          }]
        }
      }
    })

};
