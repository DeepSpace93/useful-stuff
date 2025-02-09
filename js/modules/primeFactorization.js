function primeFactorization(n) {
  let factors = [];

  // Check for the number of 2s that divide n
  while (n % 2 === 0) {
    factors.push(2);
    n /= 2;
  }

  // n must be odd at this point, so we can skip even numbers
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    // While i divides n, append i and divide n
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }

  // This condition is to check if n is a prime number greater than 2
  if (n > 2) {
    factors.push(n);
  }

  return factors;
}