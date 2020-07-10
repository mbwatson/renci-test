import React, { Fragment } from 'react'
import { useTheme } from 'styled-components'
import { graphql, Link } from 'gatsby'
import { Container, Hero, HorizontalRule } from '../components/layout'
import { Meta, Title } from '../components/typography'
import { Visible } from 'react-grid-system'
import { ArrowLeftIcon, ArrowRightIcon } from '../components/icons'

export default ({ data, pageContext }) => {
    const theme = useTheme()
    const { article: {
        frontmatter: {
            title,
            featuredImage,
            publish_date,
            author,
        },
        html: articleHTML
    }} = data
    const { prevArticle, nextArticle } = pageContext

    return (
        <Fragment>
            <Hero backgroundImage={ featuredImage && featuredImage.childImageSharp.fullSize }></Hero>

            <Container>
                <Title>{ title }</Title>

                <Meta>
                    Published on { publish_date } by <Link to={ `/people/${ author.id }` }>{ author.name }</Link>
                </Meta>

                <HorizontalRule />

                <div style={{ padding: '1rem 0 0 0' }} dangerouslySetInnerHTML={{ __html: articleHTML }} />

                <HorizontalRule />

                <div style={{ display: 'flex', padding: '1rem 0' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        {
                            prevArticle && (
                                <Fragment>
                                    <Link to={ prevArticle.path } style={{ display: 'inline-flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <ArrowLeftIcon size={ 16 } fill={ theme.color.darkgrey } />
                                        PREVIOUS <Visible md lg xl>ARTICLE</Visible><br/>
                                    </Link>
                                    <Meta style={{ paddingLeft: '1rem' }}>{ prevArticle.frontmatter.title }</Meta>
                                </Fragment>
                            )
                        }
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        {
                            nextArticle && (
                                <Fragment>
                                    <Link to={ nextArticle.path } style={{ display: 'inline-flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        NEXT <Visible md lg xl>ARTICLE</Visible>
                                        <ArrowRightIcon size={ 16 } fill={ theme.color.darkgrey } />
                                    </Link>
                                    <Meta style={{ paddingRight: '1rem' }}>{ nextArticle.frontmatter.title }</Meta>
                                </Fragment>
                            )
                        }
                    </div>
                </div>
            </Container>
        </Fragment>
    )
}

export const newsQuery = graphql`
    query($slug: String!) {
        article: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            frontmatter {
                title
                featuredImage {
                    childImageSharp {
                        fullSize: fluid {
                            ...GatsbyImageSharpFluid
                        }
                        previewSize: fixed(width: 300, height: 300) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                publish_date(formatString: "dddd, MMMM Do, YYYY")
                author {
                    id
                    name
                }
            }
            html
        }
    }
`