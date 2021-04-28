const svg = p => `
  <svg viewBox="0 0 516 361" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.178 13.8968C54.4606 13.8968 93.1636 13.8538 132.167 16.4583C161.504 18.4172 190.813 20.5317 220.478 20.8679C230.077 20.9767 240.184 21.2387 249.708 20.5437C257.561 19.9705 265.115 18.7881 273.01 18.274C292.143 17.028 311.632 16.8149 330.918 16.8149C366.853 16.8149 396.609 13.7614 432.339 13.897C453.374 13.9767 481.662 17.0657 501.874 13.897" stroke="var(--black-ln)" stroke-width="27" stroke-miterlimit="0" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.178 181.349C128.66 181.349 242.396 183.231 355.68 178.3C387.357 176.921 418.275 178.051 449.571 181.822C463.656 183.519 479.252 185.134 493.536 185.134" stroke="var(--black-ln)" stroke-width="27" stroke-miterlimit="0" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M494.798 341.881C419.666 341.881 344.171 341.556 269.223 343.504C241.348 344.228 213.518 345.074 185.71 346.096C165.745 346.829 143.436 347.868 123.443 346.855C111.33 346.241 100.641 344.212 88.2431 343.87C73.848 343.474 59.6304 344.157 45.3297 344.682C34.8152 345.068 24.4583 345.179 13.916 345.179" stroke="var(--black-ln)" stroke-width="27" stroke-miterlimit="0" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
  