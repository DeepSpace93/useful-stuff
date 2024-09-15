function unitConversionIO() {
  let quantity = document.getElementById("quantity").value;
  let precision = parseInt(document.getElementById("precision").value);
  let valueIn = parseFloat(document.getElementById("value_in").value);
  let unitIn = document.getElementById("unit_in").value;
  let unitOut = document.getElementById("unit_out").value;

  let valueOut = 666;

  switch (quantity) {
    case "area":
      valueOut = convertArea(valueIn, unitIn, unitOut);
      break;
    case "angle":
      valueOut = convertAngle(valueIn, unitIn, unitOut);
      break;
    case "charge":
      valueOut = convertCharge(valueIn, unitIn, unitOut);
      break;
    case "density":
      valueOut = convertDensity(valueIn, unitIn, unitOut);
      break;
    case "dyn_viscosity":
      valueOut = convertDynViscosity(valueIn, unitIn, unitOut);
      break;
    case "energy":
      valueOut = convertEnergy(valueIn, unitIn, unitOut);
      break;
    case "frequency_period":
      valueOut = convertFrequencyPeriod(valueIn, unitIn, unitOut);
      break;
    case "force":
      valueOut = convertForce(valueIn, unitIn, unitOut);
      break;
    case "kin_viscosity":
      valueOut = convertKinViscosity(valueIn, unitIn, unitOut);
      break;
    case "length":
      valueOut = convertLength(valueIn, unitIn, unitOut);
      break;
    case "mass":
      valueOut = convertMass(valueIn, unitIn, unitOut);
      break;
    case "mass_flow_rate":
      valueOut = convertMassFlowRate(valueIn, unitIn, unitOut);
      break;
    case "power":
      valueOut = convertPower(valueIn, unitIn, unitOut);
      break;
    case "pressure":
      let absIn = document.getElementById("abs_in").value;
      let absOut = document.getElementById("abs_out").value;
      valueOut = convertPressure(valueIn, unitIn, unitOut, absIn, absOut);
      break;
    case "resistance_conductance":
      valueOut = convertResistanceConductance(valueIn, unitIn, unitOut);
      break;
    case "slope":
      valueOut = convertSlope(valueIn, unitIn, unitOut);
      break;
    case "temperature":
      valueOut = convertTemperature(valueIn, unitIn, unitOut);
      break;
    case "torque":
      valueOut = convertTorque(valueIn, unitIn, unitOut);
      break;
    case "velocity":
      valueOut = convertVelocity(valueIn, unitIn, unitOut);
      break;
    case "volume":
      valueOut = convertVolume(valueIn, unitIn, unitOut);
      break;
    case "volume_flow_rate":
      valueOut = convertVolumeFlowRate(valueIn, unitIn, unitOut);
      break;
  }

  if (precision > 0) {
    valueOut = valueOut.toPrecision(precision);
  }

  if (precision < 0) {
    valueOut = valueOut.toExponential();
  }

  document.getElementById("value_out").value = valueOut;
}
