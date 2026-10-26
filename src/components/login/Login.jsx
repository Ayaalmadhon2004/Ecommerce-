import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./login.module.css"
import { fadeUp, slideLeft, slideRight } from "../animations/variants";

const messageMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const LOCAL_USERS_KEY = "localUsers";

function readLocalUsers() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveLocalUsers(users) {
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    /* storage unavailable */
  }
}

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading,setLoading]=useState(false);
    const [resetMode, setResetMode] = useState(false);
    const [resetSent, setResetSent] = useState(false);

    const openReset = () => {
      setError("");
      setResetSent(false);
      setResetMode(true);
    };

    const backToLogin = () => {
      setResetSent(false);
      setResetMode(false);
    };

    // No backend: just acknowledge the request.
    const handleReset = (e) => {
      e.preventDefault();
      if (!email.trim()) {
        setError("Please enter your email.");
        return;
      }
      setError("");
      setResetSent(true);
    };

    const handleSubmit = async (e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignUp) {
      const users = readLocalUsers();
      const key = email.trim().toLowerCase();
      if (!name.trim() || !key || !password) {
        setError("Please fill in all fields.");
      } else if (users.some((u) => u.email === key)) {
        setError("An account with this email already exists.");
      } else {
        saveLocalUsers([...users, { name: name.trim(), email: key, password }]);
        login("local-" + Date.now(), name.trim());
        navigate("/");
      }
      setLoading(false);
      return;
    }

    const localUser = readLocalUsers().find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (localUser) {
      login("local-" + Date.now(), localUser.name);
      navigate("/");
      setLoading(false);
      return;
    }

    try {
  const response = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    login(data.token, email);
    navigate("/");
  } else {
    setError(data.message || "Invalid email or password");
  }
} catch (err) {
  setError("Server error, please try again later.");
} finally {
  setLoading(false);
}
    }
  return (
    <div className={styles.logInContainer}>
        <motion.div className={styles.left} variants={slideRight} initial="hidden" animate="visible">
        <img src="/assets/photos/Side Image.png" alt="Smartphone and shopping bags"/>
        </motion.div>
        <motion.div className={styles.right} variants={slideLeft} initial="hidden" animate="visible">
          {resetMode ? (
            <>
              <h3>Reset your password</h3>
              <p>Enter your email and we'll send you a reset link</p>
              <form className={styles.form} onSubmit={handleReset}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />

                <div className={styles.btns}>
                <button type="submit" className={styles.btn1}>Send reset link</button>
                <button type="button" className={styles.backLink} onClick={backToLogin}>Back to login</button>
                </div>

                <AnimatePresence>
                  {error && <motion.p key="e" className={styles.error} {...messageMotion}>{error}</motion.p>}
                  {resetSent && (
                    <motion.p key="s" className={styles.success} {...messageMotion}>
                      If an account exists for {email}, a reset link has been sent.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </>
          ) : (
            <>
          <motion.h3 key={isSignUp ? "up" : "in"} variants={fadeUp} initial="hidden" animate="visible">{isSignUp ? "Create an account" : "Log in to Exclusive"}</motion.h3>
          <p>Enter your details below</p>
          <form className={styles.form} onSubmit={handleSubmit}>

            {isSignUp && (
              <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              />
            )}

            <input 
            type="text"
            placeholder={isSignUp ? "Email" : "Email or phone number"}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            /><br/>

            <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />


            <div className={styles.btns}>
            <button type="submit" className={styles.btn1} disabled={loading}>
              {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Log In"}
            </button>
            {!isSignUp && (
              <button type="button" className={styles.btn2} onClick={openReset}>Forget Password?</button>
            )}
            </div>

            <AnimatePresence>
              {error && <motion.p key="e" className={styles.error} {...messageMotion}>{error}</motion.p>}
            </AnimatePresence>

            <p className={styles.switchMode}>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button type="button" className={styles.link} onClick={() => { setIsSignUp(!isSignUp); setError(""); }}>
                {isSignUp ? "Log in" : "Sign up"}
              </button>
            </p>

          </form>
            </>
          )}
        </motion.div>
    </div>
  )
}
