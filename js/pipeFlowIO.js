function pipeFlowIO(sel) {
    // data input and unit conversion to SI units

    let dPipe = convertLength(
        parseFloat(document.getElementById("d_pipe_val").value),
        document.getElementById("d_pipe_unit").value,
        "m"
    );

    let vf = convertVolumetricFlowRate(
        parseFloat(document.getElementById("vf_val").value),
        document.getElementById("vf_unit").value,
        "m3$s"
    );

    let c = convertVelocity(
        parseFloat(document.getElementById("c_val").value),
        document.getElementById("c_unit").value,
        "m$s"
    );

    // calculation
    let aPipe;

    if (sel == 1) {

        aPipe = vf / c;
        dPipe = Math.sqrt(4 * aPipe / Math.PI);

        document.getElementById("a_pipe_val").value = convertArea(
            aPipe,
            "m2",
            document.getElementById("a_pipe_unit").value
        ).toPrecision(5);

        document.getElementById("d_pipe_val").value = convertLength(
            dPipe,
            "m",
            document.getElementById("d_pipe_unit").value
        ).toPrecision(5);
    }

    if (sel == 2) {

        aPipe = Math.PI / 4 * dPipe ** 2;
        vf = aPipe * c;

        document.getElementById("a_pipe_val").value = convertArea(
            aPipe,
            "m2",
            document.getElementById("a_pipe_unit").value
        ).toPrecision(5);

        document.getElementById("vf_val").value = convertVolumetricFlowRate(
            vf,
            "m3$s",
            document.getElementById("vf_unit").value
        ).toPrecision(5);
    }

    if (sel == 3) {

        aPipe = Math.PI / 4 * dPipe ** 2;
        c = vf / aPipe;

        document.getElementById("a_pipe_val").value = convertArea(
            aPipe,
            "m2",
            document.getElementById("a_pipe_unit").value
        ).toPrecision(5);

        document.getElementById("c_val").value = convertVelocity(
            c,
            "m$s",
            document.getElementById("c_unit").value
        ).toPrecision(5);
    }
}

