import { useLang } from "../../i18n/LanguageContext";
import styles from "./TopHeader.module.css";

function TopHeader() {
  const { lang, setLang, t } = useLang();
  return (
    <div className={styles.topContainer}>
     <div className={styles.topHeader}>
        <p>{t("top.banner")}</p>
        <select
          className={styles.selection}
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          aria-label="Language"
        >
          <option value="en">{t("lang.en")}</option>
          <option value="ar">{t("lang.ar")}</option>
        </select>
     </div>
    </div>
  )
}

export default TopHeader
