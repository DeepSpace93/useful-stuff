function randomNumberUniformIO() {
  const min = parseFloat(document.getElementById("min").value);
  const max = parseFloat(document.getElementById("max").value);
  const n = parseInt(document.getElementById("n").value);
  const dec = parseInt(document.getElementById("decimals").value);
  const delim = document.getElementById("delim").value;
  const sort = document.getElementById("sort_out").checked;

  const rnd = [];

  // generate random numbers
  for (let i = 0; i < n; i++) {
    rnd.push(randomNumberUniform(min, max, dec));
  }

  // sort numbers
  if (sort) {
    rnd.sort((a, b) => a - b);
  }

  // calculate arithmetic mean and median
  const meanOut = arithmeticMean(rnd);
  const medianOut = median(rnd);

  // assemble output string
  let rndOut;

  switch (delim) {
    case "newline":
      rndOut = rnd.join("<br>");
      break;
    case "space":
      rndOut = rnd.join(" ");
      break;
    case "pipe":
      rndOut = rnd.join(" | ");
      break;
    case "comma":
      rndOut = rnd.join(", ");
      break;
  }

  // output
  document.getElementById("arith_mean_calc").value = meanOut;
  document.getElementById("median_calc").value = medianOut;
  document.getElementById("min_calc").value = Math.min(...rnd);
  document.getElementById("max_calc").value = Math.max(...rnd);
  document.getElementById("rnd_out").innerHTML = rndOut;
}
