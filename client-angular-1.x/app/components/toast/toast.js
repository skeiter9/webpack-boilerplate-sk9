import angular from 'angular';

export default angular.module('wagonToast', [])

  .factory('wagonToast', ['$q', '$compile', '$rootScope', '$document',
  ($q, $c, $rS, $d) => ({
    show(msg) {
      const wT = $c(angular.element('<wagon-toast />'))($rS.new());
      $d.find('body').append(wT);
    },
    destroy() {

    }
  }))

  .directive('wagonToast', ['wagonToast', (wT) => ({
    scope: {isNewUser: '='},
    restrict: 'E',
    controller: angular.noop,
    controllerAs: 'toast',
    template: `<div>{{toast.message}} sss</div>`
    link(s, elem) {

      s.$on('$destroy', function() {
        wT.destroy();
      });

    }
  })]);
