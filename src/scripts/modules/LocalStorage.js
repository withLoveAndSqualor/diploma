export class LocalStorage {
  constructor () {
  }

  saveNewsToLS (news) {
    localStorage.setItem(`news`, JSON.stringify(news))
  }

  getNewsFromLS () {
    const raw = localStorage.getItem('news');
    const news = JSON.parse(raw);
    return news;
  }

  clear () {
    localStorage.clear();
  }
}
