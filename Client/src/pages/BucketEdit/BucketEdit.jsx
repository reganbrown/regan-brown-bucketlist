import { useParams } from "react-router-dom";

export default function BucketEdit() {
  let { bucketID } = useParams();
  return (
    <>
      <h1>Bucket Edit</h1>
      <p>Bucket ID: {bucketID}</p>
    </>
  );
}
