export default function getSystemInfo() {
  return {
    sr: global.screen.width + 'x' + window.screen.height,
    sd: global.screen.colorDepth + '-bits',
    ul: navigator.language
  }
}