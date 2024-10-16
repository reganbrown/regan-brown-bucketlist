import { Link } from "react-router-dom";
import bucketLogo from "../../assets/bucket.svg";
import arrowBack from "../../assets/arrow-back.svg";
import accountLogo from "../../assets/account.svg";
import "./Home.scss";

export default function Home() {
  return (
    <div className="container coffee-page">
      <div className="header">
        <div className="logo">
          <Link to={`/bucketlist`} className="hidden">
            <img src={arrowBack} className="logo hidden" />
          </Link>
        </div>
        <Link to={`/`}>
          <img src={bucketLogo} className="logo coffee-filter" />
        </Link>
        <img src={accountLogo} className="logo coffee-filter" />
      </div>
      <div className="bucket-title">WELCOME</div>
      <Link to={`/bucketlist/`} className="link">
        <div className="list-item">Click Here To View Your Bucket Lists</div>
      </Link>
    </div>
  );
}
