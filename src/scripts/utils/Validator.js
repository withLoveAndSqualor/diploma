export class Validator {

  constructor(input) {
    this.input = input;
  }

  checkInputValidity = () => {
    if (this.input.validity.valid) {
      this.input.setCustomValidity('');
      this.input.reportValidity();
      return true;
    } else {
      this.input.setCustomValidity('Нужно ввести ключевое слово');
      this.input.reportValidity();
      return false;
    }
  }

}
