function thermalExpansionLinearIO() {

    let l0 = convertLength(
        parseFloat(document.getElementById("l0_val").value),
        document.getElementById("l0_unit").value,
        "m"
    );

    let dT = convertTemperature(
        parseFloat(document.getElementById("dT_val").value),
        document.getElementById("dT_unit").value,
        "K"
    );

    let CTE = convertCoefficientOfThermalExpansion(
        parseFloat(document.getElementById("CTE_val").value),
        document.getElementById("CTE_unit").value,
        "$K"
    );

    let dl = l0 * dT * CTE;
    let l = l0 + dl;

    document.getElementById("dl_val").value = convertLength(
        dl,
        "m",
        document.getElementById("dl_unit").value
    ).toPrecision(5);

    document.getElementById("l_val").value = convertLength(
        l,
        "m",
        document.getElementById("l_unit").value
    ).toPrecision(5);
}