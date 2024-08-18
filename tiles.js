class domino{
  constructor(number, leftTerrain, rightTerrain){
    this.number = number;
    this.leftTerrain = leftTerrain;
    this.rightTerrain = rightTerrain;
  }
}
class terrain{
  constructor(terrain, crowns = 0){
    this.terrain = terrain;
    this.crowns = crowns;
  }
}

var index = 1;
var terrainTypes = ['wheat fields', 'forests', 'lakes', 'grasslands', 'swamps', 'mines'];

var dominos = [
  new domino(index++, new terrain('wheat fields'), new terrain('wheat fields')),
  new domino(index++, new terrain('wheat fields'), new terrain('wheat fields')),
  new domino(index++, new terrain('forests'), new terrain('forests')),
  new domino(index++, new terrain('forests'), new terrain('forests')),
  new domino(index++, new terrain('forests'), new terrain('forests')),
  new domino(index++, new terrain('forests'), new terrain('forests')),
  new domino(index++, new terrain('lakes'), new terrain('lakes')),
  new domino(index++, new terrain('lakes'), new terrain('lakes')),
  new domino(index++, new terrain('lakes'), new terrain('lakes')),
  new domino(index++, new terrain('grasslands'), new terrain('grasslands')),
  new domino(index++, new terrain('grasslands'), new terrain('grasslands')),
  new domino(index++, new terrain('swamps'), new terrain('swamps')),
  new domino(index++, new terrain('wheat fields'), new terrain('forests')),
  new domino(index++, new terrain('wheat fields'), new terrain('lakes')),
  new domino(index++, new terrain('wheat fields'), new terrain('grasslands')),
  new domino(index++, new terrain('wheat fields'), new terrain('swamps')),
  new domino(index++, new terrain('forests'), new terrain('lakes')),
  new domino(index++, new terrain('forests'), new terrain('grasslands')),
  new domino(index++, new terrain('wheat fields', 1), new terrain('forests')),
  new domino(index++, new terrain('wheat fields', 1), new terrain('lakes')),
  new domino(index++, new terrain('wheat fields', 1), new terrain('grasslands')),
  new domino(index++, new terrain('wheat fields', 1), new terrain('swamps')),
  new domino(index++, new terrain('wheat fields', 1), new terrain('mines')),
  new domino(index++, new terrain('forests', 1), new terrain('wheat fields')),
  new domino(index++, new terrain('forests', 1), new terrain('wheat fields')),
  new domino(index++, new terrain('forests', 1), new terrain('wheat fields')),
  new domino(index++, new terrain('forests', 1), new terrain('wheat fields')),
  new domino(index++, new terrain('forests', 1), new terrain('lakes')),
  new domino(index++, new terrain('forests', 1), new terrain('grasslands')),
  new domino(index++, new terrain('lakes', 1), new terrain('wheat fields')),
  new domino(index++, new terrain('lakes', 1), new terrain('wheat fields')),
  new domino(index++, new terrain('lakes', 1), new terrain('forests')),
  new domino(index++, new terrain('lakes', 1), new terrain('forests')),
  new domino(index++, new terrain('lakes', 1), new terrain('forests')),
  new domino(index++, new terrain('lakes', 1), new terrain('forests')),
  new domino(index++, new terrain('wheat fields'), new terrain('grasslands', 1)),
  new domino(index++, new terrain('lakes'), new terrain('grasslands', 1)),
  new domino(index++, new terrain('wheat fields'), new terrain('swamps', 1)),
  new domino(index++, new terrain('grasslands'), new terrain('swamps', 1)),
  new domino(index++, new terrain('mines', 1), new terrain('wheat fields')),
  new domino(index++, new terrain('wheat fields'), new terrain('grasslands', 2)),
  new domino(index++, new terrain('lakes'), new terrain('grasslands', 2)),
  new domino(index++, new terrain('wheat fields'), new terrain('swamps', 2)),
  new domino(index++, new terrain('grasslands'), new terrain('swamps', 2)),
  new domino(index++, new terrain('mines', 2), new terrain('wheat fields')),
  new domino(index++, new terrain('swamps'), new terrain('mines', 2)),
  new domino(index++, new terrain('swamps'), new terrain('mines', 2)),
  new domino(index++, new terrain('wheat fields'), new terrain('mines', 3))
];

console.log(dominos);

dominos.forEach((domino) => {
	console.log(domino);
	if(!terrainTypes.includes(domino.leftTerrain.terrain)){
		console.log('boo!');
	}
	if(!terrainTypes.includes(domino.rightTerrain.terrain)){
			console.log('boo!');
	}
})

var counts = {'wheat fields': [[],[]], 'lakes': [[],[]], 'forests': [[],[]], 'swamps': [[],[],[]], 'mines': [[],[],[],[]], 'grasslands': [[],[],[]]};

dominos.forEach((domino) => {
	counts[domino.leftTerrain.terrain][domino.leftTerrain.crowns]++
	counts[domino.rightTerrain.terrain][domino.rightTerrain.crowns]++
})

console.log(counts);

var csv = '';
dominos.forEach((domino) => {
	csv += domino.number + ", '" + domino.leftTerrain.terrain + "', " + domino.rightTerrain.crowns + ", '" + domino.rightTerrain.terrain + "', " + domino.rightTerrain.crowns + "\n";
})

console.log(csv);
