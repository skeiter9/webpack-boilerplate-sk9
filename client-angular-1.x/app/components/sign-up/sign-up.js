import angular from 'angular';

import styles from "./sign-up.css";

export default angular.module('wagonSignUp', [])

  .directive('wagonSignUp', [() => ({
    restrict: 'E',
    template: require('./init.jade')(),
    controller: ['$state', '$log', function($st, $l) {

      this.send = (form) => {
        if (form.$valid) $st.go('confirm');
        else $l.debug('phone input is wrong');
      };

    }],
    controllerAs: 'signUp',
    compile(tE) {
      tE.addClass(styles.suContainer);
      tE.find('label').eq(0).addClass(styles.suLabel);
      tE.find('input').eq(0).addClass(styles.suInput);
      tE.find('button').eq(0).addClass(styles.suButton);
    }
  })])

  .directive('wagonConfirm', [() => ({
    restrict: 'E',
    template: require('./confirm.jade')(),
    controller: ['$state', '$log', function($st, $l) {

      this.send = (form) => {
        if (form.$valid) $st.go('dashboard');
        else $l.debug('security code is wrong');
      };

    }],
    controllerAs: 'confirm',
    compile(tE) {
      tE.addClass(styles.suContainer);
      tE.find('label').eq(0).addClass(styles.suLabel);
      tE.find('input').eq(0).addClass(styles.suInput);
      tE.find('button').eq(0).addClass(styles.suButton);
    }
  })]);
