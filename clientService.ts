import ApiService from "./apiService";

interface Client {
  id: number;
  name: string;
  email: string;
}

export const getClients = async (): Promise<Client[]> => {
  const response = await ApiService.get<Client[]>("/clients");
  return response.data;
};

export const getClient = async (id: number): Promise<Client> => {
  const response = await ApiService.get<Client>(`/clients/${id}`);
  return response.data;
};

export const createClient = async (client: Client): Promise<Client> => {
  const response = await ApiService.post<Client>("/clients", client);
  return response.data;
};

export const updateClient = async (
  id: number,
  client: Partial<Client>
): Promise<Client> => {
  const response = await ApiService.put<Client>(`/clients/${id}`, client);
  return response.data;
};

export const deleteClient = async (id: number): Promise<void> => {
  await ApiService.delete<void>(`/clients/${id}`);
};
