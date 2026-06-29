import { useState } from 'react';
import { Form, Input, Select, Switch, Button, Checkbox, Tabs } from 'antd';
import { ArrowLeftOutlined, PlusCircleOutlined, MinusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './ParameterForm.module.scss';

const SECTION_OPTIONS = ['Beheading', 'Grading', 'Processing', 'IQF', 'Packing'];
const UOM_OPTIONS = ['mg/kg', 'µg/kg', 'ppm', 'ppb', 'g/kg', 'IU/g', '%'];
const PLANT_OPTIONS = ['Plant A - Chennai', 'Plant B - Kochi', 'Plant C - Vizag'];

const FUNCTION_TABS = [
  { key: 'dropdown', label: 'Dropdown' },
  { key: 'textField', label: 'Text Field' },
];

export default function ParameterForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);
  const [functionType, setFunctionType] = useState('dropdown');
  const [dropdownOptions, setDropdownOptions] = useState([{ id: 1, text: '', isDefault: false }]);
  const [selectedSections, setSelectedSections] = useState(['Beheading', 'Grading']);

  const uniqueId = '9724346233';

  const addDropdownOption = () => {
    setDropdownOptions(prev => [...prev, { id: Date.now(), text: '', isDefault: false }]);
  };

  const removeDropdownOption = (id) => {
    setDropdownOptions(prev => prev.length > 1 ? prev.filter(o => o.id !== id) : prev);
  };

  const updateOptionText = (id, text) => {
    setDropdownOptions(prev => prev.map(o => (o.id === id ? { ...o, text } : o)));
  };

  const toggleDefault = (id) => {
    setDropdownOptions(prev => prev.map(o => ({ ...o, isDefault: o.id === id ? !o.isDefault : o.isDefault })));
  };

  const handleSectionSelect = (value) => {
    if (value && !selectedSections.includes(value)) {
      setSelectedSections(prev => [...prev, value]);
    }
  };

  const removeSection = (section) => {
    setSelectedSections(prev => prev.filter(s => s !== section));
  };

  const handleFinish = (values) => {
    console.log('Submitted:', { ...values, uniqueId, isActive, functionType, dropdownOptions, selectedSections });
  };

  const availableSections = SECTION_OPTIONS.filter(s => !selectedSections.includes(s));

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbLink}>Home Screen</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span>Parameter Form</span>
      </div>

      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />
          </button>
          <h1 className={styles.pageTitle}>Parameter Form</h1>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.toggleLabel}>Inactive</span>
          <Switch checked={isActive} onChange={setIsActive} className={styles.switch} />
          <span className={`${styles.toggleLabel} ${isActive ? styles.toggleActive : ''}`}>Active</span>
          <Button className={styles.viewDataBtn} onClick={() => navigate('/parameter-masters/details')}>View Data</Button>
        </div>
      </div>

      <div className={styles.formCard}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
        >
          <div className={styles.formGrid}>
            <Form.Item label={<span className={styles.label}>Unique ID</span>}>
              <Input value={uniqueId} disabled className={styles.disabledInput} />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Parameter Name<span className={styles.asterisk}>*</span></span>}
              name="parameterName"
              rules={[{ required: true, message: 'Parameter Name is required' }]}
            >
              <Input placeholder="Eg: 3 Amino 2 oxazolidinone" className={styles.input} />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Short Code<span className={styles.asterisk}>*</span></span>}
              name="shortCode"
              rules={[{ required: true, message: 'Short Code is required' }]}
            >
              <Input placeholder="Eg: AOZ" className={styles.input} />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Unit of Measurement (UOM)<span className={styles.asterisk}>*</span></span>}
              name="uom"
              rules={[{ required: true, message: 'UOM is required' }]}
            >
              <Select
                placeholder="Select UOM"
                className={styles.select}
                options={UOM_OPTIONS.map(u => ({ value: u, label: u }))}
              />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Testing Method<span className={styles.asterisk}>*</span></span>}
              name="testingMethod"
              rules={[{ required: true, message: 'Testing Method is required' }]}
            >
              <Input placeholder="Eg: Antibiotic" className={styles.input} />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Effective Date<span className={styles.asterisk}>*</span></span>}
              name="effectiveDate"
              rules={[{ required: true, message: 'Effective Date is required' }]}
            >
              <Input placeholder="Eg: 12/04/2026" className={styles.input} />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Plant<span className={styles.asterisk}>*</span></span>}
              name="plant"
              rules={[{ required: true, message: 'Plant is required' }]}
            >
              <Select
                placeholder="Select Plant"
                className={styles.select}
                options={PLANT_OPTIONS.map(p => ({ value: p, label: p }))}
              />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Section Applicable<span className={styles.asterisk}>*</span></span>}
              name="sectionApplicable"
            >
              <Select
                placeholder="Eg: Select Section"
                className={styles.select}
                value={undefined}
                onChange={handleSectionSelect}
                options={availableSections.map(s => ({ value: s, label: s }))}
              />
              {selectedSections.length > 0 && (
                <div className={styles.chipRow}>
                  {selectedSections.map(section => (
                    <span key={section} className={styles.chip}>
                      {section}
                      <button
                        type="button"
                        className={styles.chipRemove}
                        onClick={() => removeSection(section)}
                      >
                        <CloseOutlined />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Form.Item>
          </div>

          <Form.Item
            label={<span className={styles.label}>Function Type<span className={styles.asterisk}>*</span></span>}
            className={styles.functionTypeItem}
          >
            <div className={styles.functionTypeCard}>
              <Tabs
                activeKey={functionType}
                onChange={setFunctionType}
                items={FUNCTION_TABS}
                className={styles.tabs}
              />
              <div className={styles.functionBody}>
                {functionType === 'dropdown' ? (
                  <>
                    <div className={styles.optionsList}>
                      {dropdownOptions.map((opt, idx) => (
                        <div key={opt.id} className={styles.optionRow}>
                          <Checkbox
                            checked={opt.isDefault}
                            onChange={() => toggleDefault(opt.id)}
                          />
                          <Input
                            placeholder="Write text here.."
                            value={opt.text}
                            onChange={(e) => updateOptionText(opt.id, e.target.value)}
                            className={styles.optionInput}
                          />
                          <button
                            type="button"
                            className={styles.removeOptionBtn}
                            onClick={() => removeDropdownOption(opt.id)}
                          >
                            <MinusCircleOutlined />
                          </button>
                          {idx === dropdownOptions.length - 1 && (
                            <button
                              type="button"
                              className={styles.addOptionBtn}
                              onClick={addDropdownOption}
                            >
                              <PlusCircleOutlined />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className={styles.noteText}>
                      <strong>Note:</strong>&nbsp; The parameter type is dropdown.
                    </p>
                  </>
                ) : (
                  <>
                    <div className={styles.rangeGrid}>
                      <Form.Item
                        label={<span className={styles.label}>Minimum Value<span className={styles.asterisk}>*</span></span>}
                        name="minValue"
                        rules={[{ required: functionType === 'textField', message: 'Minimum Value is required' }]}
                        className={styles.rangeField}
                      >
                        <Input placeholder="Eg: 1" className={styles.optionInput} />
                      </Form.Item>
                      <Form.Item
                        label={<span className={styles.label}>Maximum Value<span className={styles.asterisk}>*</span></span>}
                        name="maxValue"
                        rules={[{ required: functionType === 'textField', message: 'Maximum Value is required' }]}
                        className={styles.rangeField}
                      >
                        <Input placeholder="Eg: 2.5" className={styles.optionInput} />
                      </Form.Item>
                    </div>
                    <p className={styles.noteText}>
                      <strong>Note:</strong>&nbsp; The parameter type is minimum to maximum range.
                    </p>
                  </>
                )}
              </div>
            </div>
          </Form.Item>

          <div className={styles.formActions}>
            <Button
              className={styles.cancelBtn}
              onClick={() => { form.resetFields(); setSelectedSections([]); }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className={styles.saveBtn}>
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
