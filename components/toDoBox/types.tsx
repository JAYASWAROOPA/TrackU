export type ToDoBoxProps = {
  text: string;
  done: boolean;
  onToggle: () => void;
  onEdit: () => void;
};
