function saturationIO() {
  // data input and unit conversion to SI units

  // decimals results are rounded to
  let decimals = parseInt(document.getElementById("decimals").value);

  // data input and unit conversion to SI units
  let fluid = document.getElementById("fluid").value;

  let TUse = document.getElementById("T_use").checked;
  let pUse = document.getElementById("p_use").checked;

  let T, p;

  if (TUse) {
    T = convertTemperature(
      parseFloat(document.getElementById("T").value),
      document.getElementById("T_unit").value,
      "K"
    );
  }

  if (pUse) {
    p = convertPressure(
      parseFloat(document.getElementById("p").value),
      document.getElementById("p_unit").value,
      "Pa",
      document.getElementById("p_abs").value,
      "abs"
    );

    T = Module.PropsSI("T", "P", p, "Q", 1.0, fluid);
  }

  // calculations by CoolProp
  p = Module.PropsSI("P", "T", T, "Q", 1.0, fluid);

  let rho_liq = Module.PropsSI("D", "T", T, "Q", 0.0, fluid);
  let rho_vap = Module.PropsSI("D", "T", T, "Q", 1.0, fluid);

  let u_liq = Module.PropsSI("U", "T", T, "Q", 0.0, fluid);
  let u_vap = Module.PropsSI("U", "T", T, "Q", 1.0, fluid);

  let h_liq = Module.PropsSI("H", "T", T, "Q", 0.0, fluid);
  let h_vap = Module.PropsSI("H", "T", T, "Q", 1.0, fluid);

  let s_liq = Module.PropsSI("S", "T", T, "Q", 0.0, fluid);
  let s_vap = Module.PropsSI("S", "T", T, "Q", 1.0, fluid);

  // output
  // temperature
  document.getElementById("T").value = convertTemperature(
    T,
    "K",
    document.getElementById("T_unit").value
  ).toFixed(decimals);

  // presure
  document.getElementById("p").value = convertPressure(
    p,
    "Pa",
    document.getElementById("p_unit").value,
    "abs",
    document.getElementById("p_abs").value
  ).toFixed(decimals);

  // density and specific volume
  document.getElementById("rho_liq").value = convertDensitySpecificVolume(
    rho_liq,
    "kg$m3",
    document.getElementById("rho_unit").value
  ).toFixed(decimals);

  document.getElementById("rho_vap").value = convertDensitySpecificVolume(
    rho_vap,
    "kg$m3",
    document.getElementById("rho_unit").value
  ).toFixed(decimals);

  // specific internal energy
  document.getElementById("u_liq").value = convertSpecificEnergy(
    u_liq,
    "J$kg",
    document.getElementById("u_unit").value
  ).toFixed(decimals);

  document.getElementById("u_vap").value = convertSpecificEnergy(
    u_vap,
    "J$kg",
    document.getElementById("u_unit").value
  ).toFixed(decimals);

  // specific enthalpy
  document.getElementById("h_liq").value = convertSpecificEnergy(
    h_liq,
    "J$kg",
    document.getElementById("h_unit").value
  ).toFixed(decimals);

  document.getElementById("h_vap").value = convertSpecificEnergy(
    h_vap,
    "J$kg",
    document.getElementById("h_unit").value
  ).toFixed(decimals);

  // specific entropy
  document.getElementById("s_liq").value = convertSpecificHeatCapacity(
    s_liq,
    "J$kg$K",
    document.getElementById("s_unit").value
  ).toFixed(decimals);

  document.getElementById("s_vap").value = convertSpecificHeatCapacity(
    s_vap,
    "J$kg$K",
    document.getElementById("s_unit").value
  ).toFixed(decimals);

}
