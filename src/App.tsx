import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';

const App: Component = () => {
  const [todoList, setTodoList] = createSignal([]);
  let initialID: number = 0;
  let inputBox;

  const addTodo = (todo) => {
    //... basically everything before 
    setTodoList([...todoList(), {id: ++initialID, todo, completed: false}]);
  }

  const toggleTodo = (id) => {
    //map is basically for each element in an array -> do this
    //the "?" operator basically means {CONDITION ? TRUE : FALSE}
    setTodoList(todoList().map((todo) => (
      todo.id !== id ? todo : { ...todo, completed: !todo.completed }
    )));
  }
  let input: string;
  return (
    <>
    <div>
      <p class="text-4xl text-center p-8 font-semibold">Basic Todo App</p>
    </div>
    <div class="flex">
      <div class="flex-1 shrink w-64">
        <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 
        rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none 
        focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Add tasks..." type="text" name="add" ref={inputBox}></input>
        <ul>
          <For each={todoList()}>{(item, i) =>
            <li class="text-indigo-500 text-center m-2 text-3xl bg-slate-200 cursor-pointer" onclick={(e)=> {toggleTodo(item.id);
            console.log("Item toggled.", item.completed)}}
            className={!item.completed ? "no-underline" : "line-through"}>
              {item.todo}
            </li>
          }</For>
        </ul>
      </div>  
      <div class="flex-2 w-64 shrink">
        <button class="bg-indigo-500 rounded-lg w-full h-10"
          onclick={(e) => {addTodo(inputBox.value);
            inputBox.value = "";}}>Hello</button>
      </div>
    </div>
   </>
  );
};

export default App;