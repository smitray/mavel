module.exports = {
  server: {
    port: 3000,
    compress: false
  },
  db: {
		host: 'localhost',
		dbName: 'mavel',
		debug: false,
		options: {
			userName: false,
			passWord: false,
			port: 27017
		}
	},
	secret: [
    'yoursecretkey'
  ],
  "grant": {
    "server": {
      "host": "localhost:3000"
    }
  },
  baseUrl: 'http://localhost:3000'
};
