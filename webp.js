import imagemin from "imagemin";
import webp from "imagemin-webp";

const outputFolder = "./imgs/webp";

const produceWebP = async () => {
	await imagemin(["imgs/jpeg/*.{jpg,jpeg}"], {
		destination: outputFolder,
		plugins: [
			webp({
				quality: 85,
			}),
		],
	});
	console.log("JPGs and JPEGs processed");
};
produceWebP();
