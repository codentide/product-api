const uploadImage = async (imageUrl, imageName = "default") => {
	try {
		const formData = new FormData();
		formData.append("image", imageUrl);
		formData.append("name", imageName.replace(/\s+/g, "-").toLowerCase());

		const res = await fetch(
			`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}&name=${imageName}`,
			{
				method: "POST",
				body: formData,
			}
		);

		const image = await res.json();
		return image.data.url;
	} catch (error) {
		console.error("Error al subir la imagen:", error);
	}
};

module.exports = { uploadImage };
