function gnielinski(re, pr) {
  const f = (-1.8 * Math.log10(re) - 1.5) ** -2;
  return (
    ((f / 8) * re * pr) / (1 + 12.7 * (f / 8) ** (1 / 2) * (pr ** (2 / 3) - 1))
  );
}
