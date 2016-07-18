let Hero = (function() {
  const spriteSheet = Utilities.createImage(`${Constants.githubBase}spriteWalk.png`);
  
  function Hero({ x, y, direction, height, width }) {
    Entity.call(this, ...arguments);
    this._spriteSheet = spriteSheet;
    this._actionTimeSteps = 0;
    this._jumpCooldown = 0;
    this._inAir = false;
    this.hitbox = {
      height: height,
      yOffset: 0,
      xOffset: 2,
      width: 20
    }
    this.won = false;
  }
  
  Hero.prototype = Object.create(Entity.prototype);
  Hero.prototype.constructor = Hero;
  
  Hero.prototype.update = function(step) {
    if(this._jumpCooldown) this._jumpCooldown--;
    
    if(this._inAir) {
      this.y -= this.yVelocity;
      this.yVelocity -= Constants.gravity;
      
      // floor collision 
      let boundary = Constants.game.height - Constants.floor.height - this.height;
      if(this.y > boundary) {
        this.yVelocity = 0;
        this._inAir = 0;
        this.y = boundary;
        this._jumpCooldown = 5;
      }
    }
    else {
      this._actionTimeSteps = (this._actionTimeSteps + 1) % 2;
      if(this._actionTimeSteps == 1) {
        this.walkAnimation = (this.walkAnimation + 1) % 3;  
      }
    }
  }
  
  Hero.prototype.jump = function(height) {
    if(height === 3) this.yVelocity = 30;
    if(height === 2) this.yVelocity = 22;
    if(height === 1) this.yVelocity = 17;
    this._inAir = true;
  }
  
  Hero.prototype.input = function({ jump }) {
    if(jump && jump.height) {
      if(jump.height > 0 && jump.height < 4) {
        if(!this._inAir && !this._jumpCooldown) {
          this.jump(jump.height);
        }
      }
      else {
        throw 'Invalid jump value!'
      }
    }
  }
  
  return Hero;
}());
