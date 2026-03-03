import "../styles/loading.scss";

const Loading = () => {
  return (
    <main className="loading-page" aria-busy="true" aria-live="polite">
      <div className="loading-card">
        <div className="loading-spinner" aria-hidden="true" />
        <h2>Loading</h2>
        <p>Please wait while we prepare your mood space.</p>
      </div>
    </main>
  );
};

export default Loading;
