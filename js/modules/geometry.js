function circSegArea1(r, h) {
  //calculate area of circular segment with given radius (r) and height (h, sagitta)
  return (
    r ** 2 * Math.acos(1 - h / r) - (r - h) * Math.sqrt(2 * r * h - h ** 2)
  );
}

function circSegChord1(r, h) {
  //calculate chord length of circular segment with given radius (r) and height (h, sagitta)
  return 2 * Math.sqrt(2 * r * h - h ** 2);
}

function circSegArc1(r, h) {
  //calculate arc length of circular segment with given radius (r) and height (h, sagitta)
  if (h <= r) {
    return 2 * r * Math.asin(circSegChord1(r, h) / (2 * r));
  } else {
    return 2 * r * Math.PI - (2 * r * Math.asin(circSegChord1(r, h) / (2 * r)));
  }
}

console.log(circSegArc1(1, 1.99));
