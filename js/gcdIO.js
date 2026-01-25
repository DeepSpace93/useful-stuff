function gcdIO() {

    let a = parseInt(document.getElementById("a").value);
    let b = parseInt(document.getElementById("b").value);

    let gcd_res = gcd(a, b);

    document.getElementById("a$gcd").value = a/gcd_res;
    document.getElementById("b$gcd").value = b/gcd_res;
    document.getElementById("gcd").value = gcd_res;
}