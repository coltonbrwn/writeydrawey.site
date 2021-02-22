import React from 'react';

const svg = p => `

`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
  