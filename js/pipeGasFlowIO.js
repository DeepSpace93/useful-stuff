function pipeGasFlowIO(d) {
  // data input and unit conversion to SI units
  const dPipe = convertLength(
    parseFloat(document.getElementById("d_pipe_val").value),
    document.getElementById("d_pipe_unit").value,
    "m"
  );

  const aDuct = convertLength(
    parseFloat(document.getElementById("a_duct_val").value),
    document.getElementById("ab_duct_unit").value,
    "m"
  );

  const bDuct = convertLength(
    parseFloat(document.getElementById("b_duct_val").value),
    document.getElementById("ab_duct_unit").value,
    "m"
  );

  const tPipeDuct = convertLength(
    parseFloat(document.getElementById("t_pipe_duct_val").value),
    document.getElementById("t_pipe_duct_unit").value,
    "m"
  );

  const TRef = convertTemperature(
    parseFloat(document.getElementById("T_ref_val").value),
    document.getElementById("T_ref_unit").value,
    "K"
  );

  const pRef = convertPressure(
    parseFloat(document.getElementById("p_ref_val").value),
    document.getElementById("p_ref_unit").value,
    "Pa",
    document.getElementById("p_ref_abs").value,
    "abs"
  );

  const vfRef = convertVolumeFlowRate(
    parseFloat(document.getElementById("vf_ref_val").value),
    document.getElementById("vf_ref_unit").value,
    "m3$s"
  );

  const TOp = convertTemperature(
    parseFloat(document.getElementById("T_op_val").value),
    document.getElementById("T_op_unit").value,
    "K"
  );

  const pOp = convertPressure(
    parseFloat(document.getElementById("p_op_val").value),
    document.getElementById("p_op_unit").value,
    "Pa",
    document.getElementById("p_op_abs").value,
    "abs"
  );

  // calculation
  const csPipe = (Math.PI / 4) * dPipe ** 2;
  const vfOp = ((pRef * TOp) / (pOp * TRef)) * vfRef;
  const cOp = vfOp / csPipe;

  // output
  document.getElementById("c_op_val").value = d;
  // (convertVelocity(
  //   d,
  //   "m$s",
  //   document.getElementById("c_op_unit").value).toPrecision(5)
  // );

  document.getElementById("vf_op_val").value = convertVolumeFlowRate(
    vfOp,
    "m3$s",
    document.getElementById("vf_op_unit").value
  ).toPrecision(5);
}
