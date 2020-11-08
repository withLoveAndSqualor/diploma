export class LocalStorage {
  constructor () {
  }

  saveToLS (data, name) {
    localStorage.setItem(`${name}`, JSON.stringify(data))
  }

  getFromLS (name) {
    const raw = localStorage.getItem(`${name}`);
    const data = JSON.parse(raw);
    return data;
  }

  clear () {
    localStorage.clear();
  }
}
