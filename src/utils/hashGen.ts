const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

// Generate a new hashcode
export const generateNewHashcode = () => {
  let temp = "";
  for (let i = 0; i <= 20; i++) {
    temp += getRandomInt(0, 9).toString();
  }
  return temp;
};
