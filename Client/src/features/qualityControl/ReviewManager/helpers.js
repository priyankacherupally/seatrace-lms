import styles from './ReviewManager.module.scss';

// ── Reusable cell components ──────────────────────────

export function ValueCell({ data }) {
  if (!data) return <span className={styles.dash}>-</span>;
  const display = data.unit != null ? `${data.value}${data.unit}` : data.value.toFixed(2);
  return (
    <span className={`${styles.valueCell} ${data.pass ? styles.valueCellPass : styles.valueCellFail}`}>
      {display}
    </span>
  );
}

export function ActionPill({ action }) {
  const cls = action === 'Approved' ? styles.actionApproved
            : action === 'Rejected' ? styles.actionRejected
            : styles.actionSubmitted;
  return <span className={`${styles.actionPill} ${cls}`}>{action}</span>;
}

// ── Column utilities ──────────────────────────────────

export function makeNumericSorter(field) {
  return (a, b) => (a[field]?.value ?? 0) - (b[field]?.value ?? 0);
}

export function renderExtraCell(row, col, handlers = {}) {
  if (col.type === 'preHarvestId') {
    const data = row[col.key];
    if (!data) return <span className={styles.dash}>-</span>;
    return (
      <span className={styles.preHarvestBadge}>
        {data.id}
        <span className={`${styles.verifiedIcon} ${data.verified ? styles.verifiedIconPass : styles.verifiedIconFail}`}>
          {data.verified ? '✓' : '✕'}
        </span>
      </span>
    );
  }
  if (col.type === 'specs') {
    return (
      <button className={styles.viewBtn} onClick={() => handlers.onSpecsView?.(row)}>
        View
      </button>
    );
  }
  if (col.type === 'photo') {
    return (
      <button className={styles.viewBtn} onClick={() => handlers.onPhotoView?.(row)}>
        View
      </button>
    );
  }
  if (col.type === 'passFail') {
    const val = row[col.key];
    return (
      <span className={val === 'Pass' ? styles.passText : styles.failText}>
        {val ?? '-'}
      </span>
    );
  }
  return row[col.key] ?? '-';
}

// ── Harvest base columns (vary by harvest type) ───────
// These live here because their render functions reference styles.

export const HARVEST_BASE_COLS = {
  'pre-harvest': [
    { title: 'Sample Number',     dataIndex: 'sampleNumber',     key: 'sampleNumber',     sorter: (a, b) => a.sampleNumber.localeCompare(b.sampleNumber),     render: (val) => <span className={styles.sampleNum}>{val}</span> },
    { title: 'Supplier Name',     dataIndex: 'supplierName',     key: 'supplierName',     sorter: (a, b) => a.supplierName.localeCompare(b.supplierName) },
    { title: 'Supplier Location', dataIndex: 'supplierLocation', key: 'supplierLocation', sorter: (a, b) => a.supplierLocation.localeCompare(b.supplierLocation) },
    { title: 'Count',             dataIndex: 'count',            key: 'count',            sorter: (a, b) => +a.count - +b.count },
    { title: 'Sampler Name',      dataIndex: 'samplerName',      key: 'samplerName',      sorter: (a, b) => a.samplerName.localeCompare(b.samplerName) },
    { title: 'Sampler ID',        dataIndex: 'samplerID',        key: 'samplerID',        sorter: (a, b) => a.samplerID.localeCompare(b.samplerID) },
  ],
  'processing': [
    { title: 'Sample Number', dataIndex: 'sampleNumber', key: 'sampleNumber', sorter: (a, b) => a.sampleNumber.localeCompare(b.sampleNumber), render: (val) => <span className={styles.sampleNum}>{val}</span> },
    { title: 'Batch Number',  dataIndex: 'batchNumber',  key: 'batchNumber',  sorter: (a, b) => a.batchNumber.localeCompare(b.batchNumber),   render: (val) => <span className={styles.sampleNum}>{val}</span> },
    { title: 'Section',       dataIndex: 'section',      key: 'section',      sorter: (a, b) => a.section.localeCompare(b.section) },
    { title: 'Grade',         dataIndex: 'grade',        key: 'grade',        sorter: (a, b) => a.grade.localeCompare(b.grade) },
    { title: 'Count',         dataIndex: 'count',        key: 'count',        sorter: (a, b) => +a.count - +b.count },
    { title: 'Variety',       dataIndex: 'variety',      key: 'variety',      sorter: (a, b) => a.variety.localeCompare(b.variety) },
    { title: 'Quantity',      dataIndex: 'quantity',     key: 'quantity',     sorter: (a, b) => +a.quantity - +b.quantity },
  ],
  'others': [
    { title: 'Sample Number', dataIndex: 'sampleNumber', key: 'sampleNumber', sorter: (a, b) => a.sampleNumber.localeCompare(b.sampleNumber), render: (val) => <span className={styles.sampleNum}>{val}</span> },
    { title: 'Others',        dataIndex: 'others',       key: 'others',       sorter: (a, b) => a.others.localeCompare(b.others) },
    { title: 'Date',          dataIndex: 'date',         key: 'date',         sorter: (a, b) => a.date.localeCompare(b.date) },
  ],
};
