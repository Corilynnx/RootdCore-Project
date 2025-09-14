import { useEffect, useState } from 'react';
import '../styles/profile.css';
import { Navbar } from '../components/Navbar';
import { Heart, MessageCircleMore, SendHorizontal } from 'lucide-react';

export const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mood, setMood] = useState('🙂');
  
  // State for post interactions
  const [posts, setPosts] = useState<
    Array<{
      id: string | number;
      content: string;
      timestamp: string;
      isLiked: boolean;
      likes: number;
      comments: string[];
      isShared: boolean;
      shares: number;
    }>
  >([
    {
      id: '1',
      content: 'Cooked a delicious turmeric chicken today! Feeling great 🧡',
      timestamp: '2 hours ago',
      isLiked: false,
      likes: 12,
      comments: [],
      isShared: false,
      shares: 3
    },
    {
      id: '2',
      content: "Trying out a new anti-inflammatory smoothie recipe. Let's see how it goes!",
      timestamp: '1 day ago',
      isLiked: false,
      likes: 8,
      comments: [],
      isShared: false,
      shares: 1
    },
    {
      id: '3',
      content: 'Just finished a yoga session. We focused on stretches that ease gut pain. Feeling super great after being active.',
      timestamp: '3 days ago',
      isLiked: false,
      likes: 24,
      comments: [],
      isShared: false,
      shares: 5
    },
    {
      id: '4',
      content: 'Had a great day at the park with my kids. We played frisbee and enjoyed the sunshine. Headed back to make a mediterranean spiced meal for dinner.',
      timestamp: '5 days ago',
      isLiked: false,
      likes: 15,
      comments: [],
      isShared: false,
      shares: 2
    }
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLike = (postId: string | number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string | number) => {
    // In a real app, you would open a comment modal or similar
    const comment = prompt('Add your comment:');
    if (comment) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment]
          };
        }
        return post;
      }));
    }
  };

  const handleShare = (postId: string | number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isShared: true,
          shares: post.shares + 1
        };
      }
      return post;
    }));
    alert('Post shared successfully!');
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <div className="error">⚠️ User data not found.</div>;
  }

  const friendCount = 120;
  const postCount = posts.length;
  const photoCount = 34;

  return ( 
    <div className="profile">
      <Navbar />
     
      <header className="profile-header">
        <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="profile-pic" />
        <h1 className='profile-name'>{user.name}</h1>
        
        <div>
          <button className="add-btn">Add Friend</button>
          <button className="add-btn">Message</button>

          <section className="stats">
            
            <div className='friends'>{friendCount} Friends</div>
            <div className='header-posts'>{postCount} Posts</div>
            <div className='photos'>{photoCount} Photos</div>
          </section>
        </div>
      </header>
     
      <div className="mood-tracker">
        <label htmlFor="mood-dropdown" className="mood-select">
          How am I feeling today?
        </label>
        <select
          id="mood-dropdown"
          className="mood-dropdown"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          aria-label="Select current mood"
        >     
          <option value="😊">😊&nbsp;&nbsp;Good</option>
          <option value="😐">😐  Okay / Managing</option>
          <option value="😕">😕  Fluctuating</option>
          <option value="😞">😞  Tough day</option>
          <option value="😖">😖  In pain / Struggling</option>
          <option value="😴">😴  Fatigued / Exhausted</option>
          <option value="💪">💪  Pushing through</option>
          <option value="🙏">🙏  Hopeful / Grateful</option>
        </select>
      </div>
    
      <div className='recent-posts-container'>
        <h2 className='post-h2'>Recent Posts</h2>
        
        <ul className="post-list">
          {posts.map((post) => (
            <article key={post.id} className="post-item">
              <div className="post-user-info">
                <img
                  src={user && user.id ? `https://i.pravatar.cc/100?u=${user.id}` : 'https://i.pravatar.cc/100'}
                  alt={user && user.name ? user.name : 'User'}
                  className="post-avatar"
                />
                <span className="post-username">{user && user.name ? user.name : 'User'}</span>
              </div>
              <p className="post-content">{post.content}</p>
              <span className="profile-timestamp">{post.timestamp}</span>
              <div className="post-actions">
                <div 
                  className={`action-btn ${post.isLiked ? 'liked' : ''}`} 
                  onClick={() => handleLike(post.id)}
                >
                  <Heart size={18} />
                  <span>{post.likes} Likes</span>
                </div>
                <div 
                  className="action-btn" 
                  onClick={() => handleComment(post.id)}
                >
                  <MessageCircleMore size={18} />
                  <span>{post.comments.length} Comments</span>
                </div>
                <div 
                  className={`action-btn ${post.isShared ? 'shared' : ''}`} 
                  onClick={() => handleShare(post.id)}
                >
                  <SendHorizontal size={18} />
                  <span>{post.shares} Shares</span>
                </div>
              </div>
            </article>
          ))}
        </ul>
      </div>
      <button className="load-more-post">See More Posts</button>
    </div>
    );
  };