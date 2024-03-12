export type Product = {
  id?: string;
  dsProduto: string;
  dsCategoria: string;
  cdProduto: string;
  vlProduto: string;
  qtdProduto: string;
  dtCadastro?: Date;
}

export type Credentials = {
  email: string;
  password: string;
}

export type User = {
  name: string;
} & Credentials;

export type ResponseContext = {
  status: 'success' | 'failure' | null;
  setStatus: React.Dispatch<React.SetStateAction<"success" | "failure" | null>>;
}
