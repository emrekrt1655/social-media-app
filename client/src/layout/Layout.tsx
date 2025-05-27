import { ReactNode } from "react";
import TopicsList from "../components/Sidebar/Right/Topics/Topics";
import "./Layout.scss";
import MostLikedPost from "../components/Sidebar/Right/MostLikedPost/MostLikedPost";
import Footer from "../components/Sidebar/Right/Footer/Footer";

type Props = {
  children: ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="main-container">
      <aside className="sidebar-left">Sidebar left</aside>

      <main className="page-content">{children}</main>

      <aside className="sidebar-right">
        <section className="top">
          <TopicsList />
        </section>
        <section className="bottom">
          <section className="bottom-top">
            <MostLikedPost />
          </section>
          <section className="bottom-bottom">
            <Footer />
          </section>
        </section>
      </aside>
    </div>
  );
}

export default MainLayout;
