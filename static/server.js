const path = require('path');
const config = require('./config');
const rules = require('./routes');
const jsonServer = require('json-server');

const ip = config.SERVER;
const port = config.PORT;
const db_file = config.DB_FILE;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, config.DB_FILE));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

/*
server.use((req, res, next) => {
 res.header('X-Hello', 'World');
 next();
})
*/

/*
router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data,
    code: 0
  })
}

*/


//server.use("/api",router);




server.use(jsonServer.rewriter(rules));
server.use(router);
server.listen({
	host: ip,
	port: port,
}, function() {
	console.log(JSON.stringify(jsonServer));
	console.log(`JSON Server is running in http://${ip}:${port}`);
});