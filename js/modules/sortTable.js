function sortTable(columnIndex) {
    const table = document.getElementById("sortableTable");
    const rows = Array.from(table.rows).slice(1);
    const isNumeric = !isNaN(rows[0].cells[columnIndex].innerText);

    let asc = table.getAttribute("data-sort-dir") !== "asc";
    table.setAttribute("data-sort-dir", asc ? "asc" : "desc");

    rows.sort((a, b) => {
        const valA = a.cells[columnIndex].innerText;
        const valB = b.cells[columnIndex].innerText;

        if (isNumeric) {
            return asc ? valA - valB : valB - valA;
        } else {
            return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
    });

    rows.forEach(row => table.tBodies[0].appendChild(row));
}