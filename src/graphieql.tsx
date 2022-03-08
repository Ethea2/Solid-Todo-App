import { gql } from 'graphql-request';
import { createClientInstance } from './client';

const client = createClientInstance();


export async function fetchTodoData() {
    const query = gql`
    query MyQuery {
    todo_items {
        id
        label
        is_complete
        }
    }
    `
    const data = await client.request(query)
    return data.todo_items
}


export async function insertTodoData(is_complete, label) {
    const insertQuery = gql`
    mutation MyMutation($is_complete: Boolean!, $label: String!) {
        insert_todo_items(objects: {is_complete: $is_complete, label: $label}) {
        affected_rows
        }
    }
    `
    const dataToInsert = {
        is_complete: is_complete,
        label: label
    }

    await client.request(insertQuery, dataToInsert)
}

export async function removeTodoData(label) {
    const removeQuery = gql`
    mutation MyMutation($_eq: String!) {
        delete_todo_items(where: {label: {_eq: $_eq}}) {
          returning {
            label
          }
        }
      }
    `

    const dataToDelete = {
        _eq: label
    }

    await client.request(removeQuery, dataToDelete)
}