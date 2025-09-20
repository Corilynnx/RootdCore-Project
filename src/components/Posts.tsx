import '../styles/posts.css';
import { useState } from 'react';
import { Heart, MessageCircleMore, SendHorizontal, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

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
  initialComments = [], // will be ignored, always start empty
  initialShares = 0
}: PostProps) => {
  const [likes, setLikes] = useState(initialLikes);
  // Always start with no comments (remove sample comments)
  const [comments, setComments] = useState<string[]>([]);
  const [shares, setShares] = useState(initialShares);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [showShareIcons, setShowShareIcons] = useState(false);
  

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  // State to control comment modal visibility
  const [showComments, setShowComments] = useState(false);

  // Open the comment modal/panel
  const handleComment = () => {
    setShowComments(true);
  };

  // Add a comment (to be used in modal/panel)
  const addComment = (newComment: string) => {
    setComments((prev) => [...prev, newComment]);
  };

  // Close the comment modal/panel
  const closeComments = () => {
    setShowComments(false);
  };

  const handleShare = () => {
    setShares((prev) => (isShared ? prev - 1 : prev + 1));
    setIsShared(!isShared);
    setShowShareIcons((prev) => !prev);
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
      {/* Share icons */}
        {showShareIcons && (
          <div className="share-icons">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Facebook"
            >
              <Facebook />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(content)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Twitter"
            >
              <Twitter />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(content)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
            >
              <Linkedin />
            </a>
            <a
              href={`mailto:?subject=Check out this post&body=${encodeURIComponent(content + '\n' + window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share via Email"
            >
              <Mail />
            </a>
          </div>
        )}
      </div>

      {/* Comment Modal/Panel (to be implemented in next step) */}
      {showComments && (
        <div className="comment-modal-backdrop" onClick={closeComments}>
          <div className="comment-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeComments}>×</button>
            <h3>Comments</h3>
            <div className="comment-list">
              {comments.length === 0 ? (
                <p className="no-comments">No comments yet.</p>
              ) : (
                comments.map((c, i) => (
                  <div className="comment-item" key={i}>{c}</div>
                ))
              )}
            </div>
            <form className="comment-form" onSubmit={e => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem('comment') as HTMLInputElement;
              const value = input.value.trim();
              if (value) {
                addComment(value);
                input.value = '';
              }
            }}>
              <input name="comment" className="comment-input" placeholder="Add a comment..." autoComplete="off" />
              <button type="submit" className="comment-submit">Post</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
