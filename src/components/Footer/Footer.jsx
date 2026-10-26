import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./footer.module.css";
import Reveal from "../animations/Reveal";
import { fadeUp, staggerContainer } from "../animations/variants";
import { useLang } from "../../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("Please enter your email");
      return;
    }
    setStatus("Subscribed!");
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <Reveal className={styles.container} variants={staggerContainer(0.1)} amount={0.1}>
        
        {/* Exclusive */}
        <motion.div className={styles.column} variants={fadeUp}>
          <h2>Exclusive</h2>
          <p className={styles.subtitle}>{t("footer.subscribe")}</p>
          <p className={styles.text}>Get 10% off your first order</p>
          <form className={styles.inputBox} onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus(""); }}
            />
            <button type="submit" aria-label="Subscribe"><i className="fa-solid fa-paper-plane"></i></button>
          </form>
          {status && <p className={styles.status} role="status">{status}</p>}
        </motion.div>

        {/* Support */}
        <motion.div className={styles.column} variants={fadeUp}>
          <h2>{t("footer.support")}</h2>
          <p className={styles.text}>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className={styles.text}>exclusive@gmail.com</p>
          <p className={styles.text}>+88015-88888-9999</p>
        </motion.div>

        {/* Account */}
        <motion.div className={styles.column} variants={fadeUp}>
          <h2>{t("footer.account")}</h2>
          <ul>
            <li><Link to="/login">My Account</Link></li>
            <li><Link to="/login">Login / Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/">Shop</Link></li>
          </ul>
        </motion.div>

        {/* Quick Link */}
        <motion.div className={styles.column} variants={fadeUp}>
          <h2>{t("footer.quickLink")}</h2>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms Of Use</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </motion.div>

        {/* Download App */}
        <motion.div className={styles.column} variants={fadeUp}>
          <h2>{t("footer.downloadApp")}</h2>
          <p className={styles.text}>Save $3 with App New User Only</p>
          <div className={styles.appBox}>
            <img src="/assets/photos/Qrcode 1.png" alt="QR Code" className={styles.qr} />
            <div className={styles.storeBtns}>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"><img src="/assets/photos/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.png" alt="Google Play" /></a>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"><img src="/assets/photos/AppStore.png" alt="App Store" /></a>
            </div>
          </div>
          <div className={styles.socials}>
             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
             </div>      
        </motion.div>

      </Reveal>
      <div className={styles.bottom}>
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
