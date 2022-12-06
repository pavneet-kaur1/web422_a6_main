import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import ListGroup from "react-bootstrap/ListGroup";
import Error from "next/error";
import Card from "react-bootstrap/Card";
import styles from "../styles/History.module.css";

import { removeFromHistory } from "../lib/userData";

export default function AdvancedSearch() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  if (!searchHistory) return null;

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    e.preventDefault();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  if (parsedHistory.length <= 0) {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Text>
              <strong>Nothing Here</strong>
              <br />
              Try searching for some artwork.
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              className={styles.historyListItem}
              key={index}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }
}
