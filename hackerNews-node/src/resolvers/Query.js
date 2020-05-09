function feed(parent, args, context, info) {
  return context.prisma.links();
}

function link(parent, args, context) {
  let links = context.prisma.links();
  return links.filter((x) => x.id === args.id)[0];
}

module.exports = {
  feed,
  link,
};
