import angular from 'angular';

export default angular.module('wagonSplash', [])

  .directive('wagonSplash', [() => ({
    restrict: 'E',
    template: `<img src='static/images/wagon-logo.png' style='max-width: 100%'/>`
  })])
