import '../styles/posts.css';
import { useState } from 'react';
import { Heart, MessageCircleMore, SendHorizontal } from 'lucide-react';

export type PostProps = {
  id: string | number;
  userId: string | number;
  username: string;
  profilePic: string;
  content: string;
  timestamp: string;
  initialLikes?: number;
  initialComments?: string[];
  initialShares?: number;
  imageUrl?: string
};

export const Post = ({
  id,
  username,
  profilePic,
  content,
  timestamp,
  initialLikes = 0,
  initialComments = [],
  initialShares = 0
}: PostProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<string[]>(initialComments);
  const [shares, setShares] = useState(initialShares);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    const newComment = prompt('Leave a comment:');
    if (newComment) {
      setComments((prev) => [...prev, newComment]);
    }
  };

  const handleShare = () => {
    setShares((prev) => (isShared ? prev - 1 : prev + 1));
    setIsShared(!isShared);
  };

  if (!id || !username || !profilePic || !content) {
    return <div className="post error">⚠️ Missing post data.</div>;
  }

  console.log("post data:", { id, username, profilePic, content, timestamp, initialLikes, initialComments, initialShares });

  return (
    <div className="post">
      <div className="user-info">
        <img src={profilePic} alt={username} className="post-avatar" />
        <span className="username">{username}</span>
      </div>

      <div className="post-content">
        <p className='p-content'>{content}</p>
        <span className="timestamp">{timestamp}</span>
      </div>

      <div className="post-actions">
        <div className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          <Heart />
          <span>{likes} Likes</span>
        </div>

        <div className="action-btn" onClick={handleComment}>
          <MessageCircleMore />
          <span>{comments.length} Comments</span>
        </div>

        <div className={`action-btn ${isShared ? 'shared' : ''}`} onClick={handleShare}>
          <SendHorizontal />
          <span>{shares} Shares</span>
        </div>
      </div>
    </div>
  );
};
