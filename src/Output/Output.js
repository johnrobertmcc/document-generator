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
 * @param   {object}   props.refMap    An map containing appropriate refs.
 * @param   {Function} props.clickRef  Functioned used to copy contents of the ref to the clipboard.
 * @return  {Element}                  The Output component.
 */
export default function Output({ object, refMap, clickRef }) {
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
      {Object.keys(refMap).map((ref, i) => {
        return (
          <div className={styles.textWrapper}>
            <textarea
              key={i}
              value={parsedValue[ref]}
              className={styles[ref]}
              onChange={(e) =>
                setParsedValue((prev) => ({ ...prev, [ref]: e.target.value }))
              }
              ref={refMap[ref]}
              id={ref}
              placeholder={ref}
            />
            {parsedValue[ref] && (
              <button onClick={() => clickRef(ref)}>Copy</button>
            )}
          </div>
        );
      })}
    </section>
  );
}
Output.propTypes = {
  object: PropTypes.object,
};
