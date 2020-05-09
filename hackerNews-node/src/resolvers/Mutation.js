const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function createPost(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
}

function updatePost(parent, args, context, info) {
  let links = context.prisma.links();
  links.forEach((x) => {
    if (x.id == args.id) {
      x.url = args.url;
    }
  });
  return links.filter((x) => x.id === args.id)[0];
}

async function signup(parent, args, context, info) {
  // 1
  const hashedPassword = await bcrypt.hash(args.password, 10);
  // 2
  const { password, ...user } = await context.prisma.createUser({
    ...args,
    password: hashedPassword,
  });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  // 1
  const { password, ...user } = await context.prisma.user({
    email: args.email,
  });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcrypt.compare(args.password, password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
}

async function vote(parent, args, context, info) {
  // 1
  const userId = getUserId(context);

  // 2
  const voteExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  });
  if (voteExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  // 3
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } },
  });
}

module.exports = {
  createPost,
  updatePost,
  signup,
  login,
  vote,
};
