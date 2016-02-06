import angular from 'angular';
import appbarModule from '../components/appbar/appbar.js';
import splashModule from '../components/splash/splash.js';
import vehicleModule from '../components/vehicle/vehicle.js';
import signUpModule from '../components/sign-up/sign-up.js';

import styles from "./styles/home.css";

export default angular.module('wagonHome', [
  appbarModule.name,
  splashModule.name,
  vehicleModule.name,
  signUpModule.name
])

  .directive('wagonHomePage', [() => ({
    restrict: 'E',
    template: require('./templates/home.jade')(),
    compile(tE) {
      tE.addClass(styles.hContainer);
      tE.find('div').eq(0).addClass(styles.hOptions);
      const buttons = tE.find('a');
      buttons.eq(0).addClass(styles.hSignUp);
      buttons.eq(1).addClass(styles.hSignIn);
    }
  })]);
