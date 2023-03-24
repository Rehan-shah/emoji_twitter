import { db } from "@/db/db";
import { post } from "@/db/schema";

const add = async (content: string) => {
  await db.insert(post)
    .values({
      content: content,
      createdAt: new Date(),
    });

}


export default add
