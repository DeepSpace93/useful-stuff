function coolPropIO() {

  // data input and unit conversion to SI units
  const fluid = document.getElementById("fluid").value;

  const TIn = convertTemperature(
    parseFloat(document.getElementById("T_in").value),
    document.getElementById("T_unit_in").value,
    "K"
  );

  const pIn = convertPressure(
    parseFloat(document.getElementById("p_in").value),
    document.getElementById("p_unit_in").value,
    "Pa",
    document.getElementById("p_abs_in").value,
    "abs"
  );

  // calculations by CoolProp
  const TOut = Module.PropsSI("T", "T", TIn, "P", pIn, fluid);
  const pOut = Module.PropsSI("P", "T", TIn, "P", pIn, fluid);
  const phaseIdx = Module.PropsSI("PHASE", "T", TIn, "P", pIn, fluid);
  const uOut = Module.PropsSI("U", "T", TIn, "P", pIn, fluid);
  const hOut = Module.PropsSI("H", "T", TIn, "P", pIn, fluid);
  const sOut = Module.PropsSI("S", "T", TIn, "P", pIn, fluid);
  const rhoOut = Module.PropsSI("D", "T", TIn, "P", pIn, fluid);
  const cvOut = Module.PropsSI("CVMASS", "T", TIn, "P", pIn, fluid);
  const cpOut = Module.PropsSI("CPMASS", "T", TIn, "P", pIn, fluid);
  const muOut = Module.PropsSI("V", "T", TIn, "P", pIn, fluid);
  const lambdaOut = Module.PropsSI("L", "T", TIn, "P", pIn, fluid);

  // convert phase Index to phase name
  let phase = "undefined";

  switch (phaseIdx) {
    case 0:
      phase = "liquid";
      break;
    case 1:
      phase = "supercritical";
      break;
    case 2:
      phase = "supercritical-gas";
      break;
    case 3:
      phase = "supercritical-liquid";
      break;
    case 5:
      phase = "gas";
      break;
    case 6:
      phase = "two-phase";
      break;
  }

  // calculate specific volume
  const vOut = 1 / rhoOut;

  // calculate kinematic viscosity
  const nuOut = muOut / rhoOut;

  // calculate thermal diffusivity
  const aOut = lambdaOut / (rhoOut * cpOut);

  // calculate Prandtl number
  const PrOut = nuOut / aOut;

  // convert units and output calculated values
  document.getElementById("T_out").value = convertTemperature(
    TOut,
    "K",
    document.getElementById("T_unit_out").value
  );

  document.getElementById("p_out").value = convertPressure(
    pOut,
    "Pa",
    document.getElementById("p_unit_out").value,
    "abs",
    document.getElementById("p_abs_out").value
  );

  document.getElementById("phase").value = phase;

  document.getElementById("u_out").value = uOut / 1e3;

  document.getElementById("h_out").value = hOut / 1e3;

  document.getElementById("s_out").value = sOut / 1e3;

  document.getElementById("rho_out").value = convertDensity(
    rhoOut,
    "kg$m3",
    document.getElementById("rho_unit_out").value
  );

  document.getElementById("v_out").value = vOut;

  document.getElementById("cv_out").value = cvOut / 1e3;

  document.getElementById("cp_out").value = cpOut / 1e3;

  document.getElementById("mu_out").value = convertDynViscosity(
    muOut,
    "Pa_s",
    document.getElementById("mu_unit_out").value
  );

  document.getElementById("nu_out").value = convertKinViscosity(
    nuOut,
    "m2$s",
    document.getElementById("nu_unit_out").value
  );

  document.getElementById("nu_out").value = convertKinViscosity(
    nuOut,
    "m2$s",
    document.getElementById("nu_unit_out").value
  );

  document.getElementById("lambda_out").value = lambdaOut;

  document.getElementById("a_out").value = aOut*1e6;

  document.getElementById("Pr_out").value = PrOut;

}
