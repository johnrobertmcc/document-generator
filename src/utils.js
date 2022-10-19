export const DEFAULT_OBJECT = {
  parsed: null,
  author: '',
  date: '',
  version: '',
};

export const LINKED_IN = 'https://www.linkedin.com/in/jrmcc/';

/**
 * Function used to watch for Enter key to submit form.
 * @author John Robert McCann
 * @since  10/17/2022
 * @param  {Event}     e        The HTML event of the user.
 * @param  {Function}  callBack The function to fire on accessible key press.
 * @param  {string}    key      The key designation.
 */
export function accessibleKey(e, callBack, key = 'Enter') {
  debugger;
  if (e.key === key) {
    callBack();
  }
}
