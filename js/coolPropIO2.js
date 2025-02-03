function coolPropIO() {

  // data input and unit conversion to SI units

  let in1, in2, val1, val2;

  let fluid = document.getElementById("fluid").value;

  if (document.getElementById("T_use1").checked) {
    in1 = "T";
    val1 = convertTemperature(
      parseFloat(document.getElementById("T").value),
      document.getElementById("T_unit").value,
      "K"
    );
  }

  if (document.getElementById("T_use2").checked) {
    in2 = "T";
    val2 = convertTemperature(
      parseFloat(document.getElementById("T").value),
      document.getElementById("T_unit").value,
      "K"
    );
  }

  if (document.getElementById("p_use1").checked) {
    in1 = "P";
    val1 = convertPressure(
      parseFloat(document.getElementById("p").value),
      document.getElementById("p_unit").value,
      "Pa",
      document.getElementById("p_abs").value,
      "abs"
    );
  }

  if (document.getElementById("p_use2").checked) {
    in2 = "P";
    val2 = convertPressure(
      parseFloat(document.getElementById("p").value),
      document.getElementById("p_unit").value,
      "Pa",
      document.getElementById("p_abs").value,
      "abs"
    );
  }

  if (document.getElementById("u_use1").checked) {
    in1 = "U";
    val1 = convertSpecificEnergy(
      parseFloat(document.getElementById("u").value),
      document.getElementById("u_unit").value,
      "J$kg"
    );
  }

  if (document.getElementById("u_use2").checked) {
    in2 = "U";
    val2 = convertSpecificEnergy(
      parseFloat(document.getElementById("u").value),
      document.getElementById("u_unit").value,
      "J$kg"
    );
  }

  if (document.getElementById("h_use1").checked) {
    in1 = "H";
    val1 = convertSpecificEnergy(
      parseFloat(document.getElementById("h").value),
      document.getElementById("h_unit").value,
      "J$kg"
    );
  }

  if (document.getElementById("h_use2").checked) {
    in2 = "H";
    val2 = convertSpecificEnergy(
      parseFloat(document.getElementById("h").value),
      document.getElementById("h_unit").value,
      "J$kg"
    );
  }

  if (document.getElementById("s_use1").checked) {
    in1 = "S";
    val1 = convertSpecificEntropy(
      parseFloat(document.getElementById("s").value),
      document.getElementById("s_unit").value,
      "J$kg$K"
    );
  }

  if (document.getElementById("s_use2").checked) {
    in2 = "S";
    val2 = convertSpecificEntropy(
      parseFloat(document.getElementById("s").value),
      document.getElementById("s_unit").value,
      "J$kg$K"
    );
  }

  if (document.getElementById("q_use1").checked) {
    in1 = "Q";
    val1 = convertFraction(
      parseFloat(document.getElementById("q").value),
      document.getElementById("q_unit").value,
      "unit"
    );
  }

  if (document.getElementById("q_use2").checked) {
    in2 = "Q";
    val2 = convertFraction(
      parseFloat(document.getElementById("q").value),
      document.getElementById("q_unit").value,
      "unit"
    );
  }

  // calculate temperature
  document.getElementById("T").value = convertTemperature(
    Module.PropsSI("T", in1, val1, in2, val2, fluid),
    "K",
    document.getElementById("T_unit").value
  );

  // calculate pressure
  document.getElementById("p").value = convertPressure(
    Module.PropsSI("P", in1, val1, in2, val2, fluid),
    "Pa",
    document.getElementById("p_unit").value,
    "abs",
    document.getElementById("p_abs").value
  );

  // calculate specific internal energy
  document.getElementById("u").value = convertSpecificEnergy(
    Module.PropsSI("U", in1, val1, in2, val2, fluid),
    "J$kg",
    document.getElementById("u_unit").value
  );

  // calculate specific enthalpy
  document.getElementById("h").value = convertSpecificEnergy(
    Module.PropsSI("H", in1, val1, in2, val2, fluid),
    "J$kg",
    document.getElementById("h_unit").value
  );

  // calculate specific entropy
  document.getElementById("s").value = convertSpecificHeat(
    Module.PropsSI("S", in1, val1, in2, val2, fluid),
    "J$kg$K",
    document.getElementById("s_unit").value
  );

  // calculate specific vapor quality
  document.getElementById("q").value = convertFraction(
    Module.PropsSI("Q", in1, val1, in2, val2, fluid),
    "unit",
    document.getElementById("q_unit").value
  );

  // calculate phase
  let phase = "undefined";
  switch (Module.PropsSI("PHASE", in1, val1, in2, val2, fluid)) {
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

  document.getElementById("phase").value = phase;


  // calculate density
  let rho = Module.PropsSI("D", in1, val1, in2, val2, fluid);
  document.getElementById("rho").value = convertDensitySpecificVolume(
    rho,
    "kg$m3",
    document.getElementById("rho_unit").value
  );

  // calculate specific volume
  document.getElementById("v").value = convertDensitySpecificVolume(
    rho,
    "kg$m3",
    document.getElementById("v_unit").value
  );

  // calculate specific heat at constant volume
  document.getElementById("cv").value = convertSpecificHeat(
    Module.PropsSI("CVMASS", in1, val1, in2, val2, fluid),
    "J$kg$K",
    document.getElementById("cv_unit").value
  );

  // calculate specific heat at constant volume
  document.getElementById("cp").value = convertSpecificHeat(
    Module.PropsSI("CPMASS", in1, val1, in2, val2, fluid),
    "J$kg$K",
    document.getElementById("cp_unit").value
  );

  /*


  const cvOut = Module.PropsSI("CVMASS", "T", TIn, "P", pIn, fluid);
  const cpOut = Module.PropsSI("CPMASS", "T", TIn, "P", pIn, fluid);
  const muOut = Module.PropsSI("V", "T", TIn, "P", pIn, fluid);
  const lambdaOut = Module.PropsSI("L", "T", TIn, "P", pIn, fluid);

  // convert phase Index to phase name




  // calculate kinematic viscosity
  const nuOut = muOut / rhoOut;

  // calculate thermal diffusivity
  const aOut = lambdaOut / (rhoOut * cpOut);

  // calculate Prandtl number
  const PrOut = nuOut / aOut;

  // convert units and output calculated values




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

  document.getElementById("a_out").value = aOut * 1e6;

  document.getElementById("Pr_out").value = PrOut;
 */
}
