import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Exclusive */}
        <div className={styles.column}>
          <h2>Exclusive</h2>
          <p className={styles.subtitle}>Subscribe</p>
          <p className={styles.text}>Get 10% off your first order</p>
          <div className={styles.inputBox}>
            <input type="email" placeholder="Enter your email" />
            <button><i class="fa-solid fa-paper-plane"></i></button>
          </div>
        </div>

        {/* Support */}
        <div className={styles.column}>
          <h2>Support</h2>
          <p className={styles.text}>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className={styles.text}>exclusive@gmail.com</p>
          <p className={styles.text}>+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div className={styles.column}>
          <h2>Account</h2>
          <ul>
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Link */}
        <div className={styles.column}>
          <h2>Quick Link</h2>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Download App */}
        <div className={styles.column}>
          <h2>Download App</h2>
          <p className={styles.text}>Save $3 with App New User Only</p>
          <div className={styles.appBox}>
            <img src="/assets/photos/Qrcode 1.png" alt="QR Code" className={styles.qr} />
            <div className={styles.storeBtns}>
              <img src="/assets/photos/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.png" alt="Google Play" />
              <img src="/assets/photos/AppStore.png" alt="App Store" />
            </div>
          </div>
          <div className={styles.socials}>
             <i class="fa-brands fa-facebook-f"></i>
             <i class="fa-brands fa-instagram"></i>
             <i class="fa-brands fa-twitter"></i>  
             <i class="fa-brands fa-linkedin-in"></i>
          </div>      
        </div>

      </div>
      <div className={styles.bottom}>
        © Copyright aya almadhon . All right reserved
      </div>
    </footer>
  );
}
