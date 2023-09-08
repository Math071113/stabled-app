import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Spinner, Container, Image } from "react-bootstrap";

function App() {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [val, setVal] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const showLoadind = () => {
    setIsLoadingVisible(true);
  };
  const hideLoadind = () => {
    setIsLoadingVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoadind();
    try {
      console.log(prompt);

      const api =
        "https://v826gojc3h.execute-api.us-east-1.amazonaws.com/test/";
      const userData = { data: e.target.searchQuery.value };
      console.log(data);
      const { data } = await axios.post(api, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setImgSrc(data.body);

      setTimeout(() => {
        hideLoadind();
        setVal("");
      }, 500);
    } catch (err) {
      console.log(err);
      hideLoadind();
    }
  };

  return (
    <Container className="p-5" id="container" name="container">
      <h1> Welcome to Stable Diffusion AI</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Text to convert Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text to convert image"
            required
            autoFocus={true}
            name="searchQuery"
            controlId="searchQuery"
            defaultValue={val}
          />
          <Form.Text className="text-muted">
            We'll attempt our best to create image you will love it!
          </Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="btn btn-primary btn-large centerButton"
        >
          Submit
        </Button>

        <Image id="myImage" className="img-fluid shadow-4" src={imgSrc} />
      </Form>
      {isLoadingVisible && (
        <div id="backdrop">
          <Button variant="primary" disabled>
            <Spinner
              target="container"
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
