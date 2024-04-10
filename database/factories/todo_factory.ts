import factory from '@adonisjs/lucid/factories'
import Todo from '#models/todo'

export const TodoFactory = factory
  .define(Todo, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      desc: faker.lorem.paragraph(),
    }
  })
  .build()
