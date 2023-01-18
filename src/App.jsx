import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

//explanation:  https://www.youtube.com/watch?v=plxpLrEHwB4


function App() {
  const [post, setPost] = useState(null);
  const [id, setId] = useState(1);
  //first argument is a callback
  //second argument is an array (the dependency array)
  //any variables that you're watching in the dependency array
  //must always be primitive (scalar) data types.
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        signal: controller.signal,
      })
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
    //For an axios call we abort to not have memory leaks
    return () => controller.abort();
  }, [id]);

  return (
    <div className="container">
      <h1>Effect Hook</h1>
      <p>
        We can hook into the following component lifecycle events wuth useEffect
      </p>
      <ul>
        <li>Component Did Mount</li>
        <li>Component did Update</li>
        <li>Component Will Unmount</li>
      </ul>
      <form>
        <input
          type="number"
          name="id"
          id="id"
          className="form-control"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </form>
      <h2>Post {post && post.title}</h2>
      <p>{post && post.body}</p>
    </div>
  );
}

export default App;
