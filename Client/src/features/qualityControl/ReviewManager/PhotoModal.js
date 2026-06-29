import styles from './ReviewManager.module.scss';

export default function PhotoModal({ row, onClose }) {
  if (!row) return null;

  return (
    <div className={styles.photoOverlay} onClick={onClose}>
      <div className={styles.photoModal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.photoModalHeader}>
          <button className={styles.photoModalNavBtn} onClick={onClose}>‹</button>
          <span className={styles.photoModalTitle}>View Photo</span>
          <button className={styles.photoModalNavBtn} onClick={onClose}>×</button>
        </div>

        {/* Body — bordered image box with company logo top-left */}
        <div className={styles.photoModalBody}>
          <div className={styles.photoModalImageBox}>
            <div className={styles.photoModalLogoRow}>
              <div className={styles.photoModalLogoCircle}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <div className={styles.photoModalLogoName}>COMPANY</div>
                <div className={styles.photoModalLogoSub}>Your Logo Here</div>
              </div>
            </div>
            <span className={styles.photoModalImgLabel}>IMAGE</span>
          </div>
        </div>

        {/* Footer — metadata left, QR right */}
        <div className={styles.photoModalFooter}>
          <div className={styles.photoModalMeta}>
            <span>{row.supervisor ?? 'Inspector'}</span>
            <span>873-263-7254</span>
            <span>Orugallu, Andhra Pradesh, 500098</span>
            <span>Latitude: 12° 41′N &amp; 15° 72′N</span>
            <span>Longitudinal: 19° 01′E &amp; 84° 03′E</span>
            <span>Home Screen &lt; Quality Control &lt; Lab Test Result</span>
          </div>

          {/* Static QR code SVG */}
          <svg className={styles.photoModalQR} viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
            <rect x="2"  y="2"  width="24" height="24" fill="none" stroke="#111" strokeWidth="2.5"/>
            <rect x="7"  y="7"  width="14" height="14" fill="#111"/>
            <rect x="62" y="2"  width="24" height="24" fill="none" stroke="#111" strokeWidth="2.5"/>
            <rect x="67" y="7"  width="14" height="14" fill="#111"/>
            <rect x="2"  y="62" width="24" height="24" fill="none" stroke="#111" strokeWidth="2.5"/>
            <rect x="7"  y="67" width="14" height="14" fill="#111"/>
            <rect x="30" y="2"  width="4" height="4" fill="#111"/>
            <rect x="36" y="2"  width="4" height="4" fill="#111"/>
            <rect x="42" y="4"  width="4" height="4" fill="#111"/>
            <rect x="50" y="2"  width="4" height="4" fill="#111"/>
            <rect x="56" y="4"  width="4" height="4" fill="#111"/>
            <rect x="30" y="8"  width="4" height="4" fill="#111"/>
            <rect x="38" y="10" width="4" height="4" fill="#111"/>
            <rect x="44" y="8"  width="4" height="4" fill="#111"/>
            <rect x="52" y="10" width="4" height="4" fill="#111"/>
            <rect x="58" y="8"  width="4" height="4" fill="#111"/>
            <rect x="32" y="14" width="4" height="4" fill="#111"/>
            <rect x="40" y="16" width="4" height="4" fill="#111"/>
            <rect x="48" y="14" width="4" height="4" fill="#111"/>
            <rect x="54" y="16" width="4" height="4" fill="#111"/>
            <rect x="2"  y="30" width="4" height="4" fill="#111"/>
            <rect x="8"  y="36" width="4" height="4" fill="#111"/>
            <rect x="2"  y="42" width="4" height="4" fill="#111"/>
            <rect x="10" y="30" width="4" height="4" fill="#111"/>
            <rect x="16" y="38" width="4" height="4" fill="#111"/>
            <rect x="4"  y="50" width="4" height="4" fill="#111"/>
            <rect x="12" y="44" width="4" height="4" fill="#111"/>
            <rect x="18" y="50" width="4" height="4" fill="#111"/>
            <rect x="22" y="36" width="4" height="4" fill="#111"/>
            <rect x="30" y="30" width="4" height="4" fill="#111"/>
            <rect x="36" y="34" width="4" height="4" fill="#111"/>
            <rect x="42" y="30" width="4" height="4" fill="#111"/>
            <rect x="50" y="32" width="4" height="4" fill="#111"/>
            <rect x="56" y="30" width="4" height="4" fill="#111"/>
            <rect x="62" y="34" width="4" height="4" fill="#111"/>
            <rect x="68" y="30" width="4" height="4" fill="#111"/>
            <rect x="74" y="32" width="4" height="4" fill="#111"/>
            <rect x="80" y="30" width="4" height="4" fill="#111"/>
            <rect x="34" y="38" width="4" height="4" fill="#111"/>
            <rect x="40" y="36" width="4" height="4" fill="#111"/>
            <rect x="46" y="40" width="4" height="4" fill="#111"/>
            <rect x="54" y="38" width="4" height="4" fill="#111"/>
            <rect x="60" y="36" width="4" height="4" fill="#111"/>
            <rect x="66" y="40" width="4" height="4" fill="#111"/>
            <rect x="72" y="36" width="4" height="4" fill="#111"/>
            <rect x="78" y="38" width="4" height="4" fill="#111"/>
            <rect x="84" y="36" width="4" height="4" fill="#111"/>
            <rect x="30" y="44" width="4" height="4" fill="#111"/>
            <rect x="38" y="46" width="4" height="4" fill="#111"/>
            <rect x="44" y="44" width="4" height="4" fill="#111"/>
            <rect x="52" y="46" width="4" height="4" fill="#111"/>
            <rect x="58" y="44" width="4" height="4" fill="#111"/>
            <rect x="64" y="46" width="4" height="4" fill="#111"/>
            <rect x="70" y="44" width="4" height="4" fill="#111"/>
            <rect x="76" y="46" width="4" height="4" fill="#111"/>
            <rect x="82" y="44" width="4" height="4" fill="#111"/>
            <rect x="32" y="52" width="4" height="4" fill="#111"/>
            <rect x="40" y="54" width="4" height="4" fill="#111"/>
            <rect x="48" y="52" width="4" height="4" fill="#111"/>
            <rect x="56" y="54" width="4" height="4" fill="#111"/>
            <rect x="62" y="52" width="4" height="4" fill="#111"/>
            <rect x="68" y="54" width="4" height="4" fill="#111"/>
            <rect x="74" y="52" width="4" height="4" fill="#111"/>
            <rect x="80" y="54" width="4" height="4" fill="#111"/>
            <rect x="30" y="62" width="4" height="4" fill="#111"/>
            <rect x="36" y="66" width="4" height="4" fill="#111"/>
            <rect x="44" y="62" width="4" height="4" fill="#111"/>
            <rect x="52" y="66" width="4" height="4" fill="#111"/>
            <rect x="60" y="62" width="4" height="4" fill="#111"/>
            <rect x="68" y="66" width="4" height="4" fill="#111"/>
            <rect x="76" y="62" width="4" height="4" fill="#111"/>
            <rect x="84" y="66" width="4" height="4" fill="#111"/>
            <rect x="32" y="70" width="4" height="4" fill="#111"/>
            <rect x="40" y="72" width="4" height="4" fill="#111"/>
            <rect x="48" y="70" width="4" height="4" fill="#111"/>
            <rect x="56" y="72" width="4" height="4" fill="#111"/>
            <rect x="62" y="70" width="4" height="4" fill="#111"/>
            <rect x="70" y="72" width="4" height="4" fill="#111"/>
            <rect x="78" y="70" width="4" height="4" fill="#111"/>
            <rect x="34" y="78" width="4" height="4" fill="#111"/>
            <rect x="42" y="80" width="4" height="4" fill="#111"/>
            <rect x="50" y="78" width="4" height="4" fill="#111"/>
            <rect x="58" y="80" width="4" height="4" fill="#111"/>
            <rect x="66" y="78" width="4" height="4" fill="#111"/>
            <rect x="74" y="80" width="4" height="4" fill="#111"/>
            <rect x="82" y="78" width="4" height="4" fill="#111"/>
          </svg>
        </div>

      </div>
    </div>
  );
}
