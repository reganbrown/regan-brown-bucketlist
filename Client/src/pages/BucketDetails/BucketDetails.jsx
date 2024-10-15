import { useParams } from "react-router-dom";

export default function BucketDetails() {
  let { bucketID } = useParams();
  return (
    <>
      <h1>Bucket Details</h1>
      <p>Bucket ID: {bucketID}</p>
    </>
  );
}
