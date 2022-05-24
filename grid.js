export class Grid {
  constructor(size) {
    this.size = size;
  }

  getRandomPosition() {
    return {
      x: Math.floor(Math.random() * this.size) + 1,
      y: Math.floor(Math.random() * this.size) + 1,
    };
  }

  isOutside(position) {
    return (
      position.x < 1 ||
      position.y < 1 ||
      position.x > this.size ||
      position.y > this.size
    );
  }
}
