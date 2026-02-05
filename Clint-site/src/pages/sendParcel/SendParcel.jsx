// SendParcelForm.jsx
import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function SendParcel() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const selectedSenderRegion = watch("senderRegion");
  const selectedReceiverRegion = watch("receiverRegion");

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((c) => c.district);
    return [...new Set(districts)];
  };

  const onSubmit = (data) => {
    const isDocument = data.parcelType === "Document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    // alert(`The calculated shipping cost is: $${cost}`);

    Swal.fire({
      title: "Are you sure?",
      text: `Your parcel cost is ${cost} BDT.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: cost,
          status: "Pending",
          paymentStatus: "pending",
        };
        axiosSecure.post("/parcels", parcelData).then((response) => {
          console.log("Parcel data submitted:", response.data);
        });

        Swal.fire({
          title: "Success!",
          text: "Your parcel has been sent.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="mx-auto px-6 py-9 my-8 bg-base-400 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4">Send A Parcel</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Parcel Type */}
        <div className="mb-6">
          <label className="font-semibold text-xl">
            Enter your parcel details
          </label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Document"
                {...register("parcelType", { required: true })}
                className="radio radio-primary"
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Not-Document"
                {...register("parcelType", { required: true })}
                className="radio radio-primary"
              />
              Not-Document
            </label>
          </div>
          {errors.parcelType && (
            <p className="text-error text-sm">Parcel type is required</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Parcel Name */}
          <div>
            <label className="font-semibold">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.parcelName && (
              <p className="text-error text-sm">Parcel name is required</p>
            )}
          </div>

          {/* Parcel Weight */}
          <div>
            <label className="font-semibold">Parcel Weight (KG)</label>
            <input
              type="number"
              {...register("parcelWeight", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.parcelWeight && (
              <p className="text-error text-sm">Weight is required</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {/* Sender Details */}
            <h3 className="text-xl font-bold mt-6 mb-3">Sender Details</h3>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Sender Name</label>
                <input
                  type="text"
                  {...register("senderName", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Sender Address</label>
                <input
                  type="text"
                  {...register("senderAddress", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Sender Phone No</label>
                <input
                  type="text"
                  {...register("senderPhone", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              {/* Select region */}
              <div>
                <label className="font-semibold">Sender Region</label>
                <select
                  {...register("senderRegion", { required: true })}
                  className="select select-bordered w-full"
                  defaultValue="Select region"
                >
                  <option value="">Select Region</option>
                  {regions.map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {/* Select District */}
              <div>
                <label className="font-semibold">Sender District</label>
                <select
                  {...register("senderDistrict", { required: true })}
                  className="select select-bordered w-full"
                  defaultValue="Select district"
                >
                  <option value="">Select District</option>
                  {districtsByRegion(selectedSenderRegion)?.map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                  <option value="Rajshahi">Rajshahi</option>
                </select>
              </div>
              <div>
                <label className="font-semibold">Pickup Instruction</label>
                <input
                  type="text"
                  {...register("pickupInstruction")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>

          <div>
            {/* Receiver Details */}
            <h3 className="text-xl font-bold mt-6 mb-3">Receiver Details</h3>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Receiver Name</label>
                <input
                  type="text"
                  {...register("receiverName", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Receiver Address</label>
                <input
                  type="text"
                  {...register("receiverAddress", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Receiver Contact No</label>
                <input
                  type="text"
                  {...register("receiverPhone", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Receiver Region</label>
                <select
                  {...register("receiverRegion", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold">Receiver District</label>
                <select
                  {...register("receiverDistrict", { required: true })}
                  className="select select-bordered w-full"
                  defaultValue="Select district"
                >
                  <option value="">Select District</option>
                  {districtsByRegion(selectedReceiverRegion)?.map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold">Delivery Instruction</label>
                <input
                  type="text"
                  {...register("deliveryInstruction")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Time Note */}
        <p className="text-sm text-gray-500">* Pickup Time 4pm–7pm Approx.</p>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
}
