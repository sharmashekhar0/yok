import axios from "axios";
import React, { useState } from "react";

function TrackOrder() {
	const [shipmentId, setShipmentId] = useState("16104408");
	const [trackingDetails, setTrackingDetails]: any = useState({
		tracking_data: {
			track_status: 1,
			shipment_status: 42,
			shipment_track: [
				{
					id: 185584215,
					awb_code: "1091188857722",
					courier_company_id: 10,
					shipment_id: 168347943,
					order_id: 168807908,
					pickup_date: null,
					delivered_date: null,
					weight: "0.10",
					packages: 1,
					current_status: "PICKED UP",
					delivered_to: "Mumbai",
					destination: "Mumbai",
					consignee_name: "Musarrat",
					origin: "PALWAL",
					courier_agent_details: null,
					edd: "2021-12-27 23:23:18",
				},
			],
			shipment_track_activities: [
				{
					date: "2021-12-23 14:23:18",
					status: "X-PPOM",
					activity: "In Transit - Shipment picked up",
					location: "Palwal_NewColony_D (Haryana)",
					"sr-status": "42",
				},
				{
					date: "2021-12-23 14:19:37",
					status: "FMPUR-101",
					activity: "Manifested - Pickup scheduled",
					location: "Palwal_NewColony_D (Haryana)",
					"sr-status": "NA",
				},
				{
					date: "2021-12-23 14:19:34",
					status: "X-UCI",
					activity: "Manifested - Consignment Manifested",
					location: "Palwal_NewColony_D (Haryana)",
					"sr-status": "5",
				},
			],
			track_url: "https://shiprocket.co//tracking/1091188857722",
			etd: "2021-12-28 10:19:35",
		},
	});

	const getTrackRecordHandler = async (e: any) => {
		e.preventDefault();
		try {
			const response = await axios.get(
				`/api/track-order/track?shipmentId=${shipmentId}`
			);
			console.log("Tracking Info:", response.data[shipmentId]);
			setTrackingDetails(response.data[shipmentId]);
		} catch (error) {
			console.error("Error while getting tracking records:", error);
		}
	};

	return (
		<div className="min-h-screen pb-8 w-full items-center justify-center">
			<form className="flex flex-col sm:flex-row gap-4 h-fit py-4 sm:py-0 sm:h-20 items-center justify-center w-full bg-gray-100 text-black rounded-t-md text-xl border-b border-black">
				<label htmlFor="" className="font-semibold">
					Tracking ID:
				</label>
				<input
					type="text"
					onChange={(e) => setShipmentId(e.target.value)}
					className="border border-black h-12 sm:w-80 rounded-md px-3 font-semibold text-black"
				/>
				<button
					type="submit"
					onClick={getTrackRecordHandler}
					className="bg-gray-700 hover:bg-gray-600 text-white font-semibold p-1 px-4 rounded-md"
				>
					Track
				</button>
			</form>
			<div className="bg-gray-100 min-h-96 w-full p-8 flex flex-col gap-4 rounded-b-md">
				<span>{trackingDetails?.tracking_data?.error}</span>
				{!trackingDetails?.tracking_data?.error && (
					<>
						{trackingDetails?.tracking_data?.shipment_track?.map(
							(track: any) => {
								return (
									<div className="flex flex-col gap-4">
										<div>
											<span className="font-semibold">
												Order Id:{" "}
											</span>
											<span>{track?.order_id}</span>
										</div>
										<div>
											<span className="font-semibold">
												Current Status:{" "}
											</span>
											<span>{track?.current_status}</span>
										</div>
									</div>
								);
							}
						)}
						<h3 className="text-xl text-black font-bold">
							Track Activities
						</h3>
						<div className="flex flex-col gap-4">
							{trackingDetails?.tracking_data?.shipment_track_activities?.map(
								(activity: any) => {
									return (
										<div className="flex flex-col gap-4 bg-gray-200 p-2 px-4 rounded-md">
											<div>
												<span className="font-semibold">
													Date:{" "}
												</span>
												<span>{activity?.date}</span>
											</div>
											<div>
												<span className="font-semibold">
													Status:{" "}
												</span>
												<span>{activity?.status}</span>
											</div>
											<div>
												<span className="font-semibold">
													Activity:{" "}
												</span>
												<span>
													{activity?.activity}
												</span>
											</div>
											<div>
												<span className="font-semibold">
													Location:{" "}
												</span>
												<span>
													{activity?.location}
												</span>
											</div>
										</div>
									);
								}
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default TrackOrder;
