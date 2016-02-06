import angular from 'angular';
import app from './app/boot/app.js';
import oclazyload from 'oclazyload';

{
  window.addEventListener('load', () => {
    window.app = angular.bootstrap(document.body, [app.name, 'oc.lazyLoad'], {strictDi: true});
  });
}
