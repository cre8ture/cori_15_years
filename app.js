const avgWordWidth = 50; // Adjust based on your font and size
let spans = [];
const haikusText = haikus.join(". ") + ". ";
let haikuCharIndex = 0; // Index to track current character in the haikusText
let animationId;
document.addEventListener("DOMContentLoaded", (event) => {
  const canvas = document.getElementById("trail-canvas");
  canvas.style.position = "absolute";
  const ctx = canvas.getContext("2d");
  console.log("i am loaded!", weatherData);

  if (animationOn) {
    for (let i = 0; i < 4; i++) {
      console.log("i am i", i);

      createStrand(i);
    }

    const mouseCircle = document.getElementById("mouse-circle");

    let particleX = 100,
      particleY = 100; // Starting position
    let velocityX = 1,
      velocityY = 1; // Starting velocity

    function updateParticlePosition() {
      // Update particle position
      particleX += velocityX;
      particleY += velocityY;

      // Wrap around to the other side of the screen if the particle goes off one side
      if (particleX < 0) {
        particleX = window.innerWidth - mouseCircle.offsetWidth;
      } else if (particleX > window.innerWidth - mouseCircle.offsetWidth) {
        particleX = 0;
      }
      if (particleY < 0) {
        particleY = window.innerHeight - mouseCircle.offsetHeight;
      } else if (particleY > window.innerHeight - mouseCircle.offsetHeight) {
        particleY = 0;
      }

      // Add randomness to velocity
      velocityX += (Math.random() - 0.5) * 0.8; // Adjust the factor for more or less randomness
      velocityY += (Math.random() - 0.5) * 0.8;

      // Apply the new position
      mouseCircle.style.left = particleX + "px";
      mouseCircle.style.top = particleY + "px";
    }

    function getRandomTextChunk(text, maxWords = 300) {
      const words = text.split(" "); // Split the entire text into words
      const start = Math.floor(Math.random() * (words.length - maxWords));
      return words.slice(start, start + maxWords).join(" "); // Select a chunk of words
    }

    function createSpans(text, parent, index) {
      const arr = text.split(" ");
      arr.forEach((word, i, arr) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.style.display = "inline-block";
        span.style.marginRight = "5px";
        span.style.position = "relative";
        parent.appendChild(span);

        // Example calculation for a parabolic (sagging) effect
        // Adjust these as necessary
        let totalSpans = arr.length;
        let midpoint = totalSpans / 2;
        let curveHeight = 50; // Max height of the curve

        // Calculate position in the curve
        let distanceFromMidpoint = Math.abs(midpoint - i);
        let curveRatio = 1 - distanceFromMidpoint / midpoint;
        let yOffset = curveHeight * curveRatio * (1 - curveRatio) * 4; // Parabolic curve

        // Apply the calculated offset
        span.style.top = `${yOffset}px`;
        spans.push(span);
      });
    }

    function createStrand(index) {
      const strand = document.createElement("div");
      strand.className = "strand";

      const innerDiv = document.createElement("div");
      innerDiv.className = "inner";
      strand.appendChild(innerDiv);

      // Wait a bit before adjusting the width to ensure spans are rendered
      setTimeout(() => adjustStrandWidth(strand), 0); // might need to adjust delay based on actual rendering times

      // Dynamically adjust the position and size of each strand
      // strand.style.position = "absolute";
      strand.style.top = `${index * 100}px`; // Adjust vertical spacing as needed
      strand.style.width = "110%";

      const text = getRandomTextChunk(corpus.join(" ")); //, calculateWordsNeeded());
      createSpans(text, innerDiv);

      document.getElementById("windStrands").appendChild(strand);
    }

    const windDat = [];

    Object.entries(weatherData) // Replace windData with weatherData
      .filter(([key, data]) => key.includes("wind"))
      .forEach(([key, data]) => {
        windDat.push(data);
      });

    function adjustStrandWidth(strand) {
      // Placeholder for how you might dynamically adjust width; implementation details will vary
      let estimatedWidth =
        strand.querySelectorAll("span").length * avgWordWidth; // avgWordWidth needs definition
      strand.style.width = `${Math.max(
        estimatedWidth,
        window.innerWidth * 1.1
      )}px`; // Ensure it's at least 10% wider than the viewport
    }

    updateCanvasHeight();

    // function draw() {
    //     ctx.canvas.width  = window.innerWidth;
    //     ctx.canvas.height = window.innerHeight;
    //   }
    // createRandomStrands(); // Call this function to generate the strands

    // Update canvas height function
    function updateCanvasHeight() {
      canvas.height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      );
      canvas.width = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
      ctx.strokeStyle = "rgba(0, 127, 255, 0.1)";
      // Define the color and opacity of the trail
      ctx.lineWidth = 0.4; // Adjust the line width as needed
      // Set canvas dimensions to match the entire document
      canvas.style.zIndex = "-10";
    }
    function applyWindToSpan(span, windEffectX, windEffectY) {
      // Extract the current transform values if they exist
      let match = /translateX\(([^)]+)px\)\s*translateY\(([^)]+)px\)/.exec(
        span.style.transform
      );
      let currentX = match ? parseFloat(match[1]) : 0;
      let currentY = match ? parseFloat(match[2]) : 0;

      let randomSign = Math.random() < 0.5 ? -1 : 1;

      // Calculate new positions, adding wind effect
      let newX = currentX + windEffectX;
      let percentage = 0.1; // 10% of the wind effect
      let newY = currentY + windEffectY * percentage;

      // Update the transform property with new values
      span.style.transform = `translateX(${newX}px) translateY(${newY}px)`;
    }

    var count = 0;
    function startAnimation() {
      let windDatIndex = 0; // Start with the first wind data set

      function animate() {
        if (!animationOn) {
          if (animationId) {
            cancelAnimationFrame(animationId);
            console.log("Animation stopped", animationId);
            return; // Exit the function to prevent further animation frames
          }
        }
        updateParticlePosition();
        count++;

        // Select a wind data set based on the current index
        let currentWindEffects = windDat[windDatIndex];
        spans.forEach((span, index) => {
          // Select a random wind data point for each span
          let windIndex = Math.floor(Math.random() * currentWindEffects.length);
          let windEffect = currentWindEffects[windIndex]; // Assuming each effect has an X and Y component
          // Apply wind effect to span
          // Assuming windEffect is an object or array with {x: value, y: value} or similar
          let randomNumber = Math.random() * 2 - 1;

          applyWindToSpan(span, randomNumber, windEffect);
        });

        // Update windDatIndex to cycle through different wind conditions
        windDatIndex = (windDatIndex + 1) % windDat.length;

        if (count === 10 || count % 40 === 0) {
          draw();
        }

        animationId =  requestAnimationFrame(animate);
        console.log("animationId",animationId)
      }

      if(animationOn){
      animate();}
      if (!animationOn && animationId) {
        cancelAnimationFrame(animationId);
      }      
      
    }
    startAnimation();

    // Initialize an array to store paths for each span
    // let paths = spans.map(() => []);
    function draw() {
      // Assuming `ctx` is your 2D context for the canvas
      spans.forEach((span, index) => {
        if (index < 300) {
          // Get the current position of the span
          const rect = span.getBoundingClientRect();
          const currentX = rect.left + window.scrollX + rect.width / 2;
          const currentY = rect.top + window.scrollY + rect.height / 2;
          updateHaikusChar(currentX, currentY);
        }

        // // Generate a random color for each line
        // const color = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        // ctx.strokeStyle = color;
        // ctx.lineWidth = 2; // Set line width or adjust as needed

        // // Assuming you store the previous position of each span in data attributes
        // // If not, you'll need to initialize and update these somewhere in your code
        // const prevX = parseFloat(span.getAttribute('data-prev-x')) || currentX;
        // const prevY = parseFloat(span.getAttribute('data-prev-y')) || currentY;

        // // Draw a line from the previous position to the current position
        // ctx.beginPath();
        // ctx.moveTo(prevX, prevY);
        // ctx.lineTo(currentX, currentY);
        // ctx.stroke();

        // // Update the span's data attributes to the current position for the next draw call
        // span.setAttribute('data-prev-x', currentX);
        // span.setAttribute('data-prev-y', currentY);
      });
    }

    function updateHaikusChar(spanX, spanY) {
      // Create a new haikuChar span for each position
      const haikuCharSpan = document.createElement("span");
      haikuCharSpan.className = "haikuChar";
      haikuCharSpan.textContent = haikusText[haikuCharIndex];
      haikuCharSpan.style.position = "absolute";
      haikuCharSpan.style.left = `${spanX}px`;
      haikuCharSpan.style.top = `${spanY}px`;
      haikuCharSpan.style.color = "blue";
      haikuCharSpan.style.marginBottom = "1px";

      document.body.appendChild(haikuCharSpan); // Append to body or a specific container

      // Increment haikuCharIndex and reset if it exceeds the haikusText length
      haikuCharIndex = (haikuCharIndex + 1) % haikusText.length;
    }
  }
});

console.log("app.js");
