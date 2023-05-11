const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error">
      <p>Något gick fel:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Försök igen</button>
    </div>
  )
}
export default ErrorFallback
