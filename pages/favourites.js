import Error from "next/error";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ArtworkCard from "../components/ArtworkCard";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { useState } from "react";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  if (favouritesList) {
    return (
      <>
        <Row className="gy-4">
          {favouritesList.length > 0 ? (
            favouritesList.map((item) => {
              return (
                <Col lg={3} key={item}>
                  <ArtworkCard objectID={item} />
                </Col>
              );
            })
          ) : (
            <Card>
              <Card.Body>
                <Card.Text>
                  <strong>Nothing Here</strong>
                  <br />
                  Try adding for something else.
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Row>
        {!favouritesList && null}
      </>
    );
  }
}
