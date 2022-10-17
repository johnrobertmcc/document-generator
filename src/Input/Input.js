import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import styles from './Input.module.scss';
import JSON5 from 'json5';

/**
 * Allows the user to input their object as plain text and set it to the state.
 *
 * @author  John Robert McCann
 * @since   10/14/2022
 * @version 1.0.0
 * @param   {object}  props           The component destructured as props.
 * @param   {string}  props.component The name of the component.
 * @return  {Element}                 The Input component.
 */
export default function Input({ setObject, clickRef }) {
  const [value, setValue] = useState('');
  const inputRef = useRef();

  /**
   * Function used to watch for Enter key to submit form.
   *
   * @param {Event} e  The HTML event of the user.
   */
  function accessibleKey(e) {
    if (value && e.key === 'Enter') {
      handleSubmit();
    }
  }

  /**
   * Function used to set the object to state's value and parse it using JSON5 library.
   */
  function handleSubmit() {
    setObject((prev) => ({ ...prev, parsed: JSON5.parse(value) }));
  }

  return (
    <section className={styles.inputWrap}>
      <textarea
        ref={inputRef}
        id="textArea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste props here"
        autoFocus
        onKeyPress={(e) => accessibleKey(e)}
      />
      <div>
        <input
          type="text"
          // value={}
          placeholder="Author"
        />
        <button onClick={() => clickRef('prop')}>Copy propTypes</button>
        <button onClick={() => clickRef('js')}>Copy jsDoc </button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </section>
  );
}

Input.propTypes = {
  onSubmit: PropTypes.func,
};
