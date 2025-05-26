import { useTopics } from "../../lib/hooks/useTopics";
import { Topic } from "../../lib/types/topics";
function Topics() {
  const { topics } = useTopics();

  return (
    <ul>
      {topics.map((topic : Topic) => (
        <li> {topic.text} </li>
      ))}
    </ul>
  );
}

export default Topics;
