// import { useCallback, useEffect, useState } from "react";
// import { supabase } from "./supabase/config";
// import { LoginWithGoogle } from "./pages/LoginWithGoogle";

// type Todo = {
//   title: string;
//   is_complete: boolean;
//   id: number;
// };

// const Example = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   const getData = async () => {
//     const { data } = await supabase.from("todo").select("*");

//     setTodos(data as Todo[]);
//   };

//   const handleToggle = async (todo: Todo) => {
//     await supabase
//       .from("todo")
//       .update({ is_complete: !todo.is_complete })
//       .eq("id", todo.id)
//       .select();
//   };

//   const handleInserts = useCallback((payload: any) => {
//     console.log(payload);
//     if (payload.eventType === "UPDATE") {
//       const newTodo = payload.new;

//       setTodos((prev) => {
//         const newTodos = prev.map((each) =>
//           each.id === newTodo.id ? newTodo : each
//         );
//         return newTodos;
//       });
//     } else if (payload.eventType === "INSERT") {
//       const newTodo = payload.new;

//       setTodos((prev) => prev.concat(newTodo));
//     } else if (payload.eventType === "DELETE") {
//       const deletedTodo = payload.old;

//       setTodos((prev) => prev.filter((todo) => todo.id !== deletedTodo.id));
//     }
//   }, []);

//   useEffect(() => {
//     getData();

//     // Listen to inserts
//     const channel = supabase
//       .channel("custom")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "todo" },
//         handleInserts
//       )
//       .subscribe();

//     return () => {
//       channel.unsubscribe();
//     };
//   }, [handleInserts]);

//   return (
//     <>
//       <ul>
//         {todos.map((todo) => (
//           <li
//             className={todo.is_complete === true ? "done" : undefined}
//             onClick={() => handleToggle(todo)}
//             key={todo.id}
//           >
//             {todo.title}
//           </li>
//         ))}
//       </ul>


//       <LoginWithGoogle />
//     </>
//   );
// };

// export default Example;
