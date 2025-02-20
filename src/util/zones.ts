export enum ZoneId {
  BOA_VISTA_COLOMBO = 500387154,
  PONTA_GROSSA_CAMPOS_GERAIS = 500427238,
  TARUMÃ_PINHAIS = 500427239,
  IGUAÇÚ_CAMPO_COMPRIDO = 500483702,
  SÃO_LOURENÇO_CURITIBA = 500393700,
  PONTA_GROSSA_NORTE = 500251576,
  STOPPED_TEACHING = 2,
  OTHER_MISSIONS = 1,
  UBA = 0,
}

export const filterByZone = (references: Reference[], zoneId: ZoneId) => {
  return references.filter((ref) => ref.area.zone_id === zoneId).length;
};
