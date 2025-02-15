import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useTopics, useCreateTopic } from "./lib/hooks/useTopics";

function App() {
  const [count, setCount] = useState(0);
  const { topics } = useTopics();
  const { mutate: createTopic } = useCreateTopic(); // ✅ Now correctly destructuring isLoading

  const handleCreateTopic = () => {
    createTopic({
      "text": "Test Topic",
      "topicUserId": "user2",
      "country": "USA",
      "image": "https://via.placeholder.com/150", // Optional image
    });
  };

  //console.log("topics", topics)
 
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleCreateTopic}  style={{ marginLeft: "10px" }}>
          { "Create Test Topic"}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
