function primeFactorizationIO() {

  const val = parseInt(document.getElementById("int").value);
  const delim = document.getElementById("delim").value;

  let fac = primeFactorization(val);
  let facOut;

  switch (delim) {
    case "newline":
      facOut = fac.join("<br>");
      break;
    case "space":
      facOut = fac.join(" ");
      break;
    case "pipe":
      facOut = fac.join(" | ");
      break;
    case "comma":
      facOut = fac.join(", ");
      break;
  }

  document.getElementById("fac").innerHTML = facOut;
}
