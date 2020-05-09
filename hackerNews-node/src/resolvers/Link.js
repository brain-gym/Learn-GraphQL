function id(parent, args, context) {
  return context.prisma.link({ id: parent.id }).id();
}
function description(parent, args, context) {
  return context.prisma.link({ id: parent.id }).description();
}
function url(parent, args, context) {
  return context.prisma.link({ id: parent.id }).url();
}

function postedBy(parent, args, context) {
  return context.prisma.link({ id: parent.id }).postedBy();
}

function votes(parent, args, context) {
  return context.prisma.link({ id: parent.id }).votes();
}

module.exports = {
  id,
  description,
  url,
  postedBy,
  votes,
};
