import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Виникла помилка!</h1>
      <p>{error.status || "Something  went wrong"}</p>
    </div>
  );
};

export default ErrorPage;
