function drainFlowIO() {
  // data input and unit conversion to SI units

  let rho = convertDensity(
    parseFloat(document.getElementById("rho_val").value),
    document.getElementById("rho_unit").value,
    "kg$m3"
  );

  let muUse = document.getElementById("mu_use").checked;
  let nuUse = document.getElementById("nu_use").checked;

  let mu, nu;

  if (muUse) {
    mu = convertDynViscosity(
      parseFloat(document.getElementById("mu_val").value),
      document.getElementById("mu_unit").value,
      "Pa_s"
    );
    nu = mu / rho;
  }

  if (nuUse) {
    nu = convertKinViscosity(
      parseFloat(document.getElementById("nu_val").value),
      document.getElementById("nu_unit").value,
      "m2$s"
    );
    mu = nu * rho;
  }

  let slope = convertSlope(
    parseFloat(document.getElementById("slope_val").value),
    document.getElementById("slope_unit").value,
    "m$m"
  );

  let fill = parseFloat(document.getElementById("fill_val").value) / 100;

  let k = convertLength(
    parseFloat(document.getElementById("k_val").value),
    document.getElementById("k_unit").value,
    "m"
  );

  let pipeUse = document.getElementById("pipe_use").checked;
  let ductUse = document.getElementById("duct_use").checked;

  let aFlow, pWet, dHyd;

  if (pipeUse) {
    let dPipe = convertLength(
      parseFloat(document.getElementById("d_pipe_val").value),
      document.getElementById("d_pipe_unit").value,
      "m"
    );

    // calculation - Gemometry
    aFlow = circSegArea1(dPipe / 2, fill * dPipe); // flow area
    pWet = circSegArc1(dPipe / 2, fill * dPipe); // wetted perimeter
    dHyd = (4 * aFlow) / pWet; // hydraulic diameter
  }

  if (ductUse) {
    let wDuct = convertLength(
      parseFloat(document.getElementById("w_duct_val").value),
      document.getElementById("wh_duct_unit").value,
      "m"
    );
    let hDuct = convertLength(
      parseFloat(document.getElementById("h_duct_val").value),
      document.getElementById("wh_duct_unit").value,
      "m"
    );

    // calculation - Gemometry
    aFlow = wDuct * hDuct * fill; // flow area
    if (fill == 1) {
      pWet = 2 * wDuct + 2 * hDuct; // wetted perimeter full duct
    } else {
      pWet = wDuct + 2 * hDuct * fill; // wetted perimeter partially filled duct
    }
    dHyd = (4 * aFlow) / pWet; // hydraulic diameter
  }

  // parameter for iteration
  let i = 0; // number of iterations
  let err = 1; // relative error
  let c = 0.1; // initial flow velocity for iteration
  let c_new; // new calculated flow velocity
  let f_iter_acc = 0; // accumulate number of friction factor iterations
  let re, f, regime;

  while (err > 1e-6 && i < 100) {
    // calculation - Reynolds number
    re = reynolds(c, nu, dHyd);

    // calculation - friction factor
    if (re < 2300) {
      // laminar flow
      f = fLaminar(re);
      regime = "laminar";
    } else if (re > 4000) {
      // turbulent flow
      f = fColebrookWhite(k, dHyd, re);
      regime = "turbulent";
    } else {
      // transitional flow
      f = fTransition(k, dHyd, re);
      regime = "trans. (" + f[2].toFixed(2) + ")";
    }

    // calculation flow velocity (Darcy–Weisbach)
    c_new = Math.sqrt((2 * 9.81 * dHyd * slope) / f[0]);
    err = Math.abs((c_new - c) / c_new);
    c = c_new;
    f_iter_acc += f[1];
    i++;
  }

  // calculation - volumetric and mass flow rate
  let vf = aFlow * c;
  let mf = vf * rho;

  // data output
  document.getElementById("nu_val").value = convertKinViscosity(
    nu,
    "m2$s",
    document.getElementById("nu_unit").value
  ).toPrecision(5);

  document.getElementById("mu_val").value = convertDynViscosity(
    mu,
    "Pa_s",
    document.getElementById("mu_unit").value
  ).toPrecision(5);

  document.getElementById("re_val").value = Math.round(re);
  document.getElementById("re_iter_val").value = i;
  document.getElementById("f_val").value = f[0].toFixed(5);
  document.getElementById("f_iter_val").value = f_iter_acc;
  document.getElementById("reg_val").value = regime;

  document.getElementById("c_val").value = convertVelocity(
    c,
    "m$s",
    document.getElementById("c_unit").value
  ).toPrecision(5);

  document.getElementById("vf_val").value = convertVolumeFlowRate(
    vf,
    "m3$s",
    document.getElementById("vf_unit").value
  ).toPrecision(5);

  document.getElementById("mf_val").value = convertMassFlowRate(
    mf,
    "kg$s",
    document.getElementById("mf_unit").value
  ).toPrecision(5);
}
