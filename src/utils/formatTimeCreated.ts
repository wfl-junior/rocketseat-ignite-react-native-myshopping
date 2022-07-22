export function formatTimeCreated(timeCreated: string) {
  const date = new Date(timeCreated);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().padStart(4, "0");
  const hour = date.toLocaleTimeString("pt-BR");

  return `${day}/${month}/${year} às ${hour}`;
}
