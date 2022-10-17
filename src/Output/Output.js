import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Output.module.scss';
import {
  createJSDocs,
  createPropTypes,
  DEFAULT_PARSED_VALUE,
} from './Output.utils';

/**
 * Renders the Output from the given props.
 *
 * @author  John Robert McCann
 * @since   10/14/2022
 * @version 1.0.0
 * @param   {object}   props           The component destructured as props.
 * @param   {string}   props.object    The object stringified to parse into JSDocs and PropDocs.
 * @param   {Element}  props.docRef    The ref to attach to the JSDoc textarea.
 * @param   {Element}  props.propRef   The ref to attach to the propType textarea.
 * @return  {Element}                  The Output component.
 */
export default function Output({ object, docRef, propRef }) {
  const { author = null, parsed = null, version = null, date = null } = object;
  const [parsedValue, setParsedValue] = useState(DEFAULT_PARSED_VALUE);

  useEffect(() => {
    if (parsed) {
      setParsedValue({
        propType: createPropTypes(parsed),
        jsDoc: createJSDocs(parsed, author, date, version),
      });
    }
  }, [parsed]);

  return (
    <section className={styles.outputWrap}>
      <textarea
        placeholder="PropTypes"
        value={parsedValue?.propType}
        className={styles.propTypes}
        onChange={(e) =>
          setParsedValue((prev) => ({ ...prev, propType: e.target.value }))
        }
        ref={propRef}
        id="propType"
      />
      <textarea
        placeholder="JSDocs"
        value={parsedValue?.jsDoc}
        className={styles.jsDoc}
        onChange={(e) =>
          setParsedValue((prev) => ({ ...prev, jsDoc: e.target.value }))
        }
        ref={docRef}
        id="jsDoc"
      />
    </section>
  );
}
Output.propTypes = {
  object: PropTypes.object,
};
