class Object {

  constructor({ type, row, column, width, height, color, layer }){
    this.type = type;
    this.row = row;
    this.column = column;
    this.width = width;
    this.height = height;
    this.color = color;
    this.layer = layer;
  }

  setLayer(layer){
    this.layer = layer;
  }

  moveUp(){
    this.layer[this.row][this.column] = 0;
    this.row--;
    this.layer[this.row][this.column] = 1;
  }

  moveRight(){
    this.layer[this.row][this.column] = 0;
    this.column++;
    this.layer[this.row][this.column] = 1;
  }

  moveDown(){
    this.layer[this.row][this.column] = 0;
    this.row++;
    this.layer[this.row][this.column] = 1;
  }

  moveLeft(){
    this.layer[this.row][this.column] = 0;
    this.column--;
    this.layer[this.row][this.column] = 1;
  }
}
