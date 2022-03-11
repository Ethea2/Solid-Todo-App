import { GraphQLClient } from 'graphql-request';
import { createEffect } from 'solid-js';

export function createClientInstance() {
    const endpoint = 'https://todo-app-neytan.hasura.app/v1/graphql'
    const token = import.meta.env.VITE_HASURA_GRAPHQL_ADMIN_SECRET
    const client = new GraphQLClient(endpoint, {
        headers: {
            'x-hasura-admin-secret': `${token}`
        }
    })
    return client
}