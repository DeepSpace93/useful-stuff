function dewPointIO() {
  // data input and unit conversion to SI units
  const TAmb = convertTemperature(
    parseFloat(document.getElementById("T_amb").value),
    document.getElementById("T_amb_unit").value,
    "K"
  );

  const phi = parseFloat(document.getElementById("phi").value) / 100;

  const T_dew = Module.HAPropsSI("D", "T", TAmb, "P", 1013.25e2, "R", phi);

  // convert units and output calculated values
  document.getElementById("T_dew").value = convertTemperature(
    T_dew,
    "K",
    document.getElementById("T_dew_unit").value
  );
}
