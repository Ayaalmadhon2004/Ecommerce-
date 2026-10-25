function Stars({ count = 0 }) {
  const total = Math.max(0, Math.round(count));
  return (
    <>
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className="fa-solid fa-star" style={{ color: "gold" }}></i>
      ))}
    </>
  );
}

export default Stars;
