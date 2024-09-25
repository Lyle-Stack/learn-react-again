export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export default function TodoItem({ todo }: { todo: Todo }) {
  console.log(todo);
  return <div>items</div>;
}
