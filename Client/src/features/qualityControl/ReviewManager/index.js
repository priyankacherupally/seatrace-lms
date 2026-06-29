import { useState, useMemo, useRef, useEffect } from 'react';
import { Table, DatePicker, Button, Select } from 'antd';
import {
  ArrowLeftOutlined, CalendarOutlined, DownloadOutlined,
  FilterOutlined, SearchOutlined, LeftOutlined, RightOutlined,
  DoubleLeftOutlined, DoubleRightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import styles from './ReviewManager.module.scss';
import PhotoModal from './PhotoModal.js';
import SpecRangeModal from './SpecRangeModal.js';
import {
  HARVEST_OPTIONS, MAIN_TABS, SUB_TABS, OI_SUB_TABS,
  OI_BASE_COLS, TAB_CONFIG, OI_TAB_CONFIG,
} from './constants.js';
import {
  ValueCell, ActionPill,
  makeNumericSorter, renderExtraCell,
  HARVEST_BASE_COLS,
} from './helpers.js';

const { RangePicker } = DatePicker;
const PAGE_SIZE = 7;

function getPaginationPages(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, '…', total];
  if (current >= total - 2) return [1, '…', total - 2, total - 1, total];
  return [1, '…', current - 1, current, current + 1, '…', total];
}

export default function ReviewManager() {
  const navigate = useNavigate();

  // ── Desktop + shared state ────────────────────────────
  const [activeMainTab,  setActiveMainTab]  = useState(0);
  const [activeSubTab,   setActiveSubTab]   = useState(0);
  const [harvest,        setHarvest]        = useState('pre-harvest');
  const [dateRange,      setDateRange]      = useState([dayjs('2026-01-01'), dayjs('2026-01-04')]);
  const [selectedOIKeys, setSelectedOIKeys] = useState(new Set());
  const [photoModal,     setPhotoModal]     = useState(null);
  const [specModal,      setSpecModal]      = useState(null);

  const detailsTbodyRef = useRef(null);
  const paramsTbodyRef  = useRef(null);

  // ── Mobile-specific state ─────────────────────────────
  const [showSampleInfo,   setShowSampleInfo]   = useState(true);
  const [showParams,       setShowParams]       = useState(false);
  const [currentPage,      setCurrentPage]      = useState(1);
  const subTabsListRef = useRef(null);
  const [searchQuery,      setSearchQuery]      = useState('');
  const [searchOpen,       setSearchOpen]       = useState(false);
  const [filterOpen,       setFilterOpen]       = useState(false);
  const [filterStatus,     setFilterStatus]     = useState('all');
  const [selectedSampleId, setSelectedSampleId] = useState('');

  // ── Derived from active tab ───────────────────────────
  const isOI           = activeMainTab === 1;
  const currentSubTabs = isOI ? OI_SUB_TABS : SUB_TABS;
  const activeTabName  = currentSubTabs[activeSubTab];
  const config         = isOI
    ? (OI_TAB_CONFIG[activeTabName] ?? { extraCols: [], valueCols: [], actionLabel: 'Action', data: {} })
    : (TAB_CONFIG[activeTabName]    ?? { extraCols: [], valueCols: [], actionLabel: 'Action', data: {} });
  const tableData = config.data[harvest] ?? [];

  // OI checkbox helpers
  const allOISelected  = tableData.length > 0 && tableData.every(r => selectedOIKeys.has(r.key));
  const someOISelected = tableData.some(r => selectedOIKeys.has(r.key));
  const toggleAllOI    = () => setSelectedOIKeys(allOISelected ? new Set() : new Set(tableData.map(r => r.key)));
  const toggleOIKey    = key => setSelectedOIKeys(prev => {
    const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s;
  });

  // Mobile-derived values
  const filteredData = useMemo(() => {
    let data = tableData;
    if (selectedSampleId) data = data.filter(r => r.key === selectedSampleId);
    if (filterStatus !== 'all') data = data.filter(r => r.status === filterStatus);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(r =>
        Object.values(r).some(v => typeof v === 'string' && v.toLowerCase().includes(q))
      );
    }
    return data;
  }, [tableData, selectedSampleId, filterStatus, searchQuery]);

  const totalPages    = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const sampleIdOptions = useMemo(() =>
    tableData.map(r => ({ value: r.key, label: r.sampleNumber || r.sampleId || r.key }))
  , [tableData]);


  // ── Effects ───────────────────────────────────────────
  useEffect(() => { setSelectedOIKeys(new Set()); }, [activeMainTab, activeTabName, harvest]);
  useEffect(() => { setCurrentPage(1); }, [activeMainTab, activeTabName, harvest, searchQuery, filterStatus, selectedSampleId]);
  useEffect(() => { if (subTabsListRef.current) subTabsListRef.current.scrollLeft = 0; }, [activeMainTab]);

  // Sync OI row heights for desktop split-pane
  useEffect(() => {
    if (!isOI || !detailsTbodyRef.current || !paramsTbodyRef.current) return;

    const dRows = [...detailsTbodyRef.current.querySelectorAll('tr')];
    const pRows = [...paramsTbodyRef.current.querySelectorAll('tr')];
    dRows.forEach(r => (r.style.height = ''));
    pRows.forEach(r => (r.style.height = ''));
    const len = Math.min(dRows.length, pRows.length);
    for (let i = 0; i < len; i++) {
      const h = Math.max(dRows[i].offsetHeight, pRows[i].offsetHeight) + 'px';
      dRows[i].style.height = h;
      pRows[i].style.height = h;
    }

    const pTable = paramsTbodyRef.current.closest('table');
    if (pTable && pRows.length > 0) {
      const firstBodyCells = pRows[0].querySelectorAll('td');
      const actionW = firstBodyCells[firstBodyCells.length - 1]?.offsetWidth ?? 0;
      [...pTable.querySelectorAll('thead tr, tbody tr')].forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const n = cells.length;
        if (n >= 1) cells[n - 1].style.right = '0px';
        if (n >= 2) cells[n - 2].style.right = actionW + 'px';
      });
    }
  }, [isOI, activeTabName, harvest, tableData]);

  // ── Columns (desktop + mobile splits) ────────────────
  const { columns, mobileInfoCols, mobileParamCols } = useMemo(() => {
    const rawExtra = Array.isArray(config.extraCols)
      ? config.extraCols
      : (config.extraCols[harvest] ?? config.extraCols['default'] ?? []);

    const ltBaseCols  = HARVEST_BASE_COLS[harvest] ?? HARVEST_BASE_COLS['pre-harvest'];
    const ltExtraCols = rawExtra.map(({ key, label, sorter }) => ({
      title: label, dataIndex: key, key, sorter,
      render: (val) => val ?? '-',
    }));
    const extraColsDesk = rawExtra.map(({ key, label, sorter }) => ({ title: label, dataIndex: key, key, sorter }));

    const valueCols = config.valueCols.map(({ key, label }) => ({
      title: label, dataIndex: key, key,
      sorter: makeNumericSorter(key),
      render: (val) => <ValueCell data={val} />,
    }));
    const statusCol = {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (val) => (
        <span className={`${styles.statusBadge} ${val === 'Pass' ? styles.statusPass : styles.statusFail}`}>{val}</span>
      ),
    };
    const actionCol = {
      title: config.actionLabel, dataIndex: 'action', key: 'action',
      render: (val) => <ActionPill action={val} />,
    };

    const baseCols = isOI ? OI_BASE_COLS : ltBaseCols;

    return {
      columns: [...baseCols, ...extraColsDesk, ...valueCols, statusCol, actionCol],
      mobileInfoCols: isOI
        ? [...(config.baseCols ?? OI_BASE_COLS), ...config.extraCols]
        : [...ltBaseCols, ...ltExtraCols],
      mobileParamCols: [...valueCols, statusCol, actionCol],
    };
  }, [activeMainTab, activeTabName, harvest, isOI, config]);

  // Mobile cell renderer (handles both OI-format and AntD-format cols)
  function renderMobileCell(row, col) {
    if (col.type) return renderExtraCell(row, col, { onPhotoView: setPhotoModal, onSpecsView: setSpecModal });
    if (col.render) return col.render(row[col.dataIndex ?? col.key], row);
    return row[col.dataIndex ?? col.key] ?? '-';
  }
  function getColTitle(col) { return col.label ?? col.title ?? col.key; }

  const paramsToggleVisible = !(isOI && config.hideParams);

  return (
    <div className={styles.container}>

      {/* ══════════ DESKTOP VIEW ══════════ */}
      <div className={styles.desktopView}>

        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbLink} onClick={() => navigate('/dashboard')}>Home Screen</span>
          <span className={styles.breadcrumbSep}>&gt;</span>
          <span className={styles.breadcrumbLink} onClick={() => navigate('/quality-control')}>Quality Control</span>
          <span className={styles.breadcrumbSep}>&gt;</span>
          <span>{isOI ? 'Organoleptic Inspection - Review Manager' : 'Lab Test - Review Manager'}</span>
        </div>

        <div className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
              <ArrowLeftOutlined />
            </button>
            <h1 className={styles.pageTitle}>
              {isOI ? 'Organoleptic Inspection - Review Manager' : 'Lab Test - Review Manager'}
            </h1>
          </div>
          <div className={styles.headerRight}>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              format="MM/DD/YYYY"
              className={styles.datePicker}
              suffixIcon={<CalendarOutlined />}
            />
            {!isOI && (
              <Select
                value={harvest}
                onChange={setHarvest}
                options={HARVEST_OPTIONS}
                className={styles.harvestSelect}
              />
            )}
            <button className={styles.iconBtn}><DownloadOutlined /></button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.mainTabs}>
            {MAIN_TABS.map((tab, i) => (
              <button
                key={tab}
                className={`${styles.mainTab} ${activeMainTab === i ? styles.mainTabActive : ''}`}
                onClick={() => { setActiveMainTab(i); setActiveSubTab(0); }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.subTabsWrapper}>
            <div className={styles.subTabs}>
              {currentSubTabs.map((tab, i) => (
                <button
                  key={tab}
                  className={`${styles.subTab} ${activeSubTab === i ? styles.subTabActive : ''}`}
                  onClick={() => setActiveSubTab(i)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.tableWrapper}>
            {isOI ? (
              <div className={styles.splitTableWrapper}>
                <div className={`${styles.detailsPane} ${config.hideParams ? styles.detailsPaneFull : ''}`}>
                  <table className={styles.oiTable}>
                    <thead>
                      <tr>
                        <th className={`${styles.oiTh} ${styles.checkboxTh}`}>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={allOISelected}
                            ref={el => { if (el) el.indeterminate = someOISelected && !allOISelected; }}
                            onChange={toggleAllOI}
                          />
                        </th>
                        {[...(config.baseCols ?? OI_BASE_COLS), ...config.extraCols].map(col => (
                          <th key={col.key} className={styles.oiTh}>{col.title ?? col.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody ref={detailsTbodyRef}>
                      {tableData.map(row => (
                        <tr key={row.key}>
                          <td className={`${styles.oiTd} ${styles.oiTdDetail} ${styles.checkboxTd}`}>
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={selectedOIKeys.has(row.key)}
                              onChange={() => toggleOIKey(row.key)}
                            />
                          </td>
                          {(config.baseCols ?? OI_BASE_COLS).map(col => (
                            <td key={col.key} className={`${styles.oiTd} ${styles.oiTdDetail}`}>
                              {col.type
                                ? renderExtraCell(row, col, { onPhotoView: setPhotoModal, onSpecsView: setSpecModal })
                                : (row[col.dataIndex ?? col.key] ?? '-')}
                            </td>
                          ))}
                          {config.extraCols.map(col => (
                            <td key={col.key} className={`${styles.oiTd} ${styles.oiTdDetail}`}>
                              {renderExtraCell(row, col, { onPhotoView: setPhotoModal, onSpecsView: setSpecModal })}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {!config.hideParams && (
                  <div className={styles.paramsPane}>
                    <table className={styles.oiTable}>
                      <thead>
                        <tr>
                          {config.valueCols.map(col => (
                            <th key={col.key} className={styles.oiTh}>{col.label}</th>
                          ))}
                          <th className={`${styles.oiTh} ${styles.stickyRight}`}>Status</th>
                          <th className={`${styles.oiTh} ${styles.stickyRight}`}>{config.actionLabel}</th>
                        </tr>
                      </thead>
                      <tbody ref={paramsTbodyRef}>
                        {tableData.map(row => (
                          <tr key={row.key}>
                            {config.valueCols.map(col => (
                              <td key={col.key} className={styles.oiTd}>
                                <ValueCell data={row[col.key]} />
                              </td>
                            ))}
                            <td className={`${styles.oiTd} ${styles.stickyRightTd}`}>
                              <span className={`${styles.statusBadge} ${row.status === 'Pass' ? styles.statusPass : styles.statusFail}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className={`${styles.oiTd} ${styles.stickyRightTd}`}>
                              <ActionPill action={row.action} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <Table
                rowSelection={{ type: 'checkbox' }}
                columns={columns}
                dataSource={tableData}
                pagination={false}
                className={styles.table}
                showSorterTooltip={false}
              />
            )}
          </div>
        </div>

        <div className={styles.footerActions}>
          <Button type="primary" className={styles.previewBtn}>Reviewed</Button>
        </div>

      </div>
      {/* ══════════ END DESKTOP VIEW ══════════ */}


      {/* ══════════ MOBILE VIEW ══════════ */}
      <div className={styles.mobileLayout}>

        {/* Scrollable body */}
        <div className={styles.mobileContent}>

          {/* Breadcrumb */}
          <div className={styles.mobileBreadcrumb}>
            <span className={styles.mobileBcLink} onClick={() => navigate('/dashboard')}>Home Screen</span>
            <span className={styles.mobileBcSep}>&gt;</span>
            <span className={styles.mobileBcLink}>Quality Control</span>
            <span className={styles.mobileBcSep}>&gt;</span>
            <span>Review Manager</span>
          </div>

          {/* Page header */}
          <div className={styles.mobilePageHeader}>
            <button className={styles.mobileBackBtn} onClick={() => navigate(-1)}>
              <ArrowLeftOutlined />
            </button>
            <h1 className={styles.mobileTitle}>
              {isOI ? 'Organoleptic Insp. - Review Manager' : 'Lab Test - Review Manager'}
            </h1>
          </div>

          {/* Controls bar */}
          <div className={styles.mobileControls}>
            <button className={styles.mobileFilterBtn} onClick={() => setFilterOpen(true)}>
              <FilterOutlined /> Filter
            </button>
            <div className={styles.mobileControlsBtns}>
              <button className={styles.mobileIconBtn} onClick={() => setSearchOpen(o => !o)}>
                <SearchOutlined />
              </button>
              <button className={styles.mobileIconBtn}>
                <DownloadOutlined />
              </button>
            </div>
          </div>

          {/* Search bar (conditional) */}
          {searchOpen && (
            <input
              className={styles.mobileSearchBar}
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
          )}

          {/* Pagination bar */}
          <div className={styles.mobilePagBar}>
            <span className={styles.mobilePagInfo}>
              {filteredData.length === 0
                ? '0 of 0 Entries'
                : `${(currentPage - 1) * PAGE_SIZE + 1} to ${Math.min(currentPage * PAGE_SIZE, filteredData.length)} of ${filteredData.length} Entries`}
            </span>
            <div className={styles.mobilePagControls}>
              <button className={styles.pagBtn} onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                <DoubleLeftOutlined />
              </button>
              <button className={styles.pagBtn} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                <LeftOutlined />
              </button>
              {getPaginationPages(currentPage, totalPages).map((p, i) =>
                p === '…'
                  ? <span key={`el-${i}`} className={styles.pagEllipsis}>...</span>
                  : <button
                      key={p}
                      className={`${styles.pagBtn} ${currentPage === p ? styles.pagBtnActive : ''}`}
                      onClick={() => typeof p === 'number' && setCurrentPage(p)}
                    >{p}</button>
              )}
              <button className={styles.pagBtn} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                <RightOutlined />
              </button>
              <button className={styles.pagBtn} onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                <DoubleRightOutlined />
              </button>
            </div>
          </div>

          {/* Main tabs — pill style */}
          <div className={styles.mobileMainTabs}>
            {MAIN_TABS.map((tab, i) => (
              <button
                key={tab}
                className={`${styles.mobileMainTab} ${activeMainTab === i ? styles.mobileMainTabActive : ''}`}
                onClick={() => { setActiveMainTab(i); setActiveSubTab(0); }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sub-tabs — horizontally scrollable, arrows scroll by ~one tab width */}
          <div className={styles.mobileSubTabsRow}>
            <button
              className={styles.mobileSubTabArrow}
              onClick={() => { if (subTabsListRef.current) subTabsListRef.current.scrollLeft -= 110; }}
            >
              <LeftOutlined />
            </button>
            <div className={styles.mobileSubTabsList} ref={subTabsListRef}>
              {currentSubTabs.map((tab, i) => (
                <button
                  key={tab}
                  className={`${styles.mobileSubTab} ${activeSubTab === i ? styles.mobileSubTabActive : ''}`}
                  onClick={() => setActiveSubTab(i)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              className={styles.mobileSubTabArrow}
              onClick={() => { if (subTabsListRef.current) subTabsListRef.current.scrollLeft += 110; }}
            >
              <RightOutlined />
            </button>
          </div>

          {/* Sample Info / Parameters toggles */}
          <div className={styles.mobileToggles}>
            <div className={styles.mobileToggleItem}>
              <span className={styles.mobileToggleLabel}>Sample Info</span>
              <button
                className={`${styles.mobileToggle} ${showSampleInfo ? styles.mobileToggleOn : ''}`}
                onClick={() => setShowSampleInfo(s => !s)}
                aria-label="Toggle Sample Info"
              >
                <span className={`${styles.mobileToggleKnob} ${showSampleInfo ? styles.mobileToggleKnobOn : ''}`} />
              </button>
            </div>
            {paramsToggleVisible && (
              <div className={styles.mobileToggleItem}>
                <span className={styles.mobileToggleLabel}>Parameters</span>
                <button
                  className={`${styles.mobileToggle} ${showParams ? styles.mobileToggleOn : ''}`}
                  onClick={() => setShowParams(s => !s)}
                  aria-label="Toggle Parameters"
                >
                  <span className={`${styles.mobileToggleKnob} ${showParams ? styles.mobileToggleKnobOn : ''}`} />
                </button>
              </div>
            )}
          </div>

          {/* Dropdowns row: Pre-Harvest (Lab Test only) + Sample ID */}
          <div className={styles.mobileSampleIdRow}>
            {!isOI && (
              <div className={styles.mobileSampleIdWrap}>
                <select
                  className={styles.mobileSampleIdSelect}
                  value={harvest}
                  onChange={e => setHarvest(e.target.value)}
                >
                  {HARVEST_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            )}
            <div className={styles.mobileSampleIdWrap}>
              <select
                className={styles.mobileSampleIdSelect}
                value={selectedSampleId}
                onChange={e => setSelectedSampleId(e.target.value)}
              >
                <option value="">Select Sample ID</option>
                {sampleIdOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table area — single merged table; checkbox + Sample ID always sticky */}
          <div className={styles.mobileTableArea}>
            <div className={styles.mobileTableWrap}>
              <table className={styles.mobileTable}>
                <thead>
                  <tr>
                    {/* Sticky col 1: checkbox */}
                    <th className={`${styles.mobileCheckTh} ${styles.mobileStickyCheckTh}`} />

                    {/* Sticky col 2: Sample ID (always visible) */}
                    {mobileInfoCols.length > 0 && (
                      <th className={`${styles.mobileTh} ${styles.mobileStickyIdTh}`}>
                        {getColTitle(mobileInfoCols[0])}
                      </th>
                    )}

                    {/* Remaining info cols — visible when Sample Info ON */}
                    {showSampleInfo && mobileInfoCols.slice(1).map(col => (
                      <th key={col.key} className={styles.mobileTh}>{getColTitle(col)}</th>
                    ))}

                    {/* Param cols — visible when Parameters ON */}
                    {showParams && paramsToggleVisible && mobileParamCols.map(col => (
                      <th key={col.key} className={styles.mobileTh}>{getColTitle(col)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={
                          1
                          + (mobileInfoCols.length > 0 ? 1 : 0)
                          + (showSampleInfo ? mobileInfoCols.slice(1).length : 0)
                          + (showParams && paramsToggleVisible ? mobileParamCols.length : 0)
                        }
                        className={styles.mobileEmptyTd}
                      >
                        No data
                      </td>
                    </tr>
                  ) : paginatedData.map(row => (
                    <tr key={row.key} className={styles.mobileTr}>
                      {/* Sticky: checkbox */}
                      <td className={`${styles.mobileCheckTd} ${styles.mobileStickyCheckTd}`}>
                        {isOI
                          ? <input type="checkbox" className={styles.checkbox} checked={selectedOIKeys.has(row.key)} onChange={() => toggleOIKey(row.key)} />
                          : <input type="checkbox" className={styles.checkbox} />
                        }
                      </td>

                      {/* Sticky: Sample ID */}
                      {mobileInfoCols.length > 0 && (
                        <td className={`${styles.mobileTd} ${styles.mobileStickyIdTd}`}>
                          {renderMobileCell(row, mobileInfoCols[0])}
                        </td>
                      )}

                      {/* Remaining info cols */}
                      {showSampleInfo && mobileInfoCols.slice(1).map(col => (
                        <td key={col.key} className={styles.mobileTd}>
                          {renderMobileCell(row, col)}
                        </td>
                      ))}

                      {/* Param cols */}
                      {showParams && paramsToggleVisible && mobileParamCols.map(col => (
                        <td key={col.key} className={styles.mobileTd}>
                          {col.render ? col.render(row[col.dataIndex ?? col.key], row) : (row[col.dataIndex ?? col.key] ?? '-')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
        {/* End mobileContent */}

        {/* Fixed footer */}
        <div className={styles.mobileFooter}>
          <button className={styles.mobileReviewedBtn}>Reviewed</button>
        </div>

        {/* Filter bottom sheet */}
        {filterOpen && (
          <div className={styles.mobileFilterOverlay} onClick={() => setFilterOpen(false)}>
            <div className={styles.mobileFilterPanel} onClick={e => e.stopPropagation()}>
              <div className={styles.mobileFilterHeader}>
                <span className={styles.mobileFilterTitle}>Filter</span>
                <button className={styles.mobileFilterClose} onClick={() => setFilterOpen(false)}>&#x2715;</button>
              </div>
              <div className={styles.mobileFilterBody}>
                <div className={styles.mobileFilterGroup}>
                  <div className={styles.mobileFilterGroupLabel}>Status</div>
                  <div className={styles.mobileFilterChips}>
                    {['all', 'Pass', 'Fail'].map(s => (
                      <button
                        key={s}
                        className={`${styles.mobileFilterChip} ${filterStatus === s ? styles.mobileFilterChipActive : ''}`}
                        onClick={() => setFilterStatus(s)}
                      >
                        {s === 'all' ? 'All' : s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.mobileFilterFooter}>
                <button
                  className={styles.mobileFilterReset}
                  onClick={() => { setFilterStatus('all'); setFilterOpen(false); }}
                >
                  Reset
                </button>
                <button className={styles.mobileFilterApply} onClick={() => setFilterOpen(false)}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      {/* ══════════ END MOBILE VIEW ══════════ */}

      {/* Shared modals */}
      <PhotoModal row={photoModal} onClose={() => setPhotoModal(null)} />
      <SpecRangeModal row={specModal} onClose={() => setSpecModal(null)} />

    </div>
  );
}
