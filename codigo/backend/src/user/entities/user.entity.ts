import { Comments, Likes, Tags, UserPost } from '@prisma/client';

export class User {
  id?: string;
  email: string;
  hashedPassword: string;
  name: string;
  username: string;
  image?: string;
  location?: string;
  acceptTerms: boolean;
  admin?: boolean;
  role?: string;
  curriculum?: string;
  score?: number;
  likes?: Likes[];
  comments?: Comments[];
  tags?: Tags[];
  userPosts?: UserPost[];
}
