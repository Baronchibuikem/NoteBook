import React from "react";
import { Container, Grid } from "@material-ui/core";
import { ReactComponent as ErrorImage } from "../../assets/image/svg/error.svg";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={10} md={6} style={{ margin: "auto" }}>
                <ErrorImage alt="Error" style={{ width: "100%" }} />
                <h2 style={{ color: "#39d406", textAlign: "center" }}>
                  Hi, This has been logged and our Engineers are working hard to
                  ensure you have a smoother experience your next try.
                </h2>
              </Grid>
            </Grid>
          </Container>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
