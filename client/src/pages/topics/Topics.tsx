import { useTopics } from "../../lib/hooks/useTopics";
import "./topics.scss";

function Topics() {
  const { topics } = useTopics();
  console.log(topics.map(topic => topic.image))

  return (
    <div className="topics-wrapper">
      <h2 className="topics-title">All Topics</h2>
      <ul className="topics-container">
        {topics.map((topic) => (
          <li key={topic.topicId} className="topic-card">
            {topic.image && (
              <div className="topic-image-wrapper">
                <img
                  src={topic.image}
                  alt={topic.text}
                  className="topic-image"
                />
              </div>
            )}
            <div className="topic-text">{topic.text}</div>
            <div className="topic-meta">{topic.country}</div>
            <div className="post-count">{topic._count.posts} posts</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Topics;
