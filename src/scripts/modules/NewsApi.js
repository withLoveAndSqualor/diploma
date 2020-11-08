export class NewsApi {

  constructor (apiKey, errorSection) {
    this.apiKey = apiKey;
    this.errorSection = errorSection;
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
        authorization: `${this.apiKey}`
      }
    })
    .then ((res) => {
      if (!res.ok) {
        this.errorSection.style.display = 'flex';
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json();
      }
    })

  }

}
