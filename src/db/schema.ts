import {
  InferModel,
  text,
  mysqlTable,
  serial,
  timestamp,
  varchar,
  date,
} from 'drizzle-orm/mysql-core';


export const post = mysqlTable('post', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  createdAt: date('created_at').notNull(),
  userId: varchar("userId", { length: 32 }).notNull()
});

export type Post = InferModel<typeof post>;
export type newPost = InferModel<typeof post, 'insert'>;

