import axios from "axios";
import React, { useState } from "react";

function TrackOrder() {
	const [shipmentId, setShipmentId] = useState("16104408");

	const getTrackRecordHandler = async (e: any) => {
		e.preventDefault();

		try {
			const response = await axios.get(
				`/api/track-order/track?shipmentId=${shipmentId}`
			);
			console.log("Tracking Info:", response.data);
		} catch (error) {
			console.error("Error while getting tracking records:", error);
		}
	};

	return (
		<div className="h-screen w-full p-20">
			<form className="flex gap-4 items-center ">
				<label htmlFor="" className="font-medium">
					Tracking ID:
				</label>
				<input
					type="text"
					onChange={(e) => setShipmentId(e.target.value)}
					className="border border-black h-10 w-80 rounded-md px-3 font-semibold text-black"
				/>
				<button type="submit" onClick={getTrackRecordHandler}>
					Track
				</button>
			</form>
		</div>
	);
}

export default TrackOrder;
