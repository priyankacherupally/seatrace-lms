const SodiumConfig = {
  extraCols: {
    default: [
      { key: 'analyst',    label: 'Analyst',     sorter: (a, b) => a.analyst.localeCompare(b.analyst) },
      { key: 'testedDate', label: 'Tested Date', sorter: (a, b) => a.testedDate.localeCompare(b.testedDate) },
      { key: 'approvedBy', label: 'Approved By', sorter: (a, b) => a.approvedBy.localeCompare(b.approvedBy) },
    ],
    'others': [],
  },
  valueCols: [
    { key: 'sodiumPct', label: 'Sodium %' },
  ],
  actionLabel: 'Approval',
  data: {
    'pre-harvest': [
      { key:'1', sampleNumber:'PH-2026-000654', supplierName:'Santosh', supplierLocation:'Madhapur',     count:12,   samplerName:'Rohan',  samplerID:'PH-20260511-00011', analyst:'Priya', testedDate:'11 May 2026', approvedBy:'Sunil', sodiumPct:{value:0.34,pass:true},  status:'Pass', action:'Approved' },
      { key:'2', sampleNumber:'PH-2026-000655', supplierName:'Anita',   supplierLocation:'Banjara Hills',count:13,   samplerName:'Kavya',  samplerID:'PH-20260511-00012', analyst:'Sarah', testedDate:'11 May 2026', approvedBy:'Ravi',  sodiumPct:{value:0.30,pass:false}, status:'Fail', action:'Rejected' },
      { key:'3', sampleNumber:'PH-2026-000656', supplierName:'Rahul',   supplierLocation:'Gachibowli',  count:15,   samplerName:'Nikhil', samplerID:'PH-20260511-00013', analyst:'Fassi', testedDate:'10 May 2026', approvedBy:'Farah', sodiumPct:{value:0.36,pass:true},  status:'Pass', action:'Rejected' },
      { key:'4', sampleNumber:'PH-2026-000657', supplierName:'Sneha',   supplierLocation:'Kondapur',    count:18,   samplerName:'Priya',  samplerID:'PH-20260511-00014', analyst:'Neha',  testedDate:'09 May 2026', approvedBy:'Neha',  sodiumPct:{value:0.31,pass:false}, status:'Fail', action:'Approved' },
      { key:'5', sampleNumber:'PH-2026-000658', supplierName:'Amit',    supplierLocation:'Hitech City', count:18,   samplerName:'Deepak', samplerID:'PH-20260511-00015', analyst:'Rahul', testedDate:'08 May 2026', approvedBy:'Rahul', sodiumPct:{value:0.33,pass:true},  status:'Pass', action:'Rejected' },
      { key:'6', sampleNumber:'PH-2026-000659', supplierName:'Neha',    supplierLocation:'Secunderabad',count:12,   samplerName:'Suresh', samplerID:'PH-20260511-00016', analyst:'Srinu', testedDate:'07 May 2026', approvedBy:'Srinu', sodiumPct:{value:0.32,pass:true},  status:'Pass', action:'Approved' },
      { key:'7', sampleNumber:'PH-2026-000660', supplierName:'Vijay',   supplierLocation:'Kukatpally',  count:'09', samplerName:'Ravi',   samplerID:'PH-20260511-00017', analyst:'Balu',  testedDate:'06 May 2026', approvedBy:'Balu',  sodiumPct:{value:0.29,pass:false}, status:'Fail', action:'Approved' },
    ],
    'processing': [
      { key:'1', sampleNumber:'PR-2026-000654', batchNumber:'2026-048264', section:'Grading', grade:'12/16', count:14, variety:'H-Less', quantity:24144, analyst:'Divya', testedDate:'12 May 2026', approvedBy:'Kiran',  sodiumPct:{value:0.31,pass:true},  status:'Pass', action:'Approved' },
      { key:'2', sampleNumber:'PR-2026-000654', batchNumber:'2026-048264', section:'Grading', grade:'12/16', count:14, variety:'H-Less', quantity:24144, analyst:'Pooja', testedDate:'12 May 2026', approvedBy:'Srini',  sodiumPct:{value:0.38,pass:false}, status:'Fail', action:'Rejected' },
      { key:'3', sampleNumber:'PR-2026-000654', batchNumber:'2026-048266', section:'Grading', grade:'10/16', count:15, variety:'H-ON',   quantity:24146, analyst:'Arun',  testedDate:'11 May 2026', approvedBy:'Meena',  sodiumPct:{value:0.29,pass:true},  status:'Pass', action:'Approved' },
      { key:'4', sampleNumber:'PR-2026-000654', batchNumber:'2026-048264', section:'Grading', grade:'12/16', count:14, variety:'H-Less', quantity:24144, analyst:'Hari',  testedDate:'10 May 2026', approvedBy:'Rekha',  sodiumPct:{value:0.35,pass:false}, status:'Fail', action:'Rejected' },
      { key:'5', sampleNumber:'PR-2026-000654', batchNumber:'2026-048268', section:'Grading', grade:'13/16', count:16, variety:'H-ON',   quantity:24148, analyst:'Venk',  testedDate:'09 May 2026', approvedBy:'Aditya', sodiumPct:{value:0.27,pass:true},  status:'Pass', action:'Approved' },
      { key:'6', sampleNumber:'PR-2026-000654', batchNumber:'2026-048269', section:'Soaking', grade:'11/16', count:10, variety:'H-Less', quantity:24149, analyst:'Preet', testedDate:'08 May 2026', approvedBy:'Venkat', sodiumPct:{value:0.33,pass:true},  status:'Pass', action:'Rejected' },
      { key:'7', sampleNumber:'PR-2026-000654', batchNumber:'2026-048270', section:'IQF',     grade:'12/16', count:13, variety:'H-ON',   quantity:24150, analyst:'Sunil', testedDate:'07 May 2026', approvedBy:'Preet',  sodiumPct:{value:0.40,pass:false}, status:'Fail', action:'Rejected' },
    ],
    'others': [
      { key:'1', sampleNumber:'OT-2026-000654', others:'Gloves',     date:'11 May 2026', sodiumPct:{value:0.32,pass:true},  status:'Pass', action:'Approved' },
      { key:'2', sampleNumber:'OT-2026-000655', others:'Apron',      date:'11 May 2026', sodiumPct:{value:0.39,pass:false}, status:'Fail', action:'Rejected' },
      { key:'3', sampleNumber:'OT-2026-000656', others:'Mouth Mask', date:'10 May 2026', sodiumPct:{value:0.28,pass:true},  status:'Pass', action:'Approved' },
      { key:'4', sampleNumber:'OT-2026-000657', others:'Shoes',      date:'09 May 2026', sodiumPct:{value:0.34,pass:true},  status:'Pass', action:'Approved' },
      { key:'5', sampleNumber:'OT-2026-000658', others:'Hair Net',   date:'08 May 2026', sodiumPct:{value:0.41,pass:false}, status:'Fail', action:'Rejected' },
      { key:'6', sampleNumber:'OT-2026-000659', others:'Gloves',     date:'07 May 2026', sodiumPct:{value:0.30,pass:true},  status:'Pass', action:'Approved' },
      { key:'7', sampleNumber:'OT-2026-000660', others:'Apron',      date:'06 May 2026', sodiumPct:{value:0.36,pass:true},  status:'Pass', action:'Rejected' },
    ],
  },
};

export default SodiumConfig;
