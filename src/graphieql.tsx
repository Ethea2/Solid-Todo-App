import { gql } from 'graphql-request';
import { createClientInstance } from './client';

const client = createClientInstance();


export async function fetchTodoData() {
    const query = gql`
    query MyQuery {
        todo_items(order_by: {updated_at: desc}) {
          id
          is_complete
          label
        }
      }
    `
    const data = await client.request(query)
    return data.todo_items
}


export async function insertTodoData(is_complete, label) {
    const insertQuery = gql`
    mutation MyMutation($label: String!, $is_complete: Boolean!) {
        todo: insert_todo_items_one(object: {is_complete: $is_complete, label: $label}) {
          is_complete
          label
          id
        }
      }
    `
    const dataToInsert = {
        is_complete: is_complete,
        label: label
    }

    return client.request(insertQuery, dataToInsert)
}


interface RemoveTodo {
    todo: {
        id: string
    }
}

export async function removeTodoData(id): Promise<RemoveTodo> {
    const removeQuery = gql`
    mutation MyMutation($id: uuid = "") {
        todo: delete_todo_items_by_pk(id: $id) {
          id
        }
      }
    `

    const dataToDelete = {
        id: id
    }

    return client.request(removeQuery, dataToDelete)
}

export async function updateTodoIsComplete(id: string, is_complete: boolean) {
    const updateQuery = gql`
    mutation MyMutation($id: uuid!, $is_complete: Boolean!) {
        todo: update_todo_items_by_pk(pk_columns: {id: $id}, _set: {is_complete: $is_complete}) {
          label
          is_complete
          id
        }
      }
      `
    const dataToUpdate = {
        id,
        is_complete
    }

    return client.request(updateQuery, dataToUpdate)
}