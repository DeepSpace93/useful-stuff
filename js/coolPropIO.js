function coolPropIO() {

	// decimals results are rounded to
	let decimals = parseInt(document.getElementById("decimals").value);

	// data input and unit conversion to SI units
	let fluid = document.getElementById("fluid").value;

	let TIn = convertTemperature(
		parseFloat(document.getElementById("T_in").value),
		document.getElementById("T_unit_in").value,
		"K"
	);

	let pIn = convertPressure(
		parseFloat(document.getElementById("p_in").value),
		document.getElementById("p_unit_in").value,
		"Pa",
		document.getElementById("p_abs_in").value,
		"abs"
	);

	// calculations by CoolProp
	// phase
	let phaseIdx = Module.PropsSI("PHASE", "T", TIn, "P", pIn, fluid);
	// specific internal energy
	let uOut = Module.PropsSI("U", "T", TIn, "P", pIn, fluid);
	// specific enthalpy
	let hOut = Module.PropsSI("H", "T", TIn, "P", pIn, fluid);
	// specific entropy
	let sOut = Module.PropsSI("S", "T", TIn, "P", pIn, fluid);
	// density
	let rhoOut = Module.PropsSI("D", "T", TIn, "P", pIn, fluid);
	let cvOut = Module.PropsSI("CVMASS", "T", TIn, "P", pIn, fluid);
	let cpOut = Module.PropsSI("CPMASS", "T", TIn, "P", pIn, fluid);
	let TCritOut = Module.PropsSI("TCRIT", "T", TIn, "P", pIn, fluid);
	let pCritOut = Module.PropsSI("PCRIT", "T", TIn, "P", pIn, fluid);
	let rhoCritOut = Module.PropsSI("RHOCRIT", "T", TIn, "P", pIn, fluid);
	// dynamic viscosity
	let muOut = Module.PropsSI("V", "T", TIn, "P", pIn, fluid);
	let lambdaOut = Module.PropsSI("L", "T", TIn, "P", pIn, fluid);
	let csOut = Module.PropsSI("A", "T", TIn, "P", pIn, fluid);

	// convert phase Index to phase name
	let phase = "undefined";

	switch (phaseIdx) {
		case 0:
			phase = "liquid";
			break;
		case 1:
			phase = "supercritical";
			break;
		case 2:
			phase = "supercritical-gas";
			break;
		case 3:
			phase = "supercritical-liquid";
			break;
		case 5:
			phase = "gas";
			break;
		case 6:
			phase = "two-phase";
			break;
	}

	// calculate heat capacity ratio
	let gammaOut = cpOut / cvOut;

	// calculate kinematic viscosity
	let nuOut = muOut / rhoOut;

	// calculate thermal diffusivity
	let aOut = lambdaOut / (rhoOut * cpOut);

	// calculate Prandtl number
	let PrOut = nuOut / aOut;

	// convert units and output calculated values

	// phase name
	document.getElementById("phase").value = phase;

	// specific internal energy
	document.getElementById("u_out").value = convertSpecificEnergy(
		uOut,
		"J$kg",
		document.getElementById("u_unit_out").value
	).toFixed(decimals);

	// specific enthalpy
	document.getElementById("h_out").value = convertSpecificEnergy(
		hOut,
		"J$kg",
		document.getElementById("h_unit_out").value
	).toFixed(decimals);

	// specific entropy
	document.getElementById("s_out").value = convertSpecificHeatCapacity(
		sOut,
		"J$kg$K",
		document.getElementById("s_unit_out").value
	).toFixed(decimals);

	// density and specific volume
	document.getElementById("rho_out").value = convertDensitySpecificVolume(
		rhoOut,
		"kg$m3",
		document.getElementById("rho_unit_out").value
	).toFixed(decimals);

	// specific heat capacity at constant volume
	document.getElementById("cv_out").value = convertSpecificHeatCapacity(
		cvOut,
		"J$kg$K",
		document.getElementById("cv_unit_out").value
	).toFixed(decimals);

	// specific heat capacity at constant pressure
	document.getElementById("cp_out").value = convertSpecificHeatCapacity(
		cpOut,
		"J$kg$K",
		document.getElementById("cp_unit_out").value
	).toFixed(decimals);

	// ratio of specific heats
	document.getElementById("gamma_out").value = gammaOut.toFixed(decimals);

	// critical temperature
	document.getElementById("T_crit_out").value = convertTemperature(
		TCritOut,
		"K",
		document.getElementById("T_crit_unit_out").value
	).toFixed(decimals);

	// critical pressure
	document.getElementById("p_crit_out").value = convertPressure(
		pCritOut,
		"Pa",
		document.getElementById("p_crit_unit_out").value
	).toFixed(decimals);

	// critical density and specific volume
	document.getElementById("rho_crit_out").value = convertDensitySpecificVolume(
		rhoCritOut,
		"kg$m3",
		document.getElementById("rho_crit_unit_out").value
	).toFixed(decimals);

	// dynamic viscosity
	document.getElementById("mu_out").value = convertDynamicViscosity(
		muOut,
		"Pa_s",
		document.getElementById("mu_unit_out").value
	).toFixed(decimals);

	// kinematic viscosity
	document.getElementById("nu_out").value = convertKinematicViscosity(
		nuOut,
		"m2$s",
		document.getElementById("nu_unit_out").value
	).toFixed(decimals);

	// thermal conductivity
	document.getElementById("lambda_out").value = lambdaOut.toFixed(decimals);

	// thermal diffusivity
	document.getElementById("a_out").value = convertThermalDiffusivity(
		aOut,
		"m2$s",
		document.getElementById("a_unit_out").value
	).toFixed(decimals);;

	// Prandtl number
	document.getElementById("Pr_out").value = PrOut.toFixed(decimals);

	// speed of sound
	document.getElementById("cs_out").value = convertVelocity(
		csOut,
		"m$s",
		document.getElementById("cs_unit_out").value
	).toFixed(decimals);;

}
