import '../styles/createpost.css';
import { useEffect, useState, useRef } from 'react';

type User = {
    id: number;
    name: string;
    profilePicture: string;
};



type CreatepostProps = {
    onCreatePost: (post: Omit<any, 'id'>) => void;
};

export const Createpost = ({ onCreatePost }: CreatepostProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                setUser({
                    id: data.id,
                    name: data.name,
                    profilePicture: `https://i.pravatar.cc/150?u=${data.id}`
                });
            })
            .catch((error) => console.error('Failed to fetch user:', error));
    }, []);

    const handlePost = () => {
        if (!input.trim() || !user) return;
        onCreatePost({
            userId: user.id,
            username: user.name,
            profilePic: user.profilePicture,
            content: input,
            timestamp: 'Just now',
            initialLikes: 0,
            initialComments: [],
            initialShares: 0,
            imageUrl: '',
        });
        setInput('');
        if (textareaRef.current) textareaRef.current.value = '';
    };

    return (
        <div>
            <div className="create-container">
                {user && (
                    <div className="user-info">
                        <img src={user.profilePicture} alt={user.name} width={40} height={40} style={{ borderRadius: '50%' }} className='avatar' />
                        <span className='username'>{user.name}</span>
                    </div>
                )}
                <textarea
                    name="input"
                    id="input-txt"
                    placeholder="What's on your mind?"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    ref={textareaRef}
                />
                <button className='post-btn' onClick={handlePost}>Post</button>
            </div>
        </div>
    );
}
export default Createpost;