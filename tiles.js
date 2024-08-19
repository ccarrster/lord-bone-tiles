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
class domain{
  constructor(x, y, terrain){
    this.x = x;
    this.y = y;
    this.terrain = terrain;
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

//console.log(dominos);

dominos.forEach((domino) => {
	//console.log(domino);
	if(!terrainTypes.includes(domino.leftTerrain.terrain)){
		//console.log('boo!');
	}
	if(!terrainTypes.includes(domino.rightTerrain.terrain)){
		//console.log('boo!');
	}
})

var counts = {'wheat fields': [[],[]], 'lakes': [[],[]], 'forests': [[],[]], 'swamps': [[],[],[]], 'mines': [[],[],[],[]], 'grasslands': [[],[],[]]};

dominos.forEach((domino) => {
	counts[domino.leftTerrain.terrain][domino.leftTerrain.crowns]++
	counts[domino.rightTerrain.terrain][domino.rightTerrain.crowns]++
})

//console.log(counts);

var csv = '';
dominos.forEach((domino) => {
	csv += domino.number + ", '" + domino.leftTerrain.terrain + "', " + domino.rightTerrain.crowns + ", '" + domino.rightTerrain.terrain + "', " + domino.rightTerrain.crowns + "\n";
})

//console.log(csv);

var root = [new domain(0, 0, new terrain('castle'))];

var testDomino = dominos[0];

var newDomains = [new domain(1, 0, testDomino.leftTerrain), new domain(2, 0, testDomino.rightTerrain)];

if(canPlace(root, newDomains)){
  console.log(root);
  root = place(root, newDomains);
  console.log(root);
}

var testDomino2 = dominos[46];

var newDomains2 = [new domain(-2, 0, testDomino2.leftTerrain), new domain(-1, 0, testDomino2.rightTerrain)];

if(canPlace(root, newDomains2)){
  console.log(root);
  root = place(root, newDomains2);
  console.log(root);
}

var testDomino3 = dominos[1];

var newDomains3 = [new domain(2, 1, testDomino3.leftTerrain), new domain(1, 1, testDomino3.rightTerrain)];

if(canPlace(root, newDomains3)){
  console.log(root);
  root = place(root, newDomains3);
  console.log(root);
}


function place(domains, newDomains){
  return domains.concat(newDomains);
}

function canPlace(existingDomains, newDomains){
  //Optional 7 in some game modes
  var maxSize = 5;
  var lowestX = 100;
  var lowestY = 100;
  var highestX = -100;
  var highestY = -100;
  var validPlacement = true;
  var placmentErrors = [];
  var oneSideMatches = false;
  existingDomains.forEach((existing) => {
    newDomains.forEach((newDomain) => {     
      if(existing.x < lowestX){
        lowestX = existing.x;
      } 
      if(newDomain.x < lowestX){
        lowestX = newDomain.x;
      }
      if(existing.y < lowestY){
        lowestY = existing.y;
      } 
      if(newDomain.y < lowestY){
        lowestY = newDomain.y;
      }
      if(existing.x > highestX){
        highestX = existing.x;
      } 
      if(newDomain.x > highestX){
        highestX = newDomain.x;
      }
      if(existing.y > highestY){
        highestY = existing.y;
      } 
      if(newDomain.y > highestY){
        highestY = newDomain.y;
      }
      if(existing.x == newDomain.x && existing.y == newDomain.y){
        //Overlapping placement
        placmentErrors.push('Overlapping');
        validPlacement = false;
      } else {
        if(existing.x == newDomain.x && (existing.y == newDomain.y + 1 || existing.y == newDomain.y - 1)){
          if(existing.terrain.terrain == 'castle' || existing.terrain.terrain == newDomain.terrain.terrain){
            oneSideMatches = true;
          }
        }
        if((existing.x == newDomain.x + 1 || existing.x == newDomain.x - 1) && existing.y == newDomain.y){
          if(existing.terrain.terrain == 'castle' || existing.terrain.terrain == newDomain.terrain.terrain){
            oneSideMatches = true;
          }
        }
      }
    })
  })

  if(oneSideMatches == false){
    //Non matching placement no same terrain touching or none touching at all
    placmentErrors.push('No matching side');
    validPlacement = false;
  }
  if(Math.abs(lowestX) + highestX >= maxSize){
    //Too wide
    placmentErrors.push('Too wide');
    validPlacement = false;
  }
  if(Math.abs(lowestY) + highestY >= maxSize){
    //Too tall
    placmentErrors.push('Too tall');
    validPlacement = false;
  }
  if(validPlacement == true){
    console.log('That looks like it will work.');
    return true;
  } else {
    console.log(placmentErrors);
    return false;
  }
}

function drawIt(domains){
  var result = '<table>';
  for(var y = -6; y < 7; y++){
    result += '<tr>';
    for(var x = -6; x < 7; x++){
      var setDomain = domains.filter((domain) => {
        if(domain.x == x && domain.y == y){
          return true;
        }
      });
      var color = 'white';
      if(setDomain.length > 0){
        if(setDomain[0].terrain.terrain == 'forests'){
          color = 'darkgreen';
        }
        if(setDomain[0].terrain.terrain == 'lakes'){
          color = 'blue';
        }
        if(setDomain[0].terrain.terrain == 'grasslands'){
          color = 'green';
        }
        if(setDomain[0].terrain.terrain == 'swamps'){
          color = 'brown';
        }
        if(setDomain[0].terrain.terrain == 'mines'){
          color = 'orange';
        }
        if(setDomain[0].terrain.terrain == 'wheat fields'){
          color = 'yellow';
        }
        if(setDomain[0].terrain.terrain == 'castle'){
          color = 'gray';
        }
      }
      result += '<td style="width: 20px; height: 20px; border: 1px solid black; background-color: '+color+'">';
      if(setDomain.length > 0){
        result += setDomain[0].terrain.crowns;
      } else {
        //empty
      }
      result += '</td>';
    }
    result += '</tr>';
  }

  const divnode = document.createElement("div");
  divnode.innerHTML = result;
  document.getElementById('domains').appendChild(divnode);
}

drawIt(root);
