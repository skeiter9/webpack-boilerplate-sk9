module.exports = (test, app) => {

  const $state = app.get('$state');
  const $rootScope = app.get('$rootScope');
  const $location = app.get('$location');

  test.test('check states for routes', (t) => {

    t.equal($state.current.name, 'home', 'main state should be home');

    t.equal($state.get('e404').url, '/404', '404 error page');
    t.equal($state.get('signUp').url, '/sign-up', 'sign-up page');
    t.equal($state.get('confirm').url, '/confirm', 'confirm page');

    t.end();

  });

  test.test('redirect the app by stateName and urls', (t) => {
    t.end();
  });

  test.test('when try to visit a fail page throws 404page', (t) => {
    t.end();
  });

};
