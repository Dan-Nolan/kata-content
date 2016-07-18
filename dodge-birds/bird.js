let Bird = (function() {
  const spriteSheet = Utilities.createImage(`${Constants.githubBase}rMJ0kCu.png`);
  
  function Bird({ x, y, direction, height, width }) {
    Entity.call(this, ...arguments);
    this._spriteSheet = spriteSheet;
    this.xVelocity = 5;
    this._actionTimeSteps = 0;
    this.hitbox = {
      yOffset: 8,
      height: 15,
      xOffset: 2,
      width: 20
    }
  }
  
  Bird.prototype = Object.create(Entity.prototype);
  Bird.prototype.constructor = Bird;
  
  Bird.prototype.update = function(step) {
    this.x -= this.xVelocity;
    
    if(this.x < 0) {
      this.canDestroy = true;
    }
  
    this._actionTimeSteps = (this._actionTimeSteps + 1) % 2;
    if(this._actionTimeSteps == 1) {
      this.walkAnimation = (this.walkAnimation + 1) % 3;  
    }
  }
  
  return Bird;
}());