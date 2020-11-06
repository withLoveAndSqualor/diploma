export class CommitCard {
  static markup = `
  <div class="swiper-slide">
  <a href="" class="commits__card-link link">
    <div class="commits__card">
      <p class="commits__date"></p>
      <div class="commits__author-container">
        <img src="" alt="Аватарка автора коммита" class="commits__author-ava">
        <div class="commits__author-info">
          <p class="commits__author-name"></p>
          <p class="commits__author-email"></p>
        </div>
      </div>
      <p class="commits__commit-description"></p>
    </div>
  </a>
  </div>`

  constructor (data) {
    this.data = data;
  }

  _formateDate (){
    const date = new Date(this.data.commit.committer.date);
    const day = date.getDate();
    const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декарь'];
    const monthsNumner = date.getMonth();
    const month = months[monthsNumner];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`
  }

  create () {
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', CommitCard.markup);

    element.querySelector('.commits__author-ava').src = `${this.data.author.avatar_url}`;
    element.querySelector('.commits__card-link').href = `${this.data.commit.url}`;
    element.querySelector('.commits__date').textContent = this._formateDate();
    element.querySelector('.commits__author-email').textContent = this.data.commit.committer.email;
    element.querySelector('.commits__commit-description').textContent = this.data.commit.message;
    element.querySelector('.commits__author-name').textContent = this.data.commit.committer.name;


    this.card = element.firstElementChild;
    this.card.classList.add('swiper-slide');
    return this.card;
  }

}
