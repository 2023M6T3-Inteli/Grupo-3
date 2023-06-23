import axios from "axios";
const API_URL = "http://localhost:5500";

const contentService = {
  getContent: async () => {
    const content = await axios.get(`${API_URL}/post`, {
    });

    return content;
  },
  getCommentsByPostId: async (postID: string) => {
    const content = await axios.get(`${API_URL}/post/comments/${postID}`, {
    });

    return content;
  },
  getPostByPostId: async (postID: string) => {
    const content = await axios.get(`${API_URL}/post/byId/${postID}`, {
    });

    return content;
  },
  getPostLiked: async (userId: string) =>{
    const content = await axios.get(`${API_URL}/post/saved${userId}`,{
    });
    return content;
  },
  
  createPost: async (title: string, tags: string[], description: string, content: string, comments: any, userPost: any, likes: any) => {
    const createPost = await axios.post(`${API_URL}/post`, {
      title: title,
      tags: tags,
      description: description,
      content: content,
      active: true,
      comments: comments,
      userPost: userPost,
      likes: likes,
    })
    return createPost
  },
  incrementLike: async (postID: string, userID: string) => {
    const incrementLike = await axios.post(`${API_URL}/post/likes/${postID}`, {
        userID: userID,
    })
    return incrementLike
  },
};

export default contentService;
