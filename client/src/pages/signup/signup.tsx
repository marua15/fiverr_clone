import "/home/bakaria19/Documents/Web/fiverr_clone/client/src/assets/styles/Signup.css";
import Classnames from "classnames";

export interface SignupProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-signups-and-templates
 */
export const Signup = ({ className }: SignupProps) => {
  return (
    <div className="signup">
      <h1>
        Join as a client or
        <br /> as a freelancer
      </h1>
      <div className={Classnames("container", "account_type")}>
        <div
          className="client"
          style={{ flex: 1, display: "grid", margin: "50px" }}
        >
          <h2>Client</h2>
          <p>I'm a client, hiring for a project</p>
          <button>Sign up as a client</button>
        </div>
        <div
          className="freelancer"
          style={{
            flex: 1,
            display: "inline-block",
            overflow: "visible",
            margin: "50px",
          }}
        >
          <h2>Freelancer</h2>
          <p>I'm a freelancer looking for work</p>
          <button>Sign up as a freelancer</button>
        </div>
      </div>
      <div className="noaccount">
        <p>Already have an account?</p>
        <a href="/login">Log in</a>
      </div>
    </div>
  );
};
