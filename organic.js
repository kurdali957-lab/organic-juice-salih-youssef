const factoryItems = [

    { name: "مغربی", unit: "" },
    { name: "سویسری", unit: "" },
    { name: "شير لوكو", unit: "" },
    { name: "شير ئچيم", unit: "" },

    { name: "ميويش", unit: " لتر" },
    { name: "ميويش بچیک", unit: "" },
    { name: "تمر هندي", unit: " لتر" },
    { name: "تمرهند بچیک", unit: "" },
    { name: "غ.مانكو", unit: " لتر", step: 5 },
    { name: "غ.تيشەمبی", unit: " لتر", step: 5 },

    { name: "غ.اناناس", unit: "" },

    { name: "غ.خوخ", unit: " لتر", step: 5 },
    { name: "بەفر", unit: "" },
    { name: "گیزاهند", unit: " لتر" },
    { name: "گیزاهند بچیک", unit: "" },
    { name: "حلیک", unit: " لتر" },
    { name: "سور", unit: "" },
    { name: "زەر", unit: "" },
    { name: "کەسک", unit: "" },
    { name: "مادده", unit: "" }

];


const storageItems = [

    { name: "كلاس", unit: "" },
    { name: "قسابه", unit: "" },
    { name: "بوكس ٢", unit: "" },
    { name: "بوكس ٤", unit: "" },
    { name: "بوكس ٦", unit: "" },
    { name: "بطل مەزن", unit: "" },
    { name: "بطل بچيك", unit: "" },
    { name: "علاكه لوكو", unit: "" },
    { name: "وەرقه كاشير", unit: "" },
    { name: "بوكسين ڤیقی", unit: "" },
    { name: "گلاس كيد", unit: "" },
    { name: "كلينكس", unit: "" },
    { name: "عەلاكيَت گليَشی", unit: "" },

    // بهایڤ: 0.5kg, 1kg, 1.5kg, 2kg ...
    { name: "باهیڤ", unit: " kg", step: 0.5 },

    { name: "ئاڤ", unit: "" }

];



function renderTable(items, tbodyId) {

    const tbody =
        document.getElementById(tbodyId);

    items.forEach(item => {

        const tr =
            document.createElement("tr");

        const tdControls =
            document.createElement("td");

        tdControls.className =
            "controls";

        tdControls.innerHTML = `
            <button
                class="btn btn-plus"
                onclick="updateQty(this, 1)"
                type="button"
            >+</button>

            <span
                class="qty"
                data-count="0"
                data-unit="${item.unit}"
                data-step="${item.step || 1}"
            >0${item.unit}</span>

            <button
                class="btn btn-minus"
                onclick="updateQty(this, -1)"
                type="button"
            >−</button>
        `;


        const tdName =
            document.createElement("td");

        tdName.className =
            "item-name";

        tdName.innerText =
            item.name;


        tr.appendChild(tdControls);
        tr.appendChild(tdName);

        tbody.appendChild(tr);

    });

}



function addCustomRow(tbodyId) {

    const tbody =
        document.getElementById(tbodyId);

    const tr =
        document.createElement("tr");

    tr.className =
        "custom-row";

    const tdControls =
        document.createElement("td");

    tdControls.className =
        "controls";

    tdControls.innerHTML = `
        <button
            class="btn btn-plus"
            onclick="updateQty(this, 1)"
            type="button"
        >+</button>

        <span
            class="qty"
            data-count="0"
            data-unit=""
            data-step="1"
        >0</span>

        <button
            class="btn btn-minus"
            onclick="updateQty(this, -1)"
            type="button"
        >−</button>
    `;


    const tdName =
        document.createElement("td");

    tdName.className =
        "item-name";

    tdName.innerHTML = `
        <input
            type="text"
            class="custom-item-input"
            placeholder="............"
        >
    `;


    tr.appendChild(tdControls);
    tr.appendChild(tdName);

    tbody.appendChild(tr);

}



function updateQty(btn, change) {

    const qtySpan =
        btn.parentElement.querySelector(".qty");


    // parseFloat مهم حتى يعمل 0.5
    const step =
        parseFloat(
            qtySpan.getAttribute("data-step")
        ) || 1;


    let currentCount =
        parseFloat(
            qtySpan.getAttribute("data-count")
        ) || 0;


    let newCount =
        currentCount + (change * step);


    if (newCount < 0) {
        newCount = 0;
    }


    // منع ظهور أرقام مثل:
    // 1.50000000001
    newCount =
        Math.round(newCount * 100) / 100;


    const unit =
        qtySpan.getAttribute("data-unit") || "";


    qtySpan.setAttribute(
        "data-count",
        newCount
    );


    qtySpan.innerText =
        `${newCount}${unit}`;


    updateSummary();

}



function updateSummary() {

    const bar =
        document.getElementById(
            "summary-bar"
        );


    const qtySpans =
        document.querySelectorAll(".qty");


    let selectedCount = 0;


    qtySpans.forEach(span => {

        if (
            parseFloat(
                span.getAttribute("data-count")
            ) > 0
        ) {
            selectedCount++;
        }

    });


    if (selectedCount > 0) {

        bar.innerText =
            `تم اختيار ${selectedCount} مادة`;

        bar.classList.add("visible");

    } else {

        bar.classList.remove("visible");

    }

}



function resetOrder() {

    const qtySpans =
        document.querySelectorAll(".qty");


    const hasSelection =
        Array.from(qtySpans).some(
            s =>
                parseFloat(
                    s.getAttribute("data-count")
                ) > 0
        );


    if (
        hasSelection &&
        !confirm(
            "سرەڕای ئەم کردارە هەموو ژمارەکان دەگەڕێنەوە بۆ سفر. دڵنیایت؟"
        )
    ) {
        return;
    }


    qtySpans.forEach(span => {

        const unit =
            span.getAttribute("data-unit") || "";


        span.setAttribute(
            "data-count",
            "0"
        );


        span.innerText =
            `0${unit}`;

    });


    document.getElementById(
        "customer-name"
    ).value = "";


    document.getElementById(
        "customer-address"
    ).value = "";


    document.querySelectorAll(
        ".custom-item-input"
    ).forEach(input => {

        input.value = "";

    });


    updateSummary();

}



function prefillToday() {

    const today =
        new Date();


    document.getElementById(
        "date-year"
    ).value =
        today.getFullYear();


    document.getElementById(
        "date-month"
    ).value =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    document.getElementById(
        "date-day"
    ).value =
        String(
            today.getDate()
        ).padStart(2, "0");

}



renderTable(
    factoryItems,
    "factory-body"
);


renderTable(
    storageItems,
    "storage-body"
);


addCustomRow(
    "factory-body"
);

addCustomRow(
    "factory-body"
);


addCustomRow(
    "storage-body"
);

addCustomRow(
    "storage-body"
);


prefillToday();





async function generatePDF() {

    const exportBtn =
        document.querySelector(
            ".export-btn"
        );


    if (
        typeof html2canvas === "undefined" ||
        typeof window.jspdf === "undefined"
    ) {

        alert(
            "تکایە پەیوەندیت بە ئینتەرنێت پشکنینەوە، چونکە کتێبخانەکانی PDF بارنەبوون."
        );

        return;
    }


    if (exportBtn) {

        exportBtn.disabled = true;

        exportBtn.innerText =
            "چاوەڕوان بە...";

    }


    const element =
        document.getElementById(
            "invoice-container"
        );


    element.classList.add(
        "pdf-mode"
    );


    const buttons =
        document.querySelectorAll(
            ".btn"
        );


    buttons.forEach(btn => {

        btn.style.display =
            "none";

    });


    const qtySpans =
        document.querySelectorAll(
            ".qty"
        );


    qtySpans.forEach(span => {

        const count =
            parseFloat(
                span.getAttribute(
                    "data-count"
                )
            ) || 0;


        if (count === 0) {

            span.setAttribute(
                "data-original-text",
                span.innerText
            );


            span.innerText = "";

        }

    });


    try {

        if (
            document.fonts &&
            document.fonts.ready
        ) {

            await document.fonts.ready;

        }


        await new Promise(resolve => {

            requestAnimationFrame(() => {

                requestAnimationFrame(
                    resolve
                );

            });

        });


        const canvas =
            await html2canvas(
                element,
                {
                    scale: 3,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: "#ffffff",
                    scrollX: 0,
                    scrollY: 0
                }
            );


        const {
            jsPDF
        } = window.jspdf;


        const pdf =
            new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });


        const pageWidth =
            pdf.internal.pageSize.getWidth();


        const pageHeight =
            pdf.internal.pageSize.getHeight();


        const canvasRatio =
            canvas.height /
            canvas.width;


        let imgWidth =
            pageWidth;


        let imgHeight =
            imgWidth *
            canvasRatio;


        if (
            imgHeight >
            pageHeight
        ) {

            imgHeight =
                pageHeight;


            imgWidth =
                imgHeight /
                canvasRatio;

        }


        const x =
            (pageWidth -
                imgWidth) / 2;


        const y =
            (pageHeight -
                imgHeight) / 2;


        const imageData =
            canvas.toDataURL(
                "image/jpeg",
                0.98
            );


        pdf.addImage(
            imageData,
            "JPEG",
            x,
            y,
            imgWidth,
            imgHeight
        );


        pdf.save(
            "Organic-Juices-Order.pdf"
        );


    } catch (error) {

        console.error(
            "PDF Error:",
            error
        );


        alert(
            "هەڵەیەک ڕوویدا لە دروستکردنی PDF، تکایە دووبارە هەوڵبدەوە."
        );

    } finally {

        qtySpans.forEach(span => {

            if (
                span.hasAttribute(
                    "data-original-text"
                )
            ) {

                span.innerText =
                    span.getAttribute(
                        "data-original-text"
                    );


                span.removeAttribute(
                    "data-original-text"
                );

            }

        });


        buttons.forEach(btn => {

            btn.style.display = "";

        });


        element.classList.remove(
            "pdf-mode"
        );


        if (exportBtn) {

            exportBtn.disabled =
                false;


            exportBtn.innerText =
                "تصدير الفاتورة (PDF)";

        }

    }

}