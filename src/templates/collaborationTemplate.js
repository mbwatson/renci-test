import React from 'react'
import { graphql, Link } from 'gatsby'
import { DefaultLayout } from "../components/layout"
import { MiniProfile } from '../components/user'
import { LinkIcon, TwitterIcon, GitHubIcon } from '../components/icons'

export default ({ data, pageContext }) => {
    const { collaborationsYaml: {
        name,
        members,
        projects,
        online_presence,
    }} = data
    return (
        <DefaultLayout>
            <h1>{ name }</h1>

            <ul style={{ listStyleType: 'none' }}>
                <li><LinkIcon /> <a href={ online_presence.url }>{ online_presence.url }</a></li>
                <li><TwitterIcon /> <a href={ `https://twitter.com/${ online_presence.twitter }` }>{ online_presence.twitter }</a></li>
                <li><GitHubIcon /> <a href={ `https://github.com/${ online_presence.github }` }>{ online_presence.github }</a></li>
            </ul>

            <h3>Members</h3>

            <ul style={{ listStyleType: 'none' }}>
                { members.map(person => <li key={ person.id } ><MiniProfile person={ person } /></li>) }
            </ul>

            <br/>

            <h3>Projects</h3>
            <div>
                {
                    projects
                    ? projects.map(project => (
                        <div><Link to={ `/projects/${ project.id }` }>{ project.name }</Link></div>
                    ))
                    : <div>&empty;</div>
                }
            </div>

            <br/>
        </DefaultLayout>
    )
}

export const collaborationQuery = graphql`
    query($id: String!) {
        collaborationsYaml( id: { eq: $id }) {
            name
            members {
                id
                name
            }
            online_presence {
                url
                twitter
                github
            }
        }
    }
`