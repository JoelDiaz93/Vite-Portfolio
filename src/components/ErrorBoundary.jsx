import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio section render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
          <div className="rounded-[24px] border border-[#FF4000]/30 bg-[#FF4000]/5 p-6">
            <h3 className="text-white text-xl font-bold">Section unavailable</h3>
            <p className="mt-3 text-[#D7DEDC]">
              This section could not be rendered. Check the browser console for details.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
