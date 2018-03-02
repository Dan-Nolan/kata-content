let main = (function() {

  let height = Constants.game.height;
  let width = Constants.game.width;
  let floor = Constants.floor.height;
  let FPS = Constants.FPS;
  let gameOver = false;
  let win = false;
  let spawner;
  let ctx;

  let canvas;
  if(document) {
    canvas = document.getElementById('game');
  }

  if (canvas && canvas.getContext) {
    ctx = canvas.getContext('2d');
    canvas.height = height;
    canvas.width = width;
  }

  let entities = [];
  let hero = new Hero({
      x: 0,
      y: height - floor - 32,
      direction: 2,
      height: 32,
      width: 32
  });
  entities.push(hero);

  function play(idx) {
    spawner = Spawner(idx);

    let now,
        dt = 0,
        last = Utilities.timestamp(),
        step = 1 / FPS;
    function gameLoop() {
      now = Utilities.timestamp();
      dt = dt + Math.min(1, (now - last) / 1000); // cap dt to 1 second
      while(dt > step) {
        dt = dt - step;
        update(step);
      }
      render(dt);
      last = now;

      if(!gameOver) {
        window.requestAnimationFrame( gameLoop );
      }
    }
    window.requestAnimationFrame( gameLoop );
  }

  // synchronous execution of the game
  function executeLoop() {
    update();

    if(!gameOver && !win) {
      return executeLoop();
    }
    return win;
  }

  function execute(idx) {
    spawner = Spawner(idx);
    win = false;
    gameOver = false;
    return executeLoop();
  }

  function update(step) {
    if(win) {
      hero.x += 10;
      if(hero.x > Constants.game.width / 2 - hero.width) {
        hero.x = Constants.game.width / 2 - hero.width;
        hero.direction = 4;
        return;
      }
    }

    let input = {};
    let api = {
      jump: function(height = 3) {
        input = { jump: { height } };
      },
      findBirds: function() {
        return spawner.getEntities().map(entity => {
          return {
            x: entity.x,
            y: height - floor - entity.y,
            speed: entity.xVelocity
          }
        })
      }
    }

    Program.controller(api);
    hero.input(input);

    entities.forEach(function(entity) {
      entity.update(step);
    });

    spawner.getEntities().forEach(function(entity) {
      entity.update(step);
      if(Utilities.collidesWith(hero, entity)) {
        gameOver = true;
        return
      }
    })

    spawner.run();

    if(spawner.complete()) {
      win = true;
      return
    }
  }

  function render(dt) {
    clear();
    drawBackground();

    spawner.getEntities().concat(entities).forEach(function(entity) {
      entity.render(ctx);
    });
  }

  function drawBackground() {
    ctx.fillStyle = 'rgb(12,80,180)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgb(50,200,70)';
    ctx.fillRect(0, height - floor, width, floor);

    if(win) {
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx. textBaseline = 'middle';
      ctx.fillStyle = 'white';  // a color name or by using rgb/rgba/hex values
      ctx.fillText('You Win!', 150, 50); // text and position
    }

    let progress = document.getElementById('progress');
    progress.innerHTML = `${ spawner.getTotalSpawns() - spawner.getSpawnsLeft() } / ${ spawner.getTotalSpawns() } birds dodged`;

  }

  function clear() {
    ctx.clearRect(0, 0, width, height);
  }

  return { win, gameOver, play, execute };

}())
