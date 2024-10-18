import "./Account.scss";
import SignInForm from "../../components/SignInForm/SignInForm";

export default function Account() {
  return (
    <div className="container account-page">
      <div className="nav-box">
        <SignInForm />
      </div>
    </div>
  );
}
