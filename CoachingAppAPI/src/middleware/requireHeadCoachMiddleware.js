export const requireHeadCoach = (req, res, next) => {
  if (!req.user?.isHeadCoach) {
    return res.status(403).json({ error: "Only head coaches can perform this action" });
  }
  next();
};
