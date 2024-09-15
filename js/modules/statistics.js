function randomNumberUniform(min = 0, max = 1, dec = 6) {
  const multi = 10 ** dec;
  return Math.round((Math.random() * (max - min) + min) * multi) / multi;
}

function randomNumberGaussian(mean = 0, stdDev = 1) {
  let u1, u2;

  do {
    u1 = Math.random();
    u2 = Math.random();
  } while (u1 === 0); // ensure u1 is not 0 to prevent taking the logarithm of 0

  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  //const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

  return mean + z0 * stdDev;
}

function arithmeticMean(sample) {
  return sample.reduce((acc, val) => acc + val, 0) / sample.length;
}

function median(sample) {
  const sample2 = [...sample]; // copy to new array for sorting
  sample2.sort((a, b) => a - b);
  const middleIndex = Math.floor(sample2.length / 2);

  if (sample2.length % 2 != 0) {
    return sample2[middleIndex];
  } else {
    return (sample2[middleIndex] + sample2[middleIndex - 1]) / 2;
  }
}

function standardDeviation(sample) {
  const mean = arithmeticMean(sample);
  return Math.sqrt(
    sample
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (sample.length - 1)
  );
}
