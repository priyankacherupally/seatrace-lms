const AntibioticConfig = {
  extraCols:   [],
  valueCols:   [
    { key: 'aoz',  label: 'AOZ'  },
    { key: 'amoz', label: 'AMOZ' },
    { key: 'ahd',  label: 'AHD'  },
    { key: 'sem',  label: 'SEM'  },
    { key: 'cap',  label: 'CAP'  },
  ],
  actionLabel: 'Action',
  data: {
    'pre-harvest': [
      { key:'1', sampleNumber:'PH-2026-000654', supplierName:'Santosh', supplierLocation:'Madhapur',     count:12,   samplerName:'Rohan',  samplerID:'PH-20260511-00011', aoz:{value:0.15,pass:true},  amoz:{value:0.36,pass:true},  ahd:{value:0.23,pass:false}, sem:{value:0.13,pass:true},  cap:{value:0.22,pass:false}, status:'Pass', action:'Approved' },
      { key:'2', sampleNumber:'PH-2026-000655', supplierName:'Anita',   supplierLocation:'Banjara Hills',count:13,   samplerName:'Kavya',  samplerID:'PH-20260511-00012', aoz:{value:0.25,pass:true},  amoz:{value:0.31,pass:false}, ahd:{value:0.19,pass:true},  sem:{value:0.15,pass:true},  cap:{value:0.26,pass:true},  status:'Fail', action:'Approved' },
      { key:'3', sampleNumber:'PH-2026-000656', supplierName:'Rahul',   supplierLocation:'Gachibowli',  count:15,   samplerName:'Nikhil', samplerID:'PH-20260511-00013', aoz:{value:0.20,pass:true},  amoz:{value:0.33,pass:true},  ahd:{value:0.21,pass:false}, sem:{value:0.10,pass:true},  cap:{value:0.30,pass:false}, status:'Pass', action:'Rejected' },
      { key:'4', sampleNumber:'PH-2026-000657', supplierName:'Sneha',   supplierLocation:'Kondapur',    count:18,   samplerName:'Priya',  samplerID:'PH-20260511-00014', aoz:{value:0.19,pass:true},  amoz:{value:0.32,pass:true},  ahd:{value:0.24,pass:false}, sem:{value:0.16,pass:true},  cap:{value:0.27,pass:true},  status:'Pass', action:'Approved' },
      { key:'5', sampleNumber:'PH-2026-000658', supplierName:'Amit',    supplierLocation:'Hitech City', count:18,   samplerName:'Deepak', samplerID:'PH-20260511-00015', aoz:{value:0.21,pass:true},  amoz:{value:0.29,pass:false}, ahd:{value:0.20,pass:true},  sem:{value:0.11,pass:true},  cap:{value:0.24,pass:true},  status:'Fail', action:'Rejected' },
      { key:'6', sampleNumber:'PH-2026-000659', supplierName:'Neha',    supplierLocation:'Secunderabad',count:12,   samplerName:'Suresh', samplerID:'PH-20260511-00016', aoz:{value:0.32,pass:true},  amoz:{value:0.30,pass:true},  ahd:{value:0.30,pass:true},  sem:{value:0.21,pass:false}, cap:{value:0.27,pass:true},  status:'Pass', action:'Rejected' },
      { key:'7', sampleNumber:'PH-2026-000660', supplierName:'Vijay',   supplierLocation:'Kukatpally',  count:'09', samplerName:'Ravi',   samplerID:'PH-20260511-00017', aoz:{value:0.22,pass:false}, amoz:{value:0.30,pass:true},  ahd:{value:0.18,pass:false}, sem:{value:0.12,pass:true},  cap:{value:0.28,pass:false}, status:'Fail', action:'Approved' },
    ],
    'processing': [
      { key:'1', sampleNumber:'PR-2026-000654', batchNumber:'2026-048264', section:'Grading', grade:'12/16', count:14, variety:'H-Less', quantity:24144, aoz:{value:0.18,pass:true},  amoz:{value:0.28,pass:true},  ahd:{value:0.17,pass:true},  sem:{value:0.09,pass:true},  cap:{value:0.19,pass:true},  status:'Pass', action:'Approved' },
      { key:'2', sampleNumber:'PR-2026-000654', batchNumber:'2026-048264', section:'Grading', grade:'12/16', count:14, variety:'H-Less', quantity:24144, aoz:{value:0.27,pass:true},  amoz:{value:0.35,pass:false}, ahd:{value:0.22,pass:false}, sem:{value:0.18,pass:true},  cap:{value:0.31,pass:false}, status:'Fail', action:'Rejected' },
      { key:'3', sampleNumber:'PR-2026-000654', batchNumber:'2026-048266', section:'Grading', grade:'10/16', count:15, variety:'H-ON',   quantity:24146, aoz:{value:0.14,pass:true},  amoz:{value:0.26,pass:true},  ahd:{value:0.15,pass:true},  sem:{value:0.08,pass:true},  cap:{value:0.21,pass:true},  status:'Pass', action:'Approved' },
      { key:'4', sampleNumber:'PR-2026-000654', batchNumber:'2026-048264', section:'Grading', grade:'12/16', count:14, variety:'H-Less', quantity:24144, aoz:{value:0.23,pass:false}, amoz:{value:0.34,pass:true},  ahd:{value:0.26,pass:false}, sem:{value:0.14,pass:true},  cap:{value:0.29,pass:false}, status:'Fail', action:'Rejected' },
      { key:'5', sampleNumber:'PR-2026-000654', batchNumber:'2026-048268', section:'Grading', grade:'13/16', count:16, variety:'H-ON',   quantity:24148, aoz:{value:0.16,pass:true},  amoz:{value:0.27,pass:true},  ahd:{value:0.19,pass:true},  sem:{value:0.11,pass:true},  cap:{value:0.23,pass:true},  status:'Pass', action:'Approved' },
      { key:'6', sampleNumber:'PR-2026-000654', batchNumber:'2026-048269', section:'Soaking', grade:'11/16', count:10, variety:'H-Less', quantity:24149, aoz:{value:0.29,pass:false}, amoz:{value:0.32,pass:true},  ahd:{value:0.28,pass:false}, sem:{value:0.20,pass:true},  cap:{value:0.26,pass:true},  status:'Fail', action:'Rejected' },
      { key:'7', sampleNumber:'PR-2026-000654', batchNumber:'2026-048270', section:'IQF',     grade:'12/16', count:13, variety:'H-ON',   quantity:24150, aoz:{value:0.11,pass:true},  amoz:{value:0.24,pass:true},  ahd:{value:0.13,pass:true},  sem:{value:0.07,pass:true},  cap:{value:0.17,pass:true},  status:'Pass', action:'Approved' },
    ],
    'others': [
      { key:'1', sampleNumber:'OT-2026-000654', others:'Gloves',     date:'11 May 2026', aoz:{value:0.16,pass:true},  amoz:{value:0.27,pass:true},  ahd:{value:0.18,pass:true},  sem:{value:0.10,pass:true},  cap:{value:0.20,pass:true},  status:'Pass', action:'Approved' },
      { key:'2', sampleNumber:'OT-2026-000655', others:'Apron',      date:'11 May 2026', aoz:{value:0.24,pass:false}, amoz:{value:0.33,pass:true},  ahd:{value:0.25,pass:false}, sem:{value:0.17,pass:true},  cap:{value:0.28,pass:false}, status:'Fail', action:'Rejected' },
      { key:'3', sampleNumber:'OT-2026-000656', others:'Mouth Mask', date:'10 May 2026', aoz:{value:0.13,pass:true},  amoz:{value:0.25,pass:true},  ahd:{value:0.14,pass:true},  sem:{value:0.08,pass:true},  cap:{value:0.18,pass:true},  status:'Pass', action:'Approved' },
      { key:'4', sampleNumber:'OT-2026-000657', others:'Shoes',      date:'09 May 2026', aoz:{value:0.22,pass:true},  amoz:{value:0.31,pass:true},  ahd:{value:0.22,pass:false}, sem:{value:0.15,pass:true},  cap:{value:0.25,pass:true},  status:'Pass', action:'Approved' },
      { key:'5', sampleNumber:'OT-2026-000658', others:'Hair Net',   date:'08 May 2026', aoz:{value:0.28,pass:false}, amoz:{value:0.36,pass:false}, ahd:{value:0.29,pass:false}, sem:{value:0.20,pass:false}, cap:{value:0.32,pass:false}, status:'Fail', action:'Rejected' },
      { key:'6', sampleNumber:'OT-2026-000659', others:'Gloves',     date:'07 May 2026', aoz:{value:0.17,pass:true},  amoz:{value:0.28,pass:true},  ahd:{value:0.16,pass:true},  sem:{value:0.09,pass:true},  cap:{value:0.21,pass:true},  status:'Pass', action:'Approved' },
      { key:'7', sampleNumber:'OT-2026-000660', others:'Apron',      date:'06 May 2026', aoz:{value:0.21,pass:true},  amoz:{value:0.30,pass:true},  ahd:{value:0.20,pass:false}, sem:{value:0.12,pass:true},  cap:{value:0.24,pass:true},  status:'Pass', action:'Rejected' },
    ],
  },
};

export default AntibioticConfig;
