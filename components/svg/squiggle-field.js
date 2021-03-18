const svg = p => `
  <svg width="1574" height="435" viewBox="0 0 1574 435" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M-123.697 191.571C-53.5788 111.637 52.5736 79.0636 156.48 77.7483C189.876 77.3256 214.239 80.53 245.181 93.1004C280.975 107.642 312.458 128.331 350.453 138.182C458.916 166.302 570.262 162.63 677.476 129.409C726.353 114.264 773.172 96.0979 824.173 88.9577C864.925 83.2525 912.639 75.3854 952.107 90.6635C977.909 100.651 1001.13 115.905 1026.92 125.998C1053.3 136.321 1078.63 134.77 1106.6 134.77C1173.78 134.77 1229.29 95.0295 1287.17 65.5641C1366.66 25.0975 1448.55 9.92126 1537.19 4.15587C1577.41 1.53995 1636.47 -5.5546 1672.44 16.34C1692.89 28.7885 1713.31 45.7648 1730.19 62.6399C1767.72 100.171 1778.75 116.045 1775.76 169.861C1774.05 200.583 1759.28 243.921 1737.01 265.872C1688.97 313.228 1608.57 312.635 1545.23 316.558C1424.95 324.009 1304.7 317.508 1184.34 326.793C1011.29 340.141 841.996 372.155 670.653 397.948C547.021 416.56 423.056 432.413 297.817 433.039C230.947 433.373 157.963 441.944 93.6101 419.88C53.588 406.158 12.4542 380.994 -24.5764 360.421C-64.2932 338.356 -102.166 312.534 -137.402 283.905C-167.016 259.843 -202.222 254.132 -202.222 211.531C-202.222 189.483 -178.959 161.088 -156.165 161.088C-137.575 161.088 -138.023 183.956 -123.697 191.571Z" fill="#FAFAFA"/>
  </svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
