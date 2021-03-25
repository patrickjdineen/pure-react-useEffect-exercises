import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Reddit({ subreddit }){
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        console.log('render')
        //Fetch data when the component mounts
        fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(res=> res.json())
            .then(json =>
                setPosts(json.data.children.map(c => c.data))
                )
            .then(console.log('posts set'))
    },[subreddit, setPosts]);
    return(
        <ul>
            {posts.map(post =>(
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
};

function App(){
    //2 pieces of state, one to hold the input value and another to hold current subreddt
    const [inputValue, setValue] = useState('reactjs');
    const [subreddit, setSubreddit] = useState(inputValue);

    const handleSubmit = e =>{
        e.preventDefault();
        setSubreddit(inputValue);
    };

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input
            value={inputValue}
            onChange={e => setValue(e.target.value)} />
        </form>
        <Reddit subreddit={subreddit} />
        </>
    );

}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);