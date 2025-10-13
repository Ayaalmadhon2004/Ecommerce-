import { useState } from "react";
import styles from "./login.module.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e)=>{
    e.preventDefault();
    if (email === "test@example.com" && password === "123456") {
    alert("✅ Login successful!");
    setError("");
    } else {
    setError("❌ Invalid email or password");
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
                <button className={styles.btn1}>Log In</button>
                <button className={styles.btn2}>Forget Password?</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

          </form>
        </div>
    </div>
  )
}
