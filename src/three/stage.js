
export const stage = {

  x: 0.46,        
  y: 0,           
  size: 0.72,     
  explode: 0,     
  glow: 0,        
  drift: 0,       


  intro: 0,       


  active: -1,     
  px: 0,         
  py: 0,
};


export const faceForProject = (i) => (2 + i * 7) % 20;


export const KEYFRAMES = {
  desktop: [
    { x: 0.44, y: 0.0, size: 0.7, explode: 0.0, glow: 0.0 },
    { x: 0.56, y: 0.3, size: 0.4, explode: 0.5, glow: 0.0 },
    { x: 0.5, y: -0.02, size: 0.56, explode: 0.0, glow: 0.35 },
    { x: 0.42, y: 0.0, size: 0.72, explode: 0.0, glow: 1.0 },
  ],
  mobile: [
    { x: 0.0, y: 0.42, size: 0.76, explode: 0.0, glow: 0.0 },
    { x: 0.62, y: 0.62, size: 0.38, explode: 0.45, glow: 0.0 },
    { x: 0.6, y: 0.62, size: 0.44, explode: 0.0, glow: 0.35 },
    { x: 0.0, y: 0.44, size: 0.82, explode: 0.0, glow: 1.0 },
  ],
};
