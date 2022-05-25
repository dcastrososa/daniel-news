import React, { useCallback, useContext } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { HomeContext } from "../../Home";
import "./index.css";

interface SearchBarForm {
  search: string;
}

const formInitialValues = {
  search: "",
};

export const SearchBar = () => {
  const { onSearch } = useContext(HomeContext);

  const onSubmit = useCallback(
    (values: SearchBarForm) => {
      onSearch(values.search);
    },
    [onSearch]
  );

  const validate = useCallback((values: SearchBarForm) => {
    const errors: Record<string, string> = {};
    if (!values.search) {
      errors.search = "Required";
    }
    return errors;
  }, []);

  return (
    <Row className="searchbar-container">
      <Formik
        initialValues={formInitialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ values, handleBlur, handleChange, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Row className="form-container">
              <Col sm={4} xs={6} md={6} lg={10}>
                <Form.Control
                  type="text"
                  name="search"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.search}
                  role="inputsearch"
                />
              </Col>
              <Col sm={4} xs={4} md={6} lg={2}>
                <Button
                  disabled={!values.search}
                  type="submit"
                  className="search-button"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </Row>
  );
};
