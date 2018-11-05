
const resolvers = {
  Query: {
    todo(root, args, context) {
      return context.prisma.todo({ id: args.todoId })
    },
    async todosByUser(root, args, context) {
      let auth0ID;
      const user = await context.prisma.user({ auth0ID: context.user.sub });
      if (!user) {
        let newUser = await context.prisma.createUser({ auth0ID: context.user.sub });
        auth0ID = newUser.auth0ID;
      } else {
        auth0ID = user.auth0ID;
      }
      return context.prisma.todoes({
        where: {
          author: { auth0ID, },
        }
      })
    },
  },
  Mutation: {
    async createTodo(root, args, context) {
      let user = await context.prisma.user({ auth0ID: context.user.sub });
      if (!user) {
        user = await context.prisma.createUser({ auth0ID: context.user.sub });
      }
      return context.prisma.createTodo({
        title: args.data.title,
        description: args.data.description,
        author: {
          connect: { id: user.id, }
        },
      })
    },
  }
}

module.exports = resolvers