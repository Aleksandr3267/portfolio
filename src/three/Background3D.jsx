import { Component, lazy, Suspense } from 'react';


const Scene = lazy(() => import('./Scene.jsx'));


class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Background3D() {
  return (
    <div className="scene-layer" aria-hidden="true">
      <SceneBoundary>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </SceneBoundary>
    </div>
  );
}
