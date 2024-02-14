let animationOn = true;
let randomStart = 0;
let count = 0;

function getTextNodes(node) {
  var textNodes = [];
  if (node.nodeType == 3) {
    textNodes.push(node);
  } else {
    var children = node.childNodes;
    for (var i = 0; i < children.length; i++) {
      textNodes = textNodes.concat(getTextNodes(children[i]));
    }
  }
  return textNodes;
}
document.getElementById("shuffle").addEventListener("click", function () {
  if (!animationOn && animationId) {
    console.log("i am cancelling", animationId);
    cancelAnimationFrame(animationId);
  }
  if (count === 6) {
    // Reload the current page
    window.location.reload();
  }
  // Create a new div
  animationOn = false;
  console.log("i am shuffle!!");
  var newDiv = document.createElement("div");
  newDiv.style.position = "absolute";
  newDiv.style.top = "80px";
  newDiv.style.left = "0";
  newDiv.style.zIndex = "-10";
  newDiv.style.transition = "all 2s ease-in-out";

  // Create a new div for haikus
  var haikuDiv = document.createElement("div");
  haikuDiv.style.position = "absolute";
  haikuDiv.style.top = "80px";
  haikuDiv.style.left = "50%"; // Position it to the right of newDiv
  haikuDiv.style.color = "blue"; // Make the text color blue
  haikuDiv.style.transition = "all 2s ease-in-out";

  // Get all text nodes on the page
  var textNodes = getTextNodes(document.body);

  textNodes.forEach(function (node) {
    // Exclude text inside buttons
    if (node.parentNode.nodeName !== "BUTTON") {
      // Create a new p for each text node and append it to the new div
      if (!node.nodeValue.includes("ℹ️")) {
        var p = document.createElement("p");
        p.style.zIndex = "-8";
        p.textContent = node.nodeValue;
        p.style.margin = "10px 0"; // Add some margin to each p element
        p.style.transition = "all 2s ease-in-out";
        p.style.position = "relative"; // Add this line
        if (count !== 0) {
          console.log("i move left");
          p.style.left = Math.random() * 300 + count * 10 + "px"; // Add 'px' to the end
        }
        newDiv.appendChild(p);

        // Remove the original text node
        node.parentNode.removeChild(node);
      }
    }
  });

  count++;

  // Append the new div to the body
  document.body.appendChild(newDiv);
  const newHaikus = shuffleHaikus(haikus);

  // For each haiku in haikus, create a new p element and append it to haikuDiv
  newHaikus.forEach(function (haiku) {
    var p = document.createElement("p");
    p.textContent = haiku;
    p.style.position = "relative"; // Add this line

    p.style.margin = "10px 0"; // Add some margin to each p element
    haikuDiv.appendChild(p);
    if (count > 3) {
      console.log("i move left");
      p.style.right = Math.random() * 200 + count * 10 + "px"; // Add 'px' to the end
    }
    p.style.transition = "all 2s ease-in-out";
  });

  // Append haikuDiv to the body
  document.body.appendChild(haikuDiv);
});
