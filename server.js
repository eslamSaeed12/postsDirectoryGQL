const fs = require("fs");
const { ApolloServer } = require("apollo-server");
const { resolvers } = require("./resolvers");

const app = new ApolloServer({
  resolvers,
  typeDefs: fs.readFileSync("./schema.gql").toString("utf8"),
  csrfPrevention: true,
  cache: 'bounded',
});

app.listen(4000).then(({ url }) => {
  console.log(`gql ground launcehd at  ${url}`);
});
