export function getRandomColor() {
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33e1', '#33d1ff']; 
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }