export class OneDayRow {
  static markup = `
  <div class="analytics__day ">
    <div class="analytics__day-date analytics__data-title"></div>
    <div class="analytics__day-scale"><span class="analytics__day-amount">0</span></div>
  </div>`

  constructor (data) {
    this.data = data;
    this.date = new Date (this.data[0].publishedAt);
  }

  _getDate () {
    return this.date.getDate();
  }

  _getDayOfWeek () {
    const day = this.date.getDay();
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return days[day];
  }

  create () {
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', OneDayRow.markup);

    const date = this._getDate();
    const dayOfWeek = this._getDayOfWeek();

    element.querySelector('.analytics__day-date').textContent = `${date}, ${dayOfWeek}`;
    console.log(element.querySelector('.analytics__day-amount'));
    element.querySelector('.analytics__day-amount').textContent = `${this.data.length}`;
    element.querySelector('.analytics__day-scale').style.background = `linear-gradient(to right, #2F71E5 ${this.data.length}%, transparent ${this.data.length}% 100%)`;


    this.day = element.firstElementChild;
    return this.day;
  }

}
