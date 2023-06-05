import IPosition from '../utils/Position';

class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('food')!;
  }

  get position(): IPosition {
    return {
      x: this.element.offsetLeft,
      y: this.element.offsetTop
    };
  }

  private set position(value: IPosition) {
    const { x, y } = value;
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
  }

  changePosition() {
    this.position = {
      x: Math.floor(Math.random() * 30) * 10,
      y: Math.floor(Math.random() * 30) * 10
    };
  }
}

export default Food;
