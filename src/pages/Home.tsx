import { useEffect, useState } from 'react';
import { Post, type PostProps } from '../components/Posts';
import { Navbar } from '../components/Navbar';
import { Createpost } from '../components/Createpost';




type LocalPost = {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
};

type MockUser = {
  id: number;
  firstName: string;
  lastName: string;
};

export const Home = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch local posts data
        const postsRes = await fetch('/posts.json');
        const responseText = await postsRes.text();
        
        if (responseText.startsWith('<!DOCTYPE html>')) {
          throw new Error('Server returned HTML instead of JSON. Check file path.');
        }

        const postsData = JSON.parse(responseText);

        // Create mock users with more realistic names
        const mockUsers: MockUser[] = [
          { id: 121, firstName: "Alex", lastName: "Morgan" },
          { id: 91, firstName: "Jordan", lastName: "Smith" },
          { id: 16, firstName: "Taylor", lastName: "Johnson" },
          { id: 47, firstName: "Casey", lastName: "Williams" },
          { id: 131, firstName: "Riley", lastName: "Brown" },
          { id: 98, firstName: "Morgan", lastName: "Jones" },
          { id: 70, firstName: "Jamie", lastName: "Garcia" },
          { id: 67, firstName: "Dakota", lastName: "Miller" },
          { id: 82, firstName: "Skyler", lastName: "Davis" },
          { id: 144, firstName: "Peyton", lastName: "Rodriguez" }
        ];

        // Format posts with user data
        const formattedPosts = postsData.posts.map((post: LocalPost) => {
          // Find user for this post
          const user = mockUsers.find(u => u.id === post.userId) || 
                      { id: post.userId, firstName: 'Anonymous', lastName: 'User' };

          return {
            id: post.id.toString(),
            userId: post.userId,
            username: `${user.firstName} ${user.lastName}`,
            profilePic: `https://i.pravatar.cc/150?u=${post.userId}`,
            content: `${post.body}`,
            timestamp: `${Math.floor(Math.random() * 12) + 1} hours ago`,
            initialLikes: post.reactions.likes,
            initialComments: Array.from(
              { length: Math.min(Math.floor(Math.random() * 5), 3) },
              (_, i) => `Sample comment ${i + 1}`
            ),
            initialShares: Math.floor(post.views / 100),
            imageUrl: post.imageUrl,
          };
        });

        if (isMounted) {
          setPosts(formattedPosts);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
          setIsLoading(false);
          console.error('Error:', err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ... rest of your component remains the same
  if (isLoading) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="loading-spinner">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
        
      <Navbar />
      <Createpost onCreatePost={(newPost) => {
        setPosts((prev) => [
          {
            ...newPost,
            id: Date.now().toString(),
            userId: newPost.userId ?? 0,
            username: newPost.username ?? "Anonymous User",
            profilePic: newPost.profilePic ?? `https://i.pravatar.cc/150?u=${Date.now()}`,
            content: newPost.content ?? "",
            timestamp: newPost.timestamp ?? "Just now",
            initialLikes: newPost.initialLikes ?? 0,
            initialComments: newPost.initialComments ?? [],
            initialShares: newPost.initialShares ?? 0,
            imageUrl: newPost.imageUrl ?? "",
          },
          ...prev,
        ]);
      }} />
      <div className="posts-list">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            userId={post.userId}
            username={post.username}
            profilePic={post.profilePic}
            content={post.content}
            timestamp={post.timestamp}
            initialLikes={post.initialLikes}
            initialComments={post.initialComments}
            initialShares={post.initialShares}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};