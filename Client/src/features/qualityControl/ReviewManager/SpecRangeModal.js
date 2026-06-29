import styles from './ReviewManager.module.scss';

const LENGTH_VALUES = [2.3, 2.5, 2.1, 2.1, 2.0, 2.2];
const WEIGHT_VALUES = [12, 11, 12, 10, 9, 11];

export default function SpecRangeModal({ row, onClose }) {
  if (!row) return null;

  return (
    <div className={styles.photoOverlay} onClick={onClose}>
      <div className={styles.specModal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.photoModalHeader}>
          <button className={styles.photoModalNavBtn} onClick={onClose}>‹</button>
          <span className={styles.photoModalTitle}>Spec Range</span>
          <button className={styles.photoModalNavBtn} onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className={styles.specModalBody}>
          <div className={styles.specContainer}>

            {/* Length section */}
            <div className={styles.specSection}>
              <div className={styles.specSectionTitle}>Length (cm)</div>
              <div className={styles.specBoxRow}>
                {LENGTH_VALUES.map((v, i) => (
                  <div
                    key={i}
                    className={`${styles.specBox} ${i === LENGTH_VALUES.length - 1 ? styles.specBoxLast : ''}`}
                  >
                    {v}
                  </div>
                ))}
              </div>
              <div className={styles.specCheckRow}>
                <label className={styles.specCheckLabel}>
                  <input type="checkbox" className={styles.specCheckInput} readOnly />
                  Over Length
                </label>
                <span className={styles.specCheckDivider} />
                <label className={styles.specCheckLabel}>
                  <input type="checkbox" className={styles.specCheckInput} defaultChecked readOnly />
                  Short Length
                </label>
              </div>
            </div>

            <div className={styles.specSectionDivider} />

            {/* Weight section */}
            <div className={styles.specSection}>
              <div className={styles.specSectionTitle}>Weight (gms)</div>
              <div className={styles.specBoxRow}>
                {WEIGHT_VALUES.map((v, i) => (
                  <div
                    key={i}
                    className={`${styles.specBox} ${i === WEIGHT_VALUES.length - 1 ? styles.specBoxLast : ''}`}
                  >
                    {v < 10 ? `0${v}` : v}
                  </div>
                ))}
              </div>
              <div className={styles.specCheckRow}>
                <label className={styles.specCheckLabel}>
                  <input type="checkbox" className={styles.specCheckInput} readOnly />
                  Over Weight
                </label>
                <span className={styles.specCheckDivider} />
                <label className={styles.specCheckLabel}>
                  <input type="checkbox" className={styles.specCheckInput} defaultChecked readOnly />
                  Short Weight
                </label>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
