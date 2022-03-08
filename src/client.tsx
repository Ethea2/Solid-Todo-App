import { GraphQLClient } from 'graphql-request';

export function createClientInstance() {
    const token = 'klaXjD07aokfme4QqlAMc0nGiSW0Bucp9bZJ3bPlAJH37mP1PFCbymUUUbys3N62'
    const endpoint = 'https://todo-app-neytan.hasura.app/v1/graphql'

    const client = new GraphQLClient(endpoint, {
        headers: {
            'x-hasura-admin-secret': `${token}`
        }
    })
    return client
}
