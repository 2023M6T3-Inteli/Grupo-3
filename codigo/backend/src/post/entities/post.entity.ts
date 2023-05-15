import { Comments } from "@prisma/client";

export class Post {
    title: string;

    description: string;

    image: string;
  
    content: string;

    active: boolean;
  
    comments: Comments
  }
  
  