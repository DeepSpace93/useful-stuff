function drainFlowGMSIO() {

  // data input and unit conversion to SI units

  let slope = convertSlope(
    parseFloat(document.getElementById("slope_val").value),
    document.getElementById("slope_unit").value,
    "m$m"
  );

  let fill = parseFloat(document.getElementById("fill_val").value) / 100;

  let pipeUse = document.getElementById("pipe_use").checked;
  let ductUse = document.getElementById("duct_use").checked;

  let hFill, aFlow, pWet, rHyd, csFill;

  let nGMS = parseFloat(document.getElementById("gms_val").value);

  if (pipeUse) {
    let dPipe = convertLength(
      parseFloat(document.getElementById("d_pipe_val").value),
      document.getElementById("d_pipe_unit").value,
      "m"
    );

    // calculation - Gemometry
    hFill = fill * dPipe;
    aFlow = circSegArea1(dPipe / 2, hFill); // flow area
    pWet = circSegArc1(dPipe / 2, hFill); // wetted perimeter
    rHyd = aFlow / pWet; // hydraulic radius
    csFill = aFlow / circArea1(dPipe / 2);
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
    hFill = fill * hDuct;
    aFlow = wDuct * hFill; // flow area
    if (fill == 1) {
      pWet = 2 * wDuct + 2 * hDuct; // wetted perimeter full duct
    } else {
      pWet = wDuct + 2 * hFill; // wetted perimeter partially filled duct
    }
    rHyd = aFlow / pWet; // hydraulic radius
    csFill = fill;
  }

  c = (1 / nGMS) * rHyd ** (2 / 3) * slope ** (1 / 2);

  // calculation of Forude number
  let fr = c / (Math.sqrt(9.81 * hFill));

  // calculation - volumetric flow rate
  let vf = aFlow * c;

  document.getElementById("a_flow_val").value = convertArea(
    aFlow,
    "m2",
    document.getElementById("a_flow_unit").value
  ).toPrecision(5);

  document.getElementById("a_fill_val").value = (csFill * 100).toPrecision(5);

  document.getElementById("fr_val").value = fr.toFixed(5);

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

}
