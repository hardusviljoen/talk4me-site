function generateImage() {

    const canvas = document.getElementById("previewCanvas");
    const ctx = canvas.getContext("2d");

    const name = document.getElementById("name").value;
    const contactName = document.getElementById("contactName").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const allergies = document.getElementById("allergies").value;
    const conditions = document.getElementById("conditions").value;

	// Background
	ctx.fillStyle = "#f4f8f9";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#1f4e5f";
	ctx.textAlign = "center";

	let y = 180;

	ctx.font = "bold 40px Arial";
	ctx.fillText(name, canvas.width / 2, y);

	y += 80;

	ctx.font = "24px Arial";
	ctx.fillText("If I cannot speak, please call:", canvas.width / 2, y);

	y += 70;

	ctx.font = "bold 32px Arial";
	ctx.fillText(contactName, canvas.width / 2, y);

	y += 50;

	ctx.fillText(contactNumber, canvas.width / 2, y);

	y += 80;

	ctx.font = "22px Arial";

	if (allergies) {
		ctx.fillText("Allergy: " + allergies, canvas.width / 2, y);
		y += 50;
	}

	if (conditions) {
		ctx.fillText("Condition: " + conditions, canvas.width / 2, y);
		y += 50;
	}

	ctx.font = "16px Arial";
	ctx.fillText("talk4.me", canvas.width / 2, canvas.height - 60);

    // Enable download
    const link = document.getElementById("downloadLink");
    link.href = canvas.toDataURL("image/png");
    link.download = "Talk4Me-LockScreen.png";
    link.innerHTML = "Download Lock Screen";
    link.style.display = "inline-block";
}
