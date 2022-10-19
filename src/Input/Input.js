import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Input.module.scss';
import JSON5 from 'json5';
import cn from 'classnames';
import {
  AVAILABLE_INPUTS,
  HEADER,
  INSTRUCTIONS_FULL,
  INSTRUCTIONS_HALF,
  SUBMIT_BTN,
  DEFAULT_VALUE,
  ERROR,
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
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  /**
   * Function used to set the object to state's value and parse it using JSON5 library.
   *
   * @author  John Robert McCann
   * @since   10/17/2022
   * @param {Event} e The HTML event.
   */
  function handleSubmit(e) {
    e.preventDefault();

    let parsed = null;
    try {
      parsed = JSON5.parse(value);
      setError(false);
    } catch (e) {
      setValue('');
      setError(true);
      console.error(e, ERROR);
    }
    if (parsed) {
      setObject((prev) => ({ ...prev, parsed }));
    }
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
        className={cn(error && styles.error)}
        id="textArea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={DEFAULT_VALUE}
        autoFocus
        onKeyPress={(e) => accessibleKey(e, () => handleSubmit(e), 'Enter')}
      />
      <div className={styles.information}>
        <span>
          <button onClick={(e) => handleSubmit(e)} className={styles.submit}>
            {SUBMIT_BTN}
          </button>
          <a target="_blank" rel="noreferrer" href={LINKED_IN}>
            {HEADER}
          </a>
        </span>
        <p className={styles.fullScreen}>{INSTRUCTIONS_FULL}</p>
        <p className={styles.halfScreen}>{INSTRUCTIONS_HALF}</p>
        <ul className={styles.optional}>
          {AVAILABLE_INPUTS.map((input, i) => (
            <li key={i}>
              <input {...input} key={i} onChange={(e) => handleChange(e)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

Input.propTypes = {
  setObject: PropTypes.func,
};
