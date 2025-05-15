import { useState, useEffect } from "react";

const Otp = () => {
  const [svgColor, setSvgColor] = useState("#2896F5"); // Default color
  const [colorInput, setColorInput] = useState("#2896F5");

  // Handle color change - now affects both button and SVG
  const handleChangeColor = () => {
    // Validate the color input as a hex color
    const isValidHex = /^#[0-9A-F]{6}$/i.test(colorInput);
    if (isValidHex) {
      setSvgColor(colorInput);

      // Create a new version of the SVG with updated color
      updateSvgColor(colorInput);
    } else {
      alert("Please enter a valid hex color (e.g., #2896f5)");
    }
  };

  // Function to update SVG color by manipulating it as a string
  const updateSvgColor = (newColor: string) => {
    fetch("/LittleMaps.svg")
      .then((response) => response.text())
      .then((svgText) => {
        // Replace all instances of the current color (#2896F5) with the new color
        const updatedSvg = svgText.replace(/#2896F5/g, newColor);

        // Create a Blob from the modified SVG
        const blob = new Blob([updatedSvg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);

        // Update the background of the SVG container
        const svgContainer = document.getElementById("svg-background");
        if (svgContainer) {
          svgContainer.style.backgroundImage = `url(${url})`;
        }
      })
      .catch((error) => console.error("Error updating SVG color:", error));
  };

  // Initial SVG load with default color
  useEffect(() => {
    // No need to update on initial load as the SVG already has the default color
  }, []);

  return (
    <div
      className="otp-container"
      style={{
        position: "relative",
        width: "100vw", // Changed from 100% to 100vw
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Changed from center to flex-start
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "28vh", // Added padding to position the form higher
      }}
    >
      {/* SVG Background with ID for dynamic updates */}
      <div
        id="svg-background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw", // Changed from 100% to 100vw
          height: "100vh",
          backgroundImage: "url(/LittleMaps.svg)",
          backgroundSize: "cover", // Changed from contain to cover
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      {/* Color control panel */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="color"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
          style={{ cursor: "pointer" }}
        />
        <input
          type="text"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
          placeholder="#RRGGBB"
          style={{ width: "80px", padding: "5px" }}
        />
        <button
          onClick={handleChangeColor}
          style={{
            backgroundColor: svgColor,
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Apply Color
        </button>
      </div>

      <div
        className="otp-content"
        style={{
          padding: "2rem",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent background
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
          marginTop: "-5vh", // Added negative margin to move it higher
        }}
      >
        <h2>OTP Verification</h2>
        <p>Enter the code sent to your device</p>
        <div
          className="otp-input-container"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            margin: "1.5rem 0",
          }}
        >
          {[...Array(4)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              style={{
                width: "3rem",
                height: "3rem",
                fontSize: "1.5rem",
                textAlign: "center",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          ))}
        </div>
        <button
          className="verify-btn"
          style={{
            backgroundColor: svgColor, // Using the dynamic color
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Otp;
