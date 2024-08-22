document.addEventListener("DOMContentLoaded", function () {
    const columnsInput = document.getElementById("columns");
    const rowsInput = document.getElementById("rows");
    const gapInput = document.getElementById("gap");
    const borderRadiusInput = document.getElementById("border-radius");
    const unitToggle = document.getElementById("unit-toggle");
    const gridContainer = document.getElementById("grid-container");
    const htmlCode = document.getElementById("html-code");
    const cssCode = document.getElementById("css-code");
    const copyHtmlBtn = document.getElementById("copy-html-btn");
    const copyCssBtn = document.getElementById("copy-css-btn");

    function updateGrid() {
        const columns = columnsInput.value;
        const rows = rowsInput.value;
        const gap = unitToggle.checked ? `${gapInput.value}rem` : `${gapInput.value}px`;
        const borderRadius = unitToggle.checked ? `${borderRadiusInput.value}rem` : `${borderRadiusInput.value}px`;

        gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        gridContainer.style.gap = gap;

        gridContainer.innerHTML = "";
        for (let i = 0; i < columns * rows; i++) {
            const div = document.createElement("div");
            div.textContent = i + 1;
            div.style.borderRadius = borderRadius;
            gridContainer.appendChild(div);
        }

        generateCode(columns, rows, gap, borderRadius);
    }

    function generateCode(columns, rows, gap, borderRadius) {
        let html = `<div class="grid-container">\n`;
        let css = `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${columns}, 1fr);\n  grid-template-rows: repeat(${rows}, 1fr);\n  gap: ${gap};\n}\n\n`;

        for (let i = 0; i < columns * rows; i++) {
            html += `  <div class="div${i + 1}">${i + 1}</div>\n`;
            css += `.div${i + 1} {\n  border-radius: ${borderRadius};\n}\n\n`;
        }

        html += `</div>`;
        htmlCode.textContent = html;
        cssCode.textContent = css;
    }

    unitToggle.addEventListener("change", function () {
        const currentGap = gapInput.value;
        const currentBorderRadius = borderRadiusInput.value;
        if (unitToggle.checked) { // PX to REM
            gapInput.value = (currentGap / 16).toFixed(2);
            borderRadiusInput.value = (currentBorderRadius / 16).toFixed(2);
        } else { // REM to PX
            gapInput.value = (currentGap * 16).toFixed(0);
            borderRadiusInput.value = (currentBorderRadius * 16).toFixed(0);
        }
        updateGrid();
    });

    copyHtmlBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(htmlCode.textContent)
            .then(() => alert("HTML code copied to clipboard!"))
            .catch(err => console.error("Could not copy HTML text", err));
    });

    copyCssBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(cssCode.textContent)
            .then(() => alert("CSS code copied to clipboard!"))
            .catch(err => console.error("Could not copy CSS text", err));
    });

    // Initial grid generation
    updateGrid();

    // Update grid on input changes
    columnsInput.addEventListener("input", updateGrid);
    rowsInput.addEventListener("input", updateGrid);
    gapInput.addEventListener("input", updateGrid);
    borderRadiusInput.addEventListener("input", updateGrid);
});
