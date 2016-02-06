import angular from 'angular';

if (__ENV__ !== 'test') require('./assets/fonts/icomoon/style.css');

require('./styles/layout.css');

export default angular.module('wagonlayout', [
  require('angular-animate'),
  require('ng-fx')
])

  .run(['$$rAF', ($$rAF) => {
    //resize event optimized through requestAnimationFrame
    const throttle = (type, name, obj = window) => {

      let running = false;

      const func = () => {
        if (running) return;
        running = true;
        $$rAF(() => {
          running = false;
          obj.dispatchEvent(new CustomEvent(name));
        });
      };

      obj.addEventListener(type, func);
    };

    throttle('resize', 'optimizedResize');

  }])

  .service('layout', [function() {
    this.title = 'wagon';
  }])

  .controller('LayoutController', ['layout', function(l) {
    this.data = l;
  }]);
