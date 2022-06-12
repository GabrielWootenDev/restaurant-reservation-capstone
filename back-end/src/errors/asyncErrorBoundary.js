//asyncErrorBoundary handles any errors from our async function responses;
function asyncErrorBoundary(delegate, defaultStatus ) {
  return (request, response, next) => {
    Promise.resolve()
      .then(() => delegate(request, response, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message
        });
      });
  };
}

module.exports = asyncErrorBoundary;
