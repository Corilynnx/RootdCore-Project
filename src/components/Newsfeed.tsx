import '../styles/newsfeed.css';
import { useEffect, useState } from 'react';
import { Post } from './Posts';

type PostData = {
  id: number;
  userId: string;
  username: string;
  profilePic: string;
  content: string;
  timestamp: string;
  initialLikes: number;
  initialComments: string[];
  initialShares: number;
};

export const Newsfeed = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const postsRes = await fetch('https://dummyjson.com/posts');
        const postsJson = await postsRes.json();

        const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersRes.json();

        const formattedPosts: PostData[] = postsJson.posts.slice(0, 10).map((post: any) => {
          const user = usersData.find((u: any) => u.id === post.userId) || {
            id: post.userId,
            name: `User ${post.userId}`
          };

          return {
            id: post.id,
            userId: String(post.userId),
            username: user.name,
            profilePic: `https://i.pravatar.cc/150?u=${user.id}`,
            content: post.body,
            timestamp: `${Math.floor(Math.random() * 10) + 1} hours ago`,
            initialLikes: post.reactions?.likes ?? Math.floor(Math.random() * 50),
            initialComments: Array.from(
              { length: Math.floor(Math.random() * 5) },
              (_, i) => `Sample comment ${i + 1}`
            ),
            initialShares: Math.floor(Math.random() * 3)
          };
        });

        setPosts(formattedPosts);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div className="newsfeed loading">Loading posts...</div>;

  return (
    <div className="homefeed">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id.toString()}
          userId={post.userId}
          username={post.username}
          profilePic={post.profilePic}
          content={post.content}
          timestamp={post.timestamp}
          initialLikes={post.initialLikes}
          initialComments={post.initialComments}
          initialShares={post.initialShares}
        />
      ))}
    </div>
  );
};
