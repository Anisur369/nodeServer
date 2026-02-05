import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BiShow } from "react-icons/bi";
import Swal from "sweetalert2";
import { Link } from "react-router";

function MyParcels() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount) {
            // refresh the data in the ui
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Parcel Name</th>
            <th>senderAddress</th>
            <th>receiverAddress</th>
            <th>Status</th>
            <th>Date</th>
            <th>Payment Status</th>
            <th>cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{parcel.parcelName}</td>
              <td>
                {parcel.senderRegion}, {parcel.senderDistrict},{" "}
                {parcel.senderAddress}
              </td>
              <td>
                {parcel.receiverRegion}, {parcel.receiverDistrict},{" "}
                {parcel.receiverAddress}
              </td>
              <td>{parcel.status}</td>
              <td>{parcel.createdAt}</td>
              <td>
                {parcels.PaymentStatus === "paid" ? (
                  <span className="text-green-400">Paid</span>
                ) : (
                  <Link to={`/payment/:${parcel._id}`}>
                    <button className="btn btn-primary bg-gray-500 border-0">
                      Pay
                    </button>
                  </Link>
                )}
              </td>
              <td>{parcel.cost}</td>
              <td>
                <div className="flex">
                  <button className="text-lg cursor-pointer">
                    <BiShow />
                  </button>
                  <button className="text-lg cursor-pointer mx-2">
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="text-lg cursor-pointer"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>company</th>
            <th>location</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
}

export default MyParcels;
