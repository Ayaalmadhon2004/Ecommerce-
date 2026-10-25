import { useState } from "react";
import styles from "./login.module.css"

export default function Login() {
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
    alert("Login successful");
    localStorage.setItem("token", data.token);
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
        <div className={styles.left}>
        <img src="/assets/photos/Side Image.png" alt="Smartphone and shopping bags"/>
        </div>
        <div className={styles.right}>
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

                {error && <p className={styles.error}>{error}</p>}
                {resetSent && (
                  <p className={styles.success}>
                    If an account exists for {email}, a reset link has been sent.
                  </p>
                )}
              </form>
            </>
          ) : (
            <>
          <h3>Log in to Exclusive</h3>
          <p>Enter your details below</p>
          <form className={styles.form} onSubmit={handleSubmit}>

            <input 
            type="text"
            placeholder="Email or phone number"
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
              {loading ? "Logging in..." : "Log In"}
            </button>
            <button type="button" className={styles.btn2} onClick={openReset}>Forget Password?</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

          </form>
            </>
          )}
        </div>
    </div>
  )
}
