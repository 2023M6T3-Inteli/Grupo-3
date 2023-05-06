import { Comments, Likes, MLTable, Tags, UserPost } from '@prisma/client';

export class CreateUserDTO {
  id?: string;
  name: string;
  username: string;
  image?: string;
  location?: string;
  acceptTerms: boolean;
  admin?: boolean;
  role?: string;
  curriculum?: string;
  score?: number;
  mltags: MLTable[];
  likes?: Likes[];
  comments?: Comments[];
  tags?: Tags[];
  userPosts?: UserPost[];
}
