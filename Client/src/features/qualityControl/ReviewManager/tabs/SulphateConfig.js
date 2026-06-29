const SulphateConfig = {
  extraCols: {
    default: [
      { key: 'analyst',    label: 'Analyst',     sorter: (a, b) => a.analyst.localeCompare(b.analyst) },
      { key: 'testedDate', label: 'Tested Date', sorter: (a, b) => a.testedDate.localeCompare(b.testedDate) },
      { key: 'approvedBy', label: 'Approved By', sorter: (a, b) => a.approvedBy.localeCompare(b.approvedBy) },
    ],
    'others': [],
  },
  valueCols: [
    { key: 'residualSO2',     label: 'Residual SO₂'     },
    { key: 'sulphateContent', label: 'Sulphate Content' },
  ],
  actionLabel: 'Approval',
  data: {
    'pre-harvest': [
      { key:'1', sampleNumber:'PH-2026-000654', supplierName:'Santosh', supplierLocation:'Madhapur',     count:12,   samplerName:'Rohan',  samplerID:'PH-20260511-00011', analyst:'Priya', testedDate:'11 May 2026', approvedBy:'Sunil', residualSO2:{value:0.18,pass:true},  sulphateContent:{value:0.34,pass:true},  status:'Pass', action:'Approved' },
      { key:'2', sampleNumber:'PH-2026-000655', supplierName:'Anita',   supplierLocation:'Banjara Hills',count:13,   samplerName:'Kavya',  samplerID:'PH-20260511-00012', analyst:'Sarah', testedDate:'11 May 2026', approvedBy:'Ravi',  residualSO2:{value:0.22,pass:false}, sulphateContent:{value:0.30,pass:true},  status:'Fail', action:'Rejected' },
      { key:'3', sampleNumber:'PH-2026-000656', supplierName:'Rahul',   supplierLocation:'Gachibowli',  count:15,   samplerName:'Nikhil', samplerID:'PH-20260511-00013', analyst:'Fassi', testedDate:'10 May 2026', approvedBy:'Farah', residualSO2:{value:0.15,pass:true},  sulphateContent:{value:0.31,pass:false}, status:'Fail', action:'Rejected' },
      { key:'4', sampleNumber:'PH-2026-000657', supplierName:'Sneha',   supplierLocation:'Kondapur',    count:18,   samplerName:'Priya',  samplerID:'PH-20260511-00014', analyst:'Neha',  testedDate:'09 May 2026', approvedBy:'Neha',  residualSO2:{value:0.25,pass:true},  sulphateContent:{value:0.31,pass:false}, status:'Fail', action:'Approved' },
      { key:'5', sampleNumber:'PH-2026-000658', supplierName:'Amit',    supplierLocation:'Hitech City', count:18,   samplerName:'Deepak', samplerID:'PH-20260511-00015', analyst:'Rahul', testedDate:'08 May 2026', approvedBy:'Rahul', residualSO2:{value:0.20,pass:true},  sulphateContent:{value:0.33,pass:true},  status:'Pass', action:'Rejected' },
      { key:'6', sampleNumber:'PH-2026-000659', supplierName:'Neha',    supplierLocation:'Secunderabad',count:12,   samplerName:'Suresh', samplerID:'PH-20260511-00016', analyst:'Srinu', testedDate:'07 May 2026', approvedBy:'Srinu', residualSO2:{value:0.19,pass:true},  sulphateContent:{value:0.32,pass:true},  status:'Pass', action:'Approved' },
      { key:'7', sampleNumber:'PH-2026-000660', supplierName:'Vijay',   supplierLocation:'Kukatpally',  count:'09', samplerName:'Ravi',   samplerID:'PH-20260511-00017', analyst:'Balu',  testedDate:'06 May 2026', approvedBy:'Balu',  residualSO2:{value:0.21,pass:true},  sulphateContent:{value:0.29,pass:false}, status:'Fail', action:'Approved' },
    ],
    'processing': [
      { key:'1', sampleNumber:'PR-2026-000654', batchNumber:'2026-048264', section:'Grading', grade:'12/16', count:14, variety:'H-Less', quantity:24144, analyst:'Divya', testedDate:'12 May 2026', approvedBy:'Kiran',  residualSO2:{value:0.16,pass:true},  sulphateContent:{value:0.29,pass:true},  status:'Pass', action:'Approved' },
      { key:'2', sampleNumber:'PR-2026-000654', batchNumber:'2026-048264', section:'Grading', grade:'12/16', count:14, variety:'H-Less', quantity:24144, analyst:'Pooja', testedDate:'12 May 2026', approvedBy:'Srini',  residualSO2:{value:0.24,pass:false}, sulphateContent:{value:0.35,pass:false}, status:'Fail', action:'Rejected' },
      { key:'3', sampleNumber:'PR-2026-000654', batchNumber:'2026-048266', section:'Grading', grade:'10/16', count:15, variety:'H-ON',   quantity:24146, analyst:'Arun',  testedDate:'11 May 2026', approvedBy:'Meena',  residualSO2:{value:0.13,pass:true},  sulphateContent:{value:0.27,pass:true},  status:'Pass', action:'Approved' },
      { key:'4', sampleNumber:'PR-2026-000654', batchNumber:'2026-048264', section:'Grading', grade:'12/16', count:14, variety:'H-Less', quantity:24144, analyst:'Hari',  testedDate:'10 May 2026', approvedBy:'Rekha',  residualSO2:{value:0.28,pass:false}, sulphateContent:{value:0.38,pass:false}, status:'Fail', action:'Rejected' },
      { key:'5', sampleNumber:'PR-2026-000654', batchNumber:'2026-048268', section:'Grading', grade:'13/16', count:16, variety:'H-ON',   quantity:24148, analyst:'Venk',  testedDate:'09 May 2026', approvedBy:'Aditya', residualSO2:{value:0.17,pass:true},  sulphateContent:{value:0.31,pass:true},  status:'Pass', action:'Approved' },
      { key:'6', sampleNumber:'PR-2026-000654', batchNumber:'2026-048269', section:'Soaking', grade:'11/16', count:10, variety:'H-Less', quantity:24149, analyst:'Preet', testedDate:'08 May 2026', approvedBy:'Venkat', residualSO2:{value:0.22,pass:true},  sulphateContent:{value:0.30,pass:true},  status:'Pass', action:'Approved' },
      { key:'7', sampleNumber:'PR-2026-000654', batchNumber:'2026-048270', section:'IQF',     grade:'12/16', count:13, variety:'H-ON',   quantity:24150, analyst:'Sunil', testedDate:'07 May 2026', approvedBy:'Preet',  residualSO2:{value:0.26,pass:false}, sulphateContent:{value:0.36,pass:false}, status:'Fail', action:'Rejected' },
    ],
    'others': [
      { key:'1', sampleNumber:'OT-2026-000654', others:'Gloves',     date:'11 May 2026', residualSO2:{value:0.14,pass:true},  sulphateContent:{value:0.28,pass:true},  status:'Pass', action:'Approved' },
      { key:'2', sampleNumber:'OT-2026-000655', others:'Apron',      date:'11 May 2026', residualSO2:{value:0.23,pass:false}, sulphateContent:{value:0.34,pass:false}, status:'Fail', action:'Rejected' },
      { key:'3', sampleNumber:'OT-2026-000656', others:'Mouth Mask', date:'10 May 2026', residualSO2:{value:0.12,pass:true},  sulphateContent:{value:0.26,pass:true},  status:'Pass', action:'Approved' },
      { key:'4', sampleNumber:'OT-2026-000657', others:'Shoes',      date:'09 May 2026', residualSO2:{value:0.19,pass:true},  sulphateContent:{value:0.30,pass:true},  status:'Pass', action:'Approved' },
      { key:'5', sampleNumber:'OT-2026-000658', others:'Hair Net',   date:'08 May 2026', residualSO2:{value:0.27,pass:false}, sulphateContent:{value:0.39,pass:false}, status:'Fail', action:'Rejected' },
      { key:'6', sampleNumber:'OT-2026-000659', others:'Gloves',     date:'07 May 2026', residualSO2:{value:0.16,pass:true},  sulphateContent:{value:0.29,pass:true},  status:'Pass', action:'Approved' },
      { key:'7', sampleNumber:'OT-2026-000660', others:'Apron',      date:'06 May 2026', residualSO2:{value:0.21,pass:true},  sulphateContent:{value:0.31,pass:true},  status:'Pass', action:'Rejected' },
    ],
  },
};

export default SulphateConfig;
