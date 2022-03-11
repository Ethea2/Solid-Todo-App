import { createSourceEventStream } from 'graphql';
import type { Component } from 'solid-js'
import { createSignal, For, createResource, createEffect, JSX, Setter, Show } from 'solid-js'
import { fetchTodoData, insertTodoData, removeTodoData, updateTodoIsComplete } from './graphieql'


interface TodoItem {
  id: string,
  label: string;
  is_complete: boolean;
}

interface TodoListItemProps extends TodoItem {
  mutate: Setter<TodoItem[]>;
}

const TodoListItem = (props: TodoListItemProps): JSX.Element => {
  const [isLoading, setIsLoading] = createSignal(false)

  const toggleTodo = async (id: string, is_complete: boolean) => {
    setIsLoading(true)
    const newData = await updateTodoIsComplete(id, !is_complete)
    props.mutate((currentList) => {
      const currentIndex = currentList.findIndex((item) => item.id === id)
      const newList = [...currentList.slice(0, currentIndex), newData.todo, ...currentList.slice(currentIndex + 1)]
      console.log(newList)
      return newList
    })
    setIsLoading(false)
    /*props.mutate((currentList) => currentList.map((label) => (
      label.id !== id ? label : { ...label, is_complete: !label.is_complete }
    )))*/
  }

  const deleteData = async (id: string) => {
    setIsLoading(true)
    const newData = await removeTodoData(id)
    props.mutate((currentList) => currentList.filter((todoObject) => newData.todo.id !== todoObject.id))
    setIsLoading(false)
  }

  return (
    <div class="flex">
      <div class="flex-auto w-full">
        <li class="text-indigo-500 text-center m-2.5 text-3xl bg-slate-200 cursor-pointer font-semibold" onclick={(e) => {
          toggleTodo(props.id, props.is_complete)
          console.log("Item toggled.", props.is_complete)
        }}
          className={!props.is_complete ? "no-underline" : "line-through decoration-pink-500 italic"}>
          <Show when={!isLoading()} fallback={(
            <div class="w-full flex justify-center">
              <svg role="status" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
              </svg>
            </div>
          )}>
            {props.label}
          </Show>
        </li>
      </div>
      <div class="flex-auto w-24">
        <button class="px-8 bg-teal-400 rounded-lg w-full h-10 mt-2" onclick={(e) => { deleteData(props.id) }}><img src="https://img.icons8.com/ios-glyphs/30/000000/delete-forever.png" />
        </button>
      </div>
    </div >
  )
}






const App: Component = () => {
  const [todo, { mutate, refetch }] = createResource<TodoItem[]>(fetchTodoData)
  let inputBox
  const addTodo = async (label) => {
    if (label.trim() === "") {
      console.log("nothing here")
    } else {
      const newData = await insertTodoData(false, label)
      mutate((currentList) => [newData.todo, ...currentList])
    }
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
              <TodoListItem {...item} mutate={mutate} />
            }</For>
          </ul>
        </div>
        <div class="flex-2 w-64 shrink">
          <button class="bg-indigo-500 rounded-lg w-full h-10"
            onclick={(e) => {
              addTodo(inputBox.value)
              inputBox.value = ""
            }}>Hello</button>
        </div>
      </div>
    </>
  )
}

export default App
