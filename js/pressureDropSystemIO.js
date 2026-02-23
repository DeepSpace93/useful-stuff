function pressureDropSystemIO() {

  // input density
  let rho = convertDensitySpecificVolume(
    parseFloat(document.getElementById("rho_val").value),
    document.getElementById("rho_unit").value,
    "kg$m3"
  );

  // input hydraulic head
  let h = convertLength(
    parseFloat(document.getElementById("head_val").value),
    document.getElementById("head_unit").value,
    "m"
  );

  // input component 1
  let zetaComp1 = parseFloat(document.getElementById("zeta_comp_1").value)
  let nComp1 = parseFloat(document.getElementById("count_comp_1").value)
  let cComp1 = parseFloat(document.getElementById("c_comp_1").value)
  let dpComp1 = (1 / 2 * zetaComp1 * rho * cComp1 ** 2) * nComp1

  // input component 2
  let zetaComp2 = parseFloat(document.getElementById("zeta_comp_2").value)
  let nComp2 = parseFloat(document.getElementById("count_comp_2").value)
  let cComp2 = parseFloat(document.getElementById("c_comp_2").value)
  let dpComp2 = (1 / 2 * zetaComp2 * rho * cComp2 ** 2) * nComp2

  // input component 3
  let zetaComp3 = parseFloat(document.getElementById("zeta_comp_3").value)
  let nComp3 = parseFloat(document.getElementById("count_comp_3").value)
  let cComp3 = parseFloat(document.getElementById("c_comp_3").value)
  let dpComp3 = (1 / 2 * zetaComp3 * rho * cComp3 ** 2) * nComp3

  // input component 4
  let zetaComp4 = parseFloat(document.getElementById("zeta_comp_4").value)
  let nComp4 = parseFloat(document.getElementById("count_comp_4").value)
  let cComp4 = parseFloat(document.getElementById("c_comp_4").value)
  let dpComp4 = (1 / 2 * zetaComp4 * rho * cComp4 ** 2) * nComp4

  // input component 5
  let zetaComp5 = parseFloat(document.getElementById("zeta_comp_5").value)
  let nComp5 = parseFloat(document.getElementById("count_comp_5").value)
  let cComp5 = parseFloat(document.getElementById("c_comp_5").value)
  let dpComp5 = (1 / 2 * zetaComp5 * rho * cComp5 ** 2) * nComp5

  // calculate sum of component pressure drops
  let dpCompSum = dpComp1 + dpComp2 + dpComp3 + dpComp4 + dpComp5
  document.getElementById("dp_comp").value = (dpCompSum / 1e5).toFixed(4);

  // output component 1
  document.getElementById("dp_comp_1").value = (dpComp1 / 1e5).toFixed(4);
  document.getElementById("dp$dp_1").value = ((dpComp1 / dpCompSum * 100).toFixed(1)) + "%";

  // output component 2
  document.getElementById("dp_comp_2").value = (dpComp2 / 1e5).toFixed(4);
  document.getElementById("dp$dp_2").value = ((dpComp2 / dpCompSum * 100).toFixed(1)) + "%";

  // output component 3
  document.getElementById("dp_comp_3").value = (dpComp3 / 1e5).toFixed(4);
  document.getElementById("dp$dp_3").value = ((dpComp3 / dpCompSum * 100).toFixed(1)) + "%";

  // output component 4
  document.getElementById("dp_comp_4").value = (dpComp4 / 1e5).toFixed(4);
  document.getElementById("dp$dp_4").value = ((dpComp4 / dpCompSum * 100).toFixed(1)) + "%";

  // output component 5
  document.getElementById("dp_comp_5").value = (dpComp5 / 1e5).toFixed(4);
  document.getElementById("dp$dp_5").value = ((dpComp5 / dpCompSum * 100).toFixed(1)) + "%";

  // calculate static pressure drop
  let dpStat = rho * h * 9.81
  document.getElementById("dp_stat").value = (dpStat / 1e5).toFixed(4);

  // calculate sum of pressure drops
  let dpSum = dpCompSum + dpStat
  document.getElementById("dp_sum").value = (dpSum / 1e5).toFixed(4);

}
