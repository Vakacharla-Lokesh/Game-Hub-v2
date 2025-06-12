import { useEffect, useState } from "react";
import { apiCall } from "../api/axiosInstance";
import DotGrid from "./styling/DotGrid";

function Testing() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall("GET", "games/crazygame_003");
        console.log("game data:", response);
        setData(response); // Set the data here, after it's fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Just call the function, don't try to capture its return value
  }, []);

  return (
    <>
      <div className=" w-full h-full relative -z-10">
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#5227FF"
          activeColor="#5227FG"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div>
        <h1 className="text-4xl">
          {data.game_id}
        </h1>
      </div>
    </>
  );
}

export default Testing;
