import React, { Component } from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<{}, State> {
  constructor() {
    super({});
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return <b>Something went wrong.</b>;
    return this.props.children;
  }
}
