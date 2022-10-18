export const PROPTYPES = 'prop';
export const JSDOC = 'js';
export const COPY = 'copy';

// PROPTYPES //
export const PROP_MAP = {
  object: 'PropTypes.object,',
  array: 'PropTypes.array,',
  number: 'PropTypes.number,',
  boolean: 'PropTypes.bool,',
  string: 'PropTypes.string,',
  shape: 'PropTypes.shape({',
  null: 'PropTypes.oneOf([null]),',
};

export const DEFAULT_PARSED_VALUE = { propType: '', jsDoc: '' };

export const PROPDOC_OPENING = ['Function.propTypes = {'];

export const PROPDOC_CLOSURE = ['};'];

export const CREATE_NESTED_OPENING = (level = 2) =>
  `${generateWhiteSpace(level)}`;

export const CREATE_NESTED_CLOSURE = (level = 2) =>
  `${generateWhiteSpace(level - 2)}}),`;

export const JSDOC_OPENING = ['/**', ' * Function used to ...', ' *'];

export const JSDOC_CLOSURE = [
  ` * @returns${generateWhiteSpace(1)}This is what the function returns.`,
  ' */',
];

/**
 * Function used to return a dynamic array of blank spaces.
 * @author  John Robert McCann
 * @since   10/17/2022
 * @param   {number} whitespace The whitespace to add based on length of element.
 * @returns {Array}             The number of whitespace to add.
 */
function generateWhiteSpace(whitespace) {
  return Array(whitespace).fill(' ').join('');
}

/**
 * Function used to create an object of proptype delcarations.
 *
 * @author John Robert McCann
 * @since  10/17/2022
 * @param  {object}   props   The props as an object.
 * @param  {Function} opening The opening line, defaulted to new propTypes.
 * @param  {Function} closure The closing brackets, defaulted to JSON closure.
 * @param  {number}   level   The amount of whitespace to add to signify nested levels.
 */
export function createPropTypes(
  props,
  opening = PROPDOC_OPENING,
  closure = PROPDOC_CLOSURE,
  level = 2
) {
  const fin = opening;

  Object.keys(props).forEach((prop) => {
    let x = typeof props?.[prop];
    let nested = null;

    if (x === 'object') {
      if (Array.isArray(props[prop])) {
        x = 'array';
      } else if (!props[prop]) {
        x = 'null';
      } else if (Object.values(props?.[prop]).length) {
        x = 'shape';
        const newLevel = level + 2;
        nested = createPropTypes(
          props[prop],
          [CREATE_NESTED_OPENING(newLevel)],
          [CREATE_NESTED_CLOSURE(newLevel)],
          level + 2
        );
      }
    }

    fin.push(`${generateWhiteSpace(level)}${prop}: ${PROP_MAP[x]}`);
    if (nested) {
      fin.push(`${generateWhiteSpace(level)}${[nested]}`);
    }
  });

  fin.push(...closure);
  return fin.join('\n');
}

/**
 * Function used to decode how much white space to add.
 *
 * @author  John Robert McCann
 * @since   10/17/2022
 * @param   {object} props The arguments as an object.
 * @returns {number}       Returns the longest length of the prop declarations.
 */
function findLongestLength(props) {
  let longest = 1;
  Object.values(props).forEach((prop) => {
    let x = typeof prop;

    if (Array.isArray(prop)) {
      x = 'array';
    }

    longest = longest < x.length ? x.length : longest;
  });

  return longest + 1;
}

// JSDOCS //

export const JSDOC_MAP = {
  date: '@since',
  param: '@param',
  author: '@author',
  version: '@version',
};

/**
 * Function used to create a string of jsDocs.
 *
 * @author John Robert McCann
 * @since 10/17/2022
 * @param {object}  props    The parsed arguments as an object.
 * @param {string}  author   The author information passed.
 * @param {string}  date     The date passed, defaulted to today.
 * @param {string}  version  The version of the React app.
 */
export function createJSDocs(props, author, date, version) {
  const fin = JSDOC_OPENING;

  if (author) {
    fin.push(generateOptionalJSDocLine('author', 2, author));
  }
  if (date) {
    fin.push(generateOptionalJSDocLine('date', 3, date));
  }
  if (version) {
    fin.push(generateOptionalJSDocLine('version', 1, version));
  }

  Object.keys(props).forEach((prop) => {
    let x = typeof props[prop];
    if (Array.isArray(props[prop])) {
      x = 'array';
    }

    fin.push(generateJSDocLine(x, prop, findLongestLength(prop)));
  });
  fin.push(...JSDOC_CLOSURE);
  return fin.join('\n');
}

/**
 * Function used to generate a single JSDoc line with appropriate spacing.
 *
 * @author  John Robert McCann
 * @since   10/17/2022
 * @param   {string} param       The type returned.
 * @param   {string} argument    The argument titled.
 * @param    *
{number} whitespace  The amount of whitespace to fill between param and arg.
 * @param   {string} description The description of the docline, i.e.: param, author, since.
 * @returns {string}             Returns a line of JSDocs.
 */
function generateJSDocLine(
  param,
  argument,
  whitespace = 1,
  description = 'param'
) {
  return ` * ${JSDOC_MAP[description]}${generateWhiteSpace(
    3
  )}{${param}}${generateWhiteSpace(whitespace - param.length)} ${argument}`;
}

/**
 * Function used to create an optional line inside of the JSDoc config.
 * Examples include:
 *   author
 *   since
 *   version
 *   ...etc.
 * All available examples descriped in JSDOC_MAP.
 *
 * @author  John Robert McCann
 * @since   10/17/2022
 * @param   {string} description The descriptor documentation.
 * @param   {number} whitespace  The amount of whitespace to apply.
 * @param   {string} param       The dynmaic param to apply.
 * @returns {string}             Returns a string in which the descriptor is displayed.
 */
function generateOptionalJSDocLine(description = null, whitespace = 3, param) {
  return ` * ${JSDOC_MAP[description]}${generateWhiteSpace(
    whitespace
  )}${param}`;
}
