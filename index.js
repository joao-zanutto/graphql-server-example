const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGO_URL } = require('./secret');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

// Instantiate the Appolo server with typeDefinitions and resolvers
const server = new ApolloServer({
	typeDefs, // Definition of types that will be used by the server
	resolvers, // How the types defined above will resolve
	context: ({ req }) => ({ req }), // Passing context
});

// Connect to DB
mongoose
	.connect(MONGO_URL, { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to MongoDB');
		return server.listen({ port: 5000 }); // Listen on server
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	});
