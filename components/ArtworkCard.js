import useSWR from "swr";
import Error from "next/error";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";

export default function ArtworkCard(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (data == null || data == undefined) {
    return null;
  } else if (error) {
    return (
      <>
        <Error statusCode={404} />
      </>
    );
  } else {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          {data?.primaryImageSmall ? (
            <Card.Img
              variant="top"
              src={data?.primaryImageSmall}
              style={{
                height: "250px",
                width: "17.9rem",
                float: "left",
                objectFit: "cover",
              }}
            />
          ) : (
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d"
              style={{
                height: "250px",
                width: "17.9rem",
                float: "left",
                objectFit: "cover",
              }}
            />
          )}

          <Card.Body style={{ lineHeight: "1em" }}>
            <Card.Title
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "1",
              }}
            >
              {data?.title ? data?.title : "N/A"}
            </Card.Title>
            <Card.Text style={{ marginTop: "20px" }}>
              <span
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                }}
              >
                <strong>Date: </strong>{" "}
                {data?.objectDate ? data?.objectDate : "N/A"}
              </span>
              <br />
              <span
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                }}
              >
                <strong>Classification: </strong>
                {data?.classification ? data?.classification : "N/A"}
              </span>
              <br />
              <span
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                }}
              >
                <strong>medium: </strong>
                {data?.medium ? data?.medium : "N/A"}
              </span>
              <br />
              <br />
            </Card.Text>
            <Link href={"/artwork/" + props.objectID} passHref>
              <Button variant="outline-dark">
                <strong>ID: </strong>
                {props.objectID}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  }
}
