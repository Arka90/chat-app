import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat app</span>
        <span className="title">Log In</span>
        <form onSubmit={handleSubmit}>
          <input type="email" className="email" placeholder="email" />
          <input type="password" className="password" placeholder="password" />

          <button>Log in</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p>
          Don't have have an account? <Link to="/register">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
