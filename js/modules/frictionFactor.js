function reynolds(c, nu, d) {
  return (c * d) / nu;
}

function fLaminar(re) {
  return [64 / re, 0];
}

function fColebrookWhite(k, d, re) {
  let i = 0;
  let err = 1;
  let f = 0.01;
  let f_new;

  while (err > 1e-6 && i < 100) {
    f_new =
      1 / (2 * Math.log10(2.51 / (re * Math.sqrt(f)) + k / (3.7 * d))) ** 2;
    err = Math.abs((f_new - f) / f_new);
    f = f_new;
    i++;
  }

  return [f, i];
}

function fTransition(k, d, re) {
  let bf = (re - 2300) / (4000 - 2300); //blending factor
  let fLam = fLaminar(re);
  let fTurb = fColebrookWhite(k, d, re);
  return [fLam[0] * (1 - bf) + fTurb[0] * bf, fTurb[1], bf];
}
