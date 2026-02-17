function generateImage() {

    const canvas = document.getElementById("previewCanvas");
    const ctx = canvas.getContext("2d");

    const exportWidth = 1080;
    const exportHeight = 1920;

    canvas.width = exportWidth;
    canvas.height = exportHeight;

    const name = document.getElementById("name").value.trim();
    const contactName = document.getElementById("contactName").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const allergies = document.getElementById("allergies").value.trim();
    const conditions = document.getElementById("conditions").value.trim();

    // Background
    ctx.fillStyle = "#f4f8f9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1f4e5f";
    ctx.textAlign = "center";

    const maxTextWidth = canvas.width * 0.85;

    function wrapText(text, x, y, maxWidth, lineHeight) {
        const words = text.split(" ");
        let line = "";

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + " ";
                y += lineHeight;
            } else {
                line = testLine;
            }
        }

        ctx.fillText(line, x, y);
        return y + lineHeight;
    }

    // ?? NAME — moved 5% higher
    let nameY = canvas.height * 0.10;  // previously ~25%
    ctx.font = "bold 85px Arial";
    wrapText(name, canvas.width / 2, nameY, maxTextWidth, 95);

    // ?? LOWER SECTION START (bottom half anchor)
    let y = canvas.height * 0.50;

    ctx.font = "55px Arial";
    y = wrapText("If I cannot speak, please call:", canvas.width / 2, y, maxTextWidth, 70);

    y += 30;

    ctx.font = "bold 70px Arial";
    y = wrapText(contactName, canvas.width / 2, y, maxTextWidth, 80);

    ctx.font = "bold 70px Arial";
    y = wrapText(contactNumber, canvas.width / 2, y, maxTextWidth, 80);

    y += 50;

    // ?? Allergies
    if (allergies) {
        ctx.font = "bold 60px Arial";
        y = wrapText("ALLERGIES", canvas.width / 2, y, maxTextWidth, 70);

        ctx.font = "55px Arial";
        y = wrapText(allergies, canvas.width / 2, y, maxTextWidth, 70);

        y += 30;
    }

    // ?? Conditions
    if (conditions) {
        ctx.font = "bold 60px Arial";
        y = wrapText("CONDITIONS", canvas.width / 2, y, maxTextWidth, 70);

        ctx.font = "55px Arial";
        y = wrapText(conditions, canvas.width / 2, y, maxTextWidth, 70);

        y += 30;
    }

    // ?? Branding (above fingerprint zone)
    ctx.font = "40px Arial";
    ctx.fillText("talk4.me", canvas.width / 2, canvas.height * 0.92);

    // Enable download
    const link = document.getElementById("downloadLink");
    link.href = canvas.toDataURL("image/png");
    link.download = "Talk4Me-LockScreen.png";
    link.innerHTML = "Download Lock Screen";
    link.style.display = "inline-block";
}
