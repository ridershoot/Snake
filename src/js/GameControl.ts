import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';
import IPosition from '../utils/Position';

// ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Up', 'Down', 'Left', 'Right']
// 方向
type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Up' | 'Down' | 'Left' | 'Right'
const direction = {
  'ArrowUp': { x: 0, y: -1, turnAround: ['ArrowDown', 'Down'] },
  'Up': { x: 0, y: -1, turnAround: ['ArrowDown', 'Down'] },
  'ArrowDown': { x: 0, y: 1, turnAround: ['ArrowUp', 'Up'] },
  'Down': { x: 0, y: 1, turnAround: ['ArrowUp', 'Up'] },
  'ArrowLeft': { x: -1, y: 0, turnAround: ['ArrowRight', 'Right'] },
  'Left': { x: -1, y: 0, turnAround: ['ArrowRight', 'Right'] },
  'ArrowRight': { x: 1, y: 0, turnAround: ['ArrowLeft', 'Left'] },
  'Right': { x: 1, y: 0, turnAround: ['ArrowLeft', 'Left'] }
};

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = '';
  runTimer: number = NaN;
  isAlive: boolean = true; // 游戏是否结束

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 10);
    // 实例化的同时进行初始化
    this.init();
  }

  init(): void {
    document.querySelector('body')!.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  keydownHandler(event: KeyboardEvent): void {
    if (!Object.keys(direction).some(value => value === event.key)) return;
    if (this.direction === event.key) return;
    const canChangeDirection = this.direction && this.snake.body.length > 1 && this.isTurnAround((this.direction as Direction), (event.key as Direction));
    if (canChangeDirection) return;
    this.direction = event.key;
  }

  // 蛇移动的方法
  run(): void {
    !Number.isNaN(this.runTimer) && clearTimeout(this.runTimer);
    if (direction.hasOwnProperty(this.direction)) {
      let { x: X, y: Y } = this.snake.position;
      const { x, y } = direction[(this.direction as Direction)];
      const nextX = X + x * 10;
      const nextY = Y + y * 10;
      // 吃到食物，要增加蛇的身体，要变化食物的位置，分数要变化
      if (this.isEatFood({ x: nextX, y: nextY })) {
        this.snake.grow();
        this.food.changePosition();
        this.scorePanel.addScore();
      }
      // 检验蛇是否撞墙 || 蛇是否撞到自己
      if (this.isHitWall({ x: nextX, y: nextY }) || this.snake.isHeadCollideBody({ x: nextX, y: nextY })) {
        this.isAlive = false; // 终止游戏
        console.log('Game Over');
      } else {
        // 修改蛇头位置
        this.snake.position = {
          x: nextX, y: nextY
        };
      }
    }
    if (this.isAlive) {
      this.runTimer = setTimeout(() => {
        this.run();
      }, 300 - (this.scorePanel.level - 1) * 30);
    }
  }

  // 判断蛇是否撞墙
  isHitWall(value: IPosition): boolean {
    const { x, y } = value;
    return (y < 0 || y > 290) || (x < 0 || x > 290);
  }

  // 判断蛇是否吃到食物
  isEatFood(value: IPosition): boolean {
    const { x, y } = value;
    const { x: FoodX, y: FoodY } = this.food.position;
    return (x === FoodX) && (y === FoodY);
  }

  // 判断是否发生掉头
  isTurnAround(currentDirection: Direction, nextDirection: Direction): boolean {
    return direction[currentDirection].turnAround.some(value => value === nextDirection);
  }

}

export default GameControl;
