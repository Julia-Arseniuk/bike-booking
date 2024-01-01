const idGen = (bikes) => {
  const name = "Bike";
  const year = new Date().getFullYear();
  let num = 0;
  let id = "";

  if (bikes.length === 0) {
    return `${name}-${year}-0001`;
  }

  if (bikes.length === 1) {
    num = (+bikes[0].id.slice(-4) + 1).toString().padStart(4, "0");
    return `${name}-${year}-${num}`;
  }

  let max = bikes.reduce((acc, cur) => {
    return Math.max(acc, +cur.id.slice(-4));
  }, 0);

  num = (++max).toString().padStart(4, "0");

  id = `${name}-${year}-${num}`;
  return id;
};

export default idGen;
