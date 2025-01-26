function referencConditionsIO(sel) {
  // data input and unit conversion to SI units

  let TRef = convertTemperature(
    parseFloat(document.getElementById("T_ref_val").value),
    document.getElementById("T_ref_unit").value,
    "K"
  );

  let pRef = convertPressure(
    parseFloat(document.getElementById("p_ref_val").value),
    document.getElementById("p_ref_unit").value,
    "Pa",
    document.getElementById("p_ref_abs").value,
    "abs"
  );

  let vfRef = convertVolumetricFlowRate(
    parseFloat(document.getElementById("vf_ref_val").value),
    document.getElementById("vf_ref_unit").value,
    "m3$s"
  );

  let TOp = convertTemperature(
    parseFloat(document.getElementById("T_op_val").value),
    document.getElementById("T_op_unit").value,
    "K"
  );

  let pOp = convertPressure(
    parseFloat(document.getElementById("p_op_val").value),
    document.getElementById("p_op_unit").value,
    "Pa",
    document.getElementById("p_op_abs").value,
    "abs"
  );

  let vfOp = convertVolumetricFlowRate(
    parseFloat(document.getElementById("vf_op_val").value),
    document.getElementById("vf_op_unit").value,
    "m3$s"
  );

  // calculation

  if (sel == 1) {

    vfRef = ((pOp * TRef * vfOp) / (pRef * TOp));

    document.getElementById("vf_ref_val").value = convertVolumetricFlowRate(
      vfRef,
      "m3$s",
      document.getElementById("vf_ref_unit").value
    ).toPrecision(5);
  }

  if (sel == 2) {

    vfOp = ((pRef * TOp * vfRef) / (pOp * TRef));

    document.getElementById("vf_op_val").value = convertVolumetricFlowRate(
      vfOp,
      "m3$s",
      document.getElementById("vf_op_unit").value
    ).toPrecision(5);
  }

}
