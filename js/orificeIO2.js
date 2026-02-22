function orificeIO() {
    // data input and unit conversion to SI units

    // get upstream pressure
    let pUp = convertPressure(
        parseFloat(document.getElementById("p_up_val").value),
        document.getElementById("p_up_unit").value,
        "Pa",
        document.getElementById("p_up_abs").value,
        "abs"
    );

    // get downstream pressure
    let pDown = convertPressure(
        parseFloat(document.getElementById("p_down_val").value),
        document.getElementById("p_down_unit").value,
        "Pa",
        document.getElementById("p_down_abs").value,
        "abs"
    );

    // get temperature
    let T = convertTemperature(
        parseFloat(document.getElementById("T_val").value),
        document.getElementById("T_unit").value,
        "K",
    );

    // get density
    let rho = convertDensitySpecificVolume(
        parseFloat(document.getElementById("rho_val").value),
        document.getElementById("rho_unit").value,
        "kg$m3",
    );

    // get heat capacity ratio
    let gamma = parseFloat(document.getElementById("gamma_val").value);

    // get specific gas constant
    let Rs = convertSpecificHeatCapacity(
        parseFloat(document.getElementById("R_s_val").value),
        document.getElementById("R_s_unit").value,
        "J$kg$K",
    );

    // get discharge coefficient
    let C = parseFloat(document.getElementById("C_val").value);

    // get orifice hole diameter
    let d = convertLength(
        parseFloat(document.getElementById("d_val").value),
        document.getElementById("d_unit").value,
        "m",
    );

    let A = Math.PI / 4 * d ** 2

    document.getElementById("a_val").value = convertArea(
        A,
        "m2",
        document.getElementById("a_unit").value
    ).toPrecision(5);

    // calculation

    let cond, mf;

    if ((pUp / pDown) >= (((gamma + 1) / 2) ** (gamma / (gamma - 1)))) {
        cond = "choked"
        mf = pUp * A * C * Math.sqrt(gamma / (Rs * T) * (2 / (gamma + 1)) ** ((gamma + 1) / (gamma - 1)))
    }
    else {
        cond = "non-choked"
        mf = pUp * A * C * Math.sqrt(2 * gamma / (Rs * T * (gamma - 1)) * ((pDown / pUp) ** (2 / gamma) - (pDown / pUp) ** ((gamma + 1) / gamma)))
    }

    let vf = mf / rho;

    //output flow conditions
    document.getElementById("cond").value = cond

    // output mass flow rate
    document.getElementById("mf_val").value = convertMassFlowRate(
        mf,
        "kg$s",
        document.getElementById("mf_unit").value
    ).toPrecision(5);

    // output volumetric flow rate
    document.getElementById("vf_val").value = convertVolumetricFlowRate(
        vf,
        "m3$s",
        document.getElementById("vf_unit").value
    ).toPrecision(5);

}
