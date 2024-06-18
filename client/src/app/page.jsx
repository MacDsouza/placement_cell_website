// page.jsx
"use client";
import React, {useState} from "react";
import DriveCard from "@/components/driveCard";
// import Data from "../../public/data";
import supabase from "@/data/supabase";
// import { useRoleContext } from "@/context/RoleContext";
import { useContext } from "react";
import { LoginContext } from "@/context";

const Home = () => {
  const [placements, setPlacements] = React.useState([]);
  const { userRole, setUserRole } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  // const { userRole } = useRoleContext();

  React.useEffect(() => {
    const checkUserRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("user")
          .select()
          .eq("user_id", user.id);
        setUserRole(data[0].role);
      }
    };
    const fetchPlacement = async () => {
      const { data, error } = await supabase
        // .schema("placements")
        .from("drive")
        .select("*, role(*)");
      if (!error) {
        setPlacements(data);
      }
      setLoading(false);
    };
    userRole === null ? checkUserRole() : "";

    fetchPlacement();
  }, []);

  return (
    <>
      {loading ? (
        <div className="font-gabarito lg:flex w-full mt-10 mb-10 justify-center items-center flex-col bg-background-clr overflow-y-auto sm: flex l">
          <section className="lg:w-2/3 sm: w-3/4 ">
            <div className="flex flex-row justify-evenly">
              <div className="skeleton lg:w-1/3 w-1/3 h-10 rounded-lg mb-3 mr-2"></div>
              <hr className="w-full border-white place-content-center mt-4" />
            </div>
            <div className="flex flex-col lg:flex-row gap-8 mb-4 mx-auto">
              <div className="skeleton lg:w-1/2 h-64 rounded-lg"></div>
              <div className="skeleton lg:w-1/2 h-64 rounded-lg"></div>
            </div>
          </section>

          <section className="lg:w-2/3 sm: w-3/4">
            <div className="flex flex-row">
              <div className="skeleton lg:w-1/3 w-1/3 h-10 rounded-lg mb-3 mr-2"></div>
              <hr className="w-full border-white place-content-center mt-4" />
            </div>
            <div className="flex flex-col lg:flex-row gap-8 mb-4 mx-auto">
              <div className="skeleton lg:w-1/2 h-64 rounded-lg"></div>
              <div className="skeleton lg:w-1/2 h-64 rounded-lg"></div>
            </div>
          </section>
        </div>
      ) : (
        <div className="font-gabarito lg:flex w-full mt-10 justify-center items-center flex-col bg-background-clr overflow-y-auto sm: flex l">
          {userRole === 3 && (
            // <div className="lg:w-2/3 sm: w-3/4">
            <section className="lg:w-2/3 sm: w-3/4">
              <div className="flex flex-row justify-evenly">
                <h1 className="text-3xl font-bold text-white mb-6 mr-4 text-nowrap">
                  Drafts
                </h1>
                <hr className="w-full border-white place-content-center mt-4" />
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                {placements.map((placement, index) => {
                  const currentDate = new Date();
                  const placementDate = new Date(placement.date);
                  const timeDifference =
                    placementDate.getTime() - currentDate.getTime();
                  const daysDifference = Math.ceil(
                    timeDifference / (1000 * 3600 * 24)
                  );
                  if (placement.is_draft === true) {
                    return (
                      <DriveCard key={placement.id} placement={placement} />
                    );
                  } else if (placement.id === null) {
                    return "No Drafts Available!";
                  } else {
                    return null;
                  }
                })}
              </div>
            </section>
            // </div>
          )}

          {/* {userRole === 3 ? (
          <hr className="w-2/3 border-white my-6" />
        ) : (
          <hr className="w-2/3 border-background-clr my-6" />
        )} */}

          <section className="lg:w-2/3 sm: w-3/4 ">
            <div className="flex flex-row justify-evenly">
              <h1 className="text-3xl font-bold text-white mb-6 mr-4 text-nowrap">
                Ongoing
              </h1>
              <hr className="w-full border-white place-content-center mt-4" />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {placements.map((placement, index) => {
                const currentDate = new Date();
                const placementDate = new Date(placement.date);
                const timeDifference =
                  placementDate.getTime() - currentDate.getTime();
                const daysDifference = Math.ceil(
                  timeDifference / (1000 * 3600 * 24)
                );

                if (
                  daysDifference >= -1 &&
                  daysDifference <= 3 &&
                  placement.is_draft === false
                ) {
                  return <DriveCard key={placement.id} placement={placement} />;
                } else {
                  return null;
                }
              })}
            </div>
          </section>
          <section className="lg:w-2/3 sm: w-3/4">
            <div className="flex flex-row">
              <h1 className="text-3xl font-bold text-white mb-6 mr-4">
                Upcoming
              </h1>
              <hr className="w-full border-white place-content-center mt-4" />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {placements.map((placement, index) => {
                const currentDate = new Date();
                const placementDate = new Date(placement.date);
                const timeDifference =
                  placementDate.getTime() - currentDate.getTime();
                const daysDifference = Math.ceil(
                  timeDifference / (1000 * 3600 * 24)
                );
                if (daysDifference >= 3 && placement.is_draft === false) {
                  return <DriveCard key={placement.id} placement={placement} />;
                } else {
                  return null;
                }
              })}
            </div>
          </section>
          <section className="lg:w-2/3 sm: w-3/4">
            <div className="flex flex-row justify-evenly">
              <h1 className="text-3xl font-bold text-white mb-6 mr-4 text-nowrap">
                Past Placements
              </h1>
              <hr className="w-full border-white place-content-center mt-4" />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {placements.map((placement, index) => {
                const currentDate = new Date();
                const placementDate = new Date(placement.date);
                const timeDifference =
                  placementDate.getTime() - currentDate.getTime();
                const daysDifference = Math.ceil(
                  timeDifference / (1000 * 3600 * 24)
                );
                if (daysDifference <= -1 && placement.is_draft === false) {
                  return <DriveCard key={placement.id} placement={placement} />;
                } else {
                  return null;
                }
              })}
            </div>
          </section>
          <div className="w-2/3 mb-6">
            <h1 className="text-3xl font-bold text-white mb-4"></h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
