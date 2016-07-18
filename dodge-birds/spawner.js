let Spawner = (function() {
  const spawns = [
    { y: 40, frames: 10 }, 
    
    { y: 40, frames: 50 }, 
    { y: 90,  frames: 62 },
    
    { y: 45,  frames: 125 },
    
    { y: 160, frames: 135 },
    
    { y: 160, frames: 200 },
    
    { y: 110, frames: 250 },
    
    { y: 160, frames: 275 },
    { y: 110, frames: 275 },
    
    { y: 45,  frames: 325 },
    { y: 110, frames: 325 },
    
    { y: 45,  frames: 360 },
    { y: 160, frames: 360 },
  ];
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
}())