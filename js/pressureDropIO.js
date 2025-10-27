function applyFluid() {
  let fluid = document.getElementById("ref_fluid").value;

  let pRef = convertPressure(
    parseFloat(document.getElementById("p_ref_val").value),
    document.getElementById("p_ref_unit").value,
    "Pa",
    document.getElementById("p_ref_abs").value,
    "abs"
  );

  let TRef = convertTemperature(
    parseFloat(document.getElementById("T_ref_val").value),
    document.getElementById("T_ref_unit").value,
    "K"
  );

  let phaseIdx = Module.PropsSI("PHASE", "T", TRef, "P", pRef, fluid);
  let rho = Module.PropsSI("D", "T", TRef, "P", pRef, fluid);
  let mu = Module.PropsSI("V", "T", TRef, "P", pRef, fluid);

  document.getElementById("rho_val").value = rho.toPrecision(5);
  document.getElementById("rho_unit").value = "kg$m3";

  document.getElementById("mu_val").value = (mu * 1e3).toPrecision(5);;
  document.getElementById("mu_unit").value = "mPa_s";
  document.getElementById("mu_use").checked = true;

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

  document.getElementById("ref_fluid_state").value = phase;

}

function pressureDropIO() {
  // data input and unit conversion to SI units
  let cUse = document.getElementById("c_use").checked;
  let vfUse = document.getElementById("vf_use").checked;
  let mfUse = document.getElementById("mf_use").checked;
  let mfxUse = document.getElementById("mfx_use").checked;

  let c, vf, mf, mfx;

  // flow velocity
  if (cUse) {
    c = convertVelocity(
      parseFloat(document.getElementById("c_val").value),
      document.getElementById("c_unit").value,
      "m$s"
    );
  }

  // volumetric flow rate
  if (vfUse) {
    vf = convertVolumetricFlowRate(
      parseFloat(document.getElementById("vf_val").value),
      document.getElementById("vf_unit").value,
      "m3$s"
    );
  }

  // mass flow rate
  if (mfUse) {
    mf = convertMassFlowRate(
      parseFloat(document.getElementById("mf_val").value),
      document.getElementById("mf_unit").value,
      "kg$s"
    );
  }

  // mass flux
  if (mfxUse) {
    mfx = convertMassFlux(
      parseFloat(document.getElementById("mfx_val").value),
      document.getElementById("mfx_unit").value,
      "kg$m2$s"
    );
  }

  // density or specific volume
  let rho = convertDensitySpecificVolume(
    parseFloat(document.getElementById("rho_val").value),
    document.getElementById("rho_unit").value,
    "kg$m3"
  );

  let muUse = document.getElementById("mu_use").checked;
  let nuUse = document.getElementById("nu_use").checked;

  let mu, nu;

  // dynamic viscosity
  if (muUse) {
    mu = convertDynamicViscosity(
      parseFloat(document.getElementById("mu_val").value),
      document.getElementById("mu_unit").value,
      "Pa_s"
    );
  }

  // kinematic viscosity
  if (nuUse) {
    nu = convertKinematicViscosity(
      parseFloat(document.getElementById("nu_val").value),
      document.getElementById("nu_unit").value,
      "m2$s"
    );
  }

  // pipe length
  let l = convertLength(
    parseFloat(document.getElementById("l_val").value),
    document.getElementById("l_unit").value,
    "m"
  );

  // pipe diameter
  let d = convertLength(
    parseFloat(document.getElementById("d_val").value),
    document.getElementById("d_unit").value,
    "m"
  );

  // pipe roughness
  let k = convertLength(
    parseFloat(document.getElementById("k_val").value),
    document.getElementById("k_unit").value,
    "m"
  );

  // component 1 - pressure loss coefficient
  let zetaComp1 = parseFloat(document.getElementById("zeta_comp_1").value)

  // component 1 - number
  let numComp1 = parseFloat(document.getElementById("num_comp_1").value)

  // component 2 - pressure loss coefficient
  let zetaComp2 = parseFloat(document.getElementById("zeta_comp_2").value)

  // component 2 - number
  let numComp2 = parseFloat(document.getElementById("num_comp_2").value)

  // component 3 - pressure loss coefficient
  let zetaComp3 = parseFloat(document.getElementById("zeta_comp_3").value)

  // component 3 - number
  let numComp3 = parseFloat(document.getElementById("num_comp_3").value)

  // convert into other quantities
  let A = (Math.PI / 4) * d ** 2;

  if (cUse) {
    // flow velocity given
    vf = A * c;
    mf = A * c * rho;
    mfx = c * rho;
  }

  if (vfUse) {
    // volumetric flow rate given
    c = vf / A;
    mf = A * c * rho;
    mfx = c * rho;
  }

  if (mfUse) {
    // mass flow rate given
    c = mf / (A * rho);
    vf = A * c;
    mfx = c * rho;
  }

  if (mfxUse) {
    // mass flux given
    c = mfx / rho;
    vf = A * c;
    mf = A * c * rho;
  }

  if (muUse) {
    // dynamic viscosity given
    nu = mu / rho;
  }

  if (nuUse) {
    // kinematic viscosity given
    mu = nu * rho;
  }

  // calculation - Reynolds number
  let re = reynolds(c, nu, d);

  // calculation - friction factor
  let f, iter, regime;
  if (re < 2300) {
    // laminar flow
    [f, iter] = fLaminar(re);
    regime = "laminar";
  } else if (re > 4000) {
    // turbulent flow
    [f, iter] = fColebrookWhite(k, d, re);
    regime = "turbulent";
  } else {
    // transitional flow
    let bf; // blending factor
    [f, iter, bf] = fTransition(k, d, re);
    regime = "transient (" + bf.toFixed(2) + ")";
  }

  // calculation - relative pressure drop (Darcy–Weisbach)
  let dp$lPipe = (f * rho * c ** 2) / (2 * d);

  // calculation - absolute pressure drop
  let dpPipe = dp$lPipe * l;

  // calculation - zeta coefficient
  let zetaPipe = (f * l) / d;

  // calculation - component pressure drop
  let dpComp1 = (1 / 2 * zetaComp1 * rho * c ** 2) * numComp1
  let dpComp2 = (1 / 2 * zetaComp2 * rho * c ** 2) * numComp2
  let dpComp3 = (1 / 2 * zetaComp3 * rho * c ** 2) * numComp3

  let dpCompTot = dpComp1 + dpComp2 + dpComp3

  // total pressure drop
  let dpTot = dpPipe + dpCompTot

  // calculation - power dissipation
  let pow_loss = vf * dpTot;

  // data output
  document.getElementById("c_val").value = convertVelocity(
    c,
    "m$s",
    document.getElementById("c_unit").value
  ).toPrecision(5);

  document.getElementById("vf_val").value = convertVolumetricFlowRate(
    vf,
    "m3$s",
    document.getElementById("vf_unit").value
  ).toPrecision(5);

  document.getElementById("mf_val").value = convertMassFlowRate(
    mf,
    "kg$s",
    document.getElementById("mf_unit").value
  ).toPrecision(5);

  document.getElementById("mfx_val").value = convertMassFlux(
    mfx,
    "kg$m2$s",
    document.getElementById("mfx_unit").value
  ).toPrecision(5);

  document.getElementById("nu_val").value = convertKinematicViscosity(
    nu,
    "m2$s",
    document.getElementById("nu_unit").value
  ).toPrecision(5);

  document.getElementById("mu_val").value = convertDynamicViscosity(
    mu,
    "Pa_s",
    document.getElementById("mu_unit").value
  ).toPrecision(5);

  document.getElementById("a_val").value = convertArea(
    A,
    "m2",
    document.getElementById("a_unit").value
  ).toPrecision(5);

  if (re >= 1e5) {
    document.getElementById("re_val").value = re.toPrecision(2);
  } else {
    document.getElementById("re_val").value = Math.round(re);
  }

  document.getElementById("f_val").value = f.toFixed(5);
  document.getElementById("zeta_val").value = zetaPipe.toFixed(8);
  document.getElementById("f_iter_val").value = iter;
  document.getElementById("reg_val").value = regime;

  document.getElementById("dp$l_val").value = dp$lPipe.toFixed(0);

  document.getElementById("dp_pipe_val").value = convertPressure(
    dpPipe,
    "Pa",
    document.getElementById("dp_pipe_unit").value,
    "rel",
    "rel"
  ).toPrecision(5);

  document.getElementById("P_loss_val").value = convertPower(
    pow_loss,
    "W",
    document.getElementById("P_loss_unit").value
  ).toPrecision(5);

  document.getElementById("dp_comp_val").value = convertPressure(
    dpCompTot,
    "Pa",
    document.getElementById("dp_comp_unit").value,
    "rel",
    "rel"
  ).toPrecision(5);

  document.getElementById("dp_tot_val").value = convertPressure(
    dpTot,
    "Pa",
    document.getElementById("dp_tot_unit").value,
    "rel",
    "rel"
  ).toPrecision(5);

}
