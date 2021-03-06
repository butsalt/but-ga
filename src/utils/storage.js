const localStorage = global.localStorage;

export default {
  get(key) {
    return localStorage.getItem(key);
  },
  set(key, val) {
    localStorage.setItem(key, val);
  }
};