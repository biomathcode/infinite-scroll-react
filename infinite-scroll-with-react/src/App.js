import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState();




  return (
    <div className="App">
      {data && data.map((item) => {
        return (
          <div key={item.title}>
          </div>
        )
      })}
     
    </div>
  );
}

export default App;
