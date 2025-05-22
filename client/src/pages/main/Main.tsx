import "./Main.scss";
import Topics from "../../components/Sidebar/Right/Topics/Topics";

const Main = () => {
  return (
    <div className="main-container">
      <div className="sidebar-left">Left Sidebar</div>
      <div className="main-content">Main Content</div>
      <div className="sidebar-right">
        <div className="top">
          <Topics />
        </div>
        <div className="bottom">bottom</div>
      </div>
    </div>
  );
};

export default Main;
