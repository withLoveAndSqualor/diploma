export class NewsList  {
  constructor (section, container, newsCardFill, moreResultsButton) {
    this.section = section;
    this.container = container;
    this.newsCardFill = newsCardFill;
    this.moreResultsButton = moreResultsButton;
    this.counter = 0;
  }

  addCard (item){
    const card = this.newsCardFill(item);
    this.container.append(card);
    this.section.style.display = 'flex';
    this.moreResultsButton.style.display = 'block';
  }

  render(newsArray) {
    const newsToRender = newsArray.slice(this.counter, this.counter + 3);
    newsToRender.forEach(item => this.addCard(item));
    this.counter = this.counter + 3;
    console.log(this.counter);
    if (this.counter >= newsArray.length) {
      this.moreResultsButton.style.display = 'none';
      this.counter = 0;
    }
    return this.counter;
  }
};
