import {
  InferModel,
  text,
  mysqlTable,
  serial,
  timestamp,
} from 'drizzle-orm/mysql-core';


export const post = mysqlTable('post', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull()
});

// export const user = mysqlTable("user", {
//   id: text("id").notNull(),
//   userName: text("userName").notNull(),
//   profilePic: text("profilePic").notNull(),
// })

export type Post = InferModel<typeof post>;
export type newPost = InferModel<typeof post, 'insert'>;

// export type User = InferModel<typeof user>;
// export type newUser = InferModel<typeof user, 'insert'>;
