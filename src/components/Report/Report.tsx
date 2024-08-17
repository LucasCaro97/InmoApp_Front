const Report = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL_API
  const handleExport = () => {
    window.open(`${BASE_URL}/planillamensual/exportar/08/2024`, "_blank");
  };
  return <button onClick={handleExport}>EXPORTAR</button>;
};
export { Report };
