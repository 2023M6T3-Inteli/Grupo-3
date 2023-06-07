import React, { useEffect, useState } from 'react';
import contentService from '../../services/contentService';

import { Container, UserComment } from './style';

interface CommentsProps {
  commentParams: string;
}

const Comments: React.FC<CommentsProps> = ({commentParams}) => {
  const [comments,setComments]= useState<Comment[]>([])

  useEffect(() => {
    const fetchDataComments = async () => {
      try {
        const responseGet = await contentService.getCommentsByPostId(commentParams);
        setComments(responseGet.data);
      } catch (err) {
        console.error('Error in GET request:', err);
      }
    };

    fetchDataComments();
  }, [commentParams]);

  console.log(comments);

  return(
    <Container>
      {
        comments.map((comment: any) => {
          return(
            <UserComment>
              <div>
                <img style={{width: 40, height: 40 , borderRadius: 20, marginRight:'10px' }}
                        src={"https://github.com/" + "brun0meira" + ".png"}
                        alt="profileImg"
                      />
                <div>
                  <p>{comment.user["name"]}</p>
                  <p>@{comment.user["username"]}</p>
                </div>
              </div>
              <p><span>{comment.content}</span></p>
            </UserComment>
          );
        })
      }
    </Container>
  )

  // comments.map((comment: any) => {
  //   return(
  //     <Commentario>
  //       <div>
  //         <img style={{width: 40, height: 40 , borderRadius: 20, marginRight:'10px' }}
  //                 src={"https://github.com/" + "brun0meira" + ".png"}
  //                 alt="profileImg"
  //               />
  //         <div>
  //           <p>{comment.user["name"]}</p>
  //           <p>{comment.user["username"]}</p>
  //         </div>
  //       </div>
  //       <p>{comment.content}</p>
  //     </Commentario>
  //   );
  // })
}

export default Comments;