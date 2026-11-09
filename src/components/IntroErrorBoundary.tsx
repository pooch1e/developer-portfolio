import { Component, type ReactNode } from "react";

interface Props {
  onError: () => void;
  children: ReactNode;
}

export default class IntroErrorBoundary extends Component<
  Props,
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Intro failed, skipping to main site:", error);
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
