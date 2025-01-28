function gcdIO() {

    let a = parseInt(document.getElementById("a").value);
    let b = parseInt(document.getElementById("b").value);

    document.getElementById("gcd").value = gcd(a, b);
}