module.exports = (test, app) => {

  const $state = app.get('$state');

  test.test('if user is not loggued show splash screen', (t) => {
    t.end();
  });

  test.test('if user is loggued show dashboard', (t) => {
    t.end();
  });

  test.test('if user is new show the tour page', (t) => {
    t.end();
  });

};
