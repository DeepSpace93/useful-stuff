function randomNumberGaussianIO() {
  const meanGoal = parseFloat(document.getElementById("mean_goal").value);
  const stdDevGoal = parseFloat(document.getElementById("std_dev_goal").value);
  const n = parseInt(document.getElementById("n").value);
  const delim = document.getElementById("delim").value;
  const sort = document.getElementById("sort_out").checked;

  const rnd = [];

  // generate random numbers
  for (let i = 0; i < n; i++) {
    rnd.push(randomNumberGaussian(meanGoal, stdDevGoal));
  }

  // sort numbers
  if (sort) {
    rnd.sort((a, b) => a - b);
  }

  // calculate arithmetic mean, median and standard deviation
  const meanCalc = arithmeticMean(rnd);
  const medianOut = median(rnd);
  const stdDevCalc = standardDeviation(rnd);

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
  document.getElementById("arith_mean_calc").value = meanCalc;
  document.getElementById("median_calc").value = medianOut;
  document.getElementById("std_dev_calc").value = stdDevCalc;
  document.getElementById("min_calc").value = Math.min(...rnd);
  document.getElementById("max_calc").value = Math.max(...rnd);
  document.getElementById("rnd_out").innerHTML = rndOut;
}
