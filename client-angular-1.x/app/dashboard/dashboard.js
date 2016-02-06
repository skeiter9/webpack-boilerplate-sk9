import userCardModule from '../components/user-card/user-card.js';

export default angular.module('wagonDashboard', [
  userCardModule.name
])

  .directive('wagonDashboardPage', [() => ({
    restrict: 'E',
    template: require('./templates/dashboard.jade')()
  })])
