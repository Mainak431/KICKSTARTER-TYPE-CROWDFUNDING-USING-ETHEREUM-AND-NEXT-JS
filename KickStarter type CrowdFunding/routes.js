const routes = require('next-routes')();
//second set of () means require returns a function and the function is automatically invoked


routes

  .add('/campaigns/new', '/campaigns/new')

  .add('/campaigns/:address', '/campaigns/campaign')

  .add('/campaigns/:address/requests', '/campaigns/requests/index')

  .add('/campaigns/:address/requests/new', '/campaigns/requests/new');



module.exports = routes;
