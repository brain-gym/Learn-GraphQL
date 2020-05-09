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

module.exports = {
  id,
  description,
  url,
  postedBy,
};
