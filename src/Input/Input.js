import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import styles from './Input.module.scss';
import JSON5 from 'json5';
import { AVAILABLE_INPUTS, HEADER, INSTRUCTIONS } from './Input.utils';

/**
 * Allows the user to input their object as plain text and set it to the state.
 *
 * @author  John Robert McCann
 * @since   10/14/2022
 * @version 1.0.0
 * @param   {object}   props           The component destructured as props.
 * @param   {Function} props.setObject Function usd to set the object with appropriate params.
 * @param   {object}   props.object    The parameters of the input.
 * @return  {Element}                  The Input component.
 */
export default function Input({ setObject, object }) {
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

  /**
   * Function used to handle the changes of the optional inputs.
   *
   * @param {Event} e The event details.
   */
  function handleChange(e) {
    e.preventDefault();

    setObject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      <div className={styles.information}>
        <h2>{HEADER}</h2>
        <p>{INSTRUCTIONS}</p>
        <ul className={styles.optional}>
          {AVAILABLE_INPUTS.map((input, i) => (
            <li>
              <input {...input} key={i} onChange={(e) => handleChange(e)} />
            </li>
          ))}
          <button onClick={handleSubmit} className={styles.submit}>
            Submit
          </button>
        </ul>
      </div>
    </section>
  );
}

Input.propTypes = {
  onSubmit: PropTypes.func,
};
