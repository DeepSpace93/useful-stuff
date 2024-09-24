function pressureDropIO() {
  // data input and unit conversion to SI units
  let cUse = document.getElementById("c_use").checked;
  let vfUse = document.getElementById("vf_use").checked;
  let mfUse = document.getElementById("mf_use").checked;
  let mfxUse = document.getElementById("mfx_use").checked;

  let c, vf, mf, mfx;

  if (cUse) {
    c = convertVelocity(
      parseFloat(document.getElementById("c_val").value),
      document.getElementById("c_unit").value,
      "m$s"
    );
  }

  if (vfUse) {
    vf = convertVolumetricFlowRate(
      parseFloat(document.getElementById("vf_val").value),
      document.getElementById("vf_unit").value,
      "m3$s"
    );
  }

  if (mfUse) {
    mf = convertMassFlowRate(
      parseFloat(document.getElementById("mf_val").value),
      document.getElementById("mf_unit").value,
      "kg$s"
    );
  }

  if (mfxUse) {
    mfx = convertMassFlux(
      parseFloat(document.getElementById("mfx_val").value),
      document.getElementById("mfx_unit").value,
      "kg$m2$s"
    );
  }

  let rho = convertDensity(
    parseFloat(document.getElementById("rho_val").value),
    document.getElementById("rho_unit").value,
    "kg$m3"
  );

  let muUse = document.getElementById("mu_use").checked;
  let nuUse = document.getElementById("nu_use").checked;

  let mu, nu;

  if (muUse) {
    mu = convertDynamicViscosity(
      parseFloat(document.getElementById("mu_val").value),
      document.getElementById("mu_unit").value,
      "Pa_s"
    );
  }

  if (nuUse) {
    nu = convertKinematicViscosity(
      parseFloat(document.getElementById("nu_val").value),
      document.getElementById("nu_unit").value,
      "m2$s"
    );
  }

  let l = convertLength(
    parseFloat(document.getElementById("l_val").value),
    document.getElementById("l_unit").value,
    "m"
  );

  let d = convertLength(
    parseFloat(document.getElementById("d_val").value),
    document.getElementById("d_unit").value,
    "m"
  );

  let k = convertLength(
    parseFloat(document.getElementById("k_val").value),
    document.getElementById("k_unit").value,
    "m"
  );

  // convert into other quantities
  let a = (Math.PI / 4) * d ** 2;

  if (cUse) {
    // flow velocity given
    vf = a * c;
    mf = a * c * rho;
    mfx = c * rho;
  }

  if (vfUse) {
    // volumetric flow rate given
    c = vf / a;
    mf = a * c * rho;
    mfx = c * rho;
  }

  if (mfUse) {
    // mass flow rate given
    c = mf / (a * rho);
    vf = a * c;
    mfx = c * rho;
  }

  if (mfxUse) {
    // mass flux given
    c = mfx / rho;
    vf = a * c;
    mf = a * c * rho;
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
  let dp$l = (f * rho * c ** 2) / (2 * d);

  // calculation - absolute pressure drop
  let dp = dp$l * l;

  // calculation - zeta coefficient
  let zeta = (f * d) / l;

  // calculation - power dissipation
  let pow_loss = vf * dp;

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
    a,
    "m2",
    document.getElementById("a_unit").value
  ).toPrecision(5);

  if (re >= 1e5) {
    document.getElementById("re_val").value = re.toPrecision(2);
  } else {
    document.getElementById("re_val").value = Math.round(re);
  }

  document.getElementById("f_val").value = f.toFixed(5);
  document.getElementById("zeta_val").value = zeta.toFixed(8);
  document.getElementById("f_iter_val").value = iter;
  document.getElementById("reg_val").value = regime;

  document.getElementById("dp$l_val").value = dp$l.toFixed(0);

  document.getElementById("dp_val").value = convertPressure(
    dp,
    "Pa",
    document.getElementById("dp_unit").value,
    "rel",
    "rel"
  ).toPrecision(5);

  document.getElementById("P_loss_val").value = convertPower(
    pow_loss,
    "W",
    document.getElementById("P_loss_unit").value
  ).toPrecision(5);
}
