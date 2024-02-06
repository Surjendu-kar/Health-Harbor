// import { useCallback, useEffect, useState } from "react";
// import { supabase } from "../supabase/config";


// type Todo = {
//   title: string;
//   is_complete: boolean;
//   id: number;
// };

// const Example = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   const getData = async () => {
//     const { data } = await supabase.from("todo").select("*");
//     console.log(data);
    
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
//       {/* <ul>
//         {todos.map((todo) => (
//           <li
//             className={todo.is_complete === true ? "done" : undefined}
//             onClick={() => handleToggle(todo)}
//             key={todo.id}
//           >
//             {todo.title}
//           </li>
//         ))}
//       </ul> */}


//       {/* <LoginWithGoogle /> */}
//     </>
//   );
// };

// export default Example;


// const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!isFormValid) return;

//     if (isEditMode) {
//       // In edit mode, call UpdateData with changes
//       await UpdateData(user?.email, changes);
//       setIsEditMode(false); // Exit edit mode after update
//       setChanges({}); // Reset changes after successful update
//     } else {
//       // Insert new doctor logic
//       const newDoctor = {
//         name: name,
//         email: user?.email,
//         phoneno: phone,
//         bio: bio,
//         gender: gender,
//         specialization: specialization,
//         price: price,
//         qualifications: JSON.stringify(qualifications),
//         experiences: JSON.stringify(experiences),
//         timeSlot: JSON.stringify(timeSlots),
//         about: about,
//       };
//       console.log(newDoctor);
//       await InsertData(newDoctor); // Insert data to the database
//     }
//   };

// useEffect(() => {
//     if (fetchedData) {
//       setName(fetchedData.name);
//       setPhone(fetchedData.phoneno);
//       setBio(fetchedData.bio);
//       setPrice(fetchedData.price);
//       setSpecialization(fetchedData.specialization);
//       setGender(fetchedData.gender);
//       setQualifications(JSON.parse(fetchedData.qualifications || "[]"));
//       setExperiences(JSON.parse(fetchedData.experiences || "[]"));
//       setTimeSlots(JSON.parse(fetchedData.timeSlot || "[]"));
//       setAbout(fetchedData.about);
//     }
//   }, [fetchedData]);

// const toggleEditMode = () => {
//     if (fetchedData) {
//       setIsEditMode((prevMode) => !prevMode);
//     }
//   };
