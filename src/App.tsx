import type { Component } from 'solid-js';
import { createSignal, For, createResource } from 'solid-js';
import { GraphQLClient, gql } from 'graphql-request';


interface TodoItem {
  id: number;
  label: string;
  is_complete: boolean;
}
/*
async function addToDo() {
    const token = 'klaXjD07aokfme4QqlAMc0nGiSW0Bucp9bZJ3bPlAJH37mP1PFCbymUUUbys3N62'
    const endpoint = 'https://todo-app-neytan.hasura.app/v1/graphql'
    
    const client = new GraphQLClient(endpoint, {
      headers: {
        'x-hasura-admin-secret': `${token}`
      }
    })

    const query = gql`
    query MyQuery {
      todo_items {
        is_complete
        id
        label
      }
    }`

  const data = await client.request(query)
  console.log(JSON.stringify(data, undefined, 2))
}
*/

const token = 'klaXjD07aokfme4QqlAMc0nGiSW0Bucp9bZJ3bPlAJH37mP1PFCbymUUUbys3N62'
const endpoint = 'https://todo-app-neytan.hasura.app/v1/graphql'

const client = new GraphQLClient(endpoint, {
  headers: {
    'x-hasura-admin-secret': `${token}`
  }
})

const query = gql`
query MyQuery {
  todo_items {
    id
    label
    is_complete
  }
}
`




const fetchTodoData = async () => {
  const data = await client.request(query)
  return data.todo_items
}

const inserTodoData = async (id, is_complete, label) => {
  const insertQuery = gql`
  mutation MyMutation {
    insert_todo_items(objects: {$id: String!, is_complete: Boolean!, label: String!}) {
      returning {
        id
        label
        is_complete
      }
    }
  }`
  

}

fetchTodoData().then(console.log)

const App: Component = () => {
  const [todoList, setTodoList] = createSignal<TodoItem[]>([]);
  //const [todo, {mutate, refetch}] = createResource(todoList, fetchTodoData)
  let inputBox;
  fetchTodoData().then(setTodoList)
  const addTodo = (label) => {
    //... basically everything before 
    //setTodoList((currentList) => [...currentList, {id: currentList.length, todo, is_complete: false}]);
    setTodoList((currentList) => [...currentList, {id: currentList.length, label, is_complete: false}]);
    console.log(todoList())
  }

  const toggleTodo = (id) => {
    //map is basically for each element in an array -> do this
    //the "?" operator basically means {CONDITION ? TRUE : FALSE}
    setTodoList((currentList) => currentList.map((label) => (
      label.id !== id ? label : { ...label, is_complete: !label.is_complete }
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
            <li class="text-indigo-500 text-center m-2 text-3xl bg-slate-200 cursor-pointer font-semibold" onclick={(e)=> {toggleTodo(item.id);
            console.log("Item toggled.", item.is_complete)}}
            className={!item.is_complete ? "no-underline" : "line-through decoration-pink-500 italic"}>
              {item.label}
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
