import { useState } from "react";
import styles from "./login.module.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading,setLoading]=useState(false);

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
        <img src="/assets/photos/Side Image.png" alt="phone photo"/>
        </div>
        <div className={styles.right}>
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
            <button className={styles.btn1} disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
            <button className={styles.btn2}>Forget Password?</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

          </form>
        </div>
    </div>
  )
}
