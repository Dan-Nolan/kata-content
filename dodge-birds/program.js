let Program = (function() {
  
  // the part CW controls
  function controller(hero) {
    let closeBirds = hero.findBirds().filter(function(bird) {
      return bird.x < 45;
    });
    if(closeBirds.length > 1) {
      let highBirds = closeBirds.filter(function(bird) {
        return bird.y > 60;
      })
      if(highBirds.length !== closeBirds.length) {
        if(Math.max(...highBirds.map(b => b.y)) < 120) {
          hero.jump(3);
        }
        else {
          hero.jump(1);
        }
      }
    }
    else if(closeBirds.length === 1) {
      let bird = closeBirds[0];
      if(bird.y < 60) {
        hero.jump(2);
      }
    }
  }
  
  return { controller };
}());