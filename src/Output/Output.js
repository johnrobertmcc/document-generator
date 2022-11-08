import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Output.module.scss';
import {
  createJSDocs,
  createPropTypes,
  COPY,
  DEFAULT_PARSED_VALUE,
} from './Output.utils';
import CopyIcon from '../CopyIcon/CopyIcon';

/**
 * Renders the Output from the given props.
 *
 * @author  John Robert McCann
 * @since   10/14/2022
 * @version 1.0.0
 * @param   {object}   props           The component destructured as props.
 * @param   {string}   props.object    The object stringified to parse into JSDocs and PropDocs.
 * @param   {object}   props.refMap    An map containing appropriate refs.
 * @param   {Function} props.clickRef  Function used to copy contents of the ref to the clipboard.
 * @return  {Element}                  The Output component.
 */
export default function Output({ object, refMap, clickRef }) {
  const [parsedValue, setParsedValue] = useState(DEFAULT_PARSED_VALUE);
  const [values, setValues] = useState(object);

  useEffect(() => {
    if (object) {
      setValues(object);
    }
  }, [object]);

  useEffect(() => {
    const {
      author = null,
      parsed = null,
      version = null,
      date = null,
    } = values;

    if (!!parsed) {
      setParsedValue({
        propType: createPropTypes(parsed),
        jsDoc: createJSDocs(parsed, author, date, version),
      });
    } else {
      setParsedValue(DEFAULT_PARSED_VALUE);
    }
  }, [values]);

  return (
    <section className={styles.outputWrap}>
      {Object.keys(refMap).map((ref, i) => {
        return (
          <div className={styles.textWrapper} key={i}>
            <textarea
              value={parsedValue[ref]}
              className={styles[ref]}
              onChange={(e) =>
                setParsedValue((prev) => ({ ...prev, [ref]: e.target.value }))
              }
              ref={refMap[ref]}
              id={ref}
              placeholder={`${ref} will populate here`}
            />
            {parsedValue[ref] && (
              <button
                className={styles.copyBtn}
                onClick={() => clickRef(ref)}
                aria-label={COPY}
              >
                {<CopyIcon />}
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
}

Function.propTypes = {
  object: PropTypes.shape({
    parsed: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
    author: PropTypes.string,
    date: PropTypes.string,
    version: PropTypes.string,
  }),
  refMap: PropTypes.shape({
    propType: PropTypes.object,
    jsDoc: PropTypes.object,
  }),
  clickRef: PropTypes.func,
};
