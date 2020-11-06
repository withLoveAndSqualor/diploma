export class SearchedWordTitles {

  constructor(title, amountSpan, mentioningsSpan, monthSpan) {
    this.title = title;
    this.amountSpan = amountSpan;
    this.mentioningsSpan = mentioningsSpan;
    this.monthSpan = monthSpan;
    this.date = new Date();
  }

  _countMentionings(newsArray, word) {
    const titlesArray = [];
    newsArray.forEach(function (item) {
      titlesArray.push(item.title);
      return titlesArray;
    });
    let count = 0;
    titlesArray.forEach(function (item) {
      const regExp = new RegExp(`${word}`, 'i');
      if (regExp.test(item)) {
        count = count + 1;
      }
    })
    return count;
  }

  _getMonth(now) {
    const dateCopy = new Date(now);
    dateCopy.setDate(now.getDate() - 7);
    const monthNumber = dateCopy.getMonth();
    const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    return months[monthNumber];
  }

  renderData(word, newsArray) {
    this.title.textContent = `Вы спросили: «${word}»`;
    this.amountSpan.textContent = newsArray.length;
    this.mentioningsSpan.textContent = this._countMentionings(newsArray, word);
    this.monthSpan.textContent = this._getMonth(this.date);

  }

}
