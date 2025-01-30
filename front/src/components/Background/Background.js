function Background({ url }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1.0)), url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1, // Garante que fique atrás de todo o conteúdo
      }}
    ></div>
  );
}
export default Background;
