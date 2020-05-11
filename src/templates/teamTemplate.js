import React from 'react'
import { graphql } from 'gatsby'
import { DefaultLayout } from "../components/layout"
import { MiniProfile } from '../components/user'

export default ({ data, pageContext }) => {
    const { teamsYaml: {
        name,
        description,
        members
    }} = data
    
    return (
        <DefaultLayout>
            <h1>{ name }</h1>

            <p>
                 { description }
            </p>
            
            <h3>Members</h3>

            <div>
                { members.map(person => <MiniProfile key={ person.id } person={ person } />) }
            </div>

            <br/>
        </DefaultLayout>
    )
}

export const groupQuery = graphql`
    query($id: String!) {
        teamsYaml( id: { eq: $id }) {
            name
            description
            members {
                id
                name
            }
        }
    }
`