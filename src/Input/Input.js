import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Input.module.scss';
import JSON5 from 'json5';
import {
  AVAILABLE_INPUTS,
  HEADER,
  INSTRUCTIONS_FULL,
  INSTRUCTIONS_HALF,
  SUBMIT_BTN,
  DEFAULT_VALUE,
} from './Input.utils';
import { accessibleKey, LINKED_IN } from '../utils';

/**
 * Allows the user to input their object as plain text and set it to the state.
 *
 * @author  John Robert McCann
 * @since   10/14/2022
 * @version 1.0.0
 * @param   {object}   props           The component destructured as props.
 * @param   {Function} props.setObject Function useSd to set the object with appropriate params.
 * @return  {Element}                  The Input component.
 */
export default function Input({ setObject }) {
  const [value, setValue] = useState(DEFAULT_VALUE);

  debugger;

  /**
   * Function used to set the object to state's value and parse it using JSON5 library.
   *
   * @author  John Robert McCann
   * @since   10/17/2022
   */
  function handleSubmit(e) {
    e.preventDefault();
    setObject((prev) => ({ ...prev, parsed: JSON5.parse(value) }));
  }

  /**
   * Function used to handle the changes of the optional inputs.
   *
   * @author  John Robert McCann
   * @since   10/17/2022
   * @param {Event} e The event details.
   */
  function handleChange(e) {
    e.preventDefault();

    setObject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <section className={styles.inputWrap}>
      <textarea
        id="textArea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste props here"
        autoFocus
        onKeyPress={(e) => accessibleKey(e, value && handleSubmit(e))}
      />
      <div className={styles.information}>
        <a target="_blank" rel="noreferrer" href={LINKED_IN}>
          {HEADER}
        </a>
        <p className={styles.fullScreen}>{INSTRUCTIONS_FULL}</p>
        <p className={styles.halfScreen}>{INSTRUCTIONS_HALF}</p>
        <ul className={styles.optional}>
          {AVAILABLE_INPUTS.map((input, i) => (
            <li>
              <input {...input} key={i} onChange={(e) => handleChange(e)} />
            </li>
          ))}
          <button onClick={handleSubmit} className={styles.submit}>
            {SUBMIT_BTN}
          </button>
        </ul>
      </div>
    </section>
  );
}

Input.propTypes = {
  setObject: PropTypes.func,
};
