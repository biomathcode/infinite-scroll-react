import { useState } from 'react';
import './App.css';

import useInfiniteScroll from 'react-infinite-scroll-hook';




function App() {
  const [data, setData] = useState([]);

  const [since, setSince] = useState(0);
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(false);

  const [hasNextPage, setHasNextPage] = useState(true);


  const fetchmore = async (since) => {
    
    setLoading(true)
    setSince(since + limit);
    try {
      const response = await fetch(`https://api.github.com/users?since=${since}&per_page=${limit}`);
      const json = await response.json();
     return  setData((data) => [...data, ...json]);
    }
    catch(e) {
      console.log(e);
      return setHasNextPage(false);
    }
    finally {
     return  setLoading(false);
    }
    
  }

  const [sentryRef] = useInfiniteScroll({
    loading, 
    hasNextPage: hasNextPage ,
    delayInMs:500,
    onLoadMore: () => {
      fetchmore(since);
    }
  })

  return (
    <div className="App">
      <h2>List of github users</h2>
      <main className='main'>
      {data && data.map((item, index) => {
          return (
            <div key={index} className='item'>
              <p>{item && item.login }</p>
              <img src={item.avatar_url} width={100} height={100} alt={item.avatar_url} />
            </div>
          )
        })}
        {
          (loading || hasNextPage) && 
          <div className="loader" ref={sentryRef}>
          <h1>Loading...</h1>
        </div>
        }

      </main>
     
     
    </div>
  );
}

export default App;
