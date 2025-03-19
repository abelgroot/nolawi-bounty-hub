export const createQueryKeyStructure = (baseKey: string) => ({
  all: [baseKey] as const,
  lists: () => [baseKey, "list"] as const,
  list: (filters: string) => [baseKey, "list", { filters }] as const,
  details: () => [baseKey, "detail"] as const,
  detail: (id: string) => [baseKey, id] as const,
});

export const usersKey = createQueryKeyStructure("users");
export const companiesKey = createQueryKeyStructure("companies");
export const companyProgramsKey = createQueryKeyStructure("company-programs");
export const participationKey = createQueryKeyStructure("participation");
export const submissionsKey = createQueryKeyStructure("submissions");
