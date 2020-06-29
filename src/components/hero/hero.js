import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const Content = styled.div(({ theme }) => `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: ${ theme.spacing.large };
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`)

const Wrapper = styled.div(({ theme }) => `
    position: relative;
    background: ${ theme.color.black };
    min-height: 300px;
`)

export const Hero = ({ backgroundImage, children }) => {
    return (
        <Wrapper>
            { backgroundImage && <Img fluid={ backgroundImage } style={{ height: '300px' }} /> }
            <Content>
                { children }
            </Content>
        </Wrapper>
    )
}
