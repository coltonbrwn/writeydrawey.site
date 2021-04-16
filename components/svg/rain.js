import React from 'react';

const svg = p => `
  <svg width="208" height="340" viewBox="0 0 208 375" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.8138 1.04431C16.7656 6.41633 16.3978 8.27435 13.4458 11.9643C12.2108 13.5081 10.6549 14.881 10.5338 17.0603C10.312 21.0528 9.8068 25.7963 14.9018 25.7963C22.3956 25.7963 11.6373 7.04456 17.8138 3.95631" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M92.8817 75.5607C92.8817 79.7386 94.9474 88.7643 89.9697 91.2532C87.7583 92.3589 86.1831 92.6701 84.4693 94.8123C81.1206 98.9981 87.2386 105.904 91.4257 106.137C98.106 106.508 100.99 98.8995 98.3822 93.0327C96.3364 88.4298 94.3377 73.4356 94.3377 78.4727" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M121.219 7.87567C121.219 12.0535 123.284 21.0793 118.307 23.5681C116.095 24.6738 114.52 24.985 112.806 27.1272C109.458 31.313 115.576 38.219 119.763 38.4517C126.443 38.8228 129.327 31.2144 126.719 25.3477C124.673 20.7447 122.675 5.75058 122.675 10.7877" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M183.798 14.1483C183.798 18.7634 184.788 24.4625 182.665 28.7083C181.06 31.9186 178.329 34.0958 176.841 37.4443C174.065 43.6915 176.734 49.0923 183.07 49.0923C188.654 49.0923 187.767 38.581 184.526 35.9883C182.032 33.9935 183.798 21.7673 183.798 18.5163" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M172.435 100.052C172.435 104.667 173.426 110.366 171.303 114.612C169.698 117.823 166.967 120 165.479 123.348C162.702 129.595 165.372 134.996 171.707 134.996C177.291 134.996 176.404 124.485 173.163 121.892C170.67 119.897 172.435 107.671 172.435 104.42" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.58474 277.56C9.58474 282.175 10.5752 287.874 8.4523 292.12C6.84715 295.33 4.11653 297.507 2.6283 300.856C-0.148226 307.103 2.52136 312.504 8.85674 312.504C14.4409 312.504 13.5536 301.993 10.3127 299.4C7.81918 297.405 9.58474 285.179 9.58474 281.928" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M142.852 187.001C142.852 194.631 146.378 204.874 144.228 212.4C142.312 219.104 137.49 224.857 147.948 224.857C157.996 224.857 141.396 197.654 141.396 192.825" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.9892 100.052C11.8635 105.331 -1.15807 135.209 16.3572 125.937C22.4032 122.736 13.4452 104.811 13.4452 100.052" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200.494 272.924C200.368 278.202 187.347 308.081 204.862 298.808C210.908 295.607 201.95 277.683 201.95 272.924" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M42.3888 201.561C42.3888 206.521 42.1787 209.94 41.0137 214.018C39.9964 217.578 37.3512 220.168 36.6457 224.048C35.6777 229.372 35.9335 236.564 43.1168 234.968C49.2645 233.602 46.5711 223.169 44.1684 220.165C40.8803 216.055 43.9037 208.929 40.9328 204.473" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M112.034 261C112.034 270.073 112.924 279.663 110.254 288.34C108.159 295.15 101.842 300.132 101.842 307.592C101.842 314.141 112.034 314.141 112.034 307.592C112.034 301.367 109.122 296.676 109.122 290.12" stroke="var(--black-ln)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
  