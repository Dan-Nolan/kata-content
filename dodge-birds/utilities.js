let Utilities = (function() {
  function createImage(imgSource) {
    if(document) {
      let resources = document.getElementById('resources');
      let image = document.createElement("img");
      image.setAttribute("src", imgSource);
      image.style.display = "none";
      resources.appendChild(image);
      return image;
    }
  }

  function collidesWith(entityA, entityB) {
    let aX = entityA.x + entityA.hitbox.xOffset,
        aY = entityA.y + entityA.hitbox.yOffset,
        bX = entityB.x + entityB.hitbox.xOffset,
        bY = entityB.y + entityB.hitbox.yOffset,
        aRight = aX + entityA.hitbox.width,
        aBottom = aY + entityA.hitbox.height,
        bRight = bX + entityB.hitbox.width,
        bBottom = bY + entityB.hitbox.height;
    return aX < bRight && aRight > bX && aY < bBottom && aBottom > bY;
  }

  function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }

  return {
    createImage: createImage,
    collidesWith: collidesWith,
    timestamp: timestamp,
  }
}());
