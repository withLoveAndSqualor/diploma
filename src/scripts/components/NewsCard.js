export class NewsCard {
  static markup = `
  <a href="" class="link" target="_blank">
    <div class="search-results__item">
      <img src="" alt="Фото новости" class="search-results__photo">
      <div class="search-results__text-container">
        <p class="search-results__data"></p>
        <h3 class="search-results__title"></h3>
        <p class="search-results__text"></p>
        <p class="search-results__origin"></p>
      </div>
    </div>
  </a>`

  constructor (data) {
    this.data = data;
  }

  _formateDate (){
    const date = new Date(this.data.publishedAt);
    const day = date.getDate();
    const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декарь'];
    const monthsNumner = date.getMonth();
    const month = months[monthsNumner];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`
  }

  create () {
    const element = document.createElement('div');
    const formatedDate = this._formateDate();
    element.insertAdjacentHTML('beforeend', NewsCard.markup);
    element.querySelector('.search-results__photo').src = `${this.data.urlToImage}`;
    element.querySelector('.link').href = `${this.data.url}`;
    element.querySelector('.search-results__data').textContent = formatedDate;
    element.querySelector('.search-results__title').textContent = this.data.title;
    element.querySelector('.search-results__text').textContent = this.data.description;
    element.querySelector('.search-results__origin').textContent = this.data.source.name;


    this.card = element.firstElementChild;
    return this.card;
  }

}
