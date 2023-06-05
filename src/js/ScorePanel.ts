class ScorePanel {
  private _score: number = 0;
  private _level: number = 1;
  private readonly upgradeInterval: number = 10;
  private readonly maxLevel: number = 10;
  scoreElement: HTMLElement;
  levelElement: HTMLElement;

  constructor(upgradeInterval: number, maxLevel: number) {
    this.scoreElement = document.getElementById('score')!;
    this.levelElement = document.getElementById('level')!;
    this.upgradeInterval = upgradeInterval;
    this.maxLevel = maxLevel;
  }

  addScore(): void {
    this._score++;
    this.scoreElement.innerText = this._score.toString();
    // 到达一定分数后要升级等级
    if (this._score % this.upgradeInterval === 0) {
      this.addLevel();
    }
  }

  private addLevel(): void {
    // 到达最大等级之后不再升级
    if (this._level === this.maxLevel) return;
    this._level++;
    this.levelElement.innerText = this._level.toString();
  }

  get score(): number {
    return this._score;
  }

  get level(): number {
    return this._level;
  }
}


export default ScorePanel;
