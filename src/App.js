import { useState, useRef, useEffect } from 'react';
import Input from './Input';
import Output from './Output/Output';
import { DEFAULT_OBJECT } from './utils';
import styles from './App.module.css';

/**
 * A super simple web app used to help developers document their fucking code.
 *
 * @author  John Robert McCann
 * @since   10/17/2022
 * @returns {Element}  Returns the element as app,defaulted as layout.
 */
function App() {
  const [object, setObject] = useState(DEFAULT_OBJECT);
  const propRef = useRef(null);
  const docRef = useRef(null);
  const refMap = {
    propType: propRef,
    jsDoc: docRef,
  };

  /**
   * Function used to copy a certain ref's text to the clipboard.
   * @author  John Robert McCann
   * @since   10/17/2022
   */
  function clickRef(ref) {
    navigator.clipboard.writeText(refMap[ref].current.value);
  }

  return (
    <main className={styles.theme}>
      <Input setObject={setObject} object={object} />
      <Output
        setObject={setObject}
        object={object}
        refMap={refMap}
        clickRef={clickRef}
      />
    </main>
  );
}

export default App;
