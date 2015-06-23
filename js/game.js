'use strict';



var audioFlip = new WebAudio('sounds/flip.ogg'),
    audioMatch = new WebAudio('sounds/success.ogg'),
    audioFail = new WebAudio('sounds/fail.ogg');


function Cell(title, idCellPosition) {
  this.title = title;
  this.flipped = false;
}

Cell.prototype.flip = function() {
  this.flipped = !this.flipped;
}



function Game(cellNames) {
  var arrayCells = makeArrayCells(cellNames);


  this.board = makeBoard(arrayCells);
  this.message = Game.FLIP_FIRST_CELL_TEXT;
  this.unmatchedPairs = cellNames.length;
  
  this.flipCell = function(cell) {
  
    if (cell.flipped) {
      return;
    }

    cell.flip();
    audioFlip.play();


    if (!this.firstCellSelected || this.secondCellSelected) {

      if (this.secondCellSelected) {
        this.firstCellSelected.flip();
        this.secondCellSelected.flip();
        
        
        this.firstCellSelected = this.secondCellSelected = undefined;
      }

      this.firstCellSelected = cell;
      this.message = Game.FLIP_SECOND_CELL_TEXT(cell.title);

    } else {

      if (this.firstCellSelected.title === cell.title) {
        this.unmatchedPairs--;
        this.message = (this.unmatchedPairs > 0) ? Game.MATCHED_CELLS_TEXT : Game.YOU_WIN_TEXT;
        this.firstCellSelected = this.secondCellSelected = undefined;

        setTimeout(function(){audioMatch.play();}, 500);
        
      } else {
        this.secondCellSelected = cell;
        
        this.message = Game.MISSED_CELLS_TEXT;
        setTimeout(function(){audioFail.play();}, 500);
      }
    }
  }
}

Game.FLIP_FIRST_CELL_TEXT = 'Scegli una casella.';
Game.FLIP_SECOND_CELL_TEXT = function (title) { return "Trova l'altra casella " + title + '.'; 
                            };
Game.MISSED_CELLS_TEXT = 'Sbagliato! Riprova.';
Game.MATCHED_CELLS_TEXT = 'Ottimo! Vai avanti...';
Game.YOU_WIN_TEXT = 'Hai Vinto!';



function makeArrayCells(cellNames) {
  var arrayCells = [];
  cellNames.forEach(function(name) {
    arrayCells.push(new Cell(name));
    arrayCells.push(new Cell(name));
  });

  return arrayCells;
}


function makeBoard(arrayCells, idCellPosition) {
  var rowsNumber = 4,
      colsNumber = 5,
      board = [], 
      currentCell = new Cell();

  for (var row = 0; row < rowsNumber; row++) {
    board[row] = [];
    for (var col = 0; col < colsNumber; col++) {
    	currentCell = removeRandomCell(arrayCells);
        currentCell.idCellPosition = 'item_' + row + '_' + col;
        board[row][col] = currentCell;
    }
  }

  return board;
}


function removeRandomCell(arrayCells) {
  var i = Math.floor(Math.random()*arrayCells.length);
  return arrayCells.splice(i, 1)[0];
}


