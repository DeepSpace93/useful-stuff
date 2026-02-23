function convertAcceleration(valueIn, unitIn, unitOut) {
  const convFactors = {
    m$s2: 1,
    ft$s2: 1/0.3048,
    g0: 1/9.80665,
    gal: 100,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertAmountOfSubstance(valueIn, unitIn, unitOut) {
  const convFactors = {
    mol: 1,
    mmol: 1e3,
    kmol: 1e-3,
    Na: 6.02214076e23,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertAngle(valueIn, unitIn, unitOut) {
  const convFactors = {
    rad: 1,
    mrad: 1e3,
    urad: 1e6,
    deg: 180 / Math.PI,
    rev: 1 / (2 * Math.PI),
    arcmin: 180*60 / Math.PI,
    arcsec: 180*3600 / Math.PI,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertArea(valueIn, unitIn, unitOut) {
  const convFactors = {
    m2: 1,
    mm2: 1e6,
    cm2: 1e4,
    dm2: 100,
    km2: 1e-6,
    a: 1 / 100,
    ha: 1e-4,
    in2: 1 / 0.0254 ** 2,
    ft2: 1 / 0.3048 ** 2,
    yd2: 1 / 0.9144 ** 2,
    mi2: 1 / 1609.344 ** 2,
    acre: 1 / 4046.86,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertCapacitance(valueIn, unitIn, unitOut) {
  const convFactors = {
    F: 1,
    pF: 1e12,
    nF: 1e9,
    uF: 1e6,
    mF: 1e3,
    kF: 1e-3,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertCharge(valueIn, unitIn, unitOut) {
  const convFactors = {
    C: 1, //As
    e: 1.602176634e19,
    mAh: 1 / 3.6,
    Ah: 1 / 3600,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertCoefficientOfThermalExpansion(valueIn, unitIn, unitOut) {
  const convFactors = {
    $K: 1,
    $R: 5 / 9,
    mm$m$K: 1e3,
    um$m$K: 1e6,
    $E6K: 1e6,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertCurrent(valueIn, unitIn, unitOut) {
  const convFactors = {
    A: 1,
    nA: 1e9,
    uA: 1e6,
    mA: 1e3,
    kA: 1e-3,
    MA: 1e-6,
    e$s: 6.241509074e18,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertDensitySpecificVolume(valueIn, unitIn, unitOut) {
  const convFactorsDensity = {
    kg$m3: 1,
    g$cm3: 1 / 1000,
    g$l: 1,
    kg$l: 1 / 1000,
    lb$in3: 1 / 27679.90471,
    lb$ft3: 1 / 16.01846337396,
    slug$ft3: 1 / 515.3788199999872,
  };

  const convFactorsSpecificVolume = {
    m3$kg: 1,
    cm3$g: 1000,
    l$g: 1,
    l$kg: 1000,
    in3$lb: 27679.90471,
    ft3$lb: 16.01846337396,
    ft3$slug: 515.3788199999872,
  };

  let value_kg$m3;

  if (unitIn in convFactorsSpecificVolume) {
    value_kg$m3 = 1 / ((valueIn * convFactorsSpecificVolume["m3$kg"]) / convFactorsSpecificVolume[unitIn]);
  } else {
    value_kg$m3 = (valueIn * convFactorsDensity["kg$m3"]) / convFactorsDensity[unitIn];
  }

  if (unitOut in convFactorsSpecificVolume) {
    return (((1 / value_kg$m3) * convFactorsSpecificVolume[unitOut]) / convFactorsSpecificVolume["m3$kg"]);
  } else {
    return ((value_kg$m3 * convFactorsDensity[unitOut]) / convFactorsDensity["kg$m3"]);
  }
}

function convertDynamicViscosity(valueIn, unitIn, unitOut) {
  const convFactors = {
    Pa_s: 1,
    mPa_s: 1000,
    cP: 1000,
    P: 10,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertEnergy(valueIn, unitIn, unitOut) {
  const convFactors = {
    J: 1,
    mJ: 1e3,
    kJ: 1e-3,
    MJ: 1e-6,
    GJ: 1e-9,
    TJ: 1e-12,
    Wh: 1 / 3.6e3,
    kWh: 1 / 3.6e6,
    MWh: 1 / 3.6e9,
    GWh: 1 / 3.6e12,
    TWh: 1 / 3.6e15,
    SKE: 1 / 29.3076e6,
    toe: 1 / 41.868e6,
    cal: 1 / 4.184,
    kcal: 1 / 4184,
    erg: 1e7,
    BTU: 1 / 1055.05585262,
    eV: 1 / 1.602176634e-19,
    keV: 1 / 1.602176634e-16,
    MeV: 1 / 1.602176634e-13,
    GeV: 1 / 1.602176634e-10,
    TeV: 1 / 1.602176634e-7,
    tTNT: 1 / 4.184e9,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertForce(valueIn, unitIn, unitOut) {
  const convFactors = {
    N: 1,
    mN: 1e3,
    kN: 1e-3,
    MN: 1e-6,
    lbf: 1 / 4.4482216152605,
    kp: 1 / 9.80665,
    dyn: 1e5,
    pdl: 1 / 0.138254954376,
    tfm: 1 / 9.80665e3,
    tfsh: 1 / 8.896443230521e3,
    tfl: 1 / 9.96401641818352e3,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertFrequencyPeriod(valueIn, unitIn, unitOut) {
  const convFactorsFrequency = {
    Hz: 1,
    kHz: 1e-3,
    MHz: 1e-6,
    GHz: 1e-9,
    THz: 1e-12,
    rad$s: 2 * Math.PI,
    deg$s: 360,
    rpm: 60,
  };

  const convFactorsPeriod = {
    s: 1,
    ms: 1e3,
    us: 1e6,
    ns: 1e9,
    ps: 1e12,
    min: 1 / 60,
    h: 1 / 3600,
  };

  let valueHz;

  if (unitIn in convFactorsPeriod) {
    valueHz =
      1 / ((valueIn * convFactorsPeriod["s"]) / convFactorsPeriod[unitIn]);
  } else {
    valueHz =
      (valueIn * convFactorsFrequency["Hz"]) / convFactorsFrequency[unitIn];
  }

  if (unitOut in convFactorsPeriod) {
    return (
      ((1 / valueHz) * convFactorsPeriod[unitOut]) / convFactorsPeriod["s"]
    );
  } else {
    return (
      (valueHz * convFactorsFrequency[unitOut]) / convFactorsFrequency["Hz"]
    );
  }
}

function convertFraction(valueIn, unitIn, unitOut) {
  const convFactors = {
    unit: 1,
    percent: 1e2,
    permille: 1e3,
    ppm: 1e6,
    ppb: 1e9,
    ppt: 1e12,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertKinematicViscosity(valueIn, unitIn, unitOut) {
  const convFactors = {
    m2$s: 1,
    mm2$s: 1e6,
    cm2$s: 1e4,
    cSt: 1e6,
    St: 1e4,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertLength(valueIn, unitIn, unitOut) {
  const convFactors = {
    m: 1,
    um: 1e6,
    mm: 1000,
    cm: 100,
    dm: 10,
    km: 1 / 1000,
    thou: 1 / 0.0000254,
    in: 1 / 0.0254,
    ft: 1 / 0.3048,
    yd: 1 / 0.9144,
    furlong: 1 / 201.168,
    mi: 1 / 1609.344,
    NM: 1 / 1852,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertMass(valueIn, unitIn, unitOut) {
  const convFactors = {
    kg: 1,
    mg: 1e6,
    g: 1000,
    t: 1 / 1000,
    oz: 35.27396195,
    lb: 2.204622622,
    slug: 1 / 14.593903,
    tnsh: 1 / 907.18474,
    tnl: 1 / 1016.0469088,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertMassFlowRate(valueIn, unitIn, unitOut) {
  const convFactors = {
    kg$s: 1,
    kg$min: 60,
    kg$h: 3600,
    g$s: 1 / 1e-3,
    g$min: 60 / 1e-3,
    g$h: 3600 / 1e-3,
    lb$s: 2.204622622,
    lb$min: 60 * 2.204622622,
    lb$h: 3600 * 2.204622622,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertMassFlux(valueIn, unitIn, unitOut) {
  const convFactors = {
    kg$m2$s: 1,
    kg$m2$min: 60,
    kg$m2$h: 3600,
    g$cm2$s: 1 / 10,
    lb$ft2$s: 0.2048161415,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertPower(valueIn, unitIn, unitOut) {
  const convFactors = {
    W: 1,
    nW: 1e6,
    mW: 1e3,
    kW: 1e-3,
    MW: 1e-6,
    GW: 1e-9,
    TW: 1e-12,
    PW: 1e-15,
    BTU$h: 3.412141633,
    PS: 1 / 735.49875,
    hp: 1 / 745.7,
    RT: 1 / 3516.8528421,
    cal$h: 1 / 0.001163,
    kcal$h: 1 / 0.001163e3,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertPressure(valueIn, unitIn, unitOut, absIn, absOut) {
  const convFactors = {
    Pa: 1,
    hPa: 1e-2,
    kPa: 1e-3,
    MPa: 1e-6,
    GPa: 1e-9,
    mbar: 1e-2,
    bar: 1e-5,
    uHg: 1 / 0.133322,
    mmHg: 1 / 133.322,
    mTorr: 760000 / 101325,
    Torr: 760 / 101325,
    psi: 1 / 6894.757293168, //lbf/inch²
    ksi: 1 / 6894757.293168, //kilo-lbf/inch²
    Mpsi: 1 / 6894757293.168, //mega-lbf/inch²
    mWC: 1 / 9806.65,
    mmWC: 1000 / 9806.65,
    inWC: 1 / 249.0889,
    inHg: 1 / 3386.389,
    at: 1 / 98066.5, //kgf/cm²
    atm: 1 / 101325,
  };

  let valuePa = valueIn / convFactors[unitIn];

  if (absIn == "abs") {
    valuePa = valuePa - 101325;
  }

  if (absOut == "abs") {
    valuePa = valuePa + 101325;
  }

  return valuePa * convFactors[unitOut];
}

function convertResistanceConductance(valueIn, unitIn, unitOut) {
  const convFactorsResistance = {
    Ohm: 1,
    uOhm: 1e6,
    mOhm: 1e3,
    kOhm: 1e-3,
    MOhm: 1e-6,
  };

  const convFactorsConductance = {
    S: 1,
    uS: 1e6,
    mS: 1e3,
    kS: 1e-3,
    MS: 1e-6,
  };

  let valueOhm;

  if (unitIn in convFactorsConductance) {
    valueOhm =
      1 /
      ((valueIn * convFactorsConductance["S"]) /
        convFactorsConductance[unitIn]);
  } else {
    valueOhm =
      (valueIn * convFactorsResistance["Ohm"]) / convFactorsResistance[unitIn];
  }

  if (unitOut in convFactorsConductance) {
    return (
      ((1 / valueOhm) * convFactorsConductance[unitOut]) /
      convFactorsConductance["S"]
    );
  } else {
    return (
      (valueOhm * convFactorsResistance[unitOut]) / convFactorsResistance["Ohm"]
    );
  }
}

function convertSlope(valueIn, unitIn, unitOut) {
  let slope = 0;

  //convert from unitIn to m/m
  switch (unitIn) {
    case "m$m":
      slope = valueIn;
      break;
    case "percent":
      slope = valueIn / 1e2;
      break;
    case "permille":
      slope = valueIn / 1e3;
      break;
    case "deg":
      if (-90 < valueIn && valueIn < 90) {
        slope = Math.tan((valueIn * Math.PI) / 180);
      } else {
        slope = NaN;
      }
      break;
  }

  //convert from m/m to unitOut
  switch (unitOut) {
    case "m$m":
      return slope;
    case "percent":
      return slope * 1e2;
    case "permille":
      return slope * 1e3;
    case "deg":
      return (180 * Math.atan(slope)) / Math.PI;
  }
}

function convertSpecificEnergy(valueIn, unitIn, unitOut) {
  const convFactors = {
    J$kg: 1,
    kJ$kg: 1e-3,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertSpecificHeatCapacity(valueIn, unitIn, unitOut) {
  const convFactors = {
    J$kg$K: 1,
    kJ$kg$K: 1e-3,
    BTU$lb$R: 1 / 4186.8,
    cal$C$g: 1 / 4184,
    kcal$C$g: 1 / 4.184,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertSpecificResistanceConductance(valueIn, unitIn, unitOut) {
  const convFactorsResistance = {
    Ohm_m: 1,
    uOhm_m: 1e6,
    mOhm_m: 1e3,
    Ohm_mm2$m: 1e6,
  };

  const convFactorsConductance = {
    S$m: 1,
    uS$m: 1e6,
    mS$m: 1e3,
    kS$m: 1e-3,
    MS$m: 1e-6,
  };

  let valueOhm_m;

  if (unitIn in convFactorsConductance) {
    valueOhm_m =
      1 /
      ((valueIn * convFactorsConductance["S$m"]) /
        convFactorsConductance[unitIn]);
  } else {
    valueOhm_m =
      (valueIn * convFactorsResistance["Ohm_m"]) / convFactorsResistance[unitIn];
  }

  if (unitOut in convFactorsConductance) {
    return (
      ((1 / valueOhm_m) * convFactorsConductance[unitOut]) /
      convFactorsConductance["S$m"]
    );
  } else {
    return (
      (valueOhm_m * convFactorsResistance[unitOut]) / convFactorsResistance["Ohm_m"]
    );
  }
}

function convertTemperature(valueIn, unitIn, unitOut) {
  let tempK = 0;

  //convert from unitIn to Kelvin
  switch (unitIn) {
    case "K":
      tempK = valueIn;
      break;
    case "C":
      tempK = valueIn + 273.15;
      break;
    case "F":
      tempK = (5 / 9) * (valueIn + 459.67);
      break;
    case "R":
      tempK = (5 / 9) * valueIn;
      break;
    case "Re":
      tempK = 1.25 * valueIn + 273.15;
      break;
  }

  //convert from Kelvin to unitOut
  switch (unitOut) {
    case "K":
      return tempK;
    case "C":
      return tempK - 273.15;
    case "F":
      return (9 / 5) * tempK - 459.67;
    case "R":
      return (9 / 5) * tempK;
    case "Re":
      return (tempK - 273.15) * 0.8;
  }
}

function convertThermalDiffusivity(valueIn, unitIn, unitOut) {
  const convFactors = {
    m2$s: 1,
    mm2$s: 1e6,
    cm2$s: 1e4,
    cSt: 1e6,
    St: 1e4,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertTime(valueIn, unitIn, unitOut) {
  const convFactors = {
    s: 0,
    min: 1 / 60,
    h: 1 / (60 * 60),
    d: 1 / (24 * 60 * 60),
    W: 1 / (7 * 24 * 60 * 60),
    M: 1 / (30 * 24 * 60 * 60),
    Y: 1 / (365 * 24 * 60 * 60),
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertTorque(valueIn, unitIn, unitOut) {
  const convFactors = {
    N_m: 1,
    mN_m: 1e3,
    kN_m: 1e-3,
    N_cm: 1e2,
    lbf_in: 8.8507457673787,
    lbf_ft: 0.73756214927727,
    dyn_cm: 1e7,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertVelocity(valueIn, unitIn, unitOut) {
  const convFactors = {
    m$s: 1,
    km$h: 3.6,
    ft$s: 1 / 0.3048,
    mph: 1 / 0.44704,
    kn: 1 / 0.514444,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertVoltage(valueIn, unitIn, unitOut) {
  const convFactors = {
    V: 1,
    nV: 1e9,
    uV: 1e6,
    mV: 1e3,
    kV: 1e-3,
    MV: 1e-6,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertVolume(valueIn, unitIn, unitOut) {
  const convFactors = {
    m3: 1,
    mm3: 1e9, //ul
    cm3: 1e6, //ml
    dm3: 1e3, //l
    km3: 1e-9,
    in3: 1 / 0.0254 ** 3,
    ft3: 1 / 0.3048 ** 3,
    yd3: 1 / 0.9144 ** 3,
    mi3: 1 / 1609.344 ** 3,
    floz: 1 / 29.5735295625e-6,
    pt: 1 / 473.176473e-6,
    qt: 1 / 0.946352946e-3,
    gal_US: 1 / 3.785411784e-3,
    gal_imp: 1 / 4.54609e-3,
    bbl: 1 / 158.987e-3,
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}

function convertVolumetricFlowRate(valueIn, unitIn, unitOut) {
  const convFactors = {
    m3$s: 1,
    m3$min: 60,
    m3$h: 3600,
    l$s: 1 / 1e-3,
    l$min: 60 / 1e-3,
    l$h: 3600 / 1e-3,
    ft3$s: 1 / 0.3048 ** 3, //CFS
    ft3$min: 60 / 0.3048 ** 3, //CFM
    ft3$h: 3600 / 0.3048 ** 3, //CFH
    gal$s: 1 / 3.785411784e-3, //GPS
    gal$min: 60 / 3.785411784e-3, //GPM
    gal$h: 3600 / 3.785411784e-3, //GPH
  };
  return (valueIn * convFactors[unitOut]) / convFactors[unitIn];
}
