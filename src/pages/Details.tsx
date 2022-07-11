import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bike, Navigation } from "../components";
import { getBike } from "../shared/bike.slice";
import { useAppDispatch, useAppSelector } from "../shared/store";

const Details = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { bike, loading } = useAppSelector(state => state.bike);

  useEffect(() => {
    dispatch(getBike(id))
  }, [id, dispatch]);

  return (
    <>
      <Navigation label={bike?.name || ""} />
      <Bike bike={bike} loading={loading} isHoverable={false} />
    </>
  );
};

export default Details