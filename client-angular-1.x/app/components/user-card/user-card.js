import angular from 'angular';
import styles from "./user-card.css";

export default angular.module('wagonUserCard', [])

  .directive('wagonUserCard', ['$window', ($w) => ({
    restrict: 'E',
    template: require('./user-card.jade')(),
    compile(tE) {

      tE.addClass(styles.container);

      tE.find('section').addClass(styles.section);
      tE.find('img').eq(0).addClass(styles.avatar);
      tE.find('nav').addClass(styles.sectionRight);
      tE.find('nav').find('a').addClass(styles.sectionRightItem);

      return (scope, elem) => {

        const resize = () => {
          if ($w.innerHeight > elem[0].offsetHeight) tE.find('nav').find('a')
            .eq(2).css({marginTop: `${$w.innerHeight - elem[0].offsetHeight - 64}px`})
          else tE.find('nav').find('a').eq(2).css({marginTop: 0})
        };

        resize();
        $w.addEventListener('optimizedResize', () => resize());

      }

    }
  })]);
