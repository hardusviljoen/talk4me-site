document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("screenForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        generateImage();

    });

});


function generateImage() {

    const canvas = document.getElementById("previewCanvas");
    const ctx = canvas.getContext("2d");

    const message = document.getElementById("formMessage");
    const downloadLink = document.getElementById("downloadLink");

    const name = document.getElementById("name").value.trim();
    const contactName = document.getElementById("contactName").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const allergies = document.getElementById("allergies").value.trim();
    const conditions = document.getElementById("conditions").value.trim();


    /*
     * Required information
     */

    if (!name || !contactName || !contactNumber) {

        message.textContent =
            "Please enter your name, emergency contact name and contact number.";

        message.classList.add("visible");

        return;
    }

    message.textContent = "";
    message.classList.remove("visible");


    /*
     * High-resolution output
     */

    const exportWidth = 1080;
    const exportHeight = 1920;

    canvas.width = exportWidth;
    canvas.height = exportHeight;


    /*
     * Background
     */

    ctx.fillStyle = "#f4f8f9";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
     * Main text colour
     */

    ctx.fillStyle = "#1f4e5f";

    ctx.textAlign = "center";

    ctx.textBaseline = "alphabetic";


    const centerX = canvas.width / 2;

    const maxTextWidth = canvas.width * 0.85;


    /*
     * Text wrapping
     */

    function wrapText(
        text,
        x,
        y,
        maxWidth,
        lineHeight
    ) {

        if (!text) {
            return y;
        }

        const words = text.split(/\s+/);

        let line = "";

        for (let i = 0; i < words.length; i++) {

            const testLine =
                line.length > 0
                    ? line + " " + words[i]
                    : words[i];

            const width =
                ctx.measureText(testLine).width;


            if (
                width > maxWidth &&
                line.length > 0
            ) {

                ctx.fillText(
                    line,
                    x,
                    y
                );

                line = words[i];

                y += lineHeight;

            } else {

                line = testLine;

            }

        }


        if (line.length > 0) {

            ctx.fillText(
                line,
                x,
                y
            );

            y += lineHeight;

        }

        return y;
    }


    /*
     * NAME
     *
     * Kept at 15% because this has been
     * tested successfully on the Galaxy S10+.
     */

    let nameY = canvas.height * 0.15;

    ctx.font = "bold 85px Arial";

    wrapText(
        name,
        centerX,
        nameY,
        maxTextWidth,
        95
    );


    /*
     * EMERGENCY INFORMATION
     *
     * Kept at 45% to preserve the tested
     * Samsung lock-screen safe area.
     */

    let y = canvas.height * 0.45;


    /*
     * Instruction
     */

    ctx.font = "55px Arial";

    y = wrapText(
        "If I cannot speak, please call:",
        centerX,
        y,
        maxTextWidth,
        70
    );


    y += 30;


    /*
     * Emergency contact
     */

    ctx.font = "bold 70px Arial";

    y = wrapText(
        contactName,
        centerX,
        y,
        maxTextWidth,
        80
    );


    /*
     * Contact number
     */

    ctx.font = "bold 70px Arial";

    y = wrapText(
        contactNumber,
        centerX,
        y,
        maxTextWidth,
        80
    );


    y += 50;


    /*
     * Allergies
     */

    if (allergies) {

        ctx.font = "bold 60px Arial";

        y = wrapText(
            "ALLERGIES",
            centerX,
            y,
            maxTextWidth,
            70
        );


        ctx.font = "55px Arial";

        y = wrapText(
            allergies,
            centerX,
            y,
            maxTextWidth,
            70
        );


        y += 30;
    }


    /*
     * Medical conditions
     */

    if (conditions) {

        ctx.font = "bold 60px Arial";

        y = wrapText(
            "CONDITIONS",
            centerX,
            y,
            maxTextWidth,
            70
        );


        ctx.font = "55px Arial";

        y = wrapText(
            conditions,
            centerX,
            y,
            maxTextWidth,
            70
        );


        y += 30;
    }


    /*
     * Talk4.me branding
     *
     * Kept above the lower fingerprint
     * / navigation area.
     */

    ctx.font = "40px Arial";

    ctx.fillStyle = "#607d8b";

    ctx.fillText(
        "talk4.me",
        centerX,
        canvas.height * 0.92
    );


    /*
     * Prepare download
     */

    downloadLink.href =
        canvas.toDataURL("image/png");

    downloadLink.download =
        "Talk4Me-LockScreen.png";

    downloadLink.textContent =
        "Download Lock Screen";

    downloadLink.style.display =
        "inline-block";

}
