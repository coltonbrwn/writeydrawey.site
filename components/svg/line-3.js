const svg = p => `
<svg width="444" height="8" viewBox="0 0 444 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.22656 1.92775C38.3481 1.92773 79.3385 4.19328 116.953 4.81192C140.593 5.20072 164.068 4.28275 187.79 4.28275C209.191 4.28275 230.613 5.46025 251.935 5.46025C315.491 5.46025 378.855 6.63775 442.349 6.63775" stroke="black" stroke-width="0.03rem" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
  