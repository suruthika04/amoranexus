import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          background: '#0a0e1a',
          color: '#fff',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif'
        }}>
          <h1 style={{ color: '#ef4444' }}>Something went wrong</h1>
          <p style={{ color: '#94a3b8', marginTop: '10px' }}>
            We encountered an unexpected error while loading this section.
          </p>
          <pre style={{
            marginTop: '20px',
            padding: '20px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            fontSize: '12px',
            maxWidth: '90%',
            overflow: 'auto',
            textAlign: 'left'
          }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '40px',
              padding: '12px 24px',
              background: '#2563eb',
              border: 'none',
              borderRadius: '9999px',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Reload Website
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function SectionErrorBoundary({ children, name }) {
  return (
    <ErrorBoundary name={name}>
      {children}
    </ErrorBoundary>
  );
}
