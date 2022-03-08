import { createSourceEventStream } from 'graphql';
import type { Component } from 'solid-js'
import { createSignal, For, createResource } from 'solid-js'
import { fetchTodoData, insertTodoData, removeTodoData } from './graphieql'


interface TodoItem {
  id: string,
  label: string;
  is_complete: boolean;
}


const App: Component = () => {
  const [todoList, setTodoList] = createSignal<TodoItem[]>([])
  const [todo, {mutate, refetch}] = createResource(todoList, fetchTodoData)
  let inputBox
  fetchTodoData().then(setTodoList)
  const addTodo = (label) => {
    if(label.trim() === "") {
      console.log("nothing here")
    } else { //make adding and removing reactive!!!
      insertTodoData(false ,label)
      setTodoList((currentList) => [...currentList, {id: todo()[currentList.length], label, is_complete: false}])
      console.log(todo())
    }
  }

  const toggleTodo = (id) => {
    setTodoList((currentList) => currentList.map((label) => (
      label.id !== id ? label : { ...label, is_complete: !label.is_complete }
    )))
  }

  const deleteData = (label) => {
    removeTodoData(label)
    setTodoList(() => [todo()])
  }

  let input: string
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
          <For each={todo()}>{(item, i) =>
            <div class="flex">
              <div class="flex-auto w-full">
                <li class="text-indigo-500 text-center m-2.5 text-3xl bg-slate-200 cursor-pointer font-semibold" onclick={(e)=> {toggleTodo(item.id)
                console.log("Item toggled.", item.is_complete)}}
                className={!item.is_complete ? "no-underline" : "line-through decoration-pink-500 italic"}>
                  {item.label}
                </li>
              </div>
              <div class="flex-auto w-24">
                <button class="px-8 bg-teal-400 rounded-lg w-full h-10 mt-2" onclick={(e) => {deleteData(item.label)}}><img src="https://img.icons8.com/ios-glyphs/30/000000/delete-forever.png"/>
                </button>
              </div>
            </div>
          }</For>
        </ul>
      </div>  
      <div class="flex-2 w-64 shrink">
        <button class="bg-indigo-500 rounded-lg w-full h-10"
          onclick={(e) => {addTodo(inputBox.value)
            inputBox.value = ""}}>Hello</button>
      </div>
    </div>
   </>
  )
}

export default App
