import allAreas from "../db/queries/allAreas";
import allReferencesToday from "../db/queries/allReferencesToday";
import { filterByZone, ZoneId } from "./zones";

export const RESPONSE_START =
  "*Olá! Eu sou o ChatBot da Missão Brasil Curitiba!*\n" +
  "- 1 - Ver Total de Referências Enviadas\n" +
  "- 2 - Referências Enviadas Hoje\n" +
  "- 3 - Referências Área de Ensino Hoje\n" +
  "*Como posso lhe ajudar hoje?*";

export const RESPONSE_MENU_1 = (references_length: number) => {
  return `Temos ${references_length} referências enviadas no total!`;
};

export const RESPONSE_MENU_2 = (references: Reference[]) => {
  return (
    `Temos ${references.length} referências enviadas no total hoje!\n` +
    "\n" +
    `Essas foram as referências enviadas hoje:\n` +
    `- Ponta Grossa Norte: ${filterByZone(
      references,
      ZoneId.PONTA_GROSSA_NORTE
    )}\n` +
    `- São Lourenço & Curitiba:${filterByZone(
      references,
      ZoneId.SÃO_LOURENÇO_CURITIBA
    )}\n` +
    `- Boa Vista & Colombo: ${filterByZone(
      references,
      ZoneId.BOA_VISTA_COLOMBO
    )}\n` +
    `- Ponta Grossa & Campos Gerais: ${filterByZone(
      references,
      ZoneId.PONTA_GROSSA_CAMPOS_GERAIS
    )}\n` +
    `- Tarumã & Pinhais: ${filterByZone(references, ZoneId.TARUMÃ_PINHAIS)}\n` +
    `- Iguaçú & Campo Comprido: ${filterByZone(
      references,
      ZoneId.IGUAÇÚ_CAMPO_COMPRIDO
    )}\n` +
    `- Outras Missões: ${filterByZone(references, ZoneId.OTHER_MISSIONS)}\n` +
    `- UBA: ${filterByZone(references, ZoneId.UBA)}`
  );
};

export const RESPONSE_MENU_3 = async () => {
  const areas = await allAreas();
  return `*Encontre o código da sua área de ensino na lista abaixo:*\n\n${areas
    .map((area) => `- ${area.id} - ${area.name}\n`)
    .join("")}\n*Qual é o código da sua área de ensino?*`;
};

export const RESPONSE_MENU_AREA_REFERENCE = async (areaId: number) => {
  const allReferences = await allReferencesToday();
  const referencesFiltered = allReferences.filter(
    (ref) => ref.area_id === areaId
  );

  if (referencesFiltered.length > 0) {
    return `Referências enviadas para *${
      referencesFiltered[0].area.name
    }* hoje:${referencesFiltered
      .map(
        (ref) =>
          `\n- ${ref.name}${ref.offer && ` *(${ref.offer.toUpperCase()})*`}${
            ref.phone && ` [${ref.phone}]`
          }`
      )
      .join("")}`;
  } else {
    return "Esta área de ensino não recebeu nenhuma referência hoje.";
  }
};
