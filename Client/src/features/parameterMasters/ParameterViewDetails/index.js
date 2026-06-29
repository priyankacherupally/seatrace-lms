import { useState } from 'react';
import { Input, Button, Table, Select, Modal, Checkbox } from 'antd';
import { SearchOutlined, ArrowLeftOutlined, LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './ParameterViewDetails.module.scss';

const CHIP_COLORS = [
  { bg: '#E9FFEC', border: '#ABDAA9', text: '#408F3D' },
  { bg: '#E4EEFF', border: '#B8D0FD', text: '#3F78E2' },
  { bg: '#FFE9E9', border: '#F9C8C8', text: '#C0001F' },
  { bg: '#FFF8E1', border: '#FFE082', text: '#B45309' },
  { bg: '#F3E8FF', border: '#D8B4FE', text: '#6B21A8' },
];

const chipColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return CHIP_COLORS[Math.abs(hash) % CHIP_COLORS.length];
};

const MOCK_DATA = [
  { key: 1, sNo: 1, uniqueId: '976233',  parameterName: '3 Amino 2 oxazolidinone',   shortCode: 'AOZ', uom: 'Grams',       testingMethod: 'Antibiotic',     effectiveDate: '12/04/2026', plant: 'Yerravaram',   sections: ['Beheading', 'Grading'],  functionType: 'Dropdown',   dropdownOptions: ['Yes', 'No'] },
  { key: 2, sNo: 2, uniqueId: '984901',  parameterName: '5-Nitro-2-phenylacetamide', shortCode: 'NPA', uom: 'Milliliters', testingMethod: 'Micro-organisms', effectiveDate: '01/15/2027', plant: 'Gopalapuram', sections: ['Packing', 'Peel & Cut'], functionType: 'Text Field', minValue: '1', maxValue: '2.5' },
  { key: 3, sNo: 3, uniqueId: '985432',  parameterName: '4-Hydroxyquinoline',        shortCode: 'HQ',  uom: 'Micrograms',  testingMethod: 'Sodium',         effectiveDate: '09/30/2025', plant: 'Krishnapuram', sections: ['Beheading', 'Packing'], functionType: 'Dropdown',   dropdownOptions: ['Pass', 'Fail', 'Retest'] },
  { key: 4, sNo: 4, uniqueId: '986120',  parameterName: 'Chloramphenicol',           shortCode: 'CAP', uom: 'mg/kg',       testingMethod: 'HPLC',           effectiveDate: '03/10/2026', plant: 'Yerravaram',   sections: ['Grading'],              functionType: 'Dropdown',   dropdownOptions: ['Approved', 'Rejected'] },
  { key: 5, sNo: 5, uniqueId: '987345',  parameterName: 'Tetracycline',              shortCode: 'TET', uom: 'µg/kg',       testingMethod: 'LC-MS/MS',       effectiveDate: '07/22/2026', plant: 'Gopalapuram', sections: ['IQF', 'Packing'],       functionType: 'Text Field', minValue: '0', maxValue: '100' },
];

const ROWS_OPTIONS = [
  { value: 5,  label: '05' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
];

function ViewModal({ record, onClose }) {
  if (!record) return null;
  const isDropdown = record.functionType === 'Dropdown';

  return (
    <Modal
      open={!!record}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={720}
      className={styles.viewModal}
      styles={{ content: { padding: 0 }, body: { padding: 0 } }}
    >
      <div className={styles.modalHeader}>
        <div className={styles.modalHeaderLeft}>
          <button type="button" className={styles.modalBackBtn} onClick={onClose}>
            <ArrowLeftOutlined />
          </button>
          <span className={styles.modalTitle}>Function Type</span>
        </div>
        <button type="button" className={styles.modalCloseBtn} onClick={onClose}>
          <CloseOutlined />
        </button>
      </div>

      <div className={styles.modalBody}>
        <div className={styles.modalSection}>
          <p className={styles.modalSectionLabel}>
            {isDropdown ? 'Dropdown:' : 'Text Field:'}
          </p>

          {isDropdown ? (
            <div className={styles.modalOptions}>
              {(record.dropdownOptions || []).map((opt, idx) => (
                <div key={idx} className={styles.modalOptionRow}>
                  <Checkbox checked className={styles.modalCheckbox} />
                  <div className={styles.modalOptionInput}>{opt}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.modalRangeGrid}>
              <div className={styles.modalRangeField}>
                <p className={styles.modalRangeLabel}>Minimum Value</p>
                <div className={styles.modalOptionInput}>{record.minValue}</div>
              </div>
              <div className={styles.modalRangeField}>
                <p className={styles.modalRangeLabel}>Maximum Value</p>
                <div className={styles.modalOptionInput}>{record.maxValue}</div>
              </div>
            </div>
          )}

          <p className={styles.modalNote}>
            <strong>Note:</strong>&nbsp; The parameter type is {isDropdown ? 'dropdown' : 'minimum to maximum range'}.
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default function ParameterViewDetails() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [viewRecord, setViewRecord] = useState(null);

  const filtered = MOCK_DATA.filter(row =>
    Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.length;
  const start = (current - 1) * pageSize + 1;
  const end   = Math.min(current * pageSize, total);

  const columns = [
    { title: 'S.No.',    dataIndex: 'sNo',           key: 'sNo',           sorter: (a, b) => a.sNo - b.sNo,                               width: 70  },
    { title: 'Unique ID',dataIndex: 'uniqueId',      key: 'uniqueId',      sorter: (a, b) => a.uniqueId.localeCompare(b.uniqueId),         width: 110 },
    { title: 'Parameter Name', dataIndex: 'parameterName', key: 'parameterName', sorter: (a, b) => a.parameterName.localeCompare(b.parameterName), width: 200 },
    { title: 'Short Code',     dataIndex: 'shortCode',     key: 'shortCode',     sorter: (a, b) => a.shortCode.localeCompare(b.shortCode),       width: 110 },
    {
      title: <span>Unit of Measurement<br/>(UOM)</span>,
      dataIndex: 'uom', key: 'uom',
      sorter: (a, b) => a.uom.localeCompare(b.uom),
      width: 140,
    },
    { title: 'Testing Method', dataIndex: 'testingMethod', key: 'testingMethod', sorter: (a, b) => a.testingMethod.localeCompare(b.testingMethod), width: 150 },
    { title: 'Effective Date', dataIndex: 'effectiveDate', key: 'effectiveDate', sorter: (a, b) => a.effectiveDate.localeCompare(b.effectiveDate), width: 130 },
    { title: 'Plant',          dataIndex: 'plant',         key: 'plant',         sorter: (a, b) => a.plant.localeCompare(b.plant),               width: 130 },
    {
      title: 'Section Applicable',
      dataIndex: 'sections',
      key: 'sections',
      width: 190,
      render: (sections) => (
        <div className={styles.chipGroup}>
          {sections.map(s => {
            const c = chipColor(s);
            return (
              <span
                key={s}
                className={styles.chip}
                style={{ background: c.bg, borderColor: c.border, color: c.text }}
              >
                {s}
              </span>
            );
          })}
        </div>
      ),
    },
    {
      title: 'Function Type',
      dataIndex: 'functionType',
      key: 'functionType',
      sorter: (a, b) => a.functionType.localeCompare(b.functionType),
      width: 130,
    },
    {
      title: 'Action',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <div className={styles.actionGroup}>
          <Button
            className={styles.viewBtn}
            onClick={() => setViewRecord(record)}
          >
            View
          </Button>
          <Button
            className={styles.editBtn}
            onClick={() => navigate('/parameter-masters/form')}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbLink}>Home Screen</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span>Parameter View Details</span>
      </div>

      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />
          </button>
          <h1 className={styles.pageTitle}>Parameter View Details</h1>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div />
          <div className={styles.toolbarRight}>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined className={styles.searchIcon} />}
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrent(1); }}
              className={styles.searchInput}
            />
            <Button
              type="primary"
              className={styles.addBtn}
              onClick={() => navigate('/parameter-masters/form')}
            >
              Add Parameter
            </Button>
          </div>
        </div>

        <div className={styles.tableScroll}>
          <Table
            columns={columns}
            dataSource={filtered.slice((current - 1) * pageSize, current * pageSize)}
            pagination={false}
            className={styles.table}
            size="middle"
            sortDirections={['ascend', 'descend', 'ascend']}
            scroll={{ x: 'max-content' }}
          />
        </div>

        <div className={styles.pagination}>
          <div className={styles.rowsControl}>
            <span className={styles.rowsLabel}>Rows</span>
            <Select
              value={pageSize}
              onChange={v => { setPageSize(v); setCurrent(1); }}
              options={ROWS_OPTIONS}
              className={styles.rowsSelect}
              size="small"
            />
          </div>
          <div className={styles.pageInfo}>
            <span className={styles.pageText}>{start}–{end} of {total}</span>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setCurrent(p => Math.max(1, p - 1))}
              disabled={current === 1}
            >
              <LeftOutlined />
            </button>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setCurrent(p => p + 1)}
              disabled={end >= total}
            >
              <RightOutlined />
            </button>
          </div>
        </div>
      </div>

      <ViewModal record={viewRecord} onClose={() => setViewRecord(null)} />
    </div>
  );
}
