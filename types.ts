export type ParkingSpot = {
  id: string;
  descricao: string;
  tipo: string;
  status: string;
  preco: number;
  dataInicioDisponivel: string;
  dataFimDisponivel: string;
  fullDesc: string;
};

export type VagasResponse = {
  id: string;
  nomeEstacionamento: string,
  idEstacionamento: string;
  status: 0;
  statusDescricao: string;
  tipoVaga: 0;
  tipoVagaDescricao: string;
  valorHora: number;
}

export type VagaSocketResponse = {
  nomeEstacionamento: string;
  id: string;
  idEstacionamento: string,
  status: number;
  tipoVaga: number;
  idClient: string;
  valorHora: number;
}

export type ExcludeSocketResponse = {
  id: string;
}
