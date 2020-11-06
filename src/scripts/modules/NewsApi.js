export class NewsApi {
  static apiKey = '97c321c4349f428aba6f530071cac80f';
  constructor () {
    this.date = new Date();
    this.today = this._getToday(this.date);
    this.weekAgo = this._getWeekAgo(this.date);
  }

  _getToday(now) {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return  `${year}-${month}-${day}`;
  }

  _getWeekAgo(now){
    const dateCopy = new Date(now);
    dateCopy.setDate(now.getDate() - 7);
    const year = dateCopy.getFullYear();
    const month = dateCopy.getMonth() + 1;
    const day = dateCopy.getDate();
    return  `${year}-${month}-${day}`;
  };

  getNews(searchedWord) {
    return fetch(`https://newsapi.org/v2/everything?language=ru&q=${searchedWord}&from=${this.weekAgo}&to=${this.today}`, {
      method: 'GET',
      headers: {
        authorization: `${NewsApi.apiKey}`
      }
    })
    .then ((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    })

  }

}
