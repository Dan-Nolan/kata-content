let Spawner = (function() {
  return function(level) {
    let spawns = Levels[level];
    let entities = [];
    let spawnFrames = 0, spawnIdx = 0;
    function run() {
      if(spawnIdx > spawns.length) return;
      spawnFrames++;
      let current = spawns[spawnIdx];
      while(current && spawnFrames >= current.frames) {
        let bird = new Bird({
          x: Constants.game.width,
          y: Constants.game.height - Constants.floor.height - current.y,
          direction: 1,
          height: 32,
          width: 32
        });
        entities.push(bird);
        current = spawns[++spawnIdx];
      }
    }
    function getTotalSpawns() {
      return spawns.length;
    }
    function getSpawnsLeft() {
      return spawns.length - entities.filter(e => e.canDestroy).length;
    }
    function complete() {
      return getSpawnsLeft() === 0;
    }
    function getEntities() {
      return entities.filter(e => !e.canDestroy);
    }
    return { run, complete, getTotalSpawns, getSpawnsLeft, getEntities }
  }
}())
