export const AVAILABLE_INPUTS = [
  { name: 'author', type: 'text', placeholder: 'Optional @author param' },
  { name: 'date', type: 'date', defaultValue: new Date().toLocaleDateString() },
  { name: 'version', type: 'text', placeholder: 'Optional @version param' },
];

export const HEADER = 'Generate by J.R.';

export const SUBMIT_BTN = 'Submit';

export const DEFAULT_VALUE =
  'Paste props here, i.e.: \n{\n  test: true,\n  "quoted": "quotedstring",\n  testObj: {\n    nested: true\n  },\n}';

export const INSTRUCTIONS_FULL =
  'Paste your props into the field on the left and click submit or press the Enter key to generate basic PropTypes and JSDocs';
export const INSTRUCTIONS_HALF =
  'Paste your props into the fields below and click submit or press the Enter key to generate basic PropTypes and JSDocs';
