const svg = p => `
  <svg width="129" height="104" viewBox="0 0 129 104" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.21472 4.59814C36.0399 29.9671 69.9044 55.3111 103.696 80.655C112.663 87.3797 118.339 96.3564 127.383 102.386" stroke="var(--black-ln)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M108.512 1.79004C92.4324 21.3657 73.2635 37.3545 56.0537 55.8881C47.5611 65.034 37.0959 71.3148 28.3341 79.8819C23.7214 84.3922 17.4231 89.9594 13.8782 95.3811C12.4308 97.5946 12.9411 101.215 10.5995 102.386" stroke="var(--black-ln)"  stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const Cross = props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
  
export default Cross