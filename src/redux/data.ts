// src/redux/data.ts

export interface Collaborator {
  id: number;
  name: string;
  role: string;
}

const collaborators: Collaborator[] = [
  { id: 1, name: "John Doe", role: "Developer" },
  { id: 2, name: "Jane Smith", role: "Designer" },
  { id: 3, name: "Mike Johnson", role: "Marketing" },
];

export default collaborators;
