function saturationIO() {
  // data input and unit conversion to SI units
  const fluid = document.getElementById("fluid").value;

  const TUse = document.getElementById("T_use").checked;
  const pUse = document.getElementById("p_use").checked;

  if (TUse) {
    const T = convertTemperature(
      parseFloat(document.getElementById("T").value),
      document.getElementById("T_unit").value,
      "K"
    );

    const p = Module.PropsSI("P", "T", T, "Q", 1.0, fluid);

    document.getElementById("p").value = convertPressure(
      p,
      "Pa",
      document.getElementById("p_unit").value,
      "abs",
      document.getElementById("p_abs").value
    );
  }

  if (pUse) {
    const p = convertPressure(
      parseFloat(document.getElementById("p").value),
      document.getElementById("p_unit").value,
      "Pa",
      document.getElementById("p_abs").value,
      "abs"
    );

    const T = Module.PropsSI("T", "P", p, "Q", 1.0, fluid);

    document.getElementById("T").value = convertTemperature(
      T,
      "K",
      document.getElementById("T_unit").value
    );
  }
}
