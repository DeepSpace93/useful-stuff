function orificeIO() {
    // data input and unit conversion to SI units

    let pUp = convertPressure(
        parseFloat(document.getElementById("p_up_val").value),
        document.getElementById("p_up_unit").value,
        "Pa",
        document.getElementById("p_up_abs").value,
        "abs"
    );

    let pDown = convertPressure(
        parseFloat(document.getElementById("p_down_val").value),
        document.getElementById("p_down_unit").value,
        "Pa",
        document.getElementById("p_down_abs").value,
        "abs"
    );

    let T = convertTemperature(
        parseFloat(document.getElementById("T_val").value),
        document.getElementById("T_unit").value,
        "K",
    );

    let rho = convertDensitySpecificVolume(
        parseFloat(document.getElementById("rho_val").value),
        document.getElementById("rho_unit").value,
        "kg$m3",
    );

    let kappa = parseFloat(document.getElementById("kappa_val").value);

    let RSpec = parseFloat(document.getElementById("R_spec_val").value);

    let cD = parseFloat(document.getElementById("cd_val").value);

    let vf = convertVolumetricFlowRate(
        parseFloat(document.getElementById("vf_val").value),
        document.getElementById("vf_unit").value,
        "m3$s",
    );

    // calculation

    let mf = rho * vf

    let A = mf / (cD * pUp * Math.sqrt(kappa / (RSpec * T) * (2 / (kappa + 1)) ** ((kappa + 1) / (kappa - 1))))

    let d = Math.sqrt(4*A/Math.PI)

    // data output

    document.getElementById("a_val").value = convertArea(
        A,
        "m2",
        document.getElementById("a_unit").value
    ).toPrecision(5);

    document.getElementById("d_val").value = convertLength(
        d,
        "m",
        document.getElementById("d_unit").value
    ).toPrecision(5);
}
