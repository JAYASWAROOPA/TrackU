export type ToDoBoxProps = {
  id: number;
  text: string;
  done: boolean;
  onToggle: () => void;
  onEdit: () => void;
};
