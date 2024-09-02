const Report = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL_API
  const handleExport = () => {
   //POST  "/planillamensual/mes/año"
   //PARA CREAR LA PLANILLA DE ESE MES.
    window.open(`${BASE_URL}/planillamensual/exportar/09/2024`, "_blank");
  };
  return <button onClick={handleExport}>EXPORTAR</button>;
};
export { Report };
