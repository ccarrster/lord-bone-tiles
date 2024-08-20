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

/********************* Domino setup and test */


var terrainTypes = ['wheat fields', 'forests', 'lakes', 'grasslands', 'swamps', 'mines'];

function resetDominos(){
  var index = 1;
  return [
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
}

var dominos = resetDominos();

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


//****************** Domains */

var root = resetPlayerDomain();

function resetPlayerDomain(){
  return [new domain(0, 0, new terrain('castle'))];
}

var testDomino = dominos[0];

var newDomains = [new domain(1, 0, testDomino.leftTerrain), new domain(2, 0, testDomino.rightTerrain)];

var result;

result = place(root, newDomains);
if(result != false){
  root = result;
}


var testDomino2 = dominos[46];

var newDomains2 = [new domain(-2, 0, testDomino2.leftTerrain), new domain(-1, 0, testDomino2.rightTerrain)];

result = place(root, newDomains2);
if(result != false){
  root = result;
}


var testDomino3 = dominos[1];

var newDomains3 = [new domain(2, 1, testDomino3.leftTerrain), new domain(1, 1, testDomino3.rightTerrain)];

result = place(root, newDomains3);
if(result != false){
  root = result;
}

function place(domains, newDomains){
  if(canPlace(domains, newDomains)){
    return domains.concat(newDomains);
  } else {
    return false;
  }
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

function score(domain){
  var scoreSummary = [];
  clearVisisted(domain);
  domain.forEach((domainTile) => {
    scoreSummary.push(scoreTerrain(domainTile, new terrainGroupScore(domainTile, domain)));
  })
  clearVisisted(domain);
  return scoreSummary;
}

class terrainGroupScore {
  constructor(domainTile, domain){
    this.terrain = domainTile.terrain.terrain;
    this.crowns = 0;
    this.count = 0;
    this.domain = domain;
  }
}

//Recursive end if empty or visited
//If a terrain match score and try to score the adjacent domains
function scoreTerrain(domain, terrainGroupScore){
  if(domain.length == 0){
    return terrainGroupScore;
  }
  if(domain.visited == true){
    return terrainGroupScore;
  }
  if(domain.terrain.terrain == terrainGroupScore.terrain){
    domain.visited = true;
    terrainGroupScore.count += 1;
    terrainGroupScore.crowns += domain.terrain.crowns;
    terrainGroupScore = scoreTerrain(findTerrain(terrainGroupScore.domain, domain.x + 1, domain.y), terrainGroupScore);
    terrainGroupScore = scoreTerrain(findTerrain(terrainGroupScore.domain, domain.x - 1, domain.y), terrainGroupScore);
    terrainGroupScore = scoreTerrain(findTerrain(terrainGroupScore.domain, domain.x, domain.y + 1), terrainGroupScore);
    terrainGroupScore = scoreTerrain(findTerrain(terrainGroupScore.domain, domain.x, domain.y - 1), terrainGroupScore);
  }
  return terrainGroupScore;
}

function findTerrain(domains, x, y){
  var setDomain = domains.filter((domain) => {
    if(domain.x == x && domain.y == y){
      return true;
    }
  });
  if(setDomain.length > 0){
    return setDomain[0];
  }
  return setDomain;
}

function clearVisisted(domain){
  domain.forEach((domainTile) => {
    domainTile.visited = false;
  }) 
}

console.log(score(root));

function takeRandomDomino(){
  var result = dominos.splice(Math.floor(Math.random() * dominos.length), 1);
  return result[0];
}



class locationXY{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

function getValidPlacements(dominion, domino){
  var emptyAdjacentLeft = [];
  var emptyAdjacentRight = [];
  var placementLeft = [];
  var placementRight = [];
  dominion.forEach((dominionTile) => {
    if(dominionTile.terrain.terrain == domino.leftTerrain.terrain || dominionTile.terrain.terrain == 'castle'){
      console.log('Left will match sides with ' + dominionTile.terrain.terrain + ' ' + dominionTile.x + ', ' + dominionTile.y);
      var right = findTerrain(dominion, dominionTile.x + 1, dominionTile.y);
      var left = findTerrain(dominion, dominionTile.x - 1, dominionTile.y);
      var up = findTerrain(dominion, dominionTile.x, dominionTile.y + 1);
      var down = findTerrain(dominion, dominionTile.x, dominionTile.y - 1);
      if(right.length == 0){
        emptyAdjacentLeft.push(new locationXY(dominionTile.x + 1, dominionTile.y));
      }
      if(left.length == 0){
        emptyAdjacentLeft.push(new locationXY(dominionTile.x - 1, dominionTile.y));
      }
      if(up.length == 0){
        emptyAdjacentLeft.push(new locationXY(dominionTile.x, dominionTile.y + 1));
      }
      if(down.length == 0){
        emptyAdjacentLeft.push(new locationXY(dominionTile.x, dominionTile.y - 1));
      }
    }
    if(domino.rightTerrain.terrain != domino.leftTerrain.terrain && (dominionTile.terrain.terrain == domino.rightTerrain.terrain || dominionTile.terrain.terrain == 'castle')){
      console.log('Right will match sides with ' + dominionTile.terrain.terrain + ' ' + dominionTile.x + ', ' + dominionTile.y);
      var right = findTerrain(dominion, dominionTile.x + 1, dominionTile.y);
      var left = findTerrain(dominion, dominionTile.x - 1, dominionTile.y);
      var up = findTerrain(dominion, dominionTile.x, dominionTile.y + 1);
      var down = findTerrain(dominion, dominionTile.x, dominionTile.y - 1);
      if(right.length == 0){
        emptyAdjacentRight.push(new locationXY(dominionTile.x + 1, dominionTile.y));
      }
      if(left.length == 0){
        emptyAdjacentRight.push(new locationXY(dominionTile.x - 1, dominionTile.y));
      }
      if(up.length == 0){
        emptyAdjacentRight.push(new locationXY(dominionTile.x, dominionTile.y + 1));
      }
      if(down.length == 0){
        emptyAdjacentRight.push(new locationXY(dominionTile.x, dominionTile.y - 1));
      }
    }
  });
  var placementOptions = [];
  emptyAdjacentLeft.forEach((emptyLocation) => {
    var right = findTerrain(dominion, emptyLocation.x + 1, emptyLocation.y);
    var left = findTerrain(dominion, emptyLocation.x - 1, emptyLocation.y);
    var up = findTerrain(dominion, emptyLocation.x, emptyLocation.y + 1);
    var down = findTerrain(dominion, emptyLocation.x, emptyLocation.y - 1);
    if(right.length == 0){
      placementOptions.push([new domain(emptyLocation.x, emptyLocation.y, domino.leftTerrain), new domain(emptyLocation.x + 1, emptyLocation.y, domino.rightTerrain)]);
    }
    if(left.length == 0){
      placementOptions.push([new domain(emptyLocation.x, emptyLocation.y, domino.leftTerrain), new domain(emptyLocation.x - 1, emptyLocation.y, domino.rightTerrain)]);
    }
    if(up.length == 0){
      placementOptions.push([new domain(emptyLocation.x, emptyLocation.y, domino.leftTerrain), new domain(emptyLocation.x, emptyLocation.y + 1, domino.rightTerrain)]);
    }
    if(down.length == 0){
      placementOptions.push([new domain(emptyLocation.x, emptyLocation.y, domino.leftTerrain), new domain(emptyLocation.x, emptyLocation.y - 1, domino.rightTerrain)]);
    }
  });
  emptyAdjacentRight.forEach((emptyLocation) => {
    var right = findTerrain(dominion, emptyLocation.x + 1, emptyLocation.y);
    var left = findTerrain(dominion, emptyLocation.x - 1, emptyLocation.y);
    var up = findTerrain(dominion, emptyLocation.x, emptyLocation.y + 1);
    var down = findTerrain(dominion, emptyLocation.x, emptyLocation.y - 1);
    if(right.length == 0){
      placementOptions.push([new domain(emptyLocation.x, emptyLocation.y, domino.rightTerrain), new domain(emptyLocation.x + 1, emptyLocation.y, domino.leftTerrain)]);
    }
    if(left.length == 0){
      placementOptions.push([new domain(emptyLocation.x, emptyLocation.y, domino.rightTerrain), new domain(emptyLocation.x - 1, emptyLocation.y, domino.leftTerrain)]);
    }
    if(up.length == 0){
      placementOptions.push([new domain(emptyLocation.x, emptyLocation.y, domino.rightTerrain), new domain(emptyLocation.x, emptyLocation.y + 1, domino.leftTerrain)]);
    }
    if(down.length == 0){
      placementOptions.push([new domain(emptyLocation.x, emptyLocation.y, domino.rightTerrain), new domain(emptyLocation.x, emptyLocation.y - 1, domino.leftTerrain)]);
    }
  });
  var placeableOptions = [];
  placementOptions.forEach((option) => {
    if(canPlace(dominion, option)){
      placeableOptions.push(option);
    }
  });
  return placeableOptions;
}


while(dominos.length > 0){
  //This takes from the dominos
  var randomDomino = takeRandomDomino();
  var validPlacements = getValidPlacements(root, randomDomino);
  if(validPlacements.length > 0){
    var randomPlacement = validPlacements[Math.floor(Math.random() * validPlacements.length)];
    root = place(root, randomPlacement);
    drawIt(root);
  } else {
    console.log('No valid placements :(');
  }
}

var newScore = score(root);
console.log(newScore);

function getScoreTotal(scores){
  var total = 0;
  scores.forEach((score) => {
    total += (score.count * score.crowns);
  });
  return total;
}

console.log(getScoreTotal(newScore));
