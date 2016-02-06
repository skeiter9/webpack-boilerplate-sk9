import angular from 'angular';
import styles from "./vehicle.css";

export default angular.module('wagonVehicle', [])

  .directive('wagonNewVehicle', ['$window', ($w) => ({
    restrict: 'E',
    template: require('./vehicle.jade')(),
    compile(tE) {

      const hCover = (tCover) => tCover
        .css({height: `${$w.innerWidth * (9 / 16)}px`});

      const hContainer = (tContainer) => $w.Math
        .max($w.innerHeight, tContainer[0].offsetHeight);

      tE.addClass(styles.vnContainer);

      const buttons = tE.find('a');
      const cover = tE.find('section').eq(0);
      const list = tE.find('section');

      buttons.eq(0).addClass(styles.vnButtonAdd);
      buttons.eq(1).addClass(styles.vnButton);

      cover.addClass(styles.vnCover);

      list.addClass(styles.vnList);
      list.eq(1).find('div').addClass(styles.vnListItem);
      list.eq(1).find('div').find('span').addClass(styles.vnListItemField);

      return (scope, elem) => {

        const resize = () => {
          hCover(cover);
          elem.css({height: `${hContainer(elem)}px`})
        };

        resize();
        $w.addEventListener('optimizedResize', () => resize());

      }

    }
  })]);
