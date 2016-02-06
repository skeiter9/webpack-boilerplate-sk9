import angular from 'angular';

require('./appbar.css');

export default angular.module('wagonAppbar', [])

  .directive('wagonAppbar', [() => ({
    restrict: 'E',
    scope: {
      title: '=',
      hideSearch: '=',
      leftIconName: '=',
      leftIconFn: '&'
    },
    controller: angular.noop,
    bindToController: true,
    controllerAs: 'appbar',
    template: `
      <section>
        <a class='icon-arrow_back fx-dur-450 fx-fade-normal' ng-if='appbar.leftIconName == "back"' ng-click='appbar.leftIconFn()'></a>
        <a class='icon-menu fx-dur-450 fx-fade-normal' ng-if='appbar.leftIconName == "menu"' ng-click='appbar.leftIconFn()'></a>
      </section>
      <h1> {{appbar.title | uppercase}} </h1>
      <section>
        <a class='icon-search fx-dur-450 fx-fade-normal' ng-hide='appbar.hideSearch'></a>
      </section>

    `
  })]);
