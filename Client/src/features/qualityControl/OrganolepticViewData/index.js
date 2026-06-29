import { useState } from 'react';
import { ArrowLeftOutlined, CalendarOutlined, SortAscendingOutlined, CheckCircleFilled, CloseCircleFilled, LeftOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './OrganolepticViewData.module.scss';

const BATCH_INFO_OPTIONS = ['125-12c-3215', '125-14b-3216', '125-15a-3217', '125-09c-3218'];

const PARAMS_DATA = [
  { label: 'Drop Head (Spec)',        value: 0.49, badge: 'pass' },
  { label: 'Decomposition (Spec)',    value: 0.10, badge: 'warn' },
  { label: 'Dehydration (Spec)',      value: 0.34, badge: 'pass' },
  { label: 'Soft Shell (Spec)',       value: 0.34, badge: 'pass' },
  { label: 'Loose Shell (Spec)',      value: 0.34, badge: 'pass' },
  { label: 'Black Tail (Spec)',       value: 0.10, badge: 'warn' },
  { label: 'Black Spots (Spec)',      value: 0.10, badge: 'warn' },
  { label: 'Pass/Fail (Spec)',        value: 0.10, badge: 'warn' },
  { label: 'Corrective Action (Spec)',value: 0.10, badge: 'warn' },
  { label: 'Muddy Smell (Spec)',      value: null,  badge: null  },
  { label: 'Broken (Spec)',           value: 0.28, badge: 'fail' },
  { label: 'Foreign Matter (Spec)',   value: null,  badge: null  },
  { label: 'Pest Infestation (Spec)', value: 0.34, badge: 'pass' },
  { label: 'WSSV (Spec)',             value: 0.33, badge: 'pass' },
  { label: 'Fungus/Parasites (Spec)', value: 0.34, badge: 'pass' },
];

const ALL_ROWS = [
  { id: '42352', section: 'Receiving', batchInfo: '125-12c-3215', batchNum: '42352', count: '12c', phId: 'Ap0345135/001PH', phPass: true,  prodMetSpec: 'Pass', supervisor: 'Rahul',  remarks: 'Shrimp has Dark spots on the body' },
  { id: '42353', section: 'Receiving', batchInfo: '125-12c-3215', batchNum: '42353', count: '14b', phId: 'Ap0345136/002PH', phPass: true,  prodMetSpec: 'Pass', supervisor: 'Maya',   remarks: 'Fish is Discolored' },
  { id: '42354', section: 'Receiving', batchInfo: '125-12c-3215', batchNum: '42354', count: '15a', phId: 'Ap0345137/003PH', phPass: true,  prodMetSpec: 'Pass', supervisor: 'Oliver', remarks: 'Meat is Expired' },
  { id: '42355', section: 'Receiving', batchInfo: '125-12c-3215', batchNum: '42355', count: '09c', phId: 'Ap0345138/004PH', phPass: true,  prodMetSpec: 'Fail', supervisor: 'Sophie', remarks: 'Vegetables are past expiry date' },
  { id: '42356', section: 'Receiving', batchInfo: '125-12c-3215', batchNum: '42356', count: '11d', phId: 'Ap0345139/005PH', phPass: false, prodMetSpec: 'Pass', supervisor: 'Liam',   remarks: 'Dairy Products appear off-colour' },
  { id: '42357', section: 'Receiving', batchInfo: '125-12c-3215', batchNum: '42357', count: '10b', phId: 'Ap0345140/006PH', phPass: true,  prodMetSpec: 'Fail', supervisor: 'Emma',   remarks: 'Canned Goods are dented and damaged' },
];

const PENDING_ROWS = ALL_ROWS.map(r => ({ ...r, batchInfo: null }));

const BADGE_CLASS = { pass: styles.badgePass, warn: styles.badgeWarn, fail: styles.badgeFail };

export default function OrganolepticViewData() {
  const navigate = useNavigate();

  const [activeTab,   setActiveTab]   = useState('all');
  const [allRows,     setAllRows]     = useState(ALL_ROWS);
  const [pendingRows, setPendingRows] = useState(PENDING_ROWS);
  const [editingId,   setEditingId]   = useState(null);
  const [editBatch,   setEditBatch]   = useState('');
  const [paramsOpen,  setParamsOpen]  = useState(false);
  const [photoOpen,   setPhotoOpen]   = useState(false);

  const deleteAll     = id => setAllRows(prev => prev.filter(r => r.id !== id));
  const deletePending = id => setPendingRows(prev => prev.filter(r => r.id !== id));

  const startEdit = (row) => { setEditingId(row.id); setEditBatch(''); };
  const cancelEdit = ()   => { setEditingId(null); setEditBatch(''); };
  const saveEdit   = ()   => {
    setPendingRows(prev => prev.map(r =>
      r.id === editingId ? { ...r, batchInfo: editBatch || null } : r
    ));
    setEditingId(null);
    setEditBatch('');
  };

  const rows = activeTab === 'all' ? allRows : pendingRows;
  const onDelete = activeTab === 'all' ? deleteAll : deletePending;

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbLink} onClick={() => navigate('/dashboard')}>Home Screen</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span className={styles.breadcrumbLink} onClick={() => navigate('/quality-control')}>Quality Control</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span className={styles.breadcrumbLink} onClick={() => navigate('/quality-control/organoleptic-form')}>Organoleptic Inspection Form - Receiving</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span>View Data</span>
      </div>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/quality-control/organoleptic-form')}>
            <ArrowLeftOutlined />
          </button>
          <h1 className={styles.pageTitle}>Organoleptic Inspection Form - Receiving View Data</h1>
        </div>
        <div className={styles.dateRange}>
          <span className={styles.dateVal}>01/01/2026</span>
          <span className={styles.dateSep}>-</span>
          <span className={styles.dateVal}>01/04/2026</span>
          <CalendarOutlined className={styles.dateIcon} />
        </div>
      </div>

      {/* Main card */}
      <div className={styles.mainCard}>
        {/* Tabs */}
        <div className={styles.tabs}>
          {['all', 'pending'].map(t => (
            <button
              key={t}
              className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
              onClick={() => { setActiveTab(t); setEditingId(null); }}
            >
              {t === 'all' ? 'All Entries' : 'Pending Entries'}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                {['Sample ID','Section','Batch Info','Batch Number','Count','Pre- Harvest ID','Parameters','Photo','Prod.Met.Spec.','Supervisor','Remarks','Actions'].map(h => (
                  <th key={h} className={styles.th}>
                    <div className={styles.thInner}>{h} <SortAscendingOutlined className={styles.sortIcon} /></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {rows.map(row => (
                <tr key={row.id}>
                  <td className={styles.td}>{row.id}</td>
                  <td className={styles.td}>{row.section}</td>
                  <td className={styles.td}>
                    {editingId === row.id ? (
                      <select
                        className={styles.inlineSelect}
                        value={editBatch}
                        onChange={e => setEditBatch(e.target.value)}
                      >
                        <option value="" disabled>Select Batch Info</option>
                        {BATCH_INFO_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <span className={row.batchInfo ? '' : styles.dash}>{row.batchInfo ?? '-'}</span>
                    )}
                  </td>
                  <td className={styles.td}>{row.batchNum}</td>
                  <td className={styles.td}>{row.count}</td>
                  <td className={styles.td}>
                    <div className={styles.phCell}>
                      {row.phId}
                      {row.phPass
                        ? <CheckCircleFilled className={styles.phPass} />
                        : <CloseCircleFilled className={styles.phFail} />
                      }
                    </div>
                  </td>
                  <td className={styles.td}>
                    <button className={styles.viewBtn} onClick={() => setParamsOpen(true)}>View</button>
                  </td>
                  <td className={styles.td}>
                    <button className={styles.viewBtn} onClick={() => setPhotoOpen(true)}>View</button>
                  </td>
                  <td className={styles.td}>{row.prodMetSpec}</td>
                  <td className={styles.td}>{row.supervisor}</td>
                  <td className={styles.td}>
                    <span className={styles.remarksCell} title={row.remarks}>{row.remarks}</span>
                  </td>
                  <td className={styles.td}>
                    {editingId === row.id ? (
                      <div className={styles.actionCell}>
                        <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>
                        <button className={styles.saveBtn}   onClick={saveEdit}>Save</button>
                      </div>
                    ) : activeTab === 'pending' ? (
                      <div className={styles.actionCell}>
                        <button className={styles.editIconBtn} onClick={() => startEdit(row)} title="Edit">
                          <EditOutlined />
                        </button>
                        <button className={styles.deleteBtn} onClick={() => onDelete(row.id)}>Delete Record</button>
                      </div>
                    ) : (
                      <button className={styles.deleteBtn} onClick={() => onDelete(row.id)}>Delete Record</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Parameters panel */}
      {paramsOpen && (
        <div className={styles.panelOverlay} onClick={e => { if (e.target === e.currentTarget) setParamsOpen(false); }}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <button className={styles.panelNavBtn} onClick={() => setParamsOpen(false)}><LeftOutlined /></button>
              <span className={styles.panelTitle}>Parameters</span>
              <button className={styles.panelNavBtn} onClick={() => setParamsOpen(false)}><CloseOutlined /></button>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.paramsCard}>
                <table className={styles.paramsTable}>
                  <thead>
                    <tr>
                      <th className={styles.paramsTh}><div className={styles.thInner}>Type <SortAscendingOutlined className={styles.sortIcon} /></div></th>
                      <th className={styles.paramsTh}><div className={styles.thInner}>Results <SortAscendingOutlined className={styles.sortIcon} /></div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {PARAMS_DATA.map(p => (
                      <tr key={p.label}>
                        <td className={styles.paramsTd}>{p.label}</td>
                        <td className={styles.paramsTd}>
                          {p.value != null
                            ? <span className={`${styles.resultBadge} ${BADGE_CLASS[p.badge]}`}>{p.value.toFixed(2)}</span>
                            : <span className={styles.dash}>-</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo panel */}
      {photoOpen && (
        <div className={styles.panelOverlay} onClick={e => { if (e.target === e.currentTarget) setPhotoOpen(false); }}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <button className={styles.panelNavBtn} onClick={() => setPhotoOpen(false)}><LeftOutlined /></button>
              <span className={styles.panelTitle}>View Photo</span>
              <button className={styles.panelNavBtn} onClick={() => setPhotoOpen(false)}><CloseOutlined /></button>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.photoBox}>
                <div className={styles.photoContent}>
                  <div className={styles.photoPlaceholder}>IMAGE</div>
                </div>
                <div className={styles.photoFooter}>
                  <div className={styles.photoInfo}>
                    <p>Priyanka</p>
                    <p>873-263-7254</p>
                    <p>Orugallu, Andhra Pradesh, 500098</p>
                    <p>Latitude: 12° 41'N &amp; 15° 72'N</p>
                    <p>Longitudinal: 19° 01'E &amp; 84° 03'E</p>
                    <p>Home Screen &lt; Quality Control &lt; Lab Test Result</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
