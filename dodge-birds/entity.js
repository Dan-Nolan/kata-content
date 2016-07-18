let Entity = (function() {
  function Entity({ x, y, direction, height, width }) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.direction = direction;
    this.walkAnimation = 0;
    this.yVelocity = 0;
    this.xVelocity = 0;
  }
  
  Entity.prototype.render = function(ctx) {
    let sourceX = this.walkAnimation * this.width,
        sourceY = this.direction * this.height;
    ctx.drawImage(this._spriteSheet, sourceX, sourceY, this.width, 
                  this.height, this.x, this.y, this.width, this.height);
  }
  
  return Entity;
}())
