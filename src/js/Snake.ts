import IPosition from '../utils/Position';

class Snake {
  head: HTMLElement; // 蛇的头部
  body: HTMLCollection; // 蛇的身体部位
  snake: HTMLElement; // 蛇的整体容器

  constructor() {
    this.snake = document.querySelector('#snake')!;
    this.head = document.getElementById('snakeHead')!;
    this.body = this.snake.children;
    // document.querySelectorAll('#snake > div');
    // 返回的是NodeListOf<Element>，返回的是静态的节点类数组
    // document.getElementById('snake')!.getElementsByTagName('div');
    // HTMLCollection的获取同样可以使用上面这种方式
  }


  get position(): IPosition {
    return {
      x: this.head.offsetLeft,
      y: this.head.offsetTop
    };
  }

  // 设置蛇头坐标
  set position(value: IPosition) {
    const { x, y } = value;
    const { x: X, y: Y } = this.position;
    this.moveBody();
    if (x !== X) {
      this.head.style.left = x + 'px';
    }
    if (y !== Y) {
      this.head.style.top = y + 'px';
    }
  }

  // 蛇增加身体
  grow(): void {
    this.snake.insertAdjacentHTML('beforeend', '<div></div>');
  }

  // 移动身体
  moveBody(): void {
    for (let i = this.body.length - 1; i > 0; i--) {
      const x = (this.body[i - 1] as HTMLElement).offsetLeft;
      const y = (this.body[i - 1] as HTMLElement).offsetTop;
      (this.body[i] as HTMLElement).style.left = x + 'px';
      (this.body[i] as HTMLElement).style.top = y + 'px';
    }
  }

  // 判断蛇头是否撞到身体
  isHeadCollideBody(nextPosition: IPosition): boolean {
    return Array.from(this.body).some(value => {
      const x = (value as HTMLElement).offsetLeft;
      const y = (value as HTMLElement).offsetTop;
      const { x: X, y: Y } = nextPosition;
      return x === X && y === Y;
    });
  }
}

export default Snake;
