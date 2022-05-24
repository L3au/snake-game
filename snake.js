export class Snake {
  segments = [];

  direction = {
    x: 0,
    y: 0,
  };

  init(position) {
    this.segments = [position];
  }

  moveUp() {
    if (this.direction.y !== 0) {
      return;
    }

    this.direction = {
      x: 0,
      y: -1,
    };
  }

  moveDown() {
    if (this.direction.y !== 0) {
      return;
    }

    this.direction = {
      x: 0,
      y: 1,
    };
  }

  moveLeft() {
    if (this.direction.x !== 0) {
      return;
    }

    this.direction = {
      x: -1,
      y: 0,
    };
  }

  moveRight() {
    if (this.direction.x !== 0) {
      return;
    }

    this.direction = {
      x: 1,
      y: 0,
    };
  }

  update() {
    const head = this.getHead();

    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
    };

    this.segments = this.segments.slice(0, -1);
    this.segments.unshift(newHead);
  }

  render(canvas) {
    this.segments.forEach((segment) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add("snake");
      snakeElement.append("🐍");
      canvas.appendChild(snakeElement);
    });
  }

  getHead() {
    return this.segments[0];
  }

  getTail() {
    return this.segments[this.segments.length - 1];
  }

  grow() {
    this.segments.push({ ...this.getTail() });
  }

  onHit(position) {
    const head = this.getHead();
    return head.x === position.x && head.y === position.y;
  }

  onHitSelf() {
    return this.segments.slice(1).some((segment) => {
      return this.onHit(segment);
    });
  }

  onBody(position) {
    return this.segments.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
  }
}
