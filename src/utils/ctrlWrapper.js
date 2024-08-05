export const ctrlWrapper = (controller) => {
  return (req, res, next) => {
     controller(req, res,).catch (next);
    }
  };
