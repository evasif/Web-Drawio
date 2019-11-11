
window.drawio = {
  shapes: [],
  redoShapes: [],
  selectedShape: 'pencil',
  canvas: document.getElementById('my-canvas'),
  ctx: document.getElementById('my-canvas').getContext('2d'),
  selectedElement: null,
  availableShapes: {
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    LINE: 'line',
    PENCIL: 'pencil',
    TEXT: 'text',
  }
};

$(function() {

  function drawCanvas() {
    if (drawio.selectedElement) {
      drawio.selectedElement.render();
    }

    for (var i = 0; i < drawio.shapes.length; i++) {
      drawio.shapes[i].render();
    }
  }

  $('.icon').on('click', function() {
      $('.icon').removeClass('selected');
      $(this).addClass('selected');
      drawio.selectedShape = $(this).data('shape');
  });


  // mousedown
  $('#my-canvas').on('mousedown', function(mouseEvent) {
    switch (drawio.selectedShape) {
      case drawio.availableShapes.RECTANGLE:
        var lineW = document.getElementById('line-width');
        var lineWidth = lineW.value;
        var colors = document.getElementById('color-select');
        var color = colors.value;
        drawio.selectedElement = new Rectangle(mouseEvent.offsetX,mouseEvent.offsetY, 0, 0, lineWidth, color);
        break;
      case drawio.availableShapes.CIRCLE:
        var lineW = document.getElementById('line-width');
        var lineWidth = lineW.value;
        var colors = document.getElementById('color-select');
        var color = colors.value;
        drawio.selectedElement = new Circle(mouseEvent.offsetX, mouseEvent.offsetY, 0, lineWidth, color);
        break;
      case drawio.availableShapes.LINE:
        var lineW = document.getElementById('line-width');
        var lineWidth = lineW.value;
        var colors = document.getElementById('color-select');
        var color = colors.value;
        drawio.selectedElement = new Line(mouseEvent.offsetX, mouseEvent.offsetY, mouseEvent.offsetX, mouseEvent.offsetY, lineWidth, color);
        break;
      case drawio.availableShapes.PENCIL:
        var lineW = document.getElementById('line-width');
        var lineWidth = lineW.value;
        var colors = document.getElementById('color-select');
        var color = colors.value;
        drawio.selectedElement = new Pencil(mouseEvent.offsetX, mouseEvent.offsetY, lineWidth, color);
        break;
      case drawio.availableShapes.TEXT:
        var textBox = document.getElementById("text-box");
        textBox.style.display = "block";
        textBox.style.position = "absolute";
        textBox.style.left = mouseEvent.offsetX + 80 +'px';
        textBox.style.top = mouseEvent.offsetY + 110 +'px';

        var displayButton = document.getElementById("display-button");
        displayButton.style.display = "block";

        displayButton.onclick = function() {
          var text = textBox.value;
          var fontVal = document.getElementById("font");
          var font = fontVal.value;
          var colors = document.getElementById('color-select');
          var color = colors.value;
          drawio.selectedElement = new Text(mouseEvent.offsetX, mouseEvent.offsetY, text, font, color);
          textBox.style.display = "none";
          drawCanvas();
          drawio.shapes.push(drawio.selectedElement);
          console.log(drawio.shapes);

          drawio.selectedElement = null;
          textBox.value = "";
          displayButton.style.display = "none";
        }
        break;
    }
  });

  // mousemove
  $('#my-canvas').on('mousemove', function(mouseEvent) {
    if (drawio.selectedShape != 'text') {
      if (drawio.selectedElement) {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY, true);
        drawCanvas();
      }

    }
  });


  // mouseup
  $('#my-canvas').on('mouseup', function() {
    if (drawio.selectedShape != 'text') {
      drawio.shapes.push(drawio.selectedElement);
      drawio.selectedElement = null;
    }
  });

  $('#undo-button').on('click', function() {
    var lengthRedo = drawio.redoShapes.length;
    var length = drawio.shapes.length;

    if (length > 0) {
      drawio.redoShapes.push(drawio.shapes[length - 1]);
      drawio.shapes.splice(- 1, 1);
      drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
      drawCanvas();
    }
    else {
      //nothing to undo
    }

  });

  $('#redo-button').on('click', function() {
      var length = drawio.redoShapes.length;
      if (length > 0) {
        drawio.shapes.push(drawio.redoShapes[length - 1]);
        drawio.redoShapes.splice(- 1, 1);
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
      }
      else {
        //nothing to redo
      }
    });

    // Move shapes
  /*  $('#move-shape').on('click', function(mouseEvent) {
        if (drawio.selectedShape = 'rectangle') {
          $('#my-canvas').on('mousedown', function() {
            $('#my-canvas').on('mousemove', function() {
              console.log("hello");
              drawio.selectedElement.move(mouseEvent.offsetX, mouseEvent.offsetY, drawio.canvas.width, drawio.canvas.height);
              drawCanvas();
              $('#my-canvas').on('mouseup', function() {
                  console.log("hello");
                  drawio.shapes.push(drawio.selectedElement);

              })
            })
          })
        }
    });*/
});
