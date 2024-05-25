const { i18n } = require("./next-i18next.config");
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
	dest: "public",
	disable: process.env.NODE_ENV !== "production",
	runtimeCaching,
});

module.exports = withPWA({
	i18n,
	images: {
		domains: [
			"myawsproductsbucket.s3.ap-south-1.amazonaws.com",
			"myawsproductsbucket.s3.amazonaws.com",
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	async headers() {
		return [];
	},
});
