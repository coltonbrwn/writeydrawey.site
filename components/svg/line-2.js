const svg = p => `
<svg width="456" height="8" viewBox="0 0 456 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.53223 4.10012C43.8486 4.10012 85.7213 1.74512 128.066 1.74512C167.561 1.74512 207.151 5.27763 246.663 5.27763C316.055 5.27763 385.019 6.45513 454.498 6.45513" stroke="black" stroke-width="0.03rem" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
