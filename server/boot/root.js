const path = require('path');
const loopback = require('loopback');

module.exports = function(server) {

  const router = server.loopback.Router();

  const routeRegExp = server.get('env') === 'production' ?
    /^\/(?!(api|static|build)(\/|\W)).*/ :
    /^\/(?!(api|static|build|explorer)(\/|\W)).*/;

  router.get(routeRegExp, function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  server.use(router);
};
