export const AVAILABLE_INPUTS = [
  { name: 'author', type: 'text', placeholder: 'Optional @author param' },
  { name: 'date', type: 'date', defaultValue: new Date().toLocaleDateString() },
  { name: 'version', type: 'text', placeholder: 'Optional @version param' },
];

export const HEADER = 'Generate by J.R.';

export const INSTRUCTIONS =
  'Paste your props into the field on the left and click submit or press the Enter key to generate basic PropTypes and JSDocs';
