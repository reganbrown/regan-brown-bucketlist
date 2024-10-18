import "./Home.scss";
import BucketList from "../../components/BucketList/BucketList";

export default function Home() {
  return (
    <div className="container home-page">
      <div className="nav-box">
        <BucketList />
      </div>
    </div>
  );
}
