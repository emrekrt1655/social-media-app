import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTopic, useTopics } from "../../../../lib/hooks/useTopics";
import { FilterType } from "../../../../lib/types/topics";
import "./topics.scss";
import { getUserFromStorage } from "../../../../utils/localStorage";
import { AuthUserData } from "../../../../lib/types/auth";
import Modal from "../../../Modal/Modal";

const Topics = () => {
  const { topics } = useTopics();
  const createTopic = useCreateTopic();
  const navigate = useNavigate();
  const user: AuthUserData = getUserFromStorage();

  const [country, setCountry] = useState<string>("Worldwide");
  const [filter, setFilter] = useState<FilterType>("mostRated");
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({
    text: "",
    country: "Worldwide",
    image: "https://via.placeholder.com/150",
    topicUserId: user?.userId ?? "",
  });

  const isTopicCreator = user?.isTopicCreator === "true";
  const inputRef = useRef<HTMLInputElement>(null);

  const countries = useMemo(() => {
    const countrySet = new Set<string>();
    topics.forEach((topic) => {
      if (topic.country) countrySet.add(topic.country);
    });
    return Array.from(countrySet).sort();
  }, [topics]);

  const searchedCountries = useMemo(() => {
    return countries.filter((c) =>
      c.toLowerCase().includes(search.toLowerCase())
    );
  }, [countries, search]);

  const filteredTopics = useMemo(() => {
    if (country === "Worldwide") return topics;
    return topics.filter((topic) => topic.country === country);
  }, [topics, country]);

  const sortedTopics = useMemo(() => {
    switch (filter) {
      case "mostRated":
        return [...filteredTopics].sort(
          (a, b) => b._count.posts - a._count.posts
        );
      case "lastAdded":
        return [...filteredTopics].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "countryTopic":
        return filteredTopics;
      default:
        return filteredTopics;
    }
  }, [filteredTopics, filter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTopic((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!newTopic.text.trim()) {
      alert("Topic title is required");
      return;
    }

    const topicData = {
      ...newTopic,
      topicUserId: user.userId,
    };

    createTopic.mutate(topicData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setNewTopic({
          text: "",
          country: "Worldwide",
          image: "https://via.placeholder.com/150",
          topicUserId: user.userId,
        });
      },
    });
  };

  return (
    <>
      <div className="topics-container">
        <h2 className="topics-title">Topics</h2>

        <div className="topics-filter">
          <div className="countryFilterTitle">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search countries..."
              value={search}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 150)}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="clear-button"
              onClick={() => {
                setCountry("Worldwide");
                setFilter("mostRated");
                setSearch("");
                inputRef.current?.focus();
              }}
              title="Clear Filter"
            >
              X
            </button>
          </div>

          <div className="selected-country-label">
            Selected: <strong>{country}</strong>
          </div>

          {isFocused && (
            <ul className="countryList">
              {searchedCountries.map((c) => (
                <li
                  key={c}
                  className={`countryList__country ${
                    country === c ? "active" : ""
                  }`}
                  onClick={() => {
                    setCountry(c);
                    setFilter("countryTopic");
                    setSearch("");
                    setIsFocused(false);
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="topics-list">
          <ul>
            {sortedTopics.slice(0, 10).map((topic) => (
              <li
                key={topic.topicId}
                className="topic-item"
                onClick={() => navigate(`/topic/${topic.topicId}`)}
              >
                <strong>
                  {topic.text.length > 25
                    ? topic.text.slice(0, 25) +
                      "... — Click to see the full topic"
                    : topic.text}
                </strong>
                <div className="meta">
                  {topic.country ?? "Unknown"} — {topic._count.posts} posts
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="topics-footer">
          <button className="topics-button" onClick={() => navigate("/topics")}>
            All Topics
          </button>
          {isTopicCreator && (
            <button
              className="topics-button"
              onClick={() => setIsModalOpen(true)}
            >
              Add Topic
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="Add New Topic"
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="text"
            value={newTopic.text}
            placeholder="Topic title"
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            value={newTopic.country}
            placeholder="Country"
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            value={newTopic.image}
            placeholder="Image URL"
            onChange={handleChange}
          />
        </Modal>
      )}
    </>
  );
};

export default Topics;
