const crypto = require("crypto");

class post {
  constructor({ id, title, text }) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}

const posts = [];

const resolvers = {
  Query: {
    posts: () => posts,
    post: (_, args) => posts.find((p) => p.id == args.id),
  },

  Mutation: {
    createPost(_, args) {
      posts.push(
        new post({
          id: crypto.randomBytes(4).toString("hex"),
          text: args.text,
          title: args.title,
        })
      );

      return posts[posts.length - 1];
    },

    deletePost(_, args) {
      const p = posts.findIndex((p) => p.id == args.id);
      const tmp = post[p];
      posts.splice(p, 1);

      return tmp;
    },

    updatePost(_, args) {
      const p = posts.findIndex((p) => p.id == args.id);
      posts[p] = {
        ...args,
      };

      return posts[p];
    },
  },
};

exports.resolvers = resolvers;
