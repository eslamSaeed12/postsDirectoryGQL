const crypto = require("crypto");

class post {
  constructor({ id, title, text, comments }) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.comments = comments;
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
          comments: args.comments ? args.comments : [],
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
        ...posts[p],
        ...args,
      };

      return posts[p];
    },

    createComment(_, { postId, content }) {
      const postIdx = posts.findIndex((p) => p.id == postId);

      posts[postIdx]?.comments?.push(content);

      return posts[postIdx];
    },

    updateComment(_, { content, postId, newContent }) {
      const postIdx = posts.findIndex((p) => p.id == postId);

      const comments = posts?.[postIdx]?.comments;

      const commentIdx = comments.indexOf(content);

      posts[postIdx].comments[commentIdx] = newContent;

      return posts[postIdx];
    },

    deleteComment(_, { content, postId }) {
      const postIdx = posts.findIndex((p) => p.id == postId);

      const comments = posts?.[postIdx]?.comments;

      const commentIdx = comments.indexOf(content);

      comments.splice(commentIdx, 1);

      posts[postIdx].comments = comments;

      return posts[postIdx];
    },
  },
};

exports.resolvers = resolvers;
