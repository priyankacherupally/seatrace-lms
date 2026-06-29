import { useState, useRef } from 'react';
import { Select, Button } from 'antd';
import { ArrowLeftOutlined, CloudUploadOutlined, CheckOutlined, CloseOutlined, LoadingOutlined, MinusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './OrganolepticForm.module.scss';

const SECTION_OPTIONS    = ['Receiving', 'Beheading', 'Grading', 'Processing', 'IQF', 'Packing'];
const BATCH_INFO_OPTIONS = ['Batch Info 001', 'Batch Info 002', 'Batch Info 003'];
const BATCH_NUM_OPTIONS  = ['Batch 001', 'Batch 002', 'Batch 003'];
const PROD_MET_OPTIONS   = ['Option 1', 'Option 2', 'Option 3'];
const SUPERVISOR_OPTIONS = ['Supervisor A', 'Supervisor B', 'Supervisor C'];
const FORM_TYPE_OPTIONS  = ['Receiving', 'Beheading', 'Grading', 'Processing', 'IQF', 'Packing'];

const PH_RESULTS = {
  'AP0345135/001PH': { status: 'passed', label: 'Passed', tests: 'All 16 parameters within spec' },
  'AP0345135/002PH': { status: 'failed', label: 'Failed', tests: 'Decomposition > spec limit' },
  'AP0345136/001PH': { status: 'passed', label: 'Passed', tests: 'All parameters within spec' },
  'AP0345136/002PH': { status: 'failed', label: 'Failed', tests: 'Black Tail & Soft Shell exceeded' },
  'AP0345137/001PH': { status: 'passed', label: 'Passed', tests: 'All parameters within spec' },
  'AP0345137/002PH': { status: 'failed', label: 'Failed', tests: 'WSSV detected' },
  'AP0345138/001PH': { status: 'passed', label: 'Passed', tests: 'All parameters within spec' },
};

const SPEC_FIELDS = [
  { key: 'dropHead',          label: 'Drop Head (Spec)',          defaultValue: '1/13 g' },
  { key: 'decomposition',     label: 'Decomposition (Spec)',      defaultValue: '0' },
  { key: 'dehydration',       label: 'Dehydration (Spec)',        defaultValue: '0' },
  { key: 'softShell',         label: 'Soft Shell (Spec)',         defaultValue: '0' },
  { key: 'looseShell',        label: 'Loose Shell (Spec)',        defaultValue: '0' },
  { key: 'blackTail',         label: 'Black Tail (Spec)',         defaultValue: '0' },
  { key: 'blackTail2',        label: 'Black Tail (Spec)',         defaultValue: '0' },
  { key: 'blackSpots',        label: 'Black Spots (Spec)',        defaultValue: '0' },
  { key: 'passFail',          label: 'Pass/Fail (Spec)',          defaultValue: '0' },
  { key: 'correctiveAction',  label: 'Corrective Action (Spec)',  defaultValue: '0' },
  { key: 'muddySmell',        label: 'Muddy Smell (Spec)',        defaultValue: '0' },
  { key: 'broken',            label: 'Broken (Spec)',             defaultValue: '0' },
  { key: 'foreignMatter',     label: 'Foreign Matter (Spec)',     defaultValue: '0' },
  { key: 'pestInfestation',   label: 'Pest Infestation (Spec)',   defaultValue: '0' },
  { key: 'wssv',              label: 'WSSV (Spec)',               defaultValue: '0' },
  { key: 'fungusParasites',   label: 'Fungus/Parasites (Spec)',   defaultValue: '0' },
];

const BANNER_INIT = { state: 'empty', message: 'Enter Pre-Harvest ID to load result', id: '' };

export default function OrganolepticForm() {
  const navigate     = useNavigate();
  const debounceRef  = useRef(null);
  const fileInputRef = useRef(null);

  const [specChecked, setSpecChecked] = useState({});
  const [banner, setBanner]           = useState(BANNER_INIT);
  const [specValues, setSpecValues]   = useState(
    Object.fromEntries(SPEC_FIELDS.map(f => [f.key, f.defaultValue]))
  );

  const toggleSpec = key => setSpecChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const handlePreHarvestChange = e => {
    const raw = e.target.value.trim();
    clearTimeout(debounceRef.current);

    if (!raw) { setBanner(BANNER_INIT); return; }

    setBanner({ state: 'loading', message: `Looking up ${raw}…`, id: '' });

    debounceRef.current = setTimeout(() => {
      const result = PH_RESULTS[raw.toUpperCase()];
      if (!result) {
        setBanner({ state: 'empty', message: 'No receiving record found for this ID', id: raw });
        return;
      }
      setBanner({
        state:   result.status === 'passed' ? 'passed' : 'failed',
        message: `${result.label} — ${result.tests}`,
        id:      raw,
      });
    }, 600);
  };

  const bannerIcon = {
    empty:   <MinusOutlined />,
    loading: <LoadingOutlined spin />,
    passed:  <CheckOutlined />,
    failed:  <CloseOutlined />,
  }[banner.state];

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbLink} onClick={() => navigate('/dashboard')}>Home Screen</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span className={styles.breadcrumbLink} onClick={() => navigate('/quality-control')}>Quality Control</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span>Organoleptic Inspection Form - Receiving</span>
      </div>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />
          </button>
          <h1 className={styles.pageTitle}>Organoleptic Inspection Form - Receiving</h1>
        </div>
        <div className={styles.headerRight}>
          <Select
            defaultValue="Receiving"
            className={styles.typeSelect}
            options={FORM_TYPE_OPTIONS.map(s => ({ value: s, label: s }))}
          />
          <Button
            className={styles.viewDataBtn}
            onClick={() => navigate('/quality-control/organoleptic-form/view-data')}
          >
            View Data
          </Button>
        </div>
      </div>

      {/* Scrollable form card */}
      <div className={styles.formCard}>

        {/* Top 2-col grid — 6 fields */}
        <div className={styles.topGrid}>
          <div className={styles.fg}>
            <label className={styles.label}>Sample ID</label>
            <input type="text" className={`${styles.inp} ${styles.inpReadonly}`} value="5421353" readOnly />
          </div>

          <div className={styles.fg}>
            <label className={styles.label}>Section<span className={styles.asterisk}>*</span></label>
            <Select
              placeholder="Eg: Select Section"
              className={styles.select}
              options={SECTION_OPTIONS.map(s => ({ value: s, label: s }))}
            />
          </div>

          <div className={styles.fg}>
            <label className={styles.label}>Batch Information</label>
            <Select
              placeholder="Select Batch Info"
              className={styles.select}
              options={BATCH_INFO_OPTIONS.map(b => ({ value: b, label: b }))}
            />
          </div>

          <div className={styles.fg}>
            <label className={styles.label}>Batch Number<span className={styles.asterisk}>*</span></label>
            <Select
              placeholder="Select Batch number"
              className={styles.select}
              options={BATCH_NUM_OPTIONS.map(b => ({ value: b, label: b }))}
            />
          </div>

          <div className={styles.fg}>
            <label className={styles.label}>Count<span className={styles.asterisk}>*</span></label>
            <input type="text" className={styles.inp} placeholder="Enter Count" />
          </div>

          <div className={styles.fg}>
            <label className={styles.label}>Pre- Harvest ID Number<span className={styles.asterisk}>*</span></label>
            <input
              type="text"
              className={styles.inp}
              placeholder="Eg: Ap0345135/001PH"
              autoComplete="off"
              onChange={handlePreHarvestChange}
            />
          </div>
        </div>

        {/* Dynamic result banner */}
        <div className={`${styles.resultBanner} ${styles[`banner_${banner.state}`]}`}>
          <span className={`${styles.resultIcon} ${styles[`icon_${banner.state}`]}`}>
            {bannerIcon}
          </span>
          <span className={styles.resultTxt}>{banner.message}</span>
          {banner.id && <span className={styles.resultIdTag}>{banner.id}</span>}
        </div>

        {/* Spec fields grid */}
        <div className={styles.specGrid}>
          {SPEC_FIELDS.map(field => (
            <div key={field.key} className={styles.specField}>
              <div className={styles.specFieldHeader}>
                <span className={styles.specLabel}>{field.label}</span>
                <input
                  type="checkbox"
                  className={styles.specCb}
                  checked={!!specChecked[field.key]}
                  onChange={() => toggleSpec(field.key)}
                />
              </div>
              <input
                type="text"
                className={styles.specInp}
                value={specValues[field.key]}
                onChange={e => setSpecValues(prev => ({ ...prev, [field.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>

        {/* Bottom 2-col grid */}
        <div className={styles.bottomGrid}>
          <div className={styles.fg}>
            <label className={styles.label}>Photo Capture<span className={styles.asterisk}>*</span></label>
            <div
              className={styles.uploadArea}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUploadOutlined className={styles.uploadIcon} />
              <span className={styles.uploadTxt}>Upload/Capture Photo</span>
              <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: 'none' }} />
            </div>
            <span className={styles.uploadHint}>JPEG, PNG, and PDF formats, upto 2MB</span>
          </div>

          <div className={styles.fg}>
            <label className={styles.label}>Prod.Met.Spec.<span className={styles.asterisk}>*</span></label>
            <Select
              placeholder="Select Option"
              className={styles.select}
              options={PROD_MET_OPTIONS.map(o => ({ value: o, label: o }))}
            />
          </div>

          <div className={styles.fg}>
            <label className={styles.label}>Supervisor<span className={styles.asterisk}>*</span></label>
            <Select
              placeholder="Select Supervisor"
              className={styles.select}
              options={SUPERVISOR_OPTIONS.map(s => ({ value: s, label: s }))}
            />
          </div>

          <div className={styles.fg}>
            <label className={styles.label}>Remarks</label>
            <input type="text" className={styles.inp} placeholder="Write here..." />
          </div>
        </div>

      </div>

      {/* Preview footer — outside scroll */}
      <div className={styles.previewFooter}>
        <button type="button" className={styles.previewBtn}>Preview</button>
      </div>
    </div>
  );
}
