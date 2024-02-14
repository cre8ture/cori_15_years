# Project Title: Visualizing Wind Patterns

This project is a unique blend of data visualization and web scraping, aimed at visually documenting wind patterns over time. It pulls wind data from Brooklyn, NYC, and uses information from various Wikipedia pages on weather patterns to create a dynamic and interactive representation of these patterns.

## Data Sources

1. **Wind Data**: The wind data is sourced from a weather API that provides real-time data for Brooklyn, NYC. This data includes wind speed, direction, and other related parameters.

2. **Weather Patterns**: Information about various weather patterns is scraped from their respective Wikipedia pages. This information is used to provide context and enhance the understanding of the visualized wind patterns.

## Visualization

The visualization is created using JavaScript and the Canvas API. Each wind data point is represented as a particle on the canvas. The position and movement of these particles are determined by the wind speed and direction data.

## Algorithms

The main algorithm used in this project is a particle system simulation. Each particle's position is updated based on the wind data. The particles are also influenced by various factors such as gravity and wind resistance, which are modeled using basic physics equations.

In addition, an algorithm is used to determine the interaction between particles and the mouse cursor. When the cursor is close to a particle, the particle is attracted to the cursor, creating an interactive experience.

## Future Work

This project serves as a foundation for more complex weather visualization projects. Future work could include visualizing other weather parameters, integrating more data sources, and improving the interactivity of the visualization.

## Conclusion

This project provides a unique and interactive way to visualize wind patterns. By combining real-time data with information from Wikipedia, it offers a comprehensive view of weather patterns in Brooklyn, NYC.