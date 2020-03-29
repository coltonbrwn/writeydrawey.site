import { get } from 'dotty';
export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';

export const BASE_URL = 'https://epaz1vuglh.execute-api.us-east-1.amazonaws.com/dev'

export const COLORS = {
  [THEME_LIGHT]: {
    stroke: '#444',
    background: '#FDFDFD',
    backgroundAlt: '#F9F9F9',
    trackbar: "#CACACA",
    white: "#FFF",
    black: "#444"
  },
  [THEME_DARK]: {
    stroke: '#FFF',
    background: "#2B2B2B",
    backgroundAlt: "#2F2F2F",
    trackbar: "#3C3C3C",
    white: "#FFF",
    black: "#444"
  }
}
