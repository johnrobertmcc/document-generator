import { useState, useEffect, useRef } from 'react';
import Input from './Input';
import Output from './Output/Output';
import { DEFAULT_OBJECT } from './utils';

/**
 * A React.Component used to help developers document their fucking code.
 *
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
   */
  function clickRef(ref) {
    navigator.clipboard.writeText(refMap[ref].current.value);
  }

  return (
    <>
      {/* <nav>test</nav> */}
      <main>
        <Input setObject={setObject} object={object} />
        <Output object={object} refMap={refMap} clickRef={clickRef} />
      </main>
    </>
  );
}

export default App;
