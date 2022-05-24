export class Food {
  position = {
    x: 0,
    y: 0,
  };

  update() {}

  render(canvas) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = this.position.y;
    foodElement.style.gridColumnStart = this.position.x;
    foodElement.classList.add("food");
    foodElement.append("🐦");
    canvas.appendChild(foodElement);
  }

  setPosition(position) {
    this.position = position;
  }
}
