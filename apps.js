const express = require("express");
const compression = require("compression");
//const helmet = require("helmet");
const path = require("path");
const fs = require("fs");

const session = require('express-session');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

// helps secure Express apps
//app.use(helmet());

// compression middleware (unused as of 9/14/22)
app.use(compression());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// publicly accessible folder
app.use(express.static(path.join(__dirname, "public")));


const db = require("./backend/main.js");

db.conn.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

	
function sessionFields(defaults, session) {
	return {
		data: defaults.data,
		expires: defaults.expires,
		userId: session.userId,
	};
}

app.set('trust proxy', 1);
app.use(cookieParser());
app.use(session({
	name: "app-session",
	secret: "H6jgktfE5$Pxm$sNEc88hX#r8s8P&kA!igYS8oE$",
	store: new SequelizeStore({
		db: db.conn,
		table: "sessions",
		extendDefaultFields: sessionFields,
		checkExpirationInterval: 15 * 60 * 1000,
		expiration: 7 * 24 * 60 * 60 * 1000
	}),
	saveUninitialized: true,
	resave: false,
	proxy: true,
	cookie: { secure: true }
}));


// home page routing
app.get("/", (req, res) => {
	res.sendFile(path + "index.html");
});

// load backend routes
let routesDir = path.join(__dirname, "backend/routes");
fs.readdirSync(routesDir).forEach(function(file) {
	require(routesDir + "/" + file)(app);
});

// api routing
app.get('/api/', (req, res) => {
	res.redirect("/api/" + req.params[0]);
});

// view routing
app.get('/*', (req, res) => {
	res.redirect("/#/" + req.params[0]);
});

// connect to nginx listening on local port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
