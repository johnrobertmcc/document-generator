import PropTypes from 'prop-types';

/**
 * Renders the CopyIcon as an SVG.
 *
 * @author  John Robert McCann
 * @since   10/18/2022
 * @version 1.0.0
 * @param   {string}  fill The fill color of the svg.
 * @return  {Element}      The CopyIcon component.
 */
export default function CopyIcon({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="25px"
      width="30px"
      viewBox="0 0 512 512"
      fill={fill}
    >
      <path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z" />
    </svg>
  );
}
CopyIcon.propTypes = {
  fill: PropTypes.string,
};
CopyIcon.defaultProps = {
  fill: '#000',
};
