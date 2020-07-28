import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Article, Section, HorizontalRule } from '../components/layout'
import { Title, Heading } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArrowLink } from '../components/link'
import { ArticlePreview } from '../components/news'
import { Profile } from '../components/people'
import { useAvatar } from '../hooks'

export default ({ data, pageContext }) => {
    const {
        peopleYaml: { name, photo, title, email, office, online_presence, bio, groups, collaborations, teams, news }
    } = data
    const avatar = useAvatar()

    return (
        <Container>

            <Profile
                name={ name }
                title={ title }
                email={ email }
                online_presence={ online_presence }
                bio={ bio }
                photo={ photo ? photo.childImageSharp.fixed : avatar.childImageSharp.fixed }
                phone={ office.phone }
            />

            {
                groups && (
                    <Section title="Groups">
                        {
                            groups.map(group => (
                                <Fragment key={ group.id }>
                                    <ArrowLink to={ group.fields.path } text={ group.name } /> <br/>
                                </Fragment>
                            ))
                        }
                    </Section>
                )
            }

            {
                collaborations && (
                    <Section title="Collaborations">
                        {
                            collaborations.map(collaboration => (
                                <Fragment key={ collaboration.id }>
                                    <ArrowLink to={ collaboration.fields.path } text={ collaboration.name } /> <br/>
                                </Fragment>
                            ))
                        }
                    </Section>
                )
            }

            {
                teams && (
                    <Section title="Teams">
                        {
                            teams.map(team => (
                                <Fragment key={ team.id }>
                                    <ArrowLink to={ team.fields.path } text={ team.name } /> <br/>
                                </Fragment>
                            ))
                        }
                    </Section>
                )
            }

            {
                news && (
                    <Section title="News">
                        {
                            news.map((article, i) => (
                                <Fragment key={ article.id }>
                                    <ArticlePreview article={ article } path={ article.fields.path } compact />
                                    { i < news.length - 1 && <HorizontalRule /> }
                                </Fragment>
                            ))
                        }
                    </Section>
                )
            }

        </Container>
    )
}

export const personQuery = graphql`
    query($id: String!) {
        peopleYaml( id: { eq: $id }) {
            id
            name
            email
            title
            office {
                location
                phone
            }
            photo {
                childImageSharp {
                    fixed(width: 200, height: 200) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            online_presence {
                twitter_username
                github_username
                url
                instagram
                linkedin
                youtube
            }
            bio
            teams {
                id
                name
                fields {
                    path
                }
            }
            groups {
                id
                name
                fields {
                    path
                }
            }
            collaborations {
                id
                name
                fields {
                    path
                }
            }
            news {
                id
                fields {
                    path
                }
                frontmatter {
                    title
                    publish_date(formatString: "MMMM DD, YYYY")
                    featuredImage {
                        childImageSharp {
                            previewSize: fixed(width: 300, height: 300) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
                excerpt(pruneLength: 500)
            }
        }
    }
`